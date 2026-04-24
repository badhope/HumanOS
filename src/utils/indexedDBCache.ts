const DB_NAME = 'HumanOS-Cache'
const DB_VERSION = 1
const STORE_ASSESSMENTS = 'assessments'
const STORE_CALCULATIONS = 'calculations'
const STORE_QUESTIONS = 'questions'

class IndexedDBCache {
  private dbPromise: Promise<IDBDatabase> | null = null

  init(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains(STORE_ASSESSMENTS)) {
          db.createObjectStore(STORE_ASSESSMENTS, { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains(STORE_CALCULATIONS)) {
          const calcStore = db.createObjectStore(STORE_CALCULATIONS, { keyPath: 'hash' })
          calcStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains(STORE_QUESTIONS)) {
          const qStore = db.createObjectStore(STORE_QUESTIONS, { keyPath: 'id' })
          qStore.createIndex('category', 'category', { unique: false })
        }
      }
    })

    return this.dbPromise
  }

  async putAssessment(id: string, data: any): Promise<void> {
    try {
      const db = await this.init()
      const tx = db.transaction(STORE_ASSESSMENTS, 'readwrite')
      const store = tx.objectStore(STORE_ASSESSMENTS)
      store.put({
        id,
        data,
        version: 1,
        timestamp: Date.now()
      })
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    } catch (e) {
      console.warn('[IndexedDB] 存储失败，降级到内存缓存')
    }
  }

  async getAssessment(id: string): Promise<any | null> {
    try {
      const db = await this.init()
      const tx = db.transaction(STORE_ASSESSMENTS, 'readonly')
      const store = tx.objectStore(STORE_ASSESSMENTS)
      
      return new Promise((resolve, reject) => {
        const request = store.get(id)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          const result = request.result
          if (!result) {
            resolve(null)
            return
          }
          
          const age = Date.now() - result.timestamp
          if (age > 7 * 24 * 60 * 60 * 1000) {
            resolve(null)
            return
          }
          
          resolve(result.data)
        }
      })
    } catch (e) {
      return null
    }
  }

  async putCalculation(hash: string, data: any, ttl: number = 3600000): Promise<void> {
    try {
      const db = await this.init()
      const tx = db.transaction(STORE_CALCULATIONS, 'readwrite')
      const store = tx.objectStore(STORE_CALCULATIONS)
      store.put({
        hash,
        data,
        timestamp: Date.now(),
        expireAt: Date.now() + ttl
      })
      await new Promise<void>((resolve) => {
        tx.oncomplete = () => resolve()
      })
    } catch (e) {
    }
  }

  async getCalculation(hash: string): Promise<any | null> {
    try {
      const db = await this.init()
      const tx = db.transaction(STORE_CALCULATIONS, 'readonly')
      const store = tx.objectStore(STORE_CALCULATIONS)
      
      return new Promise((resolve) => {
        const request = store.get(hash)
        request.onerror = () => resolve(null)
        request.onsuccess = () => {
          const result = request.result
          if (!result || Date.now() > result.expireAt) {
            resolve(null)
            return
          }
          resolve(result.data)
        }
      })
    } catch (e) {
      return null
    }
  }

  async clearOldCalculations(): Promise<void> {
    try {
      const db = await this.init()
      const tx = db.transaction(STORE_CALCULATIONS, 'readwrite')
      const store = tx.objectStore(STORE_CALCULATIONS)
      const index = store.index('timestamp')
      const cutoff = Date.now() - 24 * 60 * 60 * 1000
      
      const request = index.openCursor(IDBKeyRange.upperBound(cutoff))
      request.onsuccess = () => {
        const cursor = request.result
        if (cursor) {
          cursor.delete()
          cursor.continue()
        }
      }
    } catch (e) {
    }
  }

  async getStats(): Promise<{
    assessments: number
    calculations: number
  }> {
    try {
      const db = await this.init()
      
      const count = (storeName: string): Promise<number> => 
        new Promise((resolve) => {
          const tx = db.transaction(storeName, 'readonly')
          const request = tx.objectStore(storeName).count()
          request.onsuccess = () => resolve(request.result)
          request.onerror = () => resolve(0)
        })

      return {
        assessments: await count(STORE_ASSESSMENTS),
        calculations: await count(STORE_CALCULATIONS),
      }
    } catch (e) {
      return { assessments: 0, calculations: 0 }
    }
  }

  support(): boolean {
    return 'indexedDB' in window
  }
}

export const indexedDBCache = new IndexedDBCache()

export async function withCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number
    useIndexedDB?: boolean
  } = {}
): Promise<T> {
  const { useIndexedDB = true } = options

  if (useIndexedDB && indexedDBCache.support()) {
    const cached = await indexedDBCache.getAssessment(cacheKey)
    if (cached) {
      return cached as T
    }
  }

  const data = await fetcher()

  if (useIndexedDB && indexedDBCache.support()) {
    indexedDBCache.putAssessment(cacheKey, data)
  }

  return data
}

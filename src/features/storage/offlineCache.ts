const DB_NAME = 'HumanOS_Assessment_Cache';
const DB_VERSION = 1;
const STORE_NAME = 'assessments';

interface CacheEntry {
  key: string;
  data: unknown;
  timestamp: number;
  expiresAt: number;
}

let db: IDBDatabase | null = null;

async function openDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result as CacheEntry | undefined;
        if (result && result.expiresAt > Date.now()) {
          resolve(result.data as T);
        } else {
          if (result) {
            const deleteTransaction = database.transaction(STORE_NAME, 'readwrite');
            const deleteStore = deleteTransaction.objectStore(STORE_NAME);
            deleteStore.delete(key);
          }
          resolve(null);
        }
      };
    });
  } catch (error) {
    console.warn('IndexedDB read error:', error);
    return null;
  }
}

export async function setCache<T>(key: string, data: T, ttlMs = 24 * 60 * 60 * 1000): Promise<void> {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const entry: CacheEntry = {
        key,
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttlMs,
      };
      const request = store.put(entry);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.warn('IndexedDB write error:', error);
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.warn('IndexedDB delete error:', error);
  }
}

export async function clearExpiredCache(): Promise<void> {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const now = Date.now();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const entry = cursor.value as CacheEntry;
          if (entry.expiresAt <= now) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
    });
  } catch (error) {
    console.warn('IndexedDB clear expired error:', error);
  }
}

export async function preloadAssessments(assessments: Array<{ slug: string; path: string }>): Promise<void> {
  const cacheKeyPrefix = 'assessment_';

  for (const assessment of assessments) {
    const key = cacheKeyPrefix + assessment.slug;
    const cached = await getCached(key);
    if (!cached) {
      try {
        const response = await fetch(assessment.path);
        if (response.ok) {
          const data = await response.json();
          await setCache(key, data);
        }
      } catch {
        console.warn(`Failed to preload assessment: ${assessment.slug}`);
      }
    }
  }
}

import { storage } from '../../lib/utils';

const ENCRYPTED_DATA_KEY = 'encrypted_user_data';
const ENCRYPTION_VERSION_KEY = 'encryption_version';
const CURRENT_ENCRYPTION_VERSION = 1;

export class EncryptionService {
  private encryptionKey: CryptoKey | null = null;
  private salt: Uint8Array;

  constructor() {
    this.salt = this.getOrCreateSalt();
  }

  private getOrCreateSalt(): Uint8Array {
    const savedSalt = storage.get<string>('encryption_salt', '');
    if (savedSalt) {
      return this.base64ToUint8Array(savedSalt);
    }
    
    const salt = crypto.getRandomValues(new Uint8Array(16));
    storage.set('encryption_salt', this.uint8ArrayToBase64(salt));
    return salt;
  }

  async setPassword(password: string): Promise<void> {
    this.encryptionKey = await this.deriveKey(password, this.salt);
  }

  async encrypt(data: any): Promise<EncryptedData> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not set');
    }

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const dataString = JSON.stringify(data);
    const dataBuffer = new TextEncoder().encode(dataString);
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      dataBuffer
    );

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hash = this.uint8ArrayToBase64(new Uint8Array(hashBuffer));

    return {
      iv: this.uint8ArrayToBase64(iv),
      data: this.uint8ArrayToBase64(new Uint8Array(encryptedBuffer)),
      hash,
      version: CURRENT_ENCRYPTION_VERSION,
      timestamp: Date.now()
    };
  }

  async decrypt(encrypted: EncryptedData): Promise<any> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not set');
    }

    const iv = this.base64ToUint8Array(encrypted.iv);
    const dataBuffer = this.base64ToUint8Array(encrypted.data);
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      dataBuffer
    );

    const dataString = new TextDecoder().decode(decryptedBuffer);
    const data = JSON.parse(dataString);

    const hashBuffer = await crypto.subtle.digest('SHA-256', decryptedBuffer);
    const hash = this.uint8ArrayToBase64(new Uint8Array(hashBuffer));
    
    if (hash !== encrypted.hash) {
      console.warn('Data integrity check failed');
    }

    return data;
  }

  async saveEncrypted(key: string, data: any): Promise<void> {
    const encrypted = await this.encrypt(data);
    const allEncrypted = storage.get<Record<string, EncryptedData>>(ENCRYPTED_DATA_KEY, {});
    allEncrypted[key] = encrypted;
    storage.set(ENCRYPTED_DATA_KEY, allEncrypted);
  }

  async loadEncrypted(key: string): Promise<any> {
    const allEncrypted = storage.get<Record<string, EncryptedData>>(ENCRYPTED_DATA_KEY, {});
    const encrypted = allEncrypted[key];
    if (!encrypted) {
      return null;
    }
    return await this.decrypt(encrypted);
  }

  removeEncrypted(key: string): void {
    const allEncrypted = storage.get<Record<string, EncryptedData>>(ENCRYPTED_DATA_KEY, {});
    delete allEncrypted[key];
    storage.set(ENCRYPTED_DATA_KEY, allEncrypted);
  }

  async verifyPassword(password: string): Promise<boolean> {
    try {
      const testKey = await this.deriveKey(password, this.salt);
      return testKey !== null;
    } catch {
      return false;
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    const isValid = await this.verifyPassword(oldPassword);
    if (!isValid) {
      return false;
    }

    const allEncrypted = storage.get<Record<string, EncryptedData>>(ENCRYPTED_DATA_KEY, {});
    const decrypted: Record<string, any> = {};

    for (const [key, encrypted] of Object.entries(allEncrypted)) {
      try {
        decrypted[key] = await this.decrypt(encrypted);
      } catch (error) {
        console.error(`Failed to decrypt ${key}:`, error);
      }
    }

    this.encryptionKey = await this.deriveKey(newPassword, this.salt);

    for (const [key, data] of Object.entries(decrypted)) {
      await this.saveEncrypted(key, data);
    }

    return true;
  }

  isEncrypted(): boolean {
    return storage.get(ENCRYPTION_VERSION_KEY, 0) > 0;
  }

  enableEncryption(): void {
    storage.set(ENCRYPTION_VERSION_KEY, CURRENT_ENCRYPTION_VERSION);
  }

  disableEncryption(): void {
    storage.remove(ENCRYPTION_VERSION_KEY);
  }

  private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const passwordBuffer = new TextEncoder().encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    return key;
  }

  private uint8ArrayToBase64(array: Uint8Array): string {
    const CHUNK = 0x8000;
    let binary = '';
    for (let i = 0; i < array.length; i += CHUNK) {
      binary += String.fromCharCode(...array.subarray(i, i + CHUNK));
    }
    return btoa(binary);
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

export interface EncryptedData {
  iv: string;
  data: string;
  hash: string;
  version: number;
  timestamp: number;
}

export const encryptionService = new EncryptionService();

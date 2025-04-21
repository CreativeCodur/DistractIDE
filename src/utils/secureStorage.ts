/**
 * Secure Storage Utility
 * 
 * This utility provides methods for securely storing sensitive data
 * in localStorage with encryption.
 */

// Simple encryption key (in a real app, this would be more secure)
const ENCRYPTION_KEY = 'distractide-secure-storage-key';

/**
 * Encrypts a string using a simple XOR cipher
 * Note: This is a basic implementation for demonstration purposes.
 * In a production environment, use a proper encryption library.
 */
const encrypt = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result); // Base64 encode the result
};

/**
 * Decrypts a string that was encrypted with the encrypt function
 */
const decrypt = (encryptedText: string): string => {
  try {
    const text = atob(encryptedText); // Base64 decode
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    console.error('Failed to decrypt data:', e);
    return '';
  }
};

/**
 * Securely stores a value in localStorage
 */
export const secureSet = (key: string, value: any): void => {
  try {
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const encryptedValue = encrypt(valueStr);
    localStorage.setItem(`secure_${key}`, encryptedValue);
  } catch (e) {
    console.error('Failed to securely store data:', e);
  }
};

/**
 * Retrieves a securely stored value from localStorage
 */
export const secureGet = (key: string): any => {
  try {
    const encryptedValue = localStorage.getItem(`secure_${key}`);
    if (!encryptedValue) return null;
    
    const decryptedValue = decrypt(encryptedValue);
    
    // Try to parse as JSON, if it fails return as string
    try {
      return JSON.parse(decryptedValue);
    } catch {
      return decryptedValue;
    }
  } catch (e) {
    console.error('Failed to retrieve secure data:', e);
    return null;
  }
};

/**
 * Removes a securely stored value from localStorage
 */
export const secureRemove = (key: string): void => {
  localStorage.removeItem(`secure_${key}`);
};

/**
 * Clears all securely stored values from localStorage
 */
export const secureClear = (): void => {
  Object.keys(localStorage)
    .filter(key => key.startsWith('secure_'))
    .forEach(key => localStorage.removeItem(key));
};

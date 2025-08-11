import type { localStorage } from "../interfaces/LocalStorage.model";

class LocalStorageService implements localStorage {

  /**
   * Save an item in localStorage
   * @param key The key to store the value under
   * @param value The value to store (any type)
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  }

  /**
   * Get an item from localStorage
   * @param key The key to retrieve
   * @returns The parsed value, or null if not found
   */
  getItem<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  }

  /**
   * Remove an item from localStorage
   * @param key The key to remove
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  }

  /**
   * Clear all items from localStorage
   */
  clearItems(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage`, error);
    }
  }
}

export default new LocalStorageService();
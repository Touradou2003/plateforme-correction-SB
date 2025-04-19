import { cache } from '../cache';

describe('Cache', () => {
  let cacheInstance: typeof cache;

  beforeEach(() => {
    cacheInstance = cache;
    cacheInstance.clear();
  });

  it('should set and get cached data', () => {
    const key = 'test-key';
    const data = { test: 'data' };

    cacheInstance.set(key, data);
    const cachedData = cacheInstance.get(key);

    expect(cachedData).toEqual(data);
  });

  it('should return null for expired cache', () => {
    const key = 'test-key';
    const data = { test: 'data' };

    cacheInstance.set(key, data);
    // Simulate cache expiration by setting timestamp to past
    const cacheItem = cacheInstance['cache'].get(key);
    if (cacheItem) {
      cacheItem.timestamp = Date.now() - 6 * 60 * 1000; // 6 minutes ago
    }

    const cachedData = cacheInstance.get(key);
    expect(cachedData).toBeNull();
  });

  it('should delete cached data', () => {
    const key = 'test-key';
    const data = { test: 'data' };

    cacheInstance.set(key, data);
    cacheInstance.delete(key);

    const cachedData = cacheInstance.get(key);
    expect(cachedData).toBeNull();
  });

  it('should clear all cached data', () => {
    const key1 = 'test-key-1';
    const key2 = 'test-key-2';
    const data1 = { test: 'data1' };
    const data2 = { test: 'data2' };

    cacheInstance.set(key1, data1);
    cacheInstance.set(key2, data2);
    cacheInstance.clear();

    expect(cacheInstance.get(key1)).toBeNull();
    expect(cacheInstance.get(key2)).toBeNull();
  });
}); 
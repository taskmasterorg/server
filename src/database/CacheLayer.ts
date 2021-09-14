import { createClient } from 'redis';

/**
 * Generalizes how the cache would function and hides the
 * details of what is being used under the hood.
 */
class CacheLayer {

    private readonly cache: any;
    private static instance: CacheLayer;

    private constructor() {

        this.cache = createClient({});
        this.cache.connect().then(
            () => {}
        );

        this.cache.on('connect', () => {
            console.log(`Redis connection established`);
          });
      
          this.cache.on('error', (error: string) => {
            console.error(`Redis error, service degraded: ${error}`);
          });
    }

    public static getInstance(): CacheLayer {

        if (!CacheLayer.instance) {
            CacheLayer.instance = new CacheLayer();
        }

        return CacheLayer.instance;
    }

    public async connect(): Promise<any> {
        await this.cache.connect();
    }

    public async get(key: string): Promise<any> {
        return await this.cache.get(key);
    }

    public async set(key: string, value: string): Promise<any> {
        return this.cache.set(key, value);
    }
}

export default CacheLayer;

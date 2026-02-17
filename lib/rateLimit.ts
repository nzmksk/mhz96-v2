import { LRUCache } from "lru-cache";

type RateLimitOptions = {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max number of unique tokens (IPs)
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

export default function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval,
  });

  return {
    check: (limit: number, token: string): RateLimitResult => {
      const tokenCount = tokenCache.get(token) || [0];
      const currentCount = tokenCount[0] || 0;

      if (currentCount === 0) {
        tokenCache.set(token, [1]);
        return {
          success: true,
          limit,
          remaining: limit - 1,
          reset: Date.now() + options.interval,
        };
      }

      if (currentCount >= limit) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: Date.now() + options.interval,
        };
      }

      tokenCache.set(token, [currentCount + 1]);
      return {
        success: true,
        limit,
        remaining: limit - currentCount - 1,
        reset: Date.now() + options.interval,
      };
    },
  };
}

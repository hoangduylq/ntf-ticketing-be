export interface IRateLimiter {
  max: number; // Max number of jobs processed
  duration: number; // per duration in milliseconds
  bounceBack: boolean; // When jobs get rate limited, they stay in the waiting queue and are not moved to the delayed queue
}

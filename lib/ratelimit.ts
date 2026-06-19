import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis কানেকশন সেটআপ করুন
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// প্রতি ১০ সেকেন্ডে সর্বোচ্চ ৫টি লগইন রিকোয়েস্ট (আপনার প্রয়োজনমতো সংখ্যাটি পরিবর্তন করতে পারেন)
export const loginRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});
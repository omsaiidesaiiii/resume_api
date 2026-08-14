import {Redis} from "ioredis";
import "dotenv/config";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL not found in environment");
}

export const redis = new Redis(redisUrl);
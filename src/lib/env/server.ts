import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().startsWith('postgresql://'),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
    CLERK_SECRET_KEY: z.string(),
  },
  experimental__runtimeEnv: process.env,
});

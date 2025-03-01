import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import z from 'zod';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('.env file not found');
  process.exit(1);
}

const configSchema = z.object({
  DATABASE_URL: z.string().nonempty(),

  ACCESS_TOKEN_SECRET: z.string().nonempty(),
  ACCESS_TOKEN_EXPIRES_IN: z.string().nonempty(),
  REFRESH_TOKEN_SECRET: z.string().nonempty(),
  REFRESH_TOKEN_EXPIRES_IN: z.string().nonempty(),
  SECRET_API_KEY: z.string().nonempty(),

  ADMIN_EMAIL: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_PHONE_NUMBER: z.string(),

  OTP_EXPIRES_IN: z.string().nonempty(),

  RESEND_API_KEY: z.string().nonempty(),
  RESEND_EMAIL: z.string().nonempty(),
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.log('Some fields are invalid or missing in .env file');
  console.error(configServer.error);
  process.exit(1);
}

const envConfig = configServer.data;

export default envConfig;

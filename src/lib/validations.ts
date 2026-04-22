import * as z from 'zod';

export const clerkWebhookPayloadSchema = z.object({
  first_name: z.string().min(1, 'First Name must have at least 1 characters'),
  last_name: z.string().min(1, 'Last Name must have at least 1 characters'),
  image_url: z.string().startsWith('https://img.clerk.com/'),
  email_addresses: z.array(
    z.object({
      email_address: z.string(),
      id: z.string(),
    }),
  ),
  id: z.string(),
});

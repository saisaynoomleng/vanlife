import db from '@/db';
import { UserTable } from '@/db/schema/user.schema';
import { clerkWebhookPayloadSchema } from '@/lib/validations';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);
    const eventType = event.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { data } = event;

      const result = clerkWebhookPayloadSchema.safeParse(data);

      if (!result.success) {
        return NextResponse.json({ message: 'Invalid Enity' }, { status: 422 });
      }

      const { first_name, last_name, email_addresses, id, image_url } =
        result.data;

      await db
        .insert(UserTable)
        .values({
          firstName: first_name || '',
          lastName: last_name || '',
          imageUrl: image_url,
          email: email_addresses[0].email_address,
          clerkUserId: id,
          isActive: true,
        })
        .onConflictDoUpdate({
          target: UserTable.clerkUserId,
          set: {
            firstName: first_name || '',
            lastName: last_name || '',
            imageUrl: image_url,
            email: email_addresses[0].email_address,
            clerkUserId: id,
            updatedAt: new Date(),
          },
        });

      return NextResponse.json({ ok: true });
    }

    if (eventType === 'user.deleted') {
      if (event.data.id) {
        await db
          .delete(UserTable)
          .where(eq(UserTable.clerkUserId, event.data.id));

        return NextResponse.json({ message: 'User Deleted' }, { status: 200 });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Missing Clerk Webhook' },
      { status: 400 },
    );
  }
}

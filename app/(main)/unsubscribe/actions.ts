'use server';

import { z } from 'zod';
import { NewsletterSubscription } from '@/lib/db/models/NewsletterSubscription';

// --- Zod Schema for validation ---
const UnsubscribeSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});


/**
 * Simulates unsubscribing a user from a newsletter.
 * In a real app, this would update a database record.
 * @param email The email of the user to unsubscribe.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function unsubscribeUser(email: string): Promise<{ success: boolean, message: string }> {
  // 1. Validate the input
  const validationResult = UnsubscribeSchema.safeParse({ email });

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Validation failed.",
    };
  }

  const validatedEmail = validationResult.data.email;

  try {
    // --- DATABASE LOGIC ---
    const existingSubscription = await NewsletterSubscription.findUnique({
      where: { email: validatedEmail },
    });

    if (!existingSubscription) {
      return {
        success: false,
        message: "This email is not subscribed to our newsletter.",
      };
    }

    if (existingSubscription.status === 'unsubscribed') {
        return {
            success: true,
            message: "You have already been unsubscribed.",
        };
    }

    await NewsletterSubscription.update({
      where: { email: validatedEmail },
      data: { status: 'unsubscribed' },
    });

    // --- SIMULATION ---
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate checking if the user exists
    if (validatedEmail === "notfound@example.com") {
        return { success: false, message: "This email address was not found in our records." };
    }
    
    // Simulate a server error
    if (validatedEmail === "error@example.com") {
        throw new Error("Simulated server error.");
    }


    // 2. Return a success response
    console.log(`Successfully unsubscribed: ${validatedEmail}`);
    return {
      success: true,
      message: "You have been successfully unsubscribed.",
    };

  } catch (error) {
    // 3. Handle any errors
    console.error("Unsubscription failed:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}


// ============================================
// templates/newsletterSubscription.ts - Newsletter Subscription Renderer
// ============================================

const companyName = process.env.COMPANY_NAME || 'CyberWizDev';
const companyEmail = process.env.COMPANY_EMAIL || 'info@cyberwizdev.com';
const companyAddress = process.env.COMPANY_ADDRESS || 'Akure, Ondo, Nigeria';

const websiteUrl = process.env.WEBSITE_URL || 'https://www.cyberwizdev.com.ng';
const blogUrl = process.env.BLOG_URL || 'https://www.cyberwizdev.com.ng/blog';
const twitterUrl = process.env.TWITTER_URL || 'https://twitter.com/cyberwizdev';
const linkedinUrl = process.env.LINKEDIN_URL || 'https://linkedin.com/company/cyberwizdev';
const facebookUrl = process.env.FACEBOOK_URL || 'https://facebook.com/cyberwizdev';

import { EmailSender } from '../sender';
import { NewsletterSubscriptionData } from '../types';
import path from 'path';

export async function renderNewsletterSubscription(data: NewsletterSubscriptionData): Promise<string> {
  const templatePath = path.join(process.cwd(), 'email', 'templates', 'html', 'new-subscription.html');
  return await EmailSender.renderTemplate(templatePath, data, 'Welcome to Our Newsletter');
}

export async function sendNewsletterSubscription(to: string, data: { subscriberName: string, unsubscribeUrl: string }): Promise<void> {
  const html = await renderNewsletterSubscription({
    subscriberName: data.subscriberName,
    websiteUrl,
    blogUrl,
    twitterUrl,
    linkedinUrl,
    facebookUrl,
    companyName,
    companyAddress,
    unsubscribeUrl: data.unsubscribeUrl,
  });
  
  await EmailSender.sendEmail(to, '🎉 Welcome! You\'re Subscribed', html, {
    from: process.env.EMAIL_FROM || 'welcome@yourcompany.com',
  });
}

// ============================================
// index.ts - Usage Examples
// ============================================

/*
// Example 1: Send Newsletter
import { sendNewsletter } from './templates/newsletter';

await sendNewsletter('user@example.com', {
  companyName: 'Your Company',
  featuredArticleTitle: 'Featured Article',
  featuredArticleContent: 'Article content here...',
  featuredArticleUrl: 'https://example.com/article',
  newsItems: [
    { icon: '🎉', title: 'New Feature', description: 'Description...' },
    { icon: '📊', title: 'Success Story', description: 'Description...' },
  ],
  socialLinks: {
    twitter: 'https://twitter.com/company',
    linkedin: 'https://linkedin.com/company',
    facebook: 'https://facebook.com/company',
  },
  companyAddress: '123 Main St, City, Country',
  unsubscribeUrl: 'https://example.com/unsubscribe',
});

// Example 2: Send Live Chat Alert
import { sendLiveChatAlert } from './templates/liveChatAlert';

await sendLiveChatAlert('admin@yourcompany.com', {
  visitorName: 'John Doe',
  visitorEmail: 'john@example.com',
  timestamp: new Date().toISOString(),
  pageUrl: 'https://example.com/pricing',
  messageContent: 'I need help with pricing...',
  chatDashboardUrl: 'https://dashboard.example.com/chat/123',
});

// Example 3: Send Newsletter Subscription Confirmation
import { sendNewsletterSubscription } from './templates/newsletterSubscription';

await sendNewsletterSubscription('newuser@example.com', {
  subscriberName: 'Jane Smith',
  websiteUrl: 'https://example.com',
  blogUrl: 'https://example.com/blog',
  twitterUrl: 'https://twitter.com/company',
  linkedinUrl: 'https://linkedin.com/company',
  facebookUrl: 'https://facebook.com/company',
  companyName: 'Your Company',
  companyAddress: '123 Main St, City, Country',
  unsubscribeUrl: 'https://example.com/unsubscribe/token123',
});

// Example 4: Send Contact Form Notifications
import { sendContactFormAdmin } from './templates/contactFormAdmin';
import { sendContactFormUser } from './templates/contactFormUser';

// To Admin
await sendContactFormAdmin('admin@yourcompany.com', {
  contactName: 'Alice Johnson',
  contactEmail: 'alice@example.com',
  contactPhone: '+1234567890',
  contactCompany: 'ABC Corp',
  contactSubject: 'Partnership Inquiry',
  contactMessage: 'We are interested in partnering...',
  submissionDate: new Date().toLocaleString(),
});

// To User
await sendContactFormUser('alice@example.com', {
  contactName: 'Alice Johnson',
  contactMessagePreview: 'We are interested in partnering...',
  websiteUrl: 'https://example.com',
  caseStudiesUrl: 'https://example.com/case-studies',
  phoneNumber: '+1234567890',
  companyName: 'Your Company',
  companyAddress: '123 Main St, City, Country',
  companyEmail: 'support@yourcompany.com',
  twitterUrl: 'https://twitter.com/company',
  linkedinUrl: 'https://linkedin.com/company',
  facebookUrl: 'https://facebook.com/company',
});
*/

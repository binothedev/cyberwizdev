// ============================================
// types.ts - Email Types and Interfaces
// ============================================

export interface NewsletterData {
  subject: string;
  companyName: string;
  content: string;
  twitterUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  websiteUrl: string;
  unsubscribeUrl: string;
}

export interface LiveChatAlertData {
  visitorName: string;
  timestamp: string;
  messageContent: string;
  chatDashboardUrl: string;
}

export interface NewsletterSubscriptionData {
  subscriberName: string;
  websiteUrl: string;
  blogUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  companyName: string;
  companyAddress: string;
  unsubscribeUrl: string;
}

export interface ContactFormAdminData {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany: string;
  contactSubject: string;
  contactMessage: string;
  submissionDate: string;
}

export interface ContactFormUserData {
  contactName: string;
  contactMessagePreview: string;
  websiteUrl: string;
  caseStudiesUrl: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  twitterUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

export type EmailTemplateData =
  | NewsletterData
  | LiveChatAlertData
  | NewsletterSubscriptionData
  | ContactFormAdminData
  | ContactFormUserData;

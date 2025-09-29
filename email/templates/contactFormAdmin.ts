// ============================================
// templates/contactFormAdmin.ts - Contact Form Admin Renderer
// ============================================

import { EmailSender } from '../sender';
import { ContactFormAdminData } from '../types';
import path from 'path';

export async function renderContactFormAdmin(data: ContactFormAdminData): Promise<string> {
  const templatePath = path.join(process.cwd(), 'email', 'templates', 'html', 'admin-contact.html');
  return await EmailSender.renderTemplate(templatePath, data, 'New Contact Form Submission');
}

export async function sendContactFormAdmin(adminEmail: string, data: ContactFormAdminData): Promise<void> {
  const html = await renderContactFormAdmin(data);
  await EmailSender.sendEmail(adminEmail, `📝 New Contact: ${data.contactSubject}`, html, {
    from: process.env.EMAIL_FROM || 'forms@yourcompany.com',
    replyTo: data.contactEmail,
  });
}

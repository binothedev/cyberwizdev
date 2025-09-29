// ============================================
// templates/liveChatAlert.ts - Live Chat Alert Renderer
// ============================================

import { EmailSender } from '../sender';
import { LiveChatAlertData } from '../types';
import path from 'path';

export async function renderLiveChatAlert(data: LiveChatAlertData): Promise<string> {
  const templatePath = path.join(process.cwd(), 'email', 'templates', 'html', 'new-chat-admin.html');
  return await EmailSender.renderTemplate(templatePath, data, 'New Live Chat Message');
}

export async function sendLiveChatAlert(adminEmail: string, data: LiveChatAlertData): Promise<void> {
  const html = await renderLiveChatAlert(data);
  await EmailSender.sendEmail(adminEmail, '⚡ New Live Chat Message - Action Required', html, {
    from: process.env.EMAIL_FROM || 'alerts@yourcompany.com',
  });
}

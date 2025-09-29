// ============================================
// sender.ts - Email Sender Utility
// ============================================

import fs from 'fs/promises';
import nodemailer from 'nodemailer';

export interface EmailConfig {
  from: string;
  replyTo?: string;
}

export class EmailSender {
  /**
   * Replace placeholders in template with actual data
   * @param template - HTML template string
   * @param data - Data object with values to replace
   * @returns Rendered HTML string
   */
  static replacePlaceholders(template: string, data: Record<string, any>): string {
    let result = template;
    
    // Flatten nested objects for placeholder replacement
    const flattenedData = this.flattenObject(data);
    
    // Replace all [PLACEHOLDER] patterns with corresponding data values
    Object.keys(flattenedData).forEach(key => {
      const placeholder = `[${key.toUpperCase()}]`;
      const value = flattenedData[key] !== null && flattenedData[key] !== undefined ? String(flattenedData[key]) : '';
      result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });
    
    return result;
  }

  /**
   * Flatten nested objects for easier placeholder replacement
   * @param obj - Object to flatten
   * @param prefix - Prefix for nested keys
   * @returns Flattened object
   */
  private static flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
    const flattened: Record<string, any> = {};
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}_${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, this.flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    });
    
    return flattened;
  }

  /**
   * Wrap HTML content in standard email structure
   * @param content - HTML content
   * @param title - Email title
   * @returns Complete HTML email
   */
  static wrapInEmailStructure(content: string, title: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f3f4f6;">
${content}
</body>
</html>`;
  }

  /**
   * Read template file from disk
   * @param templatePath - Path to template file
   * @returns Template content
   */
  static async readTemplate(templatePath: string): Promise<string> {
    try {
      const content = await fs.readFile(templatePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read template at ${templatePath}: ${error}`);
    }
  }

  /**
   * Render email template with data
   * @param templatePath - Path to template file
   * @param data - Data to replace in template
   * @param title - Email title
   * @returns Rendered HTML email
   */
  static async renderTemplate(
    templatePath: string,
    data: Record<string, any>,
    title: string
  ): Promise<string> {
    const templateContent = await this.readTemplate(templatePath);
    const renderedContent = this.replacePlaceholders(templateContent, data);
    return this.wrapInEmailStructure(renderedContent, title);
  }

  /**
   * Send email using your email service (implement with your provider)
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param htmlContent - Rendered HTML content
   * @param config - Email configuration
   */
  static async sendEmail(
    to: string | string[],
    subject: string,
    htmlContent: string,
    config?: EmailConfig
  ): Promise<void> {
    // Implement with your email service provider (e.g., SendGrid, AWS SES, Nodemailer, Resend, etc.)
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('From:', config?.from);
    console.log('HTML Content length:', htmlContent.length);
    
    // Implementation with Nodemailer:
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: config?.from || process.env.EMAIL_FROM,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html: htmlContent,
      replyTo: config?.replyTo,
    });

    // Example implementation with Resend:
    /*
    import { Resend } from 'resend';
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: config?.from || process.env.EMAIL_FROM!,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: htmlContent,
      reply_to: config?.replyTo,
    });
    */
  }
}

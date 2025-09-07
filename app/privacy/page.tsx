import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | CyberWizDev",
  description:
    "Learn how CyberWizDev collects, uses, and protects your personal data. We are committed to protecting your privacy and ensuring the security of your information.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "information security",
  ],
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | CyberWizDev",
    description:
      "Learn how CyberWizDev collects, uses, and protects your personal data. We are committed to protecting your privacy and ensuring the security of your information.",
    url: "https://cyberwizdev.com.ng/privacy",
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-20 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-8">
          At Cyberwizdev Software Solutions, we respect your privacy and are
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and protect your personal data.
        </p>
        <h2 className="text-2xl font-bold mb-4">Personal Data We Collect</h2>
        <p className="mb-8">
          We collect personal data from you when you:
          <ul className="list-disc list-inside">
            <li>Visit our website</li>
            <li>Fill out a contact form</li>
            <li>Subscribe to our newsletter</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">How We Use Your Personal Data</h2>
        <p className="mb-8">
          We use your personal data to:
          <ul className="list-disc list-inside">
            <li>Respond to your inquiries</li>
            <li>Provide you with our services</li>
            <li>Improve our website and services</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">
          How We Protect Your Personal Data
        </h2>
        <p className="mb-8">
          We take reasonable measures to protect your personal data from
          unauthorized access, disclosure, alteration, or destruction. We use
          industry-standard security protocols to safeguard your data.
        </p>

        <h2 className="text-2xl font-bold mb-4">Sharing Your Personal Data</h2>
        <p className="mb-8">
          We may share your personal data with:
          <ul className="list-disc list-inside">
            <li>
              Our employees and contractors who need to know the information to
              provide our services
            </li>
            <li>
              Third-party service providers who assist us in providing our
              services
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="mb-8">
          You have the right to:
          <ul className="list-disc list-inside">
            <li>Access your personal data</li>
            <li>Correct or update your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
          </ul>
        </p>

        <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-8">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the updated Privacy Policy on our
          website.
        </p>
      </div>
    </div>
  );
}
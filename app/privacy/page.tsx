import type { NextPage } from "next";
import Head from "next/head";
import { Container, Typography } from "@/components/ui";

const PrivacyPage: NextPage = () => {
  return (
    <>
      <div className="h-24"></div>
      <Head>
        <title>Cyberwizdev Software Solutions | Privacy Policy</title>
      </Head>
      <Container className="py-20">
        <Typography variant="h1" className="mb-4">
          Privacy Policy
        </Typography>
        <Typography variant="body1" className="mb-8">
          At Cyberwizdev Software Solutions, we respect your privacy and are
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and protect your personal data.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Personal Data We Collect
        </Typography>
        <Typography variant="body1" className="mb-8">
          We collect personal data from you when you:
          <ul>
            <li>Visit our website</li>
            <li>Fill out a contact form</li>
            <li>Subscribe to our newsletter</li>
          </ul>
        </Typography>

        <Typography variant="h2" className="mb-4">
          How We Use Your Personal Data
        </Typography>
        <Typography variant="body1" className="mb-8">
          We use your personal data to:
          <ul>
            <li>Respond to your inquiries</li>
            <li>Provide you with our services</li>
            <li>Improve our website and services</li>
          </ul>
        </Typography>

        <Typography variant="h2" className="mb-4">
          How We Protect Your Personal Data
        </Typography>
        <Typography variant="body1" className="mb-8">
          We take reasonable measures to protect your personal data from
          unauthorized access, disclosure, alteration, or destruction. We use
          industry-standard security protocols to safeguard your data.
        </Typography>

        <Typography variant="h2" className="mb-4">
          Sharing Your Personal Data
        </Typography>
        <Typography variant="body1" className="mb-8">
          We may share your personal data with:
          <ul>
            <li>
              Our employees and contractors who need to know the information to
              provide our services
            </li>
            <li>
              Third-party service providers who assist us in providing our
              services
            </li>
          </ul>
        </Typography>

        <Typography variant="h2" className="mb-4">
          Your Rights
        </Typography>
        <Typography variant="body1" className="mb-8">
          You have the right to:
          <ul>
            <li>Access your personal data</li>
            <li>Correct or update your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
          </ul>
        </Typography>

        <Typography variant="h2" className="mb-4">
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" className="mb-8">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the updated Privacy Policy on our
          website.
        </Typography>
      </Container>
    </>
  );
};
export default PrivacyPage;

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms and Conditions | CyberWizDev",
  description:
    "Read the terms and conditions for using CyberWizDev's services. By using our services, you agree to be bound by these terms and conditions.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "legal",
    "software development agreement",
  ],
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions | CyberWizDev",
    description:
      "Read the terms and conditions for using CyberWizDev's services. By using our services, you agree to be bound by these terms and conditions.",
    url: "https://cyberwizdev.com.ng/terms",
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-20 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-8">
          Welcome to Cyberwizdev Software Solutions, a software development
          company that provides various services, including web development,
          mobile app development, and consulting. These Terms and Conditions
          (&ldquo;Terms&ldquo;) govern your use of our services and website.
        </p>
        <h2 className="text-2xl font-bold mb-4">Definitions</h2>
        <p className="mb-8">
          * &ldquo;Services&ldquo; means the software development services
          provided by Cyberwizdev Software Solutions. * &ldquo;Client&ldquo;
          means the individual or organization that engages Cyberwizdev Software
          Solutions to provide Services. * &ldquo;Project&ldquo; means the
          specific software development project undertaken by Cyberwizdev
          Software Solutions for the Client.
        </p>
        <h2 className="text-2xl font-bold mb-4">Scope of Work</h2>
        <p className="mb-8">
          Cyberwizdev Software Solutions will provide the Services as outlined
          in the Project proposal. The Client acknowledges that they have
          reviewed and accepted the Project proposal.
        </p>
        <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
        <p className="mb-8">
          The Client agrees to pay Cyberwizdev Software Solutions the fees
          outlined in the Project proposal. Payment terms are as follows:
          <ul className="list-disc list-inside">
            <li>50% upfront payment</li>
            <li>50% payment upon completion of the Project</li>
          </ul>
        </p>
        <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
        <p className="mb-8">
          Cyberwizdev Software Solutions retains all intellectual property
          rights to the software developed during the Project. The Client is
          granted a non-exclusive license to use the software for their internal
          business purposes.
        </p>
        <h2 className="text-2xl font-bold mb-4">Confidentiality</h2>
        <p className="mb-8">
          Both parties agree to maintain confidentiality and not disclose any
          confidential information related to the Project.
        </p>
        <h2 className="text-2xl font-bold mb-4">Warranty and Liability</h2>
        <p className="mb-8">
          Cyberwizdev Software Solutions warrants that the software developed
          during the Project will be free from defects for a period of 30 days.
          In no event will Cyberwizdev Software Solutions be liable for any
          damages arising from the use of the software.
        </p>
        <h2 className="text-2xl font-bold mb-4">Termination</h2>
        <p className="mb-8">
          Either party may terminate this Agreement upon 30 days&apos; written
          notice to the other party.
        </p>
        <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
        <p className="mb-8">
          This Agreement will be governed by and construed in accordance with
          the laws of Nigeria.
        </p>
      </div>
    </div>
  );
}
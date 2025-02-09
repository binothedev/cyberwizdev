import type { NextPage } from "next";
import Head from "next/head";
import { Container, Typography } from "@/components/ui/index";

const TermsPage: NextPage = () => {
  return (
    <>
      <div className="h-24"></div>
      <Head>
        <title>Cyberwizdev Software Solutions | Terms and Conditions</title>
      </Head>
      <Container className="py-20">
        <Typography variant="h1" className="mb-4">
          Terms and Conditions
        </Typography>
        <Typography variant="body1" className="mb-8">
          Welcome to Cyberwizdev Software Solutions, a software development
          company that provides various services, including web development,
          mobile app development, and consulting. These Terms and Conditions
          (&ldquo;Terms&ldquo;) govern your use of our services and website.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Definitions
        </Typography>
        <Typography variant="body1" className="mb-8">
          * &ldquo;Services&ldquo; means the software development services
          provided by Cyberwizdev Software Solutions. * &ldquo;Client&ldquo;
          means the individual or organization that engages Cyberwizdev Software
          Solutions to provide Services. * &ldquo;Project&ldquo; means the
          specific software development project undertaken by Cyberwizdev
          Software Solutions for the Client.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Scope of Work
        </Typography>
        <Typography variant="body1" className="mb-8">
          Cyberwizdev Software Solutions will provide the Services as outlined
          in the Project proposal. The Client acknowledges that they have
          reviewed and accepted the Project proposal.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Payment Terms
        </Typography>
        <Typography variant="body1" className="mb-8">
          The Client agrees to pay Cyberwizdev Software Solutions the fees
          outlined in the Project proposal. Payment terms are as follows:
          <ul>
            <li>50% upfront payment</li>
            <li>50% payment upon completion of the Project</li>
          </ul>
        </Typography>
        <Typography variant="h2" className="mb-4">
          Intellectual Property
        </Typography>
        <Typography variant="body1" className="mb-8">
          Cyberwizdev Software Solutions retains all intellectual property
          rights to the software developed during the Project. The Client is
          granted a non-exclusive license to use the software for their internal
          business purposes.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Confidentiality
        </Typography>
        <Typography variant="body1" className="mb-8">
          Both parties agree to maintain confidentiality and not disclose any
          confidential information related to the Project.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Warranty and Liability
        </Typography>
        <Typography variant="body1" className="mb-8">
          Cyberwizdev Software Solutions warrants that the software developed
          during the Project will be free from defects for a period of 30 days.
          In no event will Cyberwizdev Software Solutions be liable for any
          damages arising from the use of the software.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Termination
        </Typography>
        <Typography variant="body1" className="mb-8">
          Either party may terminate this Agreement upon 30 days&apos; written
          notice to the other party.
        </Typography>
        <Typography variant="h2" className="mb-4">
          Governing Law
        </Typography>
        <Typography variant="body1" className="mb-8">
          This Agreement will be governed by and construed in accordance with
          the laws of Nigeria.
        </Typography>
      </Container>
    </>
  );
};

export default TermsPage;

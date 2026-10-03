// pages/404.tsx

import Link from "@/components/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-2xl text-foreground">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

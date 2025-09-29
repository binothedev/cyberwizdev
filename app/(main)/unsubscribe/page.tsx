'use client';

import { useEffect, useState, useTransition } from 'react';
import { unsubscribeUser } from './actions';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

// A simple SVG spinner component
function Spinner() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

// A simple SVG checkmark icon
function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
}

// A simple SVG error icon
function ErrorIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}


export default function UnsubscribePage() {
  // --- STATE MANAGEMENT ---
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // --- EFFECTS ---
  // Effect to get email from URL search params on component mount
  useEffect(() => {
    const emailFromParams = searchParams?.get('email');
    if (emailFromParams) {
      setEmail(decodeURIComponent(emailFromParams));
    }
  }, []);


  // --- HANDLERS ---
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || result?.success) return; // Don't submit if no email or already successful

    setResult(null); // Reset previous result

    startTransition(async () => {
      const response = await unsubscribeUser(email);
      setResult(response);
    });
  };

  // --- RENDER ---
  return (
    <div className="flex min-h-screen pt-24 flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Unsubscribe</h1>
          <p className="mt-2 text-muted-foreground">
            We're sorry to see you go.
          </p>
        </div>

        {/* Success State */}
        {result?.success ? (
          <div className="mt-6 flex flex-col items-center justify-center text-center">
             <CheckIcon />
            <p className="mt-4 font-semibold text-foreground">{result.message}</p>
            <p className="mt-2 text-sm text-muted-foreground">You will no longer receive emails at <span className="font-medium text-primary">{email}</span>.</p>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  readOnly
                  value={email}
                  className="relative block w-full appearance-none rounded-md border border-input bg-transparent px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* Error Message */}
              {result && !result.success && (
                  <div className="flex items-center space-x-2 rounded-md border border-destructive/50 bg-destructive/10 p-3">
                    <ErrorIcon />
                    <p className="text-sm font-medium text-destructive">{result.message}</p>
                  </div>
              )}


              <div>
                <Button
                  type="submit"
                  disabled={isPending || !email}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending && <Spinner />}
                  {isPending ? 'Unsubscribing...' : 'Confirm Unsubscribe'}
                </Button>
              </div>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              If you did this by mistake, you can resubscribe at any time from our website.
            </p>
          </>
        )}
      </div>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}


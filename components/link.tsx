'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, MouseEvent } from 'react';
import { useLoading } from './LoadingContext';

interface LinkProps extends Omit<NextLinkProps, 'onClick'> {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

const Link = ({ href, onClick, children, className, ...props }: LinkProps) => {
  const pathname = usePathname();
  const { setLoading } = useLoading();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(event);
    }

    // Don't start loading if the link maps to current pathname
    const targetPath = typeof href === 'string' ? href : href.pathname || '';
    if (targetPath === pathname) {
      return;
    }

    // Don't start loading if default was prevented or if it's an external link
    if (event.defaultPrevented) {
      return;
    }

    // Check if it's an external link
    if (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'))) {
      return;
    }

    // Start loading
    setLoading(true);
  };

  return (
    <NextLink
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface TypographyProps {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
  className?: string;
}

const typographyVariants = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-bold",
  h4: "text-xl font-bold",
  h5: "text-lg font-bold",
  h6: "text-md font-bold",
  body1: "text-lg",
  body2: "text-md",
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
}) => {
  return (
    <p className={`${typographyVariants[variant]} ${className}`}>{children}</p>
  );
};

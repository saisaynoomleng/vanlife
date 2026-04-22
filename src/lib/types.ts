// bounded
export type BoundedProps = {
  as?: React.ElementType;
  isPadded?: boolean;
  children: React.ReactNode;
  className?: string;
};

// CTA
export type CTAProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

// Van Type
export type VanTypeProps = {
  type: 'simple' | 'rugged' | 'luxury';
  className?: string;
  children: React.ReactNode;
};

// Submit Button
export type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

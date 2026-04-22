import { CTAProps } from '@/lib/types';
import clsx from 'clsx';
import Link from 'next/link';

const CTA = ({ className, href, children }: CTAProps) => {
  return (
    <Link
      href={href}
      className={clsx('font-semibold text-center rounded-sm', className)}
    >
      {children}
    </Link>
  );
};

export default CTA;

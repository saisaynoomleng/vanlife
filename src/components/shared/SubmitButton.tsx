'use client';

import { useFormStatus } from 'react-dom';

import { SubmitButtonProps } from '@/lib/types';
import clsx from 'clsx';
import { Button } from '../ui/button';

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant="submit" className={clsx('', className)}>
      {pending ? 'submitting' : children}
    </Button>
  );
};

export default SubmitButton;

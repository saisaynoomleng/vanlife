'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const { signIn } = useSignIn();
  return <div>SignInPage</div>;
};

export default SignInPage;

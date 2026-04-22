import { BoundedProps } from '@/lib/types';
import clsx from 'clsx';

const Bounded = ({
  children,
  as: Comp = 'section',
  className,
  isPadded = true,
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'py-3 md:py-5 min-h-screen space-y-5 md:space-y-8 lg:space-y-12',
        isPadded && 'px-5 md:px-8',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;

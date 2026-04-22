import { VanTypeProps } from '@/lib/types';
import clsx from 'clsx';

const VanType = ({ children, type, className }: VanTypeProps) => {
  const colors = {
    simple: '#e17654',
    rugged: '#115e59',
    luxury: '#161616',
  };

  return (
    <div
      data-testid="van-type"
      className={clsx('rounded-sm px-2 py-1', className)}
      style={{ backgroundColor: colors[type] }}
    >
      {children}
    </div>
  );
};

export default VanType;

import { cn } from '../../lib/cn';
import { statusColor } from '../../lib/formatters';
import { STATUS } from '../../types';

type StatusBadgeProps = {
  status: STATUS;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white',
        statusColor[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

import type { ReactNode } from 'react';

type MessageVariant = 'info' | 'warning' | 'danger';

type DisplayMessageProps = {
  title: string;
  description?: string;
  variant?: MessageVariant;
  action?: ReactNode;
  className?: string;
};

const variants: Record<MessageVariant, string> = {
  info: ['border-blue-200', 'bg-blue-50', 'text-blue-900'].join(' '),
  warning: ['border-yellow-200', 'bg-yellow-50', 'text-yellow-900'].join(' '),
  danger: ['border-red-200', 'bg-red-50', 'text-red-900'].join(' '),
};

export function DisplayMessage({
  title,
  description,
  variant = 'info',
  action,
  className = '',
}: DisplayMessageProps) {
  return (
    <section
      role="status"
      className={[
        'flex',
        'min-h-[240px]',
        'flex-col',
        'items-center',
        'justify-center',
        'rounded-2xl',
        'border',
        'p-8',
        'text-center',
        variants[variant],
        className,
      ].join(' ')}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? <p className="mt-2 max-w-md text-sm opacity-80">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}

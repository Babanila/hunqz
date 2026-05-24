import type { ReactNode } from 'react';

export function InfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <span className="text-sm text-gray-500">{label}</span>: &nbsp;
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

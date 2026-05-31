import Link from 'next/link';
import type { ComponentProps } from 'react';

type NextLinkProps = ComponentProps<typeof Link>;

export function NextLink({ children, ...props }: NextLinkProps) {
  return <Link {...props}>{children}</Link>;
}

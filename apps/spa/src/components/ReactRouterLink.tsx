import { Link } from 'react-router-dom';

export function ReactRouterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

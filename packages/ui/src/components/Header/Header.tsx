import type { SharedLinkComponent } from '../../types';

type NavItem = {
  href: string;
  label: string;
};

type HeaderProps = {
  title: string;
  LinkComponent: SharedLinkComponent;
  navItems?: NavItem[];
};

export function Header({ title, LinkComponent, navItems = [] }: HeaderProps) {
  return (
    <header className="border-b bg-black text-[#00bdff]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <LinkComponent href="/" className="text-xl font-bold">
          {title}
        </LinkComponent>

        <nav>
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <LinkComponent href={item.href} className="text-sm">
                  {item.label}
                </LinkComponent>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

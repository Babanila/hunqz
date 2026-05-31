'use client';

import { Input } from '@repo/ui/client';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';

type ProfileSearchProps = {
  defaultValue: string;
};

export function ProfileSearch({ defaultValue }: ProfileSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(defaultValue);
  const [, startTransition] = useTransition();
  const debouncedValue = useDebounce(value.trim(), 500);

  // Sync input if URL changes externally
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (debouncedValue === defaultValue.trim()) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set('q', debouncedValue);
    } else {
      params.delete('q');
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextUrl === currentUrl) return;

    startTransition(() => {
      router.replace(nextUrl, {
        scroll: false,
      });
    });
  }, [debouncedValue, defaultValue, pathname, router, searchParams]);

  return (
    <div className="mb-8">
      <Input
        label="Search Profile"
        placeholder="Enter username"
        value={value}
        rightIcon={<SearchIcon size={18} />}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

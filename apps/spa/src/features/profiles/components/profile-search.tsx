import { Input } from '@repo/ui';
import { SearchIcon } from 'lucide-react';

type ProfileSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ProfileSearch({ value, onChange }: ProfileSearchProps) {
  return (
    <Input
      label="Search Profile"
      placeholder="Enter username"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rightIcon={<SearchIcon size={16} />}
    />
  );
}

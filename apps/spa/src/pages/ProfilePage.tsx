import { ProfileContent } from '../features/profiles/components/profile-content';
import { ProfileSearch } from '../features/profiles/components/profile-search';
import { useDebounce } from '../features/profiles/hooks/use-debounce';
import { useProfileSearchParam } from '../features/profiles/hooks/use-search-param';

export function ProfilePage() {
  const { search, setSearch } = useProfileSearchParam();
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="flex h-auto flex-col items-center justify-center space-y-6 p-6">
      <ProfileSearch value={search} onChange={setSearch} />
      <ProfileContent username={debouncedSearch} />
    </div>
  );
}

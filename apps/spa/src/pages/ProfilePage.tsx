import { ProfileContent } from '../features/profiles/components/profile-content';
import { ProfileSearch } from '../features/profiles/components/profile-search';
import { useDebounce } from '../features/profiles/hooks/use-debounce';
import { useProfileSearchParam } from '../features/profiles/hooks/use-search-param';

export function ProfilePage() {
  const { search, setSearch } = useProfileSearchParam();
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="h-auto flex flex-col items-center justify-center p-6">
      <ProfileSearch value={search} onChange={setSearch} />
      <ProfileContent username={debouncedSearch} />
    </div>
  );
}

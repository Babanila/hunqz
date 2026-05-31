import { useSearchParams } from 'react-router-dom';

export function useProfileSearchParam() {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') ?? '';

  const setSearch = (value: string) => {
    const next = new URLSearchParams(params);

    if (!value.trim()) {
      next.delete('search');
    } else {
      next.set('search', value);
    }

    setParams(next);
  };

  return { search, setSearch };
}

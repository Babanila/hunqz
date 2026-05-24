import { render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import type { ProfileData, SharedImageProps } from '../../types';

import { ProfileGrid } from './ProfileGrid';

const { ProfileCardMock } = vi.hoisted(() => ({
  ProfileCardMock: vi.fn(),
}));

vi.mock('./ProfileCard', () => ({
  ProfileCard: (props: unknown) => {
    ProfileCardMock(props);
    return <div data-testid="profile-card" />;
  },
}));

const ImageComponent: ComponentType<SharedImageProps> = (_props) => (
  <img alt="mock-image" />
);

const profiles = [
  { id: '1', name: 'Ada Lovelace' } as ProfileData,
  { id: '2', name: 'Grace Hopper' } as ProfileData,
];

describe('ProfileGrid', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the grid container', () => {
    const { container } = render(
      <ProfileGrid profiles={[]} ImageComponent={ImageComponent} />,
    );

    const grid = container.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('renders one ProfileCard per profile and uses the default loadingType', () => {
    render(<ProfileGrid profiles={profiles} ImageComponent={ImageComponent} />);

    expect(screen.getAllByTestId('profile-card')).toHaveLength(2);
    expect(ProfileCardMock).toHaveBeenCalledTimes(2);

    expect(ProfileCardMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        profile: profiles[0],
        loadingType: 'lazy',
        ImageComponent,
      }),
    );

    expect(ProfileCardMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        profile: profiles[1],
        loadingType: 'lazy',
        ImageComponent,
      }),
    );
  });

  it('forwards a custom loadingType to each ProfileCard', () => {
    render(
      <ProfileGrid
        profiles={profiles}
        loadingType="eager"
        ImageComponent={ImageComponent}
      />,
    );

    expect(ProfileCardMock).toHaveBeenCalledTimes(2);

    expect(ProfileCardMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        profile: profiles[0],
        loadingType: 'eager',
        ImageComponent,
      }),
    );

    expect(ProfileCardMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        profile: profiles[1],
        loadingType: 'eager',
        ImageComponent,
      }),
    );
  });

  it('renders no ProfileCard when profiles is empty', () => {
    render(<ProfileGrid profiles={[]} ImageComponent={ImageComponent} />);

    expect(screen.queryAllByTestId('profile-card')).toHaveLength(0);
    expect(ProfileCardMock).not.toHaveBeenCalled();
  });
});

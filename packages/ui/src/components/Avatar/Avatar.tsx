import { cn } from '../../lib/cn';
import type { SharedImageComponent, LoadingType } from '../../types';
import { HtmlImage } from '../Image/html-image';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
  srcToken: string;
  alt: string;
  size?: AvatarSize;
  loadingType?: LoadingType;
  priority?: boolean;
  className?: string;
  ImageComponent?: SharedImageComponent;
  getImageUrlPath: (token: string) => string;
};

const avatarPixels: Record<AvatarSize, number> = {
  sm: 40,
  md: 64,
  lg: 96,
};

export function Avatar({
  srcToken,
  alt,
  size = 'md',
  loadingType = 'lazy',
  priority = false,
  className,
  ImageComponent = HtmlImage,
  getImageUrlPath,
}: AvatarProps) {
  const dimension = avatarPixels[size];
  const src = getImageUrlPath(srcToken);

  return (
    <ImageComponent
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      loading={priority ? 'eager' : loadingType}
      priority={priority}
      className={cn('rounded-full object-cover', className)}
    />
  );
}

import type { SharedImageProps } from '@repo/ui/client';
import Image from 'next/image';

export function NextImage({
  src,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
  priority = false,
  sizes,
}: SharedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : loading}
      sizes={sizes}
    />
  );
}

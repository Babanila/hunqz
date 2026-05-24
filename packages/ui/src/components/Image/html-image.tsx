import type { SharedImageProps } from '../../types';

export function HtmlImage({
  src,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
}: SharedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
}

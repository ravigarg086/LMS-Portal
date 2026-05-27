import { useMemo } from 'react';
import { buildGalleryItems } from '../utils/buildGalleryItems';

export function usePhotoGallery() {
  const items = useMemo(() => buildGalleryItems(), []);
  const stacks = useMemo(
    () => [...new Set(items.map((item) => item.stack))],
    [items],
  );

  return { items, stacks };
}

---
description: Implement Photo Gallery with dynamic course items and Lightbox modal
globs: client/src/modules/photo-gallery/**/*
alwaysApply: false
---

# Technical Skills: Photo Gallery

## 1. Build Gallery Items Dynamically
Derive items from `courseStacks` and `popularCoursePlaceholders`:

```js
export function buildGalleryItems() {
  // Map each stack course to { id, title, stack, imageUrl, alt }
}
```

## 2. Lightbox Modal
- State: `activeIndex` (null = closed).
- Overlay click and Escape close the modal.
- Arrow buttons cycle `(index ± 1) % items.length`.
- Add `useBodyScrollLock(isOpen)` while lightbox is open.

## 3. Page Shell
Mirror External Data / FAQ:

```js
<DashboardShell activeId="photo-gallery" pageClassName="photo-gallery-page" mainClassName="photo-gallery-page__main">
  <RevealUp><PhotoGalleryGrid items={items} /></RevealUp>
</DashboardShell>
```

## 4. Routing & Navigation
- Route: `/photo-gallery` → `PhotoGalleryPage`
- Sidebar: `{ id: 'photo-gallery', href: '/photo-gallery', icon: 'image' }`

## 5. Tests
Assert gallery heading renders, at least one course thumbnail appears, and lightbox opens on click.

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds, offset = 140) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const onScroll = () => {
      const scrollPosition = window.scrollY + offset;
      let current = sectionIds[0];

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          current = section.id;
        }
      });

      setActiveSectionId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return activeSectionId;
}

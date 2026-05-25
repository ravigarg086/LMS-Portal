import { useCallback, useState } from 'react';
import { useBodyScrollLock } from '../../modules/home/hooks/useBodyScrollLock';
import { useEscapeKey } from '../../modules/home/hooks/useEscapeKey';

export function useSidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const toggleSidebar = useCallback(
    () => setSidebarOpen((open) => !open),
    [],
  );

  useBodyScrollLock(sidebarOpen);
  useEscapeKey(sidebarOpen, closeSidebar);

  return {
    sidebarOpen,
    closeSidebar,
    openSidebar,
    toggleSidebar,
  };
}

import constate from 'constate';
import { useState } from 'react';

const useLayoutHook = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
  };
};

const [LayoutProvider, useLayout] = constate(useLayoutHook);

export { LayoutProvider, useLayout };

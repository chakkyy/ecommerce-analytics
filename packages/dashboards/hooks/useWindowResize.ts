import { useEffect, useState } from 'react';

const useWindowResize = () => {
  const [isSmScreen, setIsSmScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmScreen(window.innerWidth <= 728);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isSmScreen };
};

export default useWindowResize;

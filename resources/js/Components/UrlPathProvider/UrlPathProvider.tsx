import UrlPathContext from '@/contexts/UrlPathContext';
import type { ReactNode } from 'react';

type UrlPathProviderProps = {
  pathname: string;
  children: ReactNode;
};

export function UrlPathProvider({ pathname, children }: UrlPathProviderProps) {
  return (
    <UrlPathContext.Provider value={pathname}>
      {children}
    </UrlPathContext.Provider>
  );
}

export default UrlPathProvider;

import { useIsMobile } from '../../hooks/useIsMobile';

export const PCOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  return isMobile ? null : <>{children}</>;
};

export const MobileOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
};
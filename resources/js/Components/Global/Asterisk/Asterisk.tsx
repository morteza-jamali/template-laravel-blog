import { Group } from '@mantine/core';
import { type ReactNode } from 'react';

export interface AsteriskProps {
  children: ReactNode;
}

export const Asterisk = ({ children }: AsteriskProps) => {
  return (
    <Group gap={5}>
      {children}
      <div style={{ color: 'var(--mantine-color-error)' }}>*</div>
    </Group>
  );
};

export default Asterisk;

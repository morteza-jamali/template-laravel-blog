import { Group, Popover, ActionIcon, Text } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';

import type { ReactNode } from 'react';

import classes from './InputLabelWithHelp.module.css';

type InputLabelWithHelpProps = {
  label: string;
  help: ReactNode;
  icon?: ReactNode;
  width?: number;
};

export const InputLabelWithHelp = ({
  help,
  label,
  icon,
  width,
}: InputLabelWithHelpProps) => {
  const isHelpString: boolean = typeof help === 'string';

  return (
    <Group gap={0}>
      {label}
      <Popover withArrow shadow="md" width={width ?? 300}>
        <Popover.Target>
          <ActionIcon variant="transparent" radius="xl" aria-label="Help">
            {icon ?? (
              <IconHelp style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown className={classes.dropdown}>
          {isHelpString ? <Text size="xs">{help}</Text> : help}
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default InputLabelWithHelp;

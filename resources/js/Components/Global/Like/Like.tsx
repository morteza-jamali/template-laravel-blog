import { Badge } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';

export interface LikeProps {
  value: number;
  onClick: (value: number) => void;
  liked?: boolean;
}

export const Like = ({ value, onClick, liked }: LikeProps) => {
  const [checked, setChecked] = useState<boolean>(liked ?? false);
  const [_value, setValue] = useState<number>(value);

  return (
    <Badge
      variant="transparent"
      color="pink"
      leftSection={
        checked ? <IconHeartFilled size={18} /> : <IconHeart size={18} />
      }
      size="lg"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        const new_value = checked ? _value - 1 : _value + 1;

        setChecked(!checked);
        setValue(new_value);
        onClick(new_value);
      }}
    >
      {_value}
    </Badge>
  );
};

export default Like;

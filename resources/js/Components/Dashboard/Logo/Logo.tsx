import classes from './Logo.module.css';
import {
  Group,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { Link } from '@inertiajs/react';

type LogoProps = {
  href?: string;
} & UnstyledButtonProps;

const Logo = ({ href, ...others }: LogoProps) => {
  return (
    <UnstyledButton
      className={classes.logo}
      component={Link}
      href={href || '/'}
      {...others}
    >
      <Group gap="xs">
        <img
          src="https://mantine-analytics-dashboard.netlify.app/_next/image?url=%2Flogo-no-background.png&w=48&q=75"
          alt=""
          height={24}
          width={24}
        />
        <Text fw={700}>Mantine admin</Text>
      </Group>
    </UnstyledButton>
  );
};

export default Logo;

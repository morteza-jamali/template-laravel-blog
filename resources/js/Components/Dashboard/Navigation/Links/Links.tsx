import { useEffect, useState, useContext } from 'react';
import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { router } from '@inertiajs/react';
// import { usePathname, useRouter } from 'next/navigation';
import * as _ from 'lodash';
import UrlPathContext from '@/contexts/UrlPathContext';
import classes from './Links.module.css';

interface LinksGroupProps {
  icon?: any;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: {
    label: string;
    link: string;
  }[];
  closeSidebar: () => void;
}

export function LinksGroup(props: LinksGroupProps) {
  const {
    icon: Icon,
    label,
    initiallyOpened,
    link,
    links,
    closeSidebar,
  } = props;
  // const router = useRouter();
  const pathname = useContext(UrlPathContext);
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [currentPath, setCurrentPath] = useState<string | undefined>();
  const ChevronIcon = IconChevronRight;

  console.log(pathname);

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="button"
      className={classes.link}
      onClick={() => {
        router.get(link.link);
        closeSidebar();
      }}
      key={link.label}
      data-active={link.link.toLowerCase() === pathname || undefined}
    >
      {link.label}
    </Text>
  ));

  useEffect(() => {
    const paths = pathname.split('/');
    setOpened(paths.includes(label.toLowerCase()));
    setCurrentPath((_.last(paths) as any)?.toLowerCase() || undefined);
  }, [pathname, label]);

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened((o) => !o);
          link && router.get(link || '#');
          closeSidebar();
        }}
        className={classes.control}
        data-active={opened || undefined}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Icon size={18} />
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(90deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

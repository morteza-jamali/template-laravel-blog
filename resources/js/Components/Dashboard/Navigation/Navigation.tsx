import { ActionIcon, Box, Flex, Group, ScrollArea, Text } from '@mantine/core';
import {
  IconX,
  IconPin,
  IconLayoutBoard,
  IconCategory,
  IconTags,
} from '@tabler/icons-react';
import { Logo, UserProfileButton } from '@/Components/Dashboard';
import UserProfileData from '@/mocks/UserProfile.json';
import { useMediaQuery } from '@mantine/hooks';
import { LinksGroup } from '@/Components/Dashboard/Navigation/Links/Links';
import { ROUTES } from '@/routes';
import classes from './Navigation.module.css';

const mockdata = [
  {
    title: null,
    links: [
      {
        label: 'Home',
        icon: IconLayoutBoard,
        link: ROUTES.DASHBOARD.HOME,
      },
      {
        label: 'Posts',
        icon: IconPin,
        links: [
          {
            label: 'Show All',
            link: ROUTES.DASHBOARD.POST.ALL,
          },
          {
            label: 'Add New',
            link: ROUTES.DASHBOARD.POST.NEW,
          },
        ],
      },
      {
        label: 'Categories',
        icon: IconCategory,
        links: [
          {
            label: 'Show All',
            link: ROUTES.DASHBOARD.CATEGORY.ALL,
          },
          {
            label: 'Add New',
            link: ROUTES.DASHBOARD.CATEGORY.NEW,
          },
        ],
      },
      {
        label: 'Tags',
        icon: IconTags,
        links: [
          {
            label: 'Show All',
            link: ROUTES.DASHBOARD.TAG.ALL,
          },
          {
            label: 'Add New',
            link: ROUTES.DASHBOARD.TAG.NEW,
          },
        ],
      },
    ],
  },
];

type NavigationProps = {
  onClose: () => void;
};

const Navigation = ({ onClose }: NavigationProps) => {
  const tablet_match = useMediaQuery('(max-width: 768px)');

  const links = mockdata.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text
        tt="uppercase"
        size="xs"
        pl="md"
        fw={500}
        mb="sm"
        className={classes.linkHeader}
      >
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup
          key={item.label}
          {...item}
          closeSidebar={() => {
            setTimeout(() => {
              onClose();
            }, 250);
          }}
        />
      ))}
    </Box>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group
            justify="space-between"
            style={{ flex: tablet_match ? 'auto' : 1 }}
          >
            <Logo className={classes.logo} />
          </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserProfileButton
          email={UserProfileData.email}
          image={UserProfileData.avatar}
          name={UserProfileData.name}
        />
      </div>
    </nav>
  );
};

export default Navigation;

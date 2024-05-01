import { ActionIcon, Box, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { IconX, IconPin, IconLayoutBoard } from '@tabler/icons-react';
import { Head } from '@inertiajs/react';
import { Logo, UserProfileButton } from '@/Components/Dashboard';
import UserProfileData from '@/mocks/UserProfile.json';
import { useMediaQuery } from '@mantine/hooks';
import { LinksGroup } from '@/Components/Dashboard/Navigation/Links/Links';
import classes from './Navigation.module.css';

const mockdata = [
  {
    title: null,
    links: [
      {
        label: 'Home',
        icon: IconLayoutBoard,
        link: '/dashboard',
      },
      {
        label: 'Posts',
        icon: IconPin,
        links: [
          {
            label: 'All Posts',
            link: '/dashboard/post/all',
          },
          {
            label: 'Add New',
            link: '/dashboard/post/new',
          },
          {
            label: 'Categories',
            link: '/dashboard/post/category',
          },
          {
            label: 'Tags',
            link: '/dashboard/post/tag',
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
    <>
      <Head title="Posts" />
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
    </>
  );
};

export default Navigation;

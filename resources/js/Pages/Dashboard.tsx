import { Head } from '@inertiajs/react';
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconLicense, IconPencilPlus, IconList } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { NavBar } from '@/Components/Dashboard/NavBar';

export default function Dashboard() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <Head title="Dashboard" />
      <AppShell
        header={{ height: { base: 60, md: 70, lg: 80 } }}
        navbar={{
          width: { base: 300, md: 300, lg: 300 },
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <MantineLogo size={30} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <NavBar />
        </AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </>
  );
}

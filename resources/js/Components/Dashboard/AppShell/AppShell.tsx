import {
  AppShell as MAppShell,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import type { ReactNode } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  HeaderNav,
  AppMain,
  Navigation,
  FooterNav,
} from '@/Components/Dashboard';

type Props = {
  children: ReactNode;
};

function AppShell({ children }: Props) {
  const theme = useMantineTheme();
  const tablet_match = useMediaQuery('(max-width: 768px)');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MAppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={0}
    >
      <MAppShell.Header
        style={{
          height: rem(60),
          border: 'none',
          boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
        }}
      >
        <Container fluid py="sm" px="lg">
          <HeaderNav
            desktopOpened={desktopOpened}
            mobileOpened={mobileOpened}
            toggleDesktop={toggleDesktop}
            toggleMobile={toggleMobile}
          />
        </Container>
      </MAppShell.Header>
      <MAppShell.Navbar>
        <Navigation onClose={toggleMobile} />
      </MAppShell.Navbar>
      <MAppShell.Main>
        <AppMain>{children}</AppMain>
      </MAppShell.Main>
      <MAppShell.Footer p="md">
        <Container fluid px="lg">
          <FooterNav />
        </Container>
      </MAppShell.Footer>
    </MAppShell>
  );
}

export default AppShell;

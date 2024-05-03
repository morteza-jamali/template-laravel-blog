import {
  Breadcrumbs,
  BreadcrumbsProps,
  Divider,
  Flex,
  Paper,
  PaperProps,
  rem,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Surface } from '@/Components/Dashboard';
import { useColorScheme } from '@mantine/hooks';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  breadcrumbItems?: any;
  rightSection?: ReactNode;
} & PaperProps;

const PageHeader = (props: PageHeaderProps) => {
  const { rightSection, breadcrumbItems, title, ...others } = props;
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();

  const BREADCRUMBS_PROPS: Omit<BreadcrumbsProps, 'children'> = {
    style: {
      a: {
        padding: rem(8),
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: colorScheme === 'dark' ? theme.white : theme.black,

        '&:hover': {
          transition: 'all ease 150ms',
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
          textDecoration: 'none',
        },
      },
    },
  };

  return (
    <>
      <Surface
        component={Paper}
        style={{ backgroundColor: 'transparent' }}
        {...others}
      >
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: 'row', sm: 'row' }}
          gap={{ base: 'sm', sm: 4 }}
        >
          <Stack>
            <Title order={3}>{title}</Title>
            <Breadcrumbs {...BREADCRUMBS_PROPS}>{breadcrumbItems}</Breadcrumbs>
          </Stack>
          {rightSection}
        </Flex>
      </Surface>
      <Divider />
    </>
  );
};

export default PageHeader;

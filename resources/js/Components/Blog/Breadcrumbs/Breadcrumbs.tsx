import {
  Breadcrumbs as _Breadcrumbs,
  Anchor,
  Text,
  type BreadcrumbsProps as _BreadcrumbsProps,
} from '@mantine/core';

export interface Breadcrumb {
  title: string;
  href?: string;
}
export interface BreadcrumbsProps extends Omit<_BreadcrumbsProps, 'children'> {
  items: Array<Breadcrumb>;
}

export function Breadcrumbs({ items, ...rest }: BreadcrumbsProps) {
  return (
    <_Breadcrumbs {...rest}>
      {items.map((item, index) => {
        if (index + 1 === items.length) {
          return <Text key={index}>{item.title}</Text>;
        }

        return (
          <Anchor href={item.href} key={index}>
            {item.title}
          </Anchor>
        );
      })}
    </_Breadcrumbs>
  );
}

export default Breadcrumbs;

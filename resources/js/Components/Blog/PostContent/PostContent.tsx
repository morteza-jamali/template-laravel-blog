import { TypographyStylesProvider } from '@mantine/core';
import classes from './PostContent.module.css';

export interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <TypographyStylesProvider className={classes.content}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </TypographyStylesProvider>
  );
}

export default PostContent;

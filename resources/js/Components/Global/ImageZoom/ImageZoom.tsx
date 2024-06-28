import { type ImageProps, Modal, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export interface ImageZoomModalProps {
  src: ImageProps['src'];
  disclosure: ReturnType<typeof useDisclosure>;
}

export const ImageZoom = ({ src, disclosure }: ImageZoomModalProps) => {
  const [opened, { close }] = disclosure;

  return (
    <Modal centered closeOnClickOutside={false} onClose={close} opened={opened}>
      <Image src={src} fit="fill" />
    </Modal>
  );
};

export default ImageZoom;

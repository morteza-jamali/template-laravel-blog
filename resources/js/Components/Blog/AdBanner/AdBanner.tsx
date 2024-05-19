export interface AdBannerProps {
  src?: string;
  type: 'V1' | 'H1';
}

export function AdBanner({ type, src }: AdBannerProps) {
  const IMAGES_PATH = '/images';
  let new_src = src;

  if (!new_src) {
    switch (type) {
      case 'H1':
        new_src = `${IMAGES_PATH}/clientbanner.jpg`;

        break;
      case 'V1':
        new_src = `${IMAGES_PATH}/clientbanner2.jpg`;

        break;
    }
  }

  return <img src={new_src} />;
}

export default AdBanner;

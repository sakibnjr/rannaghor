export interface HeroSlide {
  id: string;
  badge: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  image: {
    src: string;
    alt: string;
  };
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  highlight: {
    value: string;
    label: string;
    showStar?: boolean;
  };
  note: string;
}

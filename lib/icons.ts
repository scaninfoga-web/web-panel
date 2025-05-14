import { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  IconRadar2,
  IconShieldCheck,
  IconBug,
  IconCloudLock,
  IconProps,
  Icon,
} from '@tabler/icons-react';

export const iconMap = new Map<
  string,
  ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
>([['IconRadar2', IconRadar2]]);

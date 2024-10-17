import { memo, type FC } from 'react';

import { Icon } from '../icon';
import type { IconProps, IconObject } from '../icon';

const icon: IconObject = {
  '--icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1l-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4'/%3E%3C/svg%3E")`,
};

export const RightOutline: FC<IconProps> = memo(({ className, style }) => (
  <Icon style={style} className={className} icon={icon} />
));

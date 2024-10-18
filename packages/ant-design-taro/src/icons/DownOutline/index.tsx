import { memo, type FC } from 'react';

import { Icon } from '../icon';
import type { IconProps, IconObject } from '../icon';

const icon: IconObject = {
  '--icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2L227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7'/%3E%3C/svg%3E")`,
};

export const DownOutline: FC<IconProps> = memo(({ className, style }) => (
  <Icon style={style} className={className} icon={icon} />
));

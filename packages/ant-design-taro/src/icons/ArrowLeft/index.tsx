import { memo, type FC } from 'react'

import { Icon } from '../icon'
import type { IconProps, IconObject } from '../icon'

const icon: IconObject = {
  '--icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z'/%3E%3C/svg%3E")`,
}

export const ArrowLeft: FC<IconProps> = memo(({ className, style }) => (
  <Icon style={style} className={className} icon={icon} />
))

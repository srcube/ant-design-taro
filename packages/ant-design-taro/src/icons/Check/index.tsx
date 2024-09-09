import type { FC } from 'react'

import { Icon } from '../icon'
import type { IconProps, IconObject } from '../icon'

const icon: IconObject = {
  '--icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8'/%3E%3C/svg%3E")`,
}

export const Check: FC<IconProps> = ({ className, style }) => (
  <Icon style={style} className={className} icon={icon} />
)

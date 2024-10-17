import { memo, type FC } from 'react'

import { Icon } from '../icon'
import type { IconProps, IconObject } from '../icon'

const svg = `<svg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path d='M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z' fill='#DBDBDB' fillRule='nonzero'/></svg>`

const icon: IconObject = {
  '--icon': `url("data:image/svg+xml,${encodeURIComponent(svg)}`,
}

export const Image: FC<IconProps> = memo(({ className, style }) => (
  <Icon style={style} className={className} icon={icon} />
))

import type { CSSProperties, FC } from 'react'
import { Text } from '@tarojs/components'

import cn from 'classnames'

import './icon.less'

export type IconProps = {
  style?: CSSProperties
  className?: string
}

export type IconObject = Record<'--icon', string>

export const Icon: FC<IconProps & { icon: IconObject }> = ({
  icon,
  className,
  style,
}) => {
  if (typeof style === 'string') {
    const obj = JSON.parse(style)

    return (
      <Text className={cn('adt-icon', className)} style={{ ...obj, ...icon }} />
    )
  }

  return (
    <Text className={cn('adt-icon', className)} style={{ ...style, ...icon }} />
  )
}

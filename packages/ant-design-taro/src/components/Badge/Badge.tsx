import { Fragment, PropsWithChildren } from 'react'
import type { FC, ReactNode, CSSProperties } from 'react'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adt-badge`

export const dot = <Fragment />

export type BadgeProps = {
  content?: ReactNode | typeof dot
  color?: string
  bordered?: boolean
  wrapperStyle?: CSSProperties
  wrapperClassName?: string
  children?: ReactNode
} & NativeProps<'--right' | '--top' | '--color'>

export const Badge: FC<BadgeProps> = (props) => {
  const { content, color, children } = props

  const isDot = content === dot

  const badgeClass = cn(classPrefix, {
    [`${classPrefix}-fixed`]: !!children,
    [`${classPrefix}-dot`]: isDot,
    [`${classPrefix}-bordered`]: props.bordered,
  })

  const style = { '--color': color ?? '' } as BadgeProps['style']

  const element =
    content || content === 0
      ? withNativeProps(
          props,
          <View className={badgeClass} style={style}>
            {!isDot && (
              <View className={`${classPrefix}-content`}>{content}</View>
            )}
          </View>,
        )
      : null

  return children ? (
    <View
      className={cn(`${classPrefix}-wrapper`, props.wrapperClassName)}
      style={props.wrapperStyle}
    >
      {children}
      {element}
    </View>
  ) : (
    element
  )
}

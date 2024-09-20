import type { FC, CSSProperties, ReactNode } from 'react'
import { View } from '@tarojs/components'
import type { ITouchEvent } from '@tarojs/components'

import cn from 'classnames'

import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adt-tag`

const colorRecord: Record<string, string> = {
  default: 'var(--adt-color-text-secondary, #666666)',
  primary: 'var(--adt-color-primary, #1677ff)',
  success: 'var(--adt-color-success, #00b578)',
  warning: 'var(--adt-color-warning, #ff8f1f)',
  danger: 'var(--adt-color-danger, #ff3141)',
}

export type TagProps = {
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | (string & {})
  fill?: 'solid' | 'outline'
  round?: boolean
  onClick?: (e: ITouchEvent) => void
  children?: ReactNode
} & NativeProps<
  '--border-color' | '--background-color' | '--text-color' | '--border-radius'
>

const defaultProps = {
  color: 'default',
  fill: 'solid',
  round: false,
}

export const Tag: FC<TagProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const color = colorRecord[props.color] ?? props.color

  const style: CSSProperties & {
    '--border-color': string
    '--text-color': string
    '--background-color': string
  } = {
    '--border-color': color,
    '--text-color': props.fill === 'outline' ? color : '#ffffff',
    '--background-color': props.fill === 'outline' ? 'transparent' : color,
  }
  return withNativeProps(
    props,
    <View
      style={style}
      onClick={props.onClick}
      className={cn(classPrefix, {
        [`${classPrefix}-round`]: props.round,
      })}
    >
      {props.children}
    </View>,
  )
}

import type { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react'
import { BaseEventOrig, ITouchEvent, View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adt-card`

export type CardProps = PropsWithChildren<
  {
    title?: ReactNode
    icon?: ReactNode
    extra?: ReactNode
    headerStyle?: CSSProperties
    headerClassName?: string
    bodyStyle?: CSSProperties
    bodyClassName?: string
    onClick?: (event: ITouchEvent) => void
    onBodyClick?: (event: ITouchEvent) => void
    onHeaderClick?: (event: ITouchEvent) => void
  } & NativeProps
>

export const Card: FC<CardProps> = (props) => {
  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null
    }
    return (
      <View
        className={cn(`${classPrefix}-header`, props.headerClassName)}
        style={props.headerStyle}
        onClick={props.onHeaderClick}
      >
        {props.icon && (
          <View className={`${classPrefix}-header-icon`}>{props.icon}</View>
        )}
        <View className={`${classPrefix}-header-title`}>{props.title}</View>
        {props.extra && (
          <View className={`${classPrefix}-header-extra`}>{props.extra}</View>
        )}
      </View>
    )
  }

  const renderBody = () => {
    if (!props.children) {
      return null
    }
    return (
      <View
        className={cn(`${classPrefix}-body`, props.bodyClassName)}
        style={props.bodyStyle}
        onClick={props.onBodyClick}
      >
        {props.children}
      </View>
    )
  }

  return withNativeProps(
    props,
    <View className={classPrefix} onClick={props.onClick}>
      {renderHeader()}
      {renderBody()}
    </View>,
  )
}

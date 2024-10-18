import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ReactNode } from 'react'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adt-list`

export type ListProps = {
  header?: ReactNode
  mode?: 'default' | 'card' // 默认是整宽的列表，card 模式下展示为带 margin 和圆角的卡片
  children?: ReactNode
} & NativeProps<
  | '--active-background-color'
  | '--align-items'
  | '--border-bottom'
  | '--border-inner'
  | '--border-top'
  | '--extra-max-width'
  | '--font-size'
  | '--header-font-size'
  | '--padding-left'
  | '--padding-right'
  | '--prefix-padding-right'
  | '--prefix-width'
>

const defaultProps = {
  mode: 'default',
}

export type ListRef = {
  nativeElement: HTMLDivElement | null
}

export const List = forwardRef<ListRef, ListProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const nativeElementRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeElementRef.current
    },
  }))

  return withNativeProps(
    props,
    <View
      className={cn(classPrefix, `${classPrefix}-${props.mode}`)}
      ref={nativeElementRef}
    >
      {props.header && (
        <View className={`${classPrefix}-header`}>{props.header}</View>
      )}
      <View className={`${classPrefix}-body`}>
        <View className={`${classPrefix}-body-inner`}>{props.children}</View>
      </View>
    </View>,
  )
})

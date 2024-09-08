import type { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adt-divider`

export type DividerProps = {
  contentPosition?: 'left' | 'right' | 'center'
  direction?: 'horizontal' | 'vertical'
  children?: ReactNode
} & NativeProps

const defaultProps = {
  contentPosition: 'center',
  direction: 'horizontal',
}

export const Divider: FC<DividerProps> = (p) => {
  const props = mergeProps(defaultProps, p)

  return withNativeProps(
    props,
    <View
      className={cn(
        classPrefix,
        `${classPrefix}-${props.direction}`,
        `${classPrefix}-${props.contentPosition}`,
      )}
    >
      {props.children && (
        <View className={`${classPrefix}-content`}>{props.children}</View>
      )}
    </View>,
  )
}

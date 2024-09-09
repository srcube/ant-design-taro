import type { FC } from 'react'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = 'adt-safe-area'

export type SafeAreaProps = {
  position: 'top' | 'bottom'
} & NativeProps

export const SafeArea: FC<SafeAreaProps> = (props) => {
  return withNativeProps(
    props,
    <View
      className={cn(classPrefix, `${classPrefix}-position-${props.position}`)}
    />,
  )
}

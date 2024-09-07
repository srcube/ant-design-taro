import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

import cn from 'classnames'

const classPrefix = `adt-dot-loading`

const colorRecord: Record<string, string> = {
  default: 'var(--adm-color-weak)',
  primary: 'var(--adm-color-primary)',
  white: 'var(--adm-color-white)',
}

export type DotLoadingProps = {
  color?: 'default' | 'primary' | 'white' | (string & {})
} & NativeProps

const defaultProps = {
  color: 'default',
}

export const DotLoading = memo<DotLoadingProps>((p) => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <View
      style={{
        color: colorRecord[props.color] ?? props.color,
      }}
      className={cn('adt-loading', classPrefix)}
    >
      <Text className={cn(classPrefix, `${classPrefix}-icon`)} />
    </View>,
  )
})

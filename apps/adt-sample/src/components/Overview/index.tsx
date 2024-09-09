import { FC, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import cn from 'classnames'

export interface DemoProps {
  title: string
  className?: string
  contentClass?: string
}

export const Overview: FC<PropsWithChildren<DemoProps>> = ({
  children,
  title,
  className,
  contentClass,
}) => {
  return (
    <View
      className={cn(
        ':uno: flex-col gap-2 items-center p-2 w-full box-border rounded-lg b b-solid b-light-6 shadow-sm',
        className,
      )}
    >
      <View className=':uno: mb-2 w-full flex items-center justify-center'>
        <Text className=':uno: text-xs font-medium'>{title}</Text>
      </View>
      <View
        className={cn(':uno: flex-1 w-full  bg-white rounded-xl', contentClass)}
      >
        {children}
      </View>
    </View>
  )
}

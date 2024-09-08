import { FC, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import cn from 'classnames'

export interface DemoProps {
  title: string
  className?: string
}

export const Overview: FC<PropsWithChildren<DemoProps>> = ({
  children,
  title,
  className,
}) => {
  return (
    <View className=':uno: flex-col gap-2 items-center p-2 w-full box-border rounded b b-solid b-light-6 shadow-sm'>
      <View className=':uno: mb-2 w-full flex items-center justify-center'>
        <Text className=':uno: text-xs font-medium'>{title}</Text>
      </View>
      <View
        className={cn(':uno: flex-1 w-full  bg-white rounded-xl', className)}
      >
        {children}
      </View>
    </View>
  )
}

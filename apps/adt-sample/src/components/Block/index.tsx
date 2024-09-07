import { PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'

import cn from 'classnames'

export interface DemoProps {
  title: string
  className?: string
}

export const Demo: React.FC<PropsWithChildren<DemoProps>> = ({
  children,
  title,
  className,
}) => {
  return (
    <View className=':uno: flex-col gap-4 bg-white rounded-xl p-4 my-4 shadow'>
      <View className=':uno: mb-2 w-full flex items-center justify-center'>
        <Text className=':uno: text-xs font-bold uppercase'>{title}</Text>
      </View>
      <View className={cn(':uno: w-full', className)}>{children}</View>
    </View>
  )
}

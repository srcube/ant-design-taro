import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Button } from '@srcube/ant-design-taro'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const [loading, setLoading] = useState(false)

  const handleTap = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <View className='flex flex-col gap-8 items-center justify-center h-vh w-vw'>
      <Text className='c-blue-6 text-2xl font-bold'>Ant Design Taro</Text>
      <Button
        color={loading ? 'danger' : 'primary'}
        loading={loading}
        loadingText='Loading'
        onTap={handleTap}
      >
        BUTTON
      </Button>
    </View>
  )
}

import { useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Overview } from '@/components/Overview'
import { Button, Divider, DotLoading, Switch } from '@srcube/ant-design-taro'

import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <View className=':uno: fixed top-0 inset-x-0 flex items-center justify-center z-999 h-18 bg-white b-b b-b-solid b-b-light-9'>
        <Text className=':uno: c-blue-6 text-xl font-bold'>
          Ant Design Taro
        </Text>
      </View>
      <View className=':uno: flex flex-col gap-8 items-center px-4 pt-22 min-h-vh w-full box-border'>
        <View className=':uno: grid grid-cols-2 gap-2 w-full'>
          <Overview title='Button'>
            <Button color='primary' size='small' block>
              Tap
            </Button>
          </Overview>
          <Overview title='Divider'>
            <Divider className=':uno: !c-blue-6 !b-blue-6'>Ant Design</Divider>
          </Overview>
          <Overview
            title='Dot Loading'
            contentClass=':uno: flex items-center gap-2'
          >
            <DotLoading />
            <DotLoading className='!size-6 !bg-green-6' />
            <DotLoading className='!size-8 !bg-red-6' />
            <DotLoading color='primary' className='!size-10' />
          </Overview>
          <Overview
            title='Switch'
            contentClass=':uno: flex items-center justify-center gap-2'
          >
            <Switch uncheckedText='关' checkedText='开' className='text-xs' />
          </Overview>
        </View>
      </View>
    </View>
  )
}

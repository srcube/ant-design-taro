import { useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Overview } from '@/components/Overview'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Collapse,
  Divider,
  DotLoading,
  Image,
  Input,
  List,
  NavBar,
  Radio,
  SafeArea,
  SideBar,
  Switch,
  TabBar,
  Tabs,
  Tag,
  WaterMark,
} from '@srcube/ant-design-taro'

import { faker } from '@faker-js/faker'

import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const tabs = {
    tabbar: [
      {
        key: 'home',
        title: '首页',
        icon: <Text className='i-ant-design:home-outlined inline-block' />,
        badge: Badge.dot,
      },
      {
        key: 'todo',
        title: '待办',
        icon: (
          <Text className='i-ant-design:unordered-list-outlined inline-block' />
        ),
        badge: '5',
      },
      {
        key: 'message',
        title: '消息',
        icon: (active: boolean) =>
          active ? (
            <Text className='i-ant-design:message-filled inline-block' />
          ) : (
            <Text className='i-ant-design:message-outlined inline-block' />
          ),
        badge: '99+',
      },
      {
        key: 'personalCenter',
        title: '我的',
        icon: (
          <Text className='i-ant-design:ant-design-outlined inline-block' />
        ),
      },
    ],
    sidebar: [
      {
        key: 'key1',
        title: '选项一',
        badge: Badge.dot,
      },
      {
        key: 'key2',
        title: '选项二',
        badge: '5',
      },
      {
        key: 'key3',
        title: '选项三',
        badge: '99+',
        disabled: true,
      },
    ],
  }

  return (
    <View>
      <View className=':uno: sticky top-0 inset-x-0 z-9999'>
        <SafeArea position='top' className='bg-white' />
        <View
          id='header'
          className=':uno: flex items-center justify-center h-14 bg-white b-b b-b-solid b-b-light-9'
        >
          <Text className=':uno: c-blue-6 text-xl font-bold'>
            Ant Design Taro
          </Text>
        </View>
      </View>
      <View className=':uno: flex flex-col gap-2 p-4 w-full box-border'>
        {/* Avatar */}
        <Overview title='Avatar' contentClass=':uno: flex justify-center gap-2'>
          <Avatar src='' />
          <Avatar
            src='https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_2.png'
            style={{ '--size': '2rem' }}
          />
          <Avatar
            src='https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_4.png'
            style={{ '--size': '2.5rem' }}
          />
          <Avatar
            src='https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_5.png'
            style={{ '--size': '3rem' }}
          />
        </Overview>
        {/* Button */}
        <Overview title='Button' contentClass='flex gap-2'>
          <Button color='primary' size='small' block>
            PRIMARY
          </Button>
          <Button color='danger' size='small' block>
            DANGER
          </Button>
          <Button color='warning' size='small' block>
            WARNING
          </Button>
        </Overview>
        {/* Card */}
        <Overview
          title='Card'
          contentClass=':uno: flex items-center justify-center gap-2 box-border !bg-light-9'
        >
          <Card
            title='CAR TITLE'
            onClick={() => {
              console.log('CARD TITLE CLICK')
            }}
            className=':uno: m-2 w-full'
          >
            Card content
          </Card>
        </Overview>
        {/* Collapse */}
        <Overview
          title='Collapse'
          contentClass=':uno: flex items-center justify-center gap-2 box-border !bg-light-9'
        >
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel key='1' title='第一项'>
              {faker.lorem.paragraph(3)}
            </Collapse.Panel>
            <Collapse.Panel key='2' title='第二项'>
              {faker.lorem.paragraph(3)}
            </Collapse.Panel>
            <Collapse.Panel key='3' title='第三项'>
              {faker.lorem.paragraph(3)}
            </Collapse.Panel>
          </Collapse>
        </Overview>
        {/* Divider */}
        <Overview title='Divider'>
          <Divider className=':uno: !c-blue-6 !b-blue-6'>Ant Design</Divider>
        </Overview>
        {/* Dot Loading */}
        <Overview
          title='Dot Loading'
          contentClass=':uno: flex items-center gap-2'
        >
          <DotLoading />
          <DotLoading className='!size-6 !bg-green-6' />
          <DotLoading className='!size-8 !bg-red-6' />
          <DotLoading color='primary' className='!size-10' />
        </Overview>
        {/* Image */}
        <Overview
          title='Image'
          contentClass=':uno: flex items-center justify-center'
        >
          <Image
            src='https://camo.githubusercontent.com/0297e19d44b8d86076f1b262710054aa387546c47416a1101a616fa8be13a7be/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f626d772d70726f642f62326337666638622d656261302d346166392d396464352d3062356231376634326335372e737667'
            width={100}
            height={100}
            fit='fill'
          />
        </Overview>
        {/* Input */}
        <Overview
          title='Input'
          contentClass=':uno: flex items-center justify-center'
        >
          <Input focus={true} placeholder='请输入内容' />
        </Overview>
        {/* List */}
        <Overview title='List'>
          <List header='Clickable List'>
            <List.Item
              prefix={<View className='i-ic:outline-list size-5' />}
              onClick={() => {}}
            >
              账单
            </List.Item>
            <List.Item
              prefix={<View className='i-tdesign:money size-5' />}
              onClick={() => {}}
            >
              总资产
            </List.Item>
            <List.Item
              prefix={<View className='i-ic:baseline-settings size-5' />}
              onClick={() => {}}
            >
              设置
            </List.Item>
          </List>
        </Overview>
        {/* Nav Bar */}
        <Overview
          title='Nav Bar'
          className=':uno: '
          contentClass=':uno: flex items-center justify-center gap-2'
        >
          <NavBar
            onBack={() => {
              console.log('BACK TAP')
            }}
            back='Back'
            right='ooo'
            className=':uno: w-full'
          >
            Ant Design
          </NavBar>
        </Overview>
        {/* Radio */}
        <Overview
          title='Radio'
          contentClass=':uno: flex items-center justify-center gap-2'
        >
          <Radio.Group defaultValue='1'>
            <Radio value='1' style={{ '--font-size': '14px' }}>
              R 1
            </Radio>
            <Radio value='2' style={{ '--font-size': '14px' }}>
              R 2
            </Radio>
          </Radio.Group>
        </Overview>
        {/* Side Bar */}
        <Overview title='Side Bar' contentClass=':uno: flex flex-col gap-2'>
          <SideBar className='mx-auto'>
            {tabs.sidebar.map((t) => (
              <SideBar.Item key={t.key} title={t.title} badge={t.badge} />
            ))}
          </SideBar>
        </Overview>
        {/* Switch */}
        <Overview
          title='Switch'
          contentClass=':uno: flex items-center justify-center gap-2'
        >
          <Switch uncheckedText='关' checkedText='开' className='text-xs' />
        </Overview>
        {/* Tab Bar */}
        <Overview
          title='Tab Bar'
          className=':uno: '
          contentClass=':uno: flex flex-col gap-2'
        >
          <TabBar className=''>
            {tabs.tabbar.map((t) => (
              <TabBar.Item
                key={t.key}
                icon={t.icon}
                title={t.title}
                badge={t.badge}
              />
            ))}
          </TabBar>
        </Overview>
        {/* Tabs */}
        <Overview
          title='Tabs'
          className=':uno: '
          contentClass=':uno: flex flex-col gap-2'
        >
          <Tabs defaultActiveKey='3' activeLineMode='full'>
            {Array.from({ length: 10 }, (_, i) => (
              <Tabs.Tab title={`Tab ${i + 1}`} key={i}>
                CONTENT {i + 1}
              </Tabs.Tab>
            ))}
          </Tabs>
        </Overview>
        {/* Tag */}
        <Overview title='Tag' contentClass=':uno: flex gap-2 flex-wrap'>
          <Tag color='default'>Default</Tag>
          <Tag color='primary'>Test</Tag>
          <Tag color='success'>Success</Tag>
          <Tag color='warning'>Warning</Tag>
          <Tag color='danger'>Danger</Tag>
        </Overview>
        {/* Water Mark */}
        <Overview
          title='Water Mark'
          className=''
          contentClass=':uno: relative flex items-center justify-center gap-2 h-20'
        >
          <WaterMark
            content={['Srcube', 'Ant Design Taro']}
            gapX={0}
            fullPage={false}
          />
        </Overview>
      </View>
      {/* </View> */}
      <SafeArea position='bottom' />
    </View>
  )
}

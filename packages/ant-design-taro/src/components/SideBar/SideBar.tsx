import { isValidElement } from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import { View, Text } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { traverseReactNode } from '../../utils/traverse-react-node'

import Badge, { BadgeProps } from '../Badge'
import { Corner } from './Corner'

const classPrefix = `adt-side-bar`

export type SideBarItemProps = {
  title?: ReactNode
  disabled?: boolean
  badge?: BadgeProps['content']
} & NativeProps

export const SideBarItem: FC<SideBarItemProps> = () => {
  return null
}

export type SideBarProps = {
  activeKey?: string | null
  defaultActiveKey?: string | null
  onChange?: (key: string) => void
  children?: ReactNode
} & NativeProps<
  '--width' | '--height' | '--item-border-radius' | '--background-color'
>

export const SideBar: FC<SideBarProps> = (props) => {
  let firstActiveKey: string | null = null

  const items: ReactElement<SideBarItemProps>[] = []

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<SideBarItemProps>(child)) return
    const key = child.key
    if (typeof key !== 'string') return

    if (index === 0) {
      firstActiveKey = key
    }
    items.push(child)
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: (v) => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  const lastItem = items[items.length - 1]
  const isLastItemActive = lastItem && lastItem.key === activeKey

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-items`}>
        {items.map((item, index) => {
          const active = item.key === activeKey
          const isActiveNextSibling =
            items[index - 1] && items[index - 1]?.key === activeKey
          const isActivePreviousSibling =
            items[index + 1] && items[index + 1]?.key === activeKey
          return withNativeProps(
            item.props,
            <View
              key={item.key!}
              onClick={() => {
                const { key } = item
                if (key === undefined || key === null || item.props.disabled)
                  return
                setActiveKey(key.toString())
              }}
              className={cn(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
                [`${classPrefix}-item-disabled`]: item.props.disabled,
              })}
            >
              <>
                {isActiveNextSibling && (
                  <Corner
                    className={`${classPrefix}-item-corner ${classPrefix}-item-corner-top`}
                  />
                )}
                {isActivePreviousSibling && (
                  <Corner
                    className={`${classPrefix}-item-corner ${classPrefix}-item-corner-bottom`}
                  />
                )}
              </>
              <Badge
                content={item.props.badge}
                className={`${classPrefix}-badge`}
              >
                <View className={`${classPrefix}-item-title`}>
                  {active && (
                    <View className={`${classPrefix}-item-highlight`} />
                  )}
                  {item.props.title}
                </View>
              </Badge>
            </View>,
          )
        })}
      </View>
      <View
        className={cn(
          `${classPrefix}-extra-space`,
          isLastItemActive && `${classPrefix}-item-active-next-sibling`,
        )}
      >
        {isLastItemActive && (
          <Corner
            className={`${classPrefix}-item-corner ${classPrefix}-item-corner-top`}
          />
        )}
      </View>
    </View>,
  )
}

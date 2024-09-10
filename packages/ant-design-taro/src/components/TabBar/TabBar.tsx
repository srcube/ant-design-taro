import { isValidElement } from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { usePropsValue } from '../../utils/use-props-value'
import { traverseReactNode } from '../../utils/traverse-react-node'

import SafeArea from '../SafeArea'
import Badge, { BadgeProps } from '../Badge'

export type TabBarItemProps = {
  icon?: ReactNode | ((active: boolean) => ReactNode)
  title?: ReactNode | ((active: boolean) => ReactNode)
  badge?: BadgeProps['content']
  onTap?: () => void
} & NativeProps

/* istanbul ignore next */
export const TabBarItem: FC<TabBarItemProps> = () => {
  return null
}

export type TabBarProps = {
  activeKey?: string | null
  defaultActiveKey?: string | null
  safeArea?: boolean
  children?: ReactNode
  onChange?: (key: string) => void
} & NativeProps

const classPrefix = `adt-tab-bar`

const defaultProps = {
  safeArea: false,
}

export const TabBar: FC<TabBarProps> = (p) => {
  const props = mergeProps(defaultProps, p)

  let firstActiveKey: string | null = null

  const items: ReactElement<TabBarItemProps>[] = []

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<TabBarItemProps>(child)) return
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

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-wrap`}>
        {items.map((item) => {
          const active = item.key === activeKey

          function renderContent() {
            const iconElement = item.props.icon && (
              <View className={`${classPrefix}-item-icon`}>
                {typeof item.props.icon === 'function'
                  ? item.props.icon(active)
                  : item.props.icon}
              </View>
            )
            const titleElement = item.props.title && (
              <View
                className={cn(
                  `${classPrefix}-item-title`,
                  Boolean(iconElement) && `${classPrefix}-item-title-with-icon`,
                )}
              >
                {typeof item.props.title === 'function'
                  ? item.props.title(active)
                  : item.props.title}
              </View>
            )
            if (iconElement) {
              return (
                <>
                  <Badge
                    content={item.props.badge}
                    className={`${classPrefix}-icon-badge`}
                  >
                    {iconElement}
                  </Badge>
                  {titleElement}
                </>
              )
            } else if (titleElement) {
              return (
                <Badge
                  content={item.props.badge}
                  className={`${classPrefix}-title-badge`}
                >
                  {titleElement}
                </Badge>
              )
            }
            return null
          }

          return withNativeProps(
            item.props,
            <View
              key={item.key!}
              onClick={() => {
                const { key } = item

                if (key === undefined || key === null) return

                setActiveKey(key.toString())
                item.props.onTap?.()
              }}
              className={cn(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
              })}
            >
              {renderContent()}
            </View>,
          )
        })}
      </View>

      {props.safeArea && <SafeArea position='bottom' />}
    </View>,
  )
}

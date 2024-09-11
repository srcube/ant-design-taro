import { isValidElement, useRef } from 'react'
import type { FC, ReactNode, ReactElement, PropsWithChildren } from 'react'
import { TaroElement } from '@tarojs/runtime'
import { ScrollView, View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { ShouldRender } from '../../utils/should-render'
import { traverseReactNode } from '../../utils/traverse-react-node'

const classPrefix = `adt-tabs`

export type TabProps = PropsWithChildren<
  {
    title: ReactNode
    disabled?: boolean
    forceRender?: boolean
    destroyOnClose?: boolean
  } & NativeProps
>

export const Tab: FC<TabProps> = () => {
  return null
}

export type TabsProps = PropsWithChildren<
  {
    activeKey?: string | null
    defaultActiveKey?: string | null
    activeLineMode?: 'auto' | 'full' | 'fixed'
    stretch?: boolean
    direction?: 'ltr' | 'rtl'
    /**
     * @experimental Support disabled auto scroll when Tabs header content change.
     * This API name or function may change in the future.
     * Please lock the version if you want to use it.
     */
    autoScroll?: boolean
    onChange?: (key: string) => void
  } & NativeProps<
    | '--fixed-active-line-width'
    | '--active-line-height'
    | '--active-line-border-radius'
    | '--title-font-size'
    | '--content-padding'
    | '--active-title-color'
    | '--active-line-color'
  >
>

const defaultProps = {
  activeLineMode: 'auto',
  stretch: true,
  direction: 'ltr',
}

export const Tabs: FC<TabsProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const tabListContainerRef = useRef<TaroElement>(null!)
  const activeLineRef = useRef<TaroElement>(null!)
  const keyToIndexRecord: Record<string, number> = {}

  let firstActiveKey: string | null = null

  const panes: ReactElement<TabProps>[] = []

  // const isRTL = props.direction === 'rtl'

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<TabProps>(child)) return

    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) firstActiveKey = key

    const length = panes.push(child)
    keyToIndexRecord[key] = length - 1
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
    <View className={classPrefix} style={{ direction: props.direction }}>
      <View className={`${classPrefix}-header`}>
        <ScrollView
          aria-role='tablist'
          scrollLeft={0}
          showScrollbar={false}
          scrollWithAnimation
          scrollX
        >
          <View ref={tabListContainerRef} className={`${classPrefix}-tab-list`}>
            {panes.map((pane) =>
              withNativeProps(
                pane.props,
                <View
                  key={pane.key!}
                  className={cn(`${classPrefix}-tab-wrapper`, {
                    [`${classPrefix}-tab-wrapper-stretch`]: props.stretch,
                  })}
                >
                  <View
                    ref={activeLineRef}
                    className={`${classPrefix}-tab-line`}
                    style={{
                      display: activeKey === pane.key ? 'block' : 'none',
                      width:
                        props.activeLineMode === 'fixed'
                          ? 'var(--fixed-active-line-width, 30px)'
                          : '100%',
                    }}
                  />
                  <View
                    onTap={() => {
                      const { key } = pane
                      if (pane.props.disabled) return
                      if (key === void 0 || key === null) return

                      setActiveKey(key.toString())
                    }}
                    className={cn(`${classPrefix}-tab`, {
                      [`${classPrefix}-tab-active`]: pane.key === activeKey,
                      [`${classPrefix}-tab-disabled`]: pane.props.disabled,
                    })}
                    role='tab'
                    aria-selected={pane.key === activeKey}
                  >
                    {pane.props.title}
                  </View>
                </View>,
              ),
            )}
          </View>
        </ScrollView>
      </View>
      {panes.map((pane) => {
        if (pane.props.children === void 0) {
          return null
        }
        const active = pane.key === activeKey

        return (
          <ShouldRender
            key={pane.key}
            active={active}
            forceRender={pane.props.forceRender}
            destroyOnClose={pane.props.destroyOnClose}
          >
            <View
              className={`${classPrefix}-content`}
              style={{ display: active ? 'block' : 'none' }}
            >
              {pane.props.children}
            </View>
          </ShouldRender>
        )
      })}
    </View>,
  )
}

import type { FC, ReactNode } from 'react'
import { type ITouchEvent, View } from '@tarojs/components'

import cn from 'classnames'

import { isNodeWithContent } from '../../utils/is-node-with-content'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProp } from '../../utils/with-default-props'

import { useConfig } from '../ConfigProvider'
import { RightOutline } from '../../icons'

const classPrefix = `adt-list-item`

export type ListItemProps = {
  title?: ReactNode
  children?: ReactNode
  description?: ReactNode
  prefix?: ReactNode
  extra?: ReactNode
  clickable?: boolean
  arrowIcon?: boolean | ReactNode
  disabled?: boolean
  onClick?: (event: ITouchEvent) => void
  /**
   * @deprecated use `arrowIcon` instead
   */
  arrow?: boolean | ReactNode
} & NativeProps<
  '--prefix-width' | '--align-items' | '--active-background-color'
>

export const ListItem: FC<ListItemProps> = (props) => {
  const { arrow, arrowIcon } = props
  const { list: componentConfig = {} } = useConfig()
  const clickable = props.clickable ?? !!props.onClick

  const showArrow = arrow ?? arrowIcon ?? clickable
  const mergedArrowIcon = mergeProp<React.ReactNode>(
    componentConfig.arrowIcon,
    arrow !== true ? arrow : null,
    arrowIcon !== true ? arrowIcon : null,
  )

  const content = (
    <View className={`${classPrefix}-content`}>
      {isNodeWithContent(props.prefix) && (
        <View className={`${classPrefix}-content-prefix`}>{props.prefix}</View>
      )}
      <View className={`${classPrefix}-content-main`}>
        {isNodeWithContent(props.title) && (
          <View className={`${classPrefix}-title`}>{props.title}</View>
        )}
        {props.children}
        {isNodeWithContent(props.description) && (
          <View className={`${classPrefix}-description`}>
            {props.description}
          </View>
        )}
      </View>
      {isNodeWithContent(props.extra) && (
        <View className={`${classPrefix}-content-extra`}>{props.extra}</View>
      )}
      {showArrow && (
        <View className={`${classPrefix}-content-arrow`}>
          {mergedArrowIcon || (
            <RightOutline style={{ backgroundColor: '#999' }} />
          )}
        </View>
      )}
    </View>
  )

  return withNativeProps(
    props,

    <View
      className={cn(
        classPrefix,
        clickable ? [`adt-plain-anchor`] : [],
        props.disabled && `${classPrefix}-disabled`,
        props.className,
      )}
      onClick={props.disabled ? void 0 : props.onClick}
    >
      {content}
    </View>,
  )
}

import type { FC, ReactNode } from 'react'
import { BaseEventOrig, View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProp, mergeProps } from '../../utils/with-default-props'

import { useConfig } from '../ConfigProvider'
import { LeftOutline } from '../../icons'

const classPrefix = `adt-nav-bar`

export type NavBarProps = {
  back?: ReactNode
  backIcon?: boolean | ReactNode
  /**
   * @deprecated use `backIcon` instead
   */
  backArrow?: boolean | ReactNode
  left?: ReactNode
  right?: ReactNode
  children?: ReactNode
  onBack?: (event: BaseEventOrig) => void
} & NativeProps<'--height' | '--border-bottom'>

const defaultBackIcon = (
  <LeftOutline style={{ backgroundColor: 'var(--adt-color-text)' }} />
)

export const NavBar: FC<NavBarProps> = (props) => {
  const { navBar: componentConfig = {} } = useConfig()
  const mergedProps = mergeProps(componentConfig, props)
  const { back, backIcon, backArrow } = mergedProps

  const mergedDefaultBackIcon = componentConfig.backIcon || defaultBackIcon

  const mergedBackIcon = mergeProp<ReactNode>(
    defaultBackIcon,
    componentConfig.backIcon,
    backArrow === true ? mergedDefaultBackIcon : backArrow,
    backIcon === true ? mergedDefaultBackIcon : backIcon,
  )

  return withNativeProps(
    mergedProps,
    <View className={cn(classPrefix)}>
      <View className={`${classPrefix}-left`} role='button'>
        {back !== null && (
          <View className={`${classPrefix}-back`} onTap={mergedProps.onBack}>
            {mergedBackIcon && (
              <View className={`${classPrefix}-back-arrow`}>
                {mergedBackIcon}
              </View>
            )}
            <View aria-hidden='true'>{back}</View>
          </View>
        )}
        {mergedProps.left}
      </View>
      <View className={`${classPrefix}-title`}>{mergedProps.children}</View>
      <View className={`${classPrefix}-right`}>{mergedProps.right}</View>
    </View>,
  )
}

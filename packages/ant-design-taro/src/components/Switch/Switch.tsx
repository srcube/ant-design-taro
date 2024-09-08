import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View } from '@tarojs/components'

import cn from 'classnames'

import { useConfig } from '../ConfigProvider'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'
import { isPromise } from '../../utils/validate'

const classPrefix = `adt-switch`

export type SwitchProps = {
  loading?: boolean
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void | Promise<void>
  checkedText?: ReactNode
  uncheckedText?: ReactNode
} & NativeProps<'--checked-color' | '--width' | '--height' | '--border-width'>

const defaultProps = {
  defaultChecked: false,
}

export const Switch: FC<SwitchProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const disabled = props.disabled || props.loading || false
  const [changing, setChanging] = useState(false)
  const { locale } = useConfig()

  const [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  })

  async function onTap() {
    if (disabled || props.loading || changing) {
      return
    }
    const nextChecked = !checked
    if (props.onChange) {
      setChanging(true)
      try {
        await props.onChange(nextChecked)
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
    const result = setChecked(nextChecked)
    if (isPromise(result)) {
      setChanging(true)
      try {
        await result
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
  }

  return withNativeProps(
    props,
    <View
      onTap={onTap}
      className={cn(classPrefix, {
        [`${classPrefix}-checked`]: checked,
        [`${classPrefix}-disabled`]: disabled || changing,
      })}
      role='switch'
      aria-label={locale.Switch.name}
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <View className={`${classPrefix}-checkbox`}>
        <View className={`${classPrefix}-handle`}>
          {(props.loading || changing) && (
            <Text className={`${classPrefix}-loading-icon`} />
          )}
        </View>
        <View className={`${classPrefix}-inner`}>
          {checked ? props.checkedText : props.uncheckedText}
        </View>
      </View>
    </View>,
  )
}

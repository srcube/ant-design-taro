import { useContext } from 'react'
import type { FC, ReactNode } from 'react'
import { Label, Radio as TRadio, View } from '@tarojs/components'
import { RadioProps as TRadioProps } from '@tarojs/components'
import type { BaseEventOrig, ITouchEvent } from '@tarojs/components'

import cn from 'classnames'

import { devWarning } from '../../utils/dev-log'
import { isDev } from '../../utils/is-dev'
import { type NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { mergeProps } from '../../utils/with-default-props'

import { Check } from '../../icons'

import { RadioGroupContext } from './GroupContext'

const classPrefix = `adt-radio`

type NativeRadioProps = TRadioProps

export type RadioValue = string | number

export type RadioProps = {
  id?: string
  value?: RadioValue
  defaultChecked?: boolean
  children?: ReactNode
  block?: boolean
  icon?: (checked: boolean) => ReactNode
  onClick?: (event: ITouchEvent) => void
  onChange?: (checked: boolean) => void
} & Pick<
  NativeRadioProps,
  'checked' | 'disabled' | 'color' | 'nativeProps' | 'ariaLabel'
> &
  NativeProps<'--icon-size' | '--font-size' | '--gap'>

const defaultProps = {
  defaultChecked: false,
}

export const Radio: FC<RadioProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const groupContext = useContext(RadioGroupContext)

  let [checked, setChecked] = usePropsValue<boolean>({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  }) as [boolean, (v: boolean) => void]
  let disabled = props.disabled

  const { value } = props
  if (groupContext && value !== undefined) {
    if (isDev) {
      if (p.checked !== undefined) {
        devWarning(
          'Radio',
          'When used within `Radio.Group`, the `checked` prop of `Radio` will not work.',
        )
      }
      if (p.defaultChecked !== undefined) {
        devWarning(
          'Radio',
          'When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.',
        )
      }
    }

    checked = groupContext.value.includes(value)
    setChecked = (innerChecked: boolean) => {
      if (innerChecked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      props.onChange?.(innerChecked)
    }
    disabled = disabled || groupContext.disabled
  }

  const onChange = (event: BaseEventOrig<{ value?: string }>) => {
    console.log('E: ', event)

    setChecked(Boolean(value))
  }

  const renderIcon = () => {
    if (props.icon) {
      return (
        <View className={`${classPrefix}-custom-icon`}>
          {props.icon(checked)}
        </View>
      )
    }

    return <View className={`${classPrefix}-icon`}>{checked && <Check />}</View>
  }

  const onClick = (event: ITouchEvent) => {
    if (!props.onClick) setChecked(true)

    props.onClick?.(event)
  }

  return withNativeProps(
    props,
    <Label
      onClick={onClick}
      className={cn(classPrefix, {
        [`${classPrefix}-checked`]: checked,
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-block`]: props.block,
      })}
    >
      <TRadio
        id={props.id}
        checked={checked}
        disabled={disabled}
        color={props.color ?? 'var(--adt-color-primary)'}
        onChange={onChange}
      />
      {renderIcon()}
      {props.children && (
        <View className={`${classPrefix}-content`}>{props.children}</View>
      )}
    </Label>,
  )
}

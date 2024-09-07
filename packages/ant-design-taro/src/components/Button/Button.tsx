import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ReactNode } from 'react'
import { Button as TButton, Text, View } from '@tarojs/components'
import type { ButtonProps as TButtonProps } from '@tarojs/components'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

import cn from 'classnames'

import DotLoading from '../DotLoading'

const classPrefix = `adt-button`

type NativeButtonProps = TButtonProps

export type ButtonProps = {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  fill?: 'solid' | 'outline' | 'none'
  size?: 'mini' | 'small' | 'middle' | 'large'
  block?: boolean
  loadingText?: string
  loadingIcon?: ReactNode
  disabled?: boolean
  shape?: 'default' | 'rounded' | 'rectangular'
  children?: ReactNode
} & Pick<
  NativeButtonProps,
  'id' | 'loading' | 'onTap' | 'onTouchStart' | 'onTouchEnd'
> &
  NativeProps<
    | '--text-color'
    | '--background-color'
    | '--border-radius'
    | '--border-width'
    | '--border-style'
    | '--border-color'
  >

export type ButtonRef = {
  nativeElement: typeof TButton
}

const defaultProps: ButtonProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  loadingIcon: <DotLoading color='currentColor' />,
  shape: 'default',
  size: 'middle',
}

export const Button = forwardRef<ButtonRef, ButtonProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)

  const nativeButtonRef = useRef<typeof TButton>(null!)

  const disabled = props.disabled || props.loading

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current
    },
  }))

  return withNativeProps(
    props,
    <TButton
      ref={nativeButtonRef}
      disabled={disabled}
      loading={props.loading}
      onTap={props.onTap}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
      className={cn(
        classPrefix,
        {
          [`${classPrefix}-${props.color}`]: props.color,
          [`${classPrefix}-block`]: props.block,
          [`${classPrefix}-disabled`]: disabled,
          [`${classPrefix}-fill-outline`]: props.fill === 'outline',
          [`${classPrefix}-fill-none`]: props.fill === 'none',
          [`${classPrefix}-mini`]: props.size === 'mini',
          [`${classPrefix}-small`]: props.size === 'small',
          [`${classPrefix}-large`]: props.size === 'large',
          [`${classPrefix}-loading`]: props.loading,
        },
        `${classPrefix}-shape-${props.shape}`,
      )}
    >
      {props.loading ? (
        <View>
          {props.loadingIcon}
          <Text style={{ marginLeft: '4px' }}>{props.loadingText}</Text>
        </View>
      ) : (
        <Text>{props.children}</Text>
      )}
    </TButton>,
  )
})

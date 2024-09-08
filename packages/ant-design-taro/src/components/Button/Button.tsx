import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button as TButton, Text, View } from '@tarojs/components'
import type {
  BaseEventOrig,
  ButtonProps as TButtonProps,
} from '@tarojs/components'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { isPromise } from '../../utils/validate'

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
  loading?: boolean | 'auto'
  shape?: 'default' | 'rounded' | 'rectangular'
  children?: ReactNode
} & Pick<
  NativeButtonProps,
  'id' | 'disabled' | 'onTap' | 'onTouchStart' | 'onTouchEnd'
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

  const [innerLoading, setInnerLoading] = useState(false)

  const nativeButtonRef = useRef<typeof TButton>(null!)

  const loading = props.loading === 'auto' ? innerLoading : props.loading
  const disabled = props.disabled || loading

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return nativeButtonRef.current
    },
  }))

  const onTap = async (event: BaseEventOrig) => {
    if (!props.onTap) return

    const promise = props.onTap(event)

    if (isPromise(promise)) {
      try {
        setInnerLoading(true)
        await promise
        setInnerLoading(false)
      } catch (e) {
        setInnerLoading(false)
        throw e
      }
    }
  }

  return withNativeProps(
    props,
    <TButton
      ref={nativeButtonRef}
      disabled={disabled}
      loading={loading}
      onTap={onTap}
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

import {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import cn from 'classnames'

import {
  View,
  Input as TInput,
  type InputProps as TInputProps,
} from '@tarojs/components'

import { bound } from '../../utils/bound'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { isIOS } from '../../utils/validate'
import { mergeProps } from '../../utils/with-default-props'
import { CloseCircleFill } from '../../icons'
import { useConfig } from '../ConfigProvider'

const classPrefix = `adt-input`

type NativeInputProps = TInputProps

type AriaProps = {
  // These props currently are only used internally. They are not exported to users:
  role?: string
}

export type InputProps = NativeInputProps & {
  value?: string
  defaultValue?: string
  onChange?: (val: string) => void
  clearable?: boolean
  clearIcon?: ReactNode
  readOnly?: boolean
  onlyShowClearWhenFocus?: boolean
  onClear?: () => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  min?: number
  max?: number
} & NativeProps<
    '--font-size' | '--color' | '--placeholder-color' | '--text-align'
  > &
  AriaProps

const defaultProps = {
  defaultValue: '',
  clearIcon: <CloseCircleFill style={{ backgroundColor: '#666' }} />,
  onlyShowClearWhenFocus: true,
}

export type InputRef = {
  focus?: boolean
  nativeElement: typeof TInput | null
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { locale, input: componentConfig = {} } = useConfig()
  const mergedProps = mergeProps(defaultProps, componentConfig, props)
  const [value, setValue] = usePropsValue(mergedProps)
  const [hasFocus, setHasFocus] = useState(false)
  const compositionStartRef = useRef(false)
  const nativeInputRef = useRef<typeof TInput>(null!)

  useImperativeHandle(ref, () => ({
    focus: nativeInputRef.current.defaultProps?.focus,
    get nativeElement() {
      return nativeInputRef.current
    },
  }))

  function checkValue() {
    let nextValue = value
    if (mergedProps.type === 'number') {
      const boundValue =
        nextValue &&
        bound(
          parseFloat(nextValue),
          mergedProps.min,
          mergedProps.max,
        ).toString()
      // fix the display issue of numbers starting with 0
      if (Number(nextValue) !== Number(boundValue)) {
        nextValue = boundValue
      }
    }
    if (nextValue !== value) {
      setValue(nextValue)
    }
  }

  const shouldShowClear = (() => {
    if (!mergedProps.clearable || !value || mergedProps.readOnly) return false
    if (mergedProps.onlyShowClearWhenFocus) {
      return hasFocus
    } else {
      return true
    }
  })()

  return withNativeProps(
    mergedProps,
    <View
      className={cn(
        `${classPrefix}`,
        mergedProps.disabled && `${classPrefix}-disabled`,
      )}
    >
      <TInput
        ref={nativeInputRef}
        className={`${classPrefix}-element`}
        value={value}
        focus={props.focus}
        onInput={(e) => {
          setValue(e.detail.value)
        }}
        onFocus={(e) => {
          setHasFocus(true)
          mergedProps.onFocus?.(e)
        }}
        onBlur={(e) => {
          setHasFocus(false)
          checkValue()
          mergedProps.onBlur?.(e)
        }}
        id={mergedProps.id}
        placeholder={mergedProps.placeholder}
        disabled={mergedProps.disabled}
        maxlength={mergedProps.maxlength}
        autoFocus={mergedProps.autoFocus}
        type={mergedProps.type}
        name={mergedProps.name}
        onClick={mergedProps.onClick}
      />
      {shouldShowClear && (
        <View
          className={`${classPrefix}-clear`}
          onClick={() => {
            setValue('')
            // mergedProps.onClear?.();

            // https://github.com/ant-design/ant-design-mobile/issues/5212
            if (isIOS() && compositionStartRef.current) {
              compositionStartRef.current = false
            }
          }}
          aria-label={locale.Input.clear}
        >
          {mergedProps.clearIcon}
        </View>
      )}
    </View>,
  )
})

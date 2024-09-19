import type { FC, ReactNode } from 'react'

import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

import { Fallback } from './Fallback'
import Image, { ImageProps } from '../Image'

const classPrefix = 'adt-avatar'

export type AvatarProps = {
  src: string
  fallback?: ReactNode
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
} & Pick<ImageProps, 'onTap' | 'onError' | 'onLoad'> &
  NativeProps<'--size' | '--border-radius'>

const defaultProps = {
  fallback: <Fallback />,
  fit: 'cover',
}

export const Avatar: FC<AvatarProps> = (p) => {
  const props = mergeProps(defaultProps, p)

  return withNativeProps(
    props,
    <Image
      className={classPrefix}
      src={props.src}
      fallback={props.fallback}
      placeholder={props.fallback}
      fit={props.fit}
      onTap={props.onTap}
      onError={props.onError}
      onLoad={props.onLoad}
    />,
  )
}

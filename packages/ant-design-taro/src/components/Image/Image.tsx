import React, { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { View, Image as TImage } from '@tarojs/components'
import type {
  BaseEventOrig,
  ImageProps as TImageProps,
} from '@tarojs/components'
import { staged } from 'staged-components'

import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { useIsomorphicUpdateLayoutEffect } from '../../utils/use-isomorphic-update-layout-effect'
import { toCSSLength } from '../../utils/to-css-length'

import { Image as ImageIcon } from '../../icons'
import { BrokenImage } from '../../icons'

const classPrefix = `adt-image`

export type ImageProps = {
  id?: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: ReactNode
  fallback?: ReactNode
  loading?: boolean
  lazy?: boolean
  draggable?: boolean
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onContainerTap?: (event: BaseEventOrig) => void
} & NativeProps<'--width' | '--height'> &
  Pick<
    TImageProps,
    'src' | 'onTap' | 'catchTap' | 'onLoad' | 'onError' | 'onLongPress'
  >

const defaultProps = {
  fit: 'fill',
  placeholder: (
    <View className={`${classPrefix}-tip`}>
      <ImageIcon />
    </View>
  ),
  fallback: (
    <div className={`${classPrefix}-tip`}>
      <BrokenImage />
    </div>
  ),
  lazy: false,
  draggable: false,
}

export const Image = staged<ImageProps>((p) => {
  const props = mergeProps(defaultProps, p)

  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  let src: string = props.src
  // let srcSet: string | undefined = props.srcSet;

  const [initialized, setInitialized] = useState(!props.lazy)

  // src = initialized ? props.src : undefined;
  // srcSet = initialized ? props.srcSet : undefined;

  useIsomorphicUpdateLayoutEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  useEffect(() => {
    // for nextjs ssr
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [])

  function renderInner() {
    if (failed) {
      return <>{props.fallback}</>
    }
    const img = (
      <TImage
        ref={imgRef}
        id={props.id}
        className={`${classPrefix}-img`}
        src={src}
        onTap={props.onTap}
        onLoad={(e) => {
          setLoaded(true)
          props.onLoad?.(e)
        }}
        onError={(e) => {
          setFailed(true)
          props.onError?.(e)
        }}
        style={{
          objectFit: props.fit,
          display: loaded ? 'block' : 'none',
        }}
      />
    )
    return (
      <>
        {!loaded && props.placeholder}
        {img}
      </>
    )
  }

  const style: ImageProps['style'] = {}
  if (props.width) {
    style['--width'] = toCSSLength(props.width)
    style['width'] = toCSSLength(props.width)
  }
  if (props.height) {
    style['--height'] = toCSSLength(props.height)
    style['height'] = toCSSLength(props.height)
  }
  return withNativeProps(
    props,
    <View
      ref={ref}
      className={classPrefix}
      style={style}
      onTap={props.onContainerTap}
    >
      {/* {props.lazy && !initialized && (
        <LazyDetector
          onActive={() => {
            setInitialized(true)
          }}
        />
      )} */}
      {renderInner()}
    </View>,
  )
})

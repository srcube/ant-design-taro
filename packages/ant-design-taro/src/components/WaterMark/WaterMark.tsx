import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { getSystemInfo, createOffscreenCanvas } from '@tarojs/taro'
import type { Image, OffscreenCanvas } from '@tarojs/taro'
import { View } from '@tarojs/components'

import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adt-water-mark`

export type WaterMarkProps = {
  gapX?: number
  gapY?: number
  zIndex?: number
  width?: number
  height?: number
  rotate?: number
  image?: string
  imageWidth?: number
  imageHeight?: number
  content?: string | string[]
  fontColor?: string
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  fontWeight?: 'normal' | 'light' | 'weight' | number
  fontSize?: number | string
  fullPage?: boolean
} & NativeProps<'--z-index'>

const defaultProps = {
  fullPage: true,
}

const isH5 = () => process.env.TARO_ENV === 'h5'

export const WaterMark: FC<WaterMarkProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const {
    zIndex,
    gapX = 24,
    gapY = 48,
    width = 120,
    height = 64,
    rotate = -22,
    image,
    imageWidth = 120,
    imageHeight = 64,
    content,
    fontStyle = 'normal',
    fontWeight = 'normal',
    fontColor = 'rgba(0,0,0,.15)',
    fontSize = 14,
    fontFamily = 'sans-serif',
  } = props

  const [base64Url, setBase64Url] = useState('')

  useEffect(() => {
    draw()
  }, [
    gapX,
    gapY,
    rotate,
    fontStyle,
    fontWeight,
    width,
    height,
    fontFamily,
    fontColor,
    image,
    content,
    fontSize,
  ])

  const draw = async () => {
    const info = await getSystemInfo()

    const ratio = info.pixelRatio

    const canvasWidth = `${(gapX + width) * ratio}`
    const canvasHeight = `${(gapY + height) * ratio}`

    const markWidth = width * ratio
    const markHeight = height * ratio

    let canvas: HTMLCanvasElement | OffscreenCanvas | null
    let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null

    if (isH5()) {
      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')

      canvas.setAttribute('width', `${canvasWidth}px`)
      canvas.setAttribute('height', `${canvasHeight}px`)
    } else {
      canvas = createOffscreenCanvas({
        type: '2d',
        width: Number(canvasWidth),
        height: Number(canvasHeight),
      })
      ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D
    }

    if (ctx) {
      if (image) {
        ctx.translate(markWidth / 2, markHeight / 2)
        ctx.rotate((Math.PI / 180) * Number(rotate))

        let img: HTMLImageElement | Image

        if (isH5()) {
          img = new Image()
          img.crossOrigin = 'anonymous'
        } else {
          img = (canvas as OffscreenCanvas).createImage()
        }

        img.referrerPolicy = 'no-referrer'
        img.onload = () => {
          ctx.drawImage(
            img as CanvasImageSource,
            (-imageWidth * ratio) / 2,
            (-imageHeight * ratio) / 2,
            imageWidth * ratio,
            imageHeight * ratio,
          )
          ctx.restore()
          setBase64Url((canvas as HTMLCanvasElement).toDataURL())
        }
        img.src = image
      } else if (content) {
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        // 文字绕中间旋转
        ctx.translate(markWidth / 2, markHeight / 2)
        ctx.rotate((Math.PI / 180) * Number(rotate))

        const markSize = Number(fontSize) * ratio
        ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`
        ctx.fillStyle = fontColor
        if (Array.isArray(content)) {
          content.forEach((item: string, index: number) =>
            ctx.fillText(item, 0, index * markSize),
          )
        } else {
          ctx.fillText(content, 0, 0)
        }
        ctx.restore()
        setBase64Url((canvas as HTMLCanvasElement).toDataURL())
      }
    } else {
      throw new Error('Canvas is not supported in the current environment')
    }
  }

  return withNativeProps(
    props,
    <View
      className={cn(classPrefix, {
        [`${classPrefix}-full-page`]: props.fullPage,
      })}
      style={{
        zIndex,
        backgroundSize: `${gapX + width}px`,

        // Not give `url` if its empty. Which will cause 404 error.
        backgroundImage: base64Url === '' ? undefined : `url('${base64Url}')`,
      }}
    />,
  )
}

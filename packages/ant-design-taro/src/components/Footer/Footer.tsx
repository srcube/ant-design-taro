import React from 'react'
import type { FC, ReactNode } from 'react'
import cn from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

import Divider from '../Divider'
import { ITouchEvent, View } from '@tarojs/components'

const classPrefix = `adt-footer`

export type LinkItem = {
  text: string
  href: string
}

export type ChipItem = {
  text: ReactNode
  type?: 'plain' | 'link'
}

export type FooterProps = {
  label?: ReactNode
  links?: LinkItem[]
  content?: ReactNode
  chips?: ChipItem[]
  onChipClick?: (item: ChipItem, index: number) => void
  onLinkClick?: (item: LinkItem, index: number) => void
} & NativeProps<'--background-color'>

const defaultProps: FooterProps = {
  label: '',
  links: [],
  content: '',
  chips: [],
}

export const Footer: FC<FooterProps> = (p) => {
  const props = mergeProps(defaultProps, p)
  const { label, links, content, chips, onChipClick, onLinkClick } = props

  const clickChipItem = (item: ChipItem, index: number) => {
    if (chips?.length && item.type === 'link') {
      onChipClick?.(item, index)
    }
  }

  const clickLinkItem = (item: LinkItem, index: number, e: ITouchEvent) => {
    if (onLinkClick) {
      e.preventDefault()
      onLinkClick(item, index)
    }
  }
  return withNativeProps(
    props,
    <View className={cn(classPrefix)}>
      {label && (
        <View className={`${classPrefix}-label`}>
          <Divider>{label}</Divider>
        </View>
      )}
      {!!links?.length && (
        <View className={`${classPrefix}-links`}>
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <View
                data-rel='noopener noreferrer'
                onClick={(event) => clickLinkItem(link, index, event)}
              >
                {link.text}
              </View>
              {index !== links.length - 1 && <Divider direction='vertical' />}
            </React.Fragment>
          ))}
        </View>
      )}
      {content && <View className={`${classPrefix}-content`}>{content}</View>}
      {chips && chips.length > 0 && (
        <View className={`${classPrefix}-chips`}>
          {chips.map((chip, index) => (
            <View
              key={index}
              onClick={() => clickChipItem(chip, index)}
              className={cn(`${classPrefix}-chip`, {
                [`${classPrefix}-chip-link`]: chip.type === 'link',
              })}
            >
              {chip.text}
            </View>
          ))}
        </View>
      )}
    </View>,
  )
}

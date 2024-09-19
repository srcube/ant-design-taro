import { CSSProperties, memo } from 'react'
import { Text } from '@tarojs/components'

import { NativeProps, withNativeProps } from '../../utils/native-props'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox='0 0 30 30'><g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'><path d='M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z' fill='#000' transform='translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) '/></g></svg>`
const encodedSVG = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

export const Corner = memo<NativeProps>((props) => {
  const style: CSSProperties & { '--icon': string; '-webkit-mask'?: string } = {
    '--icon': `${encodedSVG}`,
    '-webkit-mask': 'var(--icon) 0 0/100% 100% no-repeat',
    mask: `${encodedSVG} 0 0/100% 100% no-repeat`,
    display: 'inline-block',
    // TODO: --item-border-radius
    width: '14px',
    height: '14px',
    backgroundColor: 'var(--adt-color-background)',
  }

  return withNativeProps(props, <Text style={style} />)
})

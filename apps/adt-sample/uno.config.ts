import { defineConfig, presetIcons, transformerCompileClass } from 'unocss'
import type { Preset } from 'unocss'
import { presetApplet, presetRemRpx } from 'unocss-applet'

const isApplet = process.env.TARO_ENV !== 'h5' ?? false
const presets: Preset[] = [presetIcons()]

if (isApplet) {
  presets.push(presetApplet())
  presets.push(presetRemRpx())
} else {
  presets.push(presetApplet())
  presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
  presets,
  transformers: [transformerCompileClass()],
})

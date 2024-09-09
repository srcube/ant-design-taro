import './Radio.less'

import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

import { Group } from './Group'
import { Radio } from './Radio'

export type { RadioProps, RadioValue } from './Radio'
export type { RadioGroupProps } from './Group'

export default attachPropertiesToComponent(Radio, {
  Group,
})

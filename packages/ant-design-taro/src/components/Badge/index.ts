import './Badge.less'
import { Badge, dot } from './Badge'

import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

export type { BadgeProps } from './Badge'

export default attachPropertiesToComponent(Badge, { dot })

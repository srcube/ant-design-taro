import './Collapse.less'

import { Collapse, CollapsePanel } from './Collapse'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

export type { CollapseProps, CollapsePanelProps } from './Collapse'

export default attachPropertiesToComponent(Collapse, {
  Panel: CollapsePanel,
})

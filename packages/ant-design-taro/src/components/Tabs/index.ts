import './Tabs.less'
import { Tab, Tabs } from './Tabs'

import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

export type { TabsProps, TabProps } from './Tabs'

export default attachPropertiesToComponent(Tabs, {
  Tab,
})

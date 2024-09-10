import './TabBar.less'
import { TabBar, TabBarItem } from './TabBar'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

export type { TabBarProps, TabBarItemProps } from './TabBar'

export default attachPropertiesToComponent(TabBar, {
  Item: TabBarItem,
})

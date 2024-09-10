import './SideBar.less'
import { SideBar, SideBarItem } from './SideBar'

import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'

export type { SideBarProps, SideBarItemProps } from './SideBar'

export default attachPropertiesToComponent(SideBar, {
  Item: SideBarItem,
})

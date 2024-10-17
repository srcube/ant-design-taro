import './List.less'
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component'
import { List } from './List'
import { ListItem } from './ListItem'

export type { ListProps, ListRef } from './List'
export type { ListItemProps } from './ListItem'

export default attachPropertiesToComponent(List, {
  Item: ListItem,
})

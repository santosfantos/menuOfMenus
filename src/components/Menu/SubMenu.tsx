import { FC, useContext } from "react";
import { isEmpty } from "lodash";

import MenuItem from "./MenuItem";
import { Item } from "../../models/menu";
import { MenusContext } from "../../store/menu.context";

const SubMenu: FC<{
  depthLevel: number;
  items: Array<Item>;
}> = (props) => {
  const { openedMenus } = useContext(MenusContext);

  return (
    <ul>
      {props.items.map((item, itemIndex) => {
        if (item == null) return;

        const itemkey = `item-${
          props.depthLevel
        }-${itemIndex}-${Date.now().toString()}`;
        const hasSubMenu = isEmpty(item.children) === true ? false : true;
        const isOpen = openedMenus[item.id];
        const depthLevel = props.depthLevel + 1;

        return (
          <li key={itemkey}>
            <MenuItem
              item={item}
              hasSubMenu={hasSubMenu}
              depthLevel={depthLevel}
            />
            {isOpen && (
              <SubMenu depthLevel={depthLevel} items={item.children} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;

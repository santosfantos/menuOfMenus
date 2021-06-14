import React, { FC } from "react";

import MenuItem from "./MenuItem";
import { Item } from "../../models/menu";

const SubMenu: FC<{
  depthLevel: number;
  items: Array<Item>;
  isOpen: boolean;
}> = (props) => {
  if (props.items == null) {
    return;
  }

  return (
    <ul>
      {props.items.map((item, index) => {
        const menuName = `sidebar-submenu-${props.depthLevel}-${index}`;
        const hasSubMenu = item.children != null ? true : false;

        return (
          <li>
            <MenuItem item={item} />
            {hasSubMenu && (
              <SubMenu
                depthLevel={props.depthLevel}
                items={item.children}
                isOpen={item.isOpen}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;

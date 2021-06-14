import { FC, useState } from "react";
import { isEmpty } from "lodash";
import MenuItem from "./MenuItem";
import { Item } from "../../models/menu";

const SubMenu: FC<{
  depthLevel: number;
  menuIndex: number;
  items?: Array<Item>;
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <ul>
      {props.items!.map((item, itemIndex) => {
        const itemkey = `item-${props.depthLevel}-${props.menuIndex}-${itemIndex}`;
        const hasSubMenu = isEmpty(item.children) === true ? false : true;
        const depthLevel = props.depthLevel + 1;

        return (
          <li key={itemkey}>
            <MenuItem
              id={item.id}
              item={item}
              hasSubMenu={hasSubMenu}
              onClick={onClickHandler}
              isOpen={isOpen}
              depthLevel={depthLevel}
            />
            {hasSubMenu && isOpen && (
              <SubMenu
                menuIndex={itemIndex}
                depthLevel={depthLevel}
                items={item.children}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;

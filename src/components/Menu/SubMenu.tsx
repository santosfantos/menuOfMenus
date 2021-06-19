import {FC, useContext} from "react";
import {isEmpty} from "lodash";

import MenuItem from "./MenuItem";
import {Item} from "../../models/menu";
import MenusContext from "../../store/menu-context";

import classes from './SubMenu.module.css';

const SubMenu: FC<{ depthLevel: number; items: Array<Item>; }> = (props) => {
    const {openedMenus} = useContext(MenusContext);
    const depthLevel    = props.depthLevel + 1;

    return (
        <ul className={classes.SubMenu}>
            {props.items.map((item, itemIndex) => {
                const itemKey    = `item-${props.depthLevel}-${itemIndex}-${Date.now().toString()}`;
                const hasSubMenu = isEmpty(item.children) === true ? false : true;
                const isOpen     = openedMenus[item.id];

                return (
                    <li key={itemKey}>
                        <MenuItem
                            item={item}
                            hasSubMenu={hasSubMenu}
                            depthLevel={depthLevel}
                        />
                        {isOpen && (
                            <SubMenu depthLevel={depthLevel} items={item.children}/>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default SubMenu;

import {FC, useContext} from "react";
import {isEmpty} from "lodash";

import MenuItem from "./MenuItem";
import {Item} from "../../models/menu";
import MenusContext from "../../store/menu-context";

import classes from './SubMenu.module.css';

const SubMenu: FC<{ depthLevel: number; items: Array<Item>; }> = (props) => {
    const depthLevel = props.depthLevel + 1;

    return (
        <ul className={`${classes.SubMenu} ${props.depthLevel === 0 ? classes.RootSubMenu : ''}`}>
            {props.items.map((item, itemIndex) => {
                if(item == null) {
                    return;
                }
                const itemKey    = `item-${props.depthLevel}-${itemIndex}-${Date.now().toString()}`;
                const hasSubMenu = isEmpty(item.children) === true ? false : true;

                return (
                    <li key={itemKey} className={classes.DropDownSubMenu}>
                        <MenuItem
                            item={item}
                            hasSubMenu={hasSubMenu}
                            depthLevel={depthLevel}
                        />
                        {hasSubMenu && (
                            <SubMenu depthLevel={depthLevel} items={item.children}/>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default SubMenu;

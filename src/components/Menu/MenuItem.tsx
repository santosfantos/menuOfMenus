import {FC, useContext, useState} from "react";
import {get} from "lodash";

import {Item} from "../../models/menu";
import MenusContext from "../../store/menu-context";
import ArrowIcon from "../UI/ArrowIcon";
import MenuItemActions from "./MenuItemActions";

import classes from "./MenuItem.module.css";

const MenuItem: FC<{ item: Item; depthLevel: number; hasSubMenu: boolean; }> = (props) => {
    const itemId    = get(props, "item.id");
    const itemLabel = get(props, "item.label");

    const {
              setMenuIsOpen,
              openedMenus
          }                         = useContext(MenusContext);
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [label, setLabel]         = useState<string>(itemLabel);

    const onClickHandler = () => {
        if(props.hasSubMenu === true) {
            const isOpen = !openedMenus[itemId];

            setMenuIsOpen(isOpen, itemId);
        }
    };

    const onEditModeChangeHandler = () => {
        setEditMode((prevState) => {
            return !prevState;
        });

        setLabel(itemLabel);
    };

    const onLabelChangeHandler = (label: string) => {
        setLabel(label);
    };

    const arrowIconStyle = openedMenus[itemId] ? {style: {transform: "rotate(180deg)"}} : "";

    return (
        <div className={classes.item} style={{marginLeft: `${props.depthLevel * 20}px`}}>
            <div className={classes.info}>
                <MenuItemActions
                    item={props.item}
                    label={label}
                    isEditMode={isEditMode}
                    editModeChange={onEditModeChangeHandler}
                />
                <input
                    disabled={!isEditMode}
                    value={label}
                    onChange={(event) => onLabelChangeHandler(event.target.value)}
                />
            </div>
            {props.hasSubMenu && (
                <ArrowIcon onClick={onClickHandler} style={arrowIconStyle}/>
            )}
        </div>
    );
};

export default MenuItem;

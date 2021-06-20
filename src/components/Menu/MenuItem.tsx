import {FC, useContext, useState} from "react";
import {get} from "lodash";

import {Item} from "../../models/menu";
import ArrowIcon from "../UI/ArrowIcon";
import MenuItemActions from "./MenuItemActions";

import classes from "./MenuItem.module.css";

const MenuItem: FC<{ item: Item; depthLevel: number; hasSubMenu: boolean; }> = (props) => {
    const itemLabel = get(props, "item.label");

    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [label, setLabel]         = useState<string>(itemLabel);

    const onEditModeChangeHandler = () => {
        setEditMode((prevState) => {
            return !prevState;
        });

        setLabel(itemLabel);
    };

    const onLabelChangeHandler = (label: string) => {
        setLabel(label);
    };

    const arrowIconStyle = {style: {transform: "rotate(270deg)"}}

    return (
        <div className={classes.item}>
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
                <ArrowIcon style={arrowIconStyle}/>
            )}
        </div>
    );
};

export default MenuItem;

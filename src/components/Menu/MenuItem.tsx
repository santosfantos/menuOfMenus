import React, { useContext, useState } from "react";
import { FC } from "react";
import { Item } from "../../models/menu";
import { MenusContext } from "../../store/menu.context";
import ArrowIcon from "../UI/ArrowIcon";
import MenuActions from "./MenuActions";

import classes from "./MenuItem.module.css";

const MenuItem: FC<{
  item: Item;
  depthLevel: number;
  hasSubMenu: boolean;
}> = (props) => {
  const { setIsOpen, openedMenus } = useContext(MenusContext);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(props.item.label);

  const onClickHandler = () => {
    if (props.hasSubMenu === true) {
      const isOpen = !openedMenus[props.item.id];

      setIsOpen(isOpen, props.item.id);
    }
  };

  const onEditModeChangeHandler = () => {
    setEditMode((prevState) => {
      return !prevState;
    });

    setLabel((prevState) => {
      return props.item.label;
    });
  };

  const onLabelChange = (label: string) => {
    setLabel((prevState) => {
      return label;
    });
  };

  const arrowIconStyle = openedMenus[props.item.id]
    ? { style: { transform: "rotate(180deg)" } }
    : "";

  return (
    <div className={classes.item}>
      <div className={classes.info}>
        <MenuActions
          item={props.item}
          label={label}
          isEditMode={isEditMode}
          editModeChange={onEditModeChangeHandler}
        />
        <input
          disabled={!isEditMode}
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
          style={{ marginLeft: `${props.depthLevel * 20}px` }}
        />
      </div>
      {props.hasSubMenu && (
        <ArrowIcon onClick={onClickHandler} style={arrowIconStyle} />
      )}
    </div>
  );
};

export default MenuItem;

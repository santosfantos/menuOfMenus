import { FC } from "react";
import { Item } from "../../models/menu";
import ArrowIcon from "../UI/ArrowIcon";
import MenuActions from "./MenuActions";

import classes from "./MenuItem.module.css";

const MenuItem: FC<{
  id: string;
  item: Item;
  depthLevel: number;
  isOpen: boolean;
  hasSubMenu: boolean;
  onClick: () => void;
}> = (props) => {
  const onClickHandler = () => {
    if (props.hasSubMenu === true) {
      return props.onClick();
    }
  };

  const arrowIconStyle =
    props.isOpen === true ? { style: { transform: "rotate(180deg)" } } : "";

  return (
    <div className={classes.item}>
      <div className={classes.info}>
        <MenuActions item={props.item} id={props.id} />
        <label style={{ paddingLeft: `${props.depthLevel * 10}px` }}>
          {props.item.label}
        </label>
      </div>
      {props.hasSubMenu && (
        <ArrowIcon onClick={onClickHandler} style={arrowIconStyle} />
      )}
    </div>
  );
};

export default MenuItem;

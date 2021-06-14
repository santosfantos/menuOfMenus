import { FC } from "react";
import { Item } from "../../models/menu";
import ArrowIcon from "../UI/ArrowIcon";

import classes from "./MenuItem.module.css";

const MenuItem: FC<{
  item: Item;
  depthLevel: number;
  isOpen: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <div className={classes.item}>
      <label style={{ paddingLeft: `${props.depthLevel * 10}px` }}>
        {props.item.label}
      </label>
      {props.item.children && (
        <ArrowIcon isOpen={props.isOpen} onClick={props.onClick} />
      )}
    </div>
  );
};

export default MenuItem;

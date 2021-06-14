import React from "react";
import { FC } from "react";
import { Item } from "../../models/menu";
import ArrowIcon from "../UI/ArrowIcon";

const MenuItem: FC<{ item: Item }> = (props) => {
  const onClickHandler = () => {
    console.log(props.item.label);
  };

  return (
    <div>
      <label>{props.item.label} </label>
      {props.item.children && (
        <ArrowIcon
          onClick={onClickHandler()}
          // toggle={activeMenus.includes(menuName)}
        />
      )}
    </div>
  );
};

export default MenuItem;

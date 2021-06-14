import { FC } from "react";
import { IconContext } from "react-icons";
import { TiDelete } from "react-icons/ti";

import classes from "./Icon.module.css";

const DeleteIcon: FC<{ style?: {}; onClick?: () => void }> = (props) => {
  return (
    <IconContext.Provider value={props.style || {}}>
      <span onClick={props.onClick} className={classes.icon}>
        <TiDelete />
      </span>
    </IconContext.Provider>
  );
};

export default DeleteIcon;

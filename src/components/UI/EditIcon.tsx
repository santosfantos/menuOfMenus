import { FC } from "react";
import { IconContext } from "react-icons";
import { MdEdit } from "react-icons/md";

import classes from "./Icon.module.css";

const EditIcon: FC<{ style?: {}; onClick?: () => void }> = (props) => {
  return (
    <IconContext.Provider value={props.style || {}}>
      <span onClick={props.onClick} className={classes.icon}>
        <MdEdit />
      </span>
    </IconContext.Provider>
  );
};

export default EditIcon;

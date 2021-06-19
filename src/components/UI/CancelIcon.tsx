import {FC} from "react";
import {IconContext} from "react-icons";
import {TiCancel} from "react-icons/ti";

import classes from "./Icon.module.css";

const AddIcon: FC<{ style?: {}; onClick?: () => void }> = (props) => {
    return (
        <IconContext.Provider value={props.style || {}}>
      <span onClick={props.onClick} className={classes.icon}>
        <TiCancel/>
      </span>
        </IconContext.Provider>
    );
};

export default AddIcon;

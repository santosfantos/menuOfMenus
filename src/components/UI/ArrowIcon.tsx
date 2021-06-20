import {FC} from "react";
import {RiArrowDownSFill} from "react-icons/ri";
import {IconContext} from "react-icons";

import classes from "./ArrowIcon.module.css";

const ArrowIcon: FC<{ style?: {}; onClick?: () => void }> = (props) => {
    return (
        <IconContext.Provider value={props.style || {}}>
      <span onClick={props.onClick} className={classes.icon}>
        <RiArrowDownSFill/>
      </span>
        </IconContext.Provider>
    );
};

export default ArrowIcon;

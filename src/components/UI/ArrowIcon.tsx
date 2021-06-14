import { FC } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { IconContext } from "react-icons";

import classes from "./ArrowIcon.module.css";

const ArrowIcon: FC<{ onClick: () => void; isOpen: boolean }> = (props) => {
  const arrowDirection =
    props.isOpen === true ? { style: { transform: "rotate(180deg)" } } : {};

  return (
    <IconContext.Provider value={arrowDirection}>
      <span className={classes.icon} onClick={props.onClick}>
        <RiArrowDownSFill />
      </span>
    </IconContext.Provider>
  );
};

export default ArrowIcon;

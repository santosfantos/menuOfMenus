import { FC, useContext } from "react";
import { Item } from "../../models/menu";
import { MenusContext } from "../../store/menu.context";
import AddIcon from "../UI/AddIcon";
import DeleteIcon from "../UI/DeleteIcon";
import EditIcon from "../UI/EditIcon";

import classes from "./MenuActions.module.css";

const MenuActions: FC<{ item: Item; id: string }> = (props) => {
  const { removeItem } = useContext(MenusContext);

  const onDeleteHandler = () => {
    removeItem(props.id);
  };

  const onAddHandler = () => {};

  const onEditHandler = () => {};

  return (
    <div className={classes.actions}>
      <DeleteIcon onClick={onDeleteHandler} />
      <EditIcon onClick={onEditHandler} />
      <AddIcon onClick={onAddHandler} />
    </div>
  );
};

export default MenuActions;

import { FC, useContext } from "react";

import { Item } from "../../models/menu";
import { MenusContext } from "../../store/menu.context";

import AddIcon from "../UI/AddIcon";
import ApproveIcon from "../UI/ApproveIcon";
import CancelIcon from "../UI/CancelIcon";
import DeleteIcon from "../UI/DeleteIcon";
import EditIcon from "../UI/EditIcon";

import classes from "./MenuActions.module.css";

const MenuActions: FC<{
  item: Item;
  label: string;
  isEditMode: boolean;
  editModeChange: () => void;
}> = (props) => {
  const { removeItem, addItem, editItem } = useContext(MenusContext);

  const onDeleteHandler = async () => {
    removeItem(props.item.id);
  };

  const onAddHandler = async () => {
    addItem(props.item, "new");
  };

  const onCancelHandler = () => {
    props.editModeChange();
  };

  const onConfirmHandler = async () => {
    props.editModeChange();
    editItem(props.item.id, props.label);
  };

  return (
    <div className={classes.actions}>
      {!props.isEditMode && (
        <>
          <DeleteIcon onClick={onDeleteHandler} />
          <EditIcon onClick={props.editModeChange} />
          <AddIcon onClick={onAddHandler} />
        </>
      )}
      {props.isEditMode && (
        <>
          <CancelIcon onClick={onCancelHandler} />
          <ApproveIcon onClick={onConfirmHandler} />
        </>
      )}
    </div>
  );
};

export default MenuActions;

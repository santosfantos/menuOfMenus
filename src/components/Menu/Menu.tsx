import { useContext, useState, useCallback, useEffect } from "react";
import { Item } from "../../models/menu";
import SubMenu from "./SubMenu";

import classes from "./Menu.module.css";
import { MenusContext } from "../../store/menu.context";

const Menu = () => {
  const { setItems, items } = useContext(MenusContext);

  // const fetchItems = useCallback(() => {
  //   // setIsLoading(true);
  //   setItems(menusRoot);
  //   // try {
  //   //   const response = await api.getTodos();
  //   //   setItems(response.data);
  //   // } catch (error) {
  //   //   setError(error.message);
  //   // } finally {
  //   //   setIsLoading(false);
  //   // }
  // }, [setItems, menusRoot]);

  // useEffect(() => {
  //   fetchItems();
  // }, [fetchItems]);

  return (
    <div className={classes.menu}>
      <SubMenu depthLevel={0} items={items.children}></SubMenu>
    </div>
  );
};

export default Menu;

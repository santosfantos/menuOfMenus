import { FC, useContext, Fragment, useState } from "react";
import { Item } from "../../models/menu";
import SubMenu from "./SubMenu";

import classes from "./Menu.module.css";

const Menu = () => {
  const menus: Array<Item> = [
    {
      label: "Menu 1",
    },
    {
      label: "Menu 2",
      children: [
        {
          label: "Sub Menu 1",
          children: [
            {
              label: "Sub Sub Menu 1",
              children: [
                {
                  label: "Sub Sub Sub Menu 1",
                },
              ],
            },
          ],
        },
        {
          label: "Sub Menu 2",
        },
      ],
    },
  ];

  //   const [menus, setMenus] = useState([]);

  // const handleMenuClick = data => {
  //   console.log(data);
  // };

  // const handleArrowClick = menuName => {
  //   let newActiveMenus = [...activeMenus];

  //   if (newActiveMenus.includes(menuName)) {
  //     var index = newActiveMenus.indexOf(menuName);
  //     if (index > -1) {
  //       newActiveMenus.splice(index, 1);
  //     }
  //   } else {
  //     newActiveMenus.push(menuName);
  //   }

  //   setActiveMenus(newActiveMenus);
  // };

  return (
    <div className={classes.menu}>
      <SubMenu depthLevel={0} items={menus} menuIndex={0}></SubMenu>
    </div>
  );
};

export default Menu;

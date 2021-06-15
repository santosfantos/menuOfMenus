import { createContext, FC, useState } from "react";
import { Item } from "../models/menu";

import { isArray } from "lodash";

type MenusContextObj = {
  openedMenus: { [key: string]: boolean };
  items: Item;
  error: string | null;
  isLoading: boolean;
  addItem: (parent: Item, label: string) => void;
  removeItem: (id: string) => void;
  editItem: (id: string, label: string) => void;
  setIsOpen: (isOpen: boolean, id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setItems: (item: Item) => void;
};

export const MenusContext = createContext<MenusContextObj>({
  openedMenus: {},
  items: { id: "root", label: "menu" },
  error: null,
  isLoading: false,
  addItem: (parent: Item, label: string) => {},
  removeItem: (id: string) => {},
  editItem: (id: string, label: string) => {},
  setIsOpen: (isOpen: boolean, id: string) => {},
  setIsLoading: (loading: boolean) => {},
  setError: (error: string | null) => {},
  setItems: (item: Item) => {},
});

const MenusContextProvider: FC = (props) => {
  const menusRoot: Item = {
    id: "root",
    label: "Menu",
    children: [
      {
        id: "test3",
        label: "Sub Menu 1",
        children: [
          {
            id: "test4",
            label: "Sub Sub Menu 1",
          },
        ],
      },
      {
        id: "test1",
        label: "Menu 1",
        children: [
          {
            id: "test444",
            label: "Sub Sub Menu 1",
          },
        ],
      },
    ],
  };

  const [items, setItems] = useState<Item>(menusRoot);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openedMenus, setIsOpen] = useState<{}>({});

  const addItemHandler = (parent: Item, label: string) => {
    const newItem: Item = {
      label,
      id: Date.now().toString(),
    };

    setItems((prevItems) => {
      if (parent.children == null) {
        parent.children = [];
      }

      let retVal = deepAdd(prevItems, parent.id, newItem);

      return retVal;
    });
  };

  const removeItemHandler = (id: string) => {
    setItems((prevState) => {
      const currentItems = deepOmit(prevState, id) as Item;

      return currentItems;
    });
  };

  const editItemHandler = (id: string, label: string) => {
    setItems((prevState) => {
      const currentItems = deepEdit(prevState, id, label) as Item;

      return currentItems;
    });
  };

  const setIsLoadingHandler = (loading: boolean) => {
    setIsLoading((prevState) => {
      return loading;
    });
  };

  const setErrorHandler = (error: string | null) => {
    setError((prevState) => {
      return error;
    });
  };

  const setItemsHandler = (items: Item) => {
    setItems((prevState) => {
      return items;
    });
  };

  const setIsOpenHandler = (isOpen: boolean, id: string) => {
    setIsOpen((prevState) => {
      return { ...prevState, [id]: isOpen };
    });
  };

  const contextValue: MenusContextObj = {
    openedMenus: openedMenus,
    items: items,
    error: error,
    isLoading: isLoading,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    editItem: editItemHandler,
    setIsOpen: setIsOpenHandler,
    setIsLoading: setIsLoadingHandler,
    setError: setErrorHandler,
    setItems: setItemsHandler,
  };

  return (
    <MenusContext.Provider value={contextValue}>
      {props.children}
    </MenusContext.Provider>
  );
};

const deepOmit = (inObject: any, id: string) => {
  let outObject: { [index: string]: any }, value, key;

  if (inObject["id"] === id) {
    return null;
  }

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  // Create an array or object to hold the values
  outObject = isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    value = deepOmit(value, id);

    if (value != null) {
      outObject[key] = value;
    }
  }

  return outObject;
};

const deepAdd = (inObject: any, parentId: string, newItem: Item) => {
  let outObject: { [index: string]: any }, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  // Create an array or object to hold the values
  outObject = isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    value = deepAdd(value, parentId, newItem);

    if (inObject["id"] === parentId && key === "children") {
      value.push(newItem);
    }

    outObject[key] = value;
  }

  return outObject;
};

const deepEdit = (inObject: any, id: string, label: string) => {
  let outObject: { [index: string]: any }, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  // Create an array or object to hold the values
  outObject = isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    value = deepEdit(value, id, label);

    if (inObject["id"] === id && key === "label") {
      value = label;
    }

    outObject[key] = value;
  }

  return outObject;
};

export default MenusContextProvider;

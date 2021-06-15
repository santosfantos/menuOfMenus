import { createContext, FC, useEffect, useState } from "react";
import { Item } from "../models/menu";

import { isArray } from "lodash";
import api from "../api/api";

type MenusContextObj = {
  openedMenus: { [key: string]: boolean };
  rootItem: Item | null;
  error: string | null;
  addMenu: (item: Item) => void;
  addItem: (parent: Item, label: string) => void;
  removeItem: (id: string) => void;
  editItem: (id: string, label: string) => void;
  setIsOpen: (isOpen: boolean, id: string) => void;
  setError: (error: string | null) => void;
  setRootItem: (item: Item) => void;
};

export const MenusContext = createContext<MenusContextObj>({
  openedMenus: {},
  rootItem: null,
  error: null,
  addMenu: (item: Item) => {},
  addItem: (parent: Item, label: string) => {},
  removeItem: (id: string) => {},
  editItem: (id: string, label: string) => {},
  setIsOpen: (isOpen: boolean, id: string) => {},
  setError: (error: string | null) => {},
  setRootItem: (item: Item) => {},
});

const MenusContextProvider: FC = (props) => {
  const [rootItem, setRootItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openedMenus, setIsOpen] = useState<{}>({});

  const update = async (rootItem: Item | null) => {
    try {
      await api.updateMenuItems(rootItem);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    update(rootItem);
  }, [rootItem]);

  const addMenuHandler = (item: Item) => {
    setRootItem((prevState) => {
      return item;
    });
  };

  const addItemHandler = (parent: Item, label: string) => {
    const newItem: Item = {
      label,
      id: Date.now().toString(),
      children: [],
    };

    setRootItem((prevItems) => {
      if (parent.children == null) {
        parent.children = [];
      }

      const currentItem = deepAdd(prevItems, parent.id, newItem);

      return currentItem;
    });
  };

  const removeItemHandler = (id: string) => {
    setRootItem((prevState) => {
      const currentItem = deepOmit(prevState, id) as Item;

      return currentItem;
    });
  };

  const editItemHandler = (id: string, label: string) => {
    setRootItem((prevState) => {
      const currentItem = deepEdit(prevState, id, label) as Item;

      return currentItem;
    });
  };

  const setErrorHandler = (error: string | null) => {
    setError((prevState) => {
      return error;
    });
  };

  const setRootItemHandler = (items: Item) => {
    setRootItem((prevState) => {
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
    rootItem: rootItem,
    error: error,
    addMenu: addMenuHandler,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    editItem: editItemHandler,
    setIsOpen: setIsOpenHandler,
    setError: setErrorHandler,
    setRootItem: setRootItemHandler,
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

  outObject = isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

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

  outObject = isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    value = deepEdit(value, id, label);

    if (inObject["id"] === id && key === "label") {
      value = label;
    }

    outObject[key] = value;
  }

  return outObject;
};

export default MenusContextProvider;

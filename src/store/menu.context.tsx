import { createContext, FC, useState } from "react";
import { Item } from "../models/menu";

type MenusContextObj = {
  items: Item;
  error: string | null;
  isLoading: boolean;
  //   addItem: (label: string) => void;
  removeItem: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setItems: (item: Item) => void;
};

export const MenusContext = createContext<MenusContextObj>({
  items: { id: "root", label: "menu" },
  error: null,
  isLoading: false,
  //   addItem: (label: string) => {},
  removeItem: (id: string) => {},
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
            children: [
              {
                id: "test5",
                label: "Sub Sub Sub Menu 1",
              },
            ],
          },
        ],
      },
      {
        id: "test1",
        label: "Menu 1",
      },
      {
        id: "test6",
        label: "Sub Menu 2",
      },
    ],
  };

  const [items, setItems] = useState<Item>(menusRoot);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const addTodoHandler = (todoText: string, priority: Priority) => {
  //     const newTodo = new Todo(todoText, priority);

  //     setItems((prevItems) => {
  //       let retVal = sortTodos(prevTodos.concat(newTodo));

  //       return retVal;
  //     });
  //   };

  const removeItemHandler = (id: string) => {
    setItems((prevState) => {
      const currentItems = deepCopyFunction(prevState, id) as Item;

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

  const contextValue: MenusContextObj = {
    items: items,
    error: error,
    isLoading: isLoading,
    // addTodo: addTodoHandler,
    removeItem: removeItemHandler,
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

const deepCopyFunction = (inObject: any, id: string) => {
  let outObject: { [index: string]: any }, value, key;

  if (inObject["id"] === id) {
    return null;
  }

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    value = deepCopyFunction(value, id);

    if (value != null) {
      outObject[key] = value;
    }
  }

  return outObject;
};

export default MenusContextProvider;

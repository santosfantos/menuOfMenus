import {createContext} from "react";
import {Item} from "../models/menu";

export type MenusContextObj = {
    rootItem: Item | null;
    error: string | null;
    addMenu: (item: Item) => void;
    addItem: (parent: Item, label: string) => void;
    removeItem: (id: string) => void;
    editItem: (id: string, label: string) => void;
    setError: (error: string | null) => void;
    setRootItem: (item: Item) => void;
};

const MenusContext = createContext<MenusContextObj>({
    rootItem:    null,
    error:       null,
    addMenu:     (item: Item) => {
    },
    addItem:     (parent: Item, label: string) => {
    },
    removeItem:  (id: string) => {
    },
    editItem:    (id: string, label: string) => {
    },
    setError:    (error: string | null) => {
    },
    setRootItem: (item: Item) => {
    },
});

export default MenusContext;

import {FC, useEffect, useState} from 'react';
import {Item} from '../models/menu';
import api from '../api/api';
import {isArray} from 'lodash';
import MenusContext, {MenusContextObj} from './menu-context';

const MenusContextProvider: FC = (props) => {
    const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
    const [rootItem, setRootItem]               = useState<Item | null>(null);
    const [error, setError]                     = useState<string | null>(null);
    const [openedMenus, setMenuIsOpen]          = useState<{}>({});

    const update = async (rootItem: Item | null) => {
        if(isInitialRender === true) {
            setIsInitialRender(false);
        }
        else {
            try {
                await api.updateMenuItems(rootItem);
            }
            catch(error) {
                setError(error.message);
            }
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
            id:       Date.now().toString(),
            children: [],
        };

        if(parent.children == null) {
            parent.children = [];
        }

        const currentItem = deepAdd(rootItem, parent.id, newItem);

        setRootItem(currentItem);
    };

    const removeItemHandler = (id: string) => {
        const currentItem = deepOmit(rootItem, id) as Item;

        setRootItem(currentItem);
    };

    const editItemHandler = (id: string, label: string) => {
        const currentItem = deepEdit(rootItem, id, label) as Item;

        setRootItem(currentItem);
    };

    const setErrorHandler = (error: string | null) => {
        setError(error);
    };

    const setRootItemHandler = (items: Item) => {
        setRootItem(items);
    };

    const setMenuIsOpenHandler = (isOpen: boolean, id: string) => {
        setMenuIsOpen((prevState) => {
            return {
                ...prevState,
                [id]: isOpen
            };
        });
    };

    const contextValue: MenusContextObj = {
        openedMenus:   openedMenus,
        rootItem:      rootItem,
        error:         error,
        addMenu:       addMenuHandler,
        addItem:       addItemHandler,
        removeItem:    removeItemHandler,
        editItem:      editItemHandler,
        setMenuIsOpen: setMenuIsOpenHandler,
        setError:      setErrorHandler,
        setRootItem:   setRootItemHandler,
    };

    return (
        <MenusContext.Provider value={contextValue}>
            {props.children}
        </MenusContext.Provider>
    );
};

const deepOmit = (inObject: any, id: string) => {
    let outObject: { [index: string]: any }, value, key;

    if(inObject.id === id) {
        return null;
    }

    if(typeof inObject !== "object" || inObject === null) {
        return inObject;
    }

    // Create an array or object to hold the values
    outObject = isArray(inObject) ? [] : {};

    for(key in inObject) {
        value = inObject[key];

        // Recursively (deep) copy for nested objects, including arrays
        value = deepOmit(value, id);

        if(value != null) {
            outObject[key] = value;
        }
    }

    return outObject;
};

const deepAdd = (inObject: any, parentId: string, newItem: Item) => {
    let outObject: { [index: string]: any }, value, key;

    if(typeof inObject !== "object" || inObject === null) {
        return inObject;
    }

    outObject = isArray(inObject) ? [] : {};

    for(key in inObject) {
        value = inObject[key];

        value = deepAdd(value, parentId, newItem);

        if(inObject.id === parentId && key === "children") {
            value.push(newItem);
        }

        outObject[key] = value;
    }

    return outObject;
};

const deepEdit = (inObject: any, id: string, label: string) => {
    let outObject: { [index: string]: any }, value, key;

    if(typeof inObject !== "object" || inObject === null) {
        return inObject;
    }

    outObject = isArray(inObject) ? [] : {};

    for(key in inObject) {
        value = inObject[key];

        value = deepEdit(value, id, label);

        if(inObject.id === id && key === "label") {
            value = label;
        }

        outObject[key] = value;
    }

    return outObject;
};

export default MenusContextProvider;

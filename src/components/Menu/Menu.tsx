import {useContext, useCallback, useEffect} from "react";
import {get} from "lodash";

import MenusContext from "../../store/menu-context";
import api from "../../api/api";

import SubMenu from "./SubMenu";
import Button from "../UI/Button";
import {Item} from "../../models/menu";

import classes from "./Menu.module.css";

const Menu = () => {
    const {
              setError,
              setRootItem,
              addMenu,
              rootItem,
              error
          } = useContext(
        MenusContext
    );

    const fetchItems = useCallback(async () => {
        try {
            let rootMenu;
            const response = await api.getMenuItems();

            rootMenu = get(response, `data.item`);

            setRootItem(rootMenu);
        }
        catch(error) {
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const onClickHandler = () => {
        try {
            const item: Item = {
                label: "root",
                id: Date.now().toString(),
                children: [],
            };

            addMenu(item);
        }
        catch(error) {
            setError(error.message);
        }
    };

    return (
        <div className={classes.menu}>
            {error && <p>{error}</p>}
            {rootItem != null && (
                <SubMenu depthLevel={0} items={[rootItem]}></SubMenu>
            )}
            {!error && rootItem == null && (
                <Button onClick={onClickHandler}>Add Menu</Button>
            )}
        </div>
    );
};

export default Menu;

import Menu from "./components/Menu/Menu";
import MenusContextProvider from "./store/MenuProvider";

function App() {
    return (
        <MenusContextProvider>
            <Menu/>
        </MenusContextProvider>
    );
}

export default App;

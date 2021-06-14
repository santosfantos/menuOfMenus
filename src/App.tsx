import Menu from "./components/Menu/Menu";
import MenusContextProvider from "./store/menu.context";

function App() {
  return (
    <MenusContextProvider>
      <Menu />
    </MenusContextProvider>
  );
}

export default App;

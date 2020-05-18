import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./store";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;

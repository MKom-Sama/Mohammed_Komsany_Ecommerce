import react, { Component } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Topbar from "./components/Topbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "women", // women || men || kids
      currency: "USD", // USD || GBP || JPY
      cart:[]
    };
  }
  setCategory = (cat) => this.setState({ category: cat });
  setCurrency = (cur) => this.setState({ currency: cur });
  // cart functions

  render() {
    return (
      <div>
        <BrowserRouter>
          <Topbar
            setCategory={this.setCategory}
            category={this.state.category}
            setCurrency={this.setCurrency}
            currency={this.state.currency}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductList
                  category={this.state.category}
                  currency={this.state.currency}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails currency={this.state.currency} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

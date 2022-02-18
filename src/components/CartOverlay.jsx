import React, { Component } from "react";
import styled from "styled-components";

// Icons
import cartIcon from "../assets/svg/cart.svg";
import CO_ItemList from "./CO_ItemList";

import { getCurrencySymbol } from "../utils";
import { Link } from "react-router-dom";

export default class CartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  myRef = React.createRef();
  handleClickOutCartOverlay = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.props.closeOverlay();
    }
  };

  componentDidUpdate() {
    if (this.props.visCartOverlay) {
      document.addEventListener("click", this.handleClickOutCartOverlay, true);
    } else {
      document.removeEventListener(
        "click",
        this.handleClickOutCartOverlay,
        true
      );
    }
  }
  render() {
    return (
      <span ref={this.myRef}>
        <StyledIcon
          src={cartIcon}
          className="non-drag"
          alt="cart-icon"
          onClick={() => this.props.togCartOverlay()}
        />
        <DropDownContent
          visible={this.props.visCartOverlay}
          className="fade-on-display"
          ref={this.myRef}
        >
          <Text>My Bag,</Text> {this.props.getItemCount()} items
          <br />
          <CO_ItemList
            cart={this.props.cart}
            currency={this.props.currency}
            modifyItemCount={this.props.modifyItemCount}
            modifyAttr={this.props.modifyAttr}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <strong style={{ fontFamily: "Roboto Condensed" }}>Total</strong>
            <strong style={{ fontWeight: "bold" }}>
              {getCurrencySymbol(this.props.currency)}
              {this.props.getCartTotalPrice()}
            </strong>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "4%",
              bottom: "3.70%",
            }}
          >
            <ViewBag>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "#1D1F22" }}
                onClick={() => this.props.closeOverlay()}
              >
                VIEW BAG
              </Link>
            </ViewBag>

            <CheckoutButton>CHECKOUT</CheckoutButton>
          </div>
        </DropDownContent>
      </span>
    );
  }
}
// Styles
const StyledIcon = styled.img`
  cursor: pointer;
`;

const DropDownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 6.04%;
  top: 9.125%;
  padding: 1%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  max-height: 540px;
  min-height: 540px;
  max-width: 325px;
  min-width: 325px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #ffffff;
`;

const Text = styled.span`
  font-style: bold;
  font-size: 16px;
  color: #1d1f22;
  font-weight: 700px;
`;
const StyledButton = styled.button`
  all: unset;
  padding: 15px;
  flex: 1;
  max-width: 50%;
  min-width: 45%;
  text-align: center;
  margin: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;

const ViewBag = styled(StyledButton)`
  border: 1px solid #1d1f22;
  font-weight: 600px;
`;
const CheckoutButton = styled(StyledButton)`
  background: #5ece7b;
  color: #ffffff;
`;

import React, { useContext, useRef } from "react";
import AddToBasketBtn from "components/AddToBasketBtn";
import GetIcon from "components/GetIcon";
import Card from "components/Card";
import Title from "components/Title";
import clsx from "clsx";
import emptyCardImg from "images/empty_cart.svg";
import { BasketContext } from "context/BasketContext";
import useMakeRequest from "hooks/useMakeRequest";
import BasketItem from "components/BasketItem";
import { useParams, Link } from "react-router-dom";
import detectEthereumProvider from "@metamask/detect-provider";
import styles from "styles/BasketSidebar.module.scss";

const Cart = () => {
  const {
    basketIsOpen,
    setBasketIsOpen,
    basketItems,
    setBasketItems,
    basketTotal: _basketTotal,
    setBasketTotal,
  } = useContext(BasketContext);
  const container = useRef();

  const handlePayment = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      try {
        const transactionParameters = {
          to: "0xe3Fd565F444B6e67a41384E2B8741385C0236DBE", // Replace with the merchant's wallet address
          from: account,
          value: ((parseFloat(_basketTotal) * 1e18) / 10000000).toString(16), // Convert total to Wei (1 Ether = 1e18 Wei)
          chainId: "0x11155111", // Ethereum Main Network ID
        };

        // Log the amount being transferred
        console.log("Transferring amount in Ether:", _basketTotal.toFixed(2));

        const txHash = await provider.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });

        console.log("Transaction sent with hash: ", txHash);
        // Clear the basket after successful transaction
        setBasketItems([]);
        setBasketTotal(0);
      } catch (error) {
        console.error("Payment failed: ", error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Title txt="your basket" size={20} transform="uppercase" />
            {<h2>Your basket has got {basketItems.length} items</h2>}
          </div>
        </div>
        {basketItems.length > 0 ? (
          <>
            <div className={styles.items}>
              {basketItems?.map((item, key) => (
                <BasketItem data={item} key={key} />
              ))}
            </div>
            <div className={styles.basketTotal}>
              <div className={styles.total}>
                <Title txt="basket summary" size={23} transform="uppercase" />
                <GetIcon icon="BsFillCartCheckFill" size={25} />
              </div>
              <div className={styles.totalPrice}>
                <small>total Amount</small>
                <div className={styles.price}>
                  <span>{_basketTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className={styles.centered}>
                <button
                  type="button"
                  onClick={handlePayment}
                  className={`${styles.confirmBtn} ${styles.large}`}
                >
                  Confirm the basket
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyBasket}>
            <img src={emptyCardImg} alt="" />
            <Title txt="your basket is empty" size={23} transform="uppercase" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
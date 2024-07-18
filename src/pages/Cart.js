import AddToBasketBtn from "components/AddToBasketBtn";
import GetIcon from "components/GetIcon";
import Card from "components/Card";
import Title from "components/Title";
import clsx from "clsx";
import emptyCardImg from "images/empty_cart.svg";
import { BasketContext } from "context/BasketContext";
import useMakeRequest from "hooks/useMakeRequest";
import { useContext } from "react";
import BasketItem from "components/BasketItem";
import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
// import styles from "styles/BasketItem.module.scss";
import styles from "styles/BasketSidebar.module.scss";

const Cart = () => {

const { basketIsOpen, setBasketIsOpen, basketItems, setBasketItems, basketTotal: _basketTotal, setBasketTotal } = useContext(BasketContext);
  const container = useRef();

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
          <button type="button" onClick={() => {setBasketItems([]); setBasketTotal(0)}}className={`${styles.confirmBtn} ${styles.large}`}>
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

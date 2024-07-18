    import styles from "styles/Card.module.scss";
    import { Link } from "react-router-dom";

    import AddToBasketBtn from "components/AddToBasketBtn";

    const Card = ({ product, onAddToCart}) => {
      return (
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={product.image} alt="" />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>
                <h3>{product.title}</h3>
              </div>
              <div className={styles.footer}>
                <div className={styles.price}>
                  ${product.price.toFixed(2)} 
                </div>
                <div className={styles.btn}>
                  <AddToBasketBtn data={product} onAddToCart={onAddToCart}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default Card;

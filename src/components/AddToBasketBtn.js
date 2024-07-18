import styles from "styles/AddToBasketBtn.module.scss";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import GetIcon from "components/GetIcon";

const AddToBasketBtn = ({ data: product, onAddToCart }) => {
  const { basketItems, setBasketItems, setBasketTotal, currentQuantity } = useContext(BasketContext);

  const addToBasket = (product) => {
    // Check if the product already exists in the basket
    const existingProduct = basketItems.find(item => item.id === product.id);

    if (existingProduct) {
      // If product exists, update its quantity in UI but not the basket
      return; // Exit function to prevent adding duplicate items
    } else {
      // If product is new, add it to the basket and update total
      setBasketItems((oldState) => [
        ...oldState,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1, // Set quantity to 1 for a single item
        },
      ]);
      setBasketTotal((oldTotal) => oldTotal + product.price); // Update total only once
      onAddToCart(product.id);
    }
  };

  return (
    <button
      className={styles.addToBasket}
      onClick={(e) => {
        e.preventDefault();
        addToBasket(product);
      }}
    >
      <GetIcon icon="BsFillCartPlusFill" size={18} /> Add to Cart
    </button>
  );
};

export default AddToBasketBtn;

import styles from "styles/Home.module.scss";
import Card from "components/Card";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import { useState, useEffect } from "react";

const Home = () => {
  const { data, error } = useMakeRequest("https://fakestoreapi.com/products/");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const filteredProducts = data.filter(product => !cartItems.includes(product.id));
      setProducts(filteredProducts);
    }
  }, [data]);

  const handleAddToCart = (productId) => {

    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);

    // Save the updated cart items to local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  };

  if (!data) {
    if (error) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Title txt={error} size={25} transform="uppercase" />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Title txt="Loading..." size={25} transform="uppercase" />
        </div>
      );
    }
  } else {
    return (
      <section className={styles.home}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.title}>
              <Title txt="all products" color="#171717" size={22} transform="uppercase" />
            </div>
          </div>
          <div className={styles.row}>
            {products.map((product, key) => (
              <Card product={product} key={key} onAddToCart={() => handleAddToCart(product.id)} />
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Home;

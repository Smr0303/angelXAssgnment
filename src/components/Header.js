import styles from "styles/Header.module.scss";
import { Link } from "react-router-dom";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import CategoryItem from "./CategoryItem";
import useMakeRequest from "hooks/useMakeRequest";
import { BasketContext } from "context/BasketContext";
import { useContext, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const Header = () => {
  const result = useMakeRequest("https://fakestoreapi.com/products/categories");
  const { basketItems, setBasketIsOpen } = useContext(BasketContext);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      console.error("Please install MetaMask!");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h2>react store</h2>
        </Link>
      </div>

      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link
                to="/Cart"
                className={clsx(styles.basketBtn, styles.a)}
                onClick={(e) => {
                  // e.preventDefault();
                }}
              >
                <GetIcon icon="BsCart4" size={25} color="#ffffff" />
                {basketItems.length > 0 && (
                  <span className={styles.basketLength}>
                    {" "}
                    {basketItems.length}{" "}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button
                className={styles.connectWalletBtn}
                onClick={connectWallet}
              >
                {account
                  ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`: "Connect Wallet"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
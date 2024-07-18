import styles from "styles/App.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";

// PAGES
import Home from "pages/Home";
import Cart from "pages/Cart";

// COMPONENTS
import Header from "components/Header";
import BasketSidebar from "components/BasketSidebar";

// CONTEXT
import BasketContextProvider from "context/BasketContext";

const App = () => {

  return (
    <Router>
      <BasketContextProvider>
          <Header />
          <main className={styles.main}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Cart" component = {Cart}/>
          </Switch>
          </main>
        <BasketSidebar />
      </BasketContextProvider>
    </Router>
  );
};

export default App;

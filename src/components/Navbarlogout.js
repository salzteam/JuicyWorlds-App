import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/NavbarLogout.module.css";
import logo from "../assets/img/logo.WebP";
import withNavigate from "../helpers/withNavigate";

class NavbarMobile extends React.Component {
  render() {
    return (
      <nav class={`${styles["nav-pc"]} ${styles["home-nav"]}`}>
        <div class={styles.navBrand}>
          <Link to={"/"} aria-label="home">
            <img src={logo} alt="" />
          </Link>
          <p>Juicy Worlds</p>
        </div>
        <div class={styles.navList}>
          <ul>
            <Link to={"/"} aria-label="home">
              <ul>
                <li class={styles.home}>Home</li>
              </ul>
            </Link>
            <Link to={"/product"} aria-label="product">
              <ul>
                <li class={styles["nav-text"]}>Product</li>
              </ul>
            </Link>
            <Link to={"/payment"} aria-label="cart">
              <ul>
                <li class={styles["nav-text"]}>Your Cart</li>
              </ul>
            </Link>
            <Link to={"/history"} aria-label="history">
              <ul>
                <li class={styles["nav-text"]}>History</li>
              </ul>
            </Link>
          </ul>
        </div>
        <div class={styles["btn-navbar"]}>
          <Link class={styles["btn-login"]} to={"/login"}>
            Login
          </Link>
          <Link to={"/login"}>
            <button class={styles["btn-signup"]}>Sign Up</button>
          </Link>
        </div>
      </nav>
    );
  }
}

const NewNavbarMobile = withNavigate(NavbarMobile);

export default NewNavbarMobile;

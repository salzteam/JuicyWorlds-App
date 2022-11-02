import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/NavbarLogout.module.css";
import logo from "../assets/img/logo.WebP";
import withNavigate from "../helpers/withNavigate";

class NavbarMobile extends React.Component {
  render() {
    return (
      <nav className={`${styles["nav-pc"]} ${styles["home-nav"]}`}>
        <div className={styles.navBrand}>
          <Link to={"/"} aria-label="home">
            <img src={logo} alt="" />
          </Link>
          <p>Juicy Worlds</p>
        </div>
        <div className={styles.navList}>
          <ul>
            <Link to={"/"} aria-label="home">
              <ul>
                <li className={styles.home}>Home</li>
              </ul>
            </Link>
            <Link to={"/product"} aria-label="product">
              <ul>
                <li className={styles["nav-text"]}>Product</li>
              </ul>
            </Link>
            <Link to={"/payment"} aria-label="cart">
              <ul>
                <li className={styles["nav-text"]}>Your Cart</li>
              </ul>
            </Link>
            <Link to={"/history"} aria-label="history">
              <ul>
                <li className={styles["nav-text"]}>History</li>
              </ul>
            </Link>
          </ul>
        </div>
        <div className={styles["btn-navbar"]}>
          <Link className={styles["btn-login"]} to={"/login"}>
            Login
          </Link>
          <Link to={"/register"}>
            <button className={styles["btn-signup"]}>Sign Up</button>
          </Link>
        </div>
      </nav>
    );
  }
}

const NewNavbarMobile = withNavigate(NavbarMobile);

export default NewNavbarMobile;

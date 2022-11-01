import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/NavbarHome.module.css";
import logo from "../assets/img/logo.WebP";
import search from "../assets/img/search.png";
import chat from "../assets/img/chat.png";
import pp from "../assets/img/image39.png";
import withNavigate from "../helpers/withNavigate";

class NavbarMobile extends React.Component {
  render() {
    return (
      <div className={styles.maincontainer}>
        <header className={styles.navigationBar}>
          <div className={styles.navBar}>
            <div className={styles.leftContent}>
              <Link className={styles.a} to={"/"}>
                <img src={logo} alt="" />
              </Link>
              <p>Juicy Worlds</p>
            </div>
            <div className={styles.midContent}>
              <ol className={styles.nav}>
                <Link to={"/"} className={styles.a}>
                  <li>Home</li>
                </Link>
                <Link to={"/product"} className={styles.a}>
                  <li>Product</li>
                </Link>
                <Link to={"/"} className={styles.a}>
                  <li>Your Cart</li>
                </Link>
                <Link to={"/history"} className={styles.a}>
                  <li>History</li>
                </Link>
              </ol>
            </div>
            <div className={styles.rightContent}>
              <Link class={styles["btn-login"]} to={"/login"}>
                Login
              </Link>
              <Link to={"/login"}>
                <button class={styles["btn-signup"]}>Sign Up</button>
              </Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const NewNavbarMobile = withNavigate(NavbarMobile);

export default NewNavbarMobile;

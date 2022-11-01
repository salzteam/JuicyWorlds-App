import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import logo from "../assets/img/logo.WebP";
import search from "../assets/img/search.png";
import chat from "../assets/img/chat.png";
import pp from "../assets/img/image39.png";
import withNavigate from "../helpers/withNavigate";

function Navbar() {
  return (
    <>
      <header className={`${styles.header} ${styles["nav-pc"]}`}>
        <div className={styles.navBrand}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <p>Juicy Worlds</p>
        </div>
        <div className={styles.navList}>
          <ul className={styles.list}>
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/product"}>
              <li>Product</li>
            </Link>
            <Link to={"/"}>
              <li>Your Cart</li>
            </Link>
            <Link to={"/history"}>
              <li>History</li>
            </Link>
          </ul>
        </div>
        <div className={styles.navSide}>
          <Link to={"/"} aria-label="#">
            <i
              className={`fa-solid fa-solid fa-magnifying-glass
                        ${styles["Nav-Search"]}`}
            ></i>
          </Link>
          <Link to={"/"} aria-label="#">
            <img className={styles["nav-chat"]} src={chat} alt="" />
          </Link>
          <Link to={"/profile"} aria-label="#">
            <img className={styles["nav-profile"]} src={pp} alt="" />
          </Link>
        </div>
      </header>
      <header className={`${styles.header}  ${styles["nav-mobile"]}`}>
        <nav className={`navbar navbar-expand-lg ${styles.widthnav}`}>
          <div className="container-fluid ">
            <Link className={`navbar-brand ${styles.brand}`} to={"/"}>
              <img src={logo} alt="" />
              <p className={styles["brand-title"]}>JuicyWorlds</p>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link item" to={"/product"}>
                    Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link item" to={"/"}>
                    Your Cart
                  </Link>
                </li>
                <li className={`nav-item ${styles.item}`}>
                  <Link className="nav-link" to={"/history"}>
                    History
                  </Link>
                </li>
                <li className={`nav-item ${styles.item}`}>
                  <Link
                    className={`nav-link ${styles["profile-first"]}`}
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <div className={styles["nav-search"]}>
                  <img src={search} alt="" />
                  <input
                    className={`form-control me-2 ${styles.search}`}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

const NewNavbar = withNavigate(Navbar);

export default NewNavbar;

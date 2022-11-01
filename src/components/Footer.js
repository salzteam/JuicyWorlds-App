import React from "react";
import styles from "../styles/Footer.module.css";
import logo from "../assets/img/logo.WebP";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";

function Footer() {
  return (
    <>
      <footer className={styles["footer-container"]}>
        <div className={styles["left-foot-content"]}>
          <div className={styles["logo-detail"]}>
            <img className={styles.logo} src={logo} alt="cof" />
            <h2>JuicyWorlds</h2>
          </div>
          <div className={styles["about-detail"]}>
            <p>
              Juicy Worlds is a store that sells some good meals, and especially
              coffee. We provide high quality beans.
            </p>
          </div>
          <div className={styles["sosmed-detail"]}>
            <div className={styles.box}>
              <div className={styles["back-logo"]}></div>
              <img className={styles["img-logo"]} src={fb} alt="" />
            </div>
            <div className={styles.box}>
              <div className={styles["back-logo"]}></div>
              <img className={styles["img-logo"]} src={twitter} alt="" />
            </div>
            <div className={styles.box}>
              <div className={styles["back-logo"]}></div>
              <img className={styles["img-logo"]} src={ig} alt="" />
            </div>
          </div>
          <p className={styles.copyright}>©2022 JuicyWorlds</p>
        </div>
        <div className={styles["right-foot-content"]}>
          <div className={styles["content-detail"]}>
            <h2>Product</h2>
            <ol>
              <li>Download</li>
              <li>Pricing</li>
              <li>Locations</li>
              <li>Contries</li>
              <li>Blog</li>
            </ol>
          </div>
          <div className={styles["content-detail"]}>
            <h2>Engage</h2>
            <ol>
              <li>Coffee Shop ?</li>
              <li>FAQ</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ol>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Forgot.module.css"
import logo from "../assets/img/logo.jpeg"
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import withNavigate from "../helpers/withNavigate";

function Forgot() {
  return <>
    <div class={styles["container-fluid"]}>
      <div class="row">
        <aside class={`col-6 ${styles["side-image"]}`}>p</aside>
        <aside class={`col-6 ${styles.right}`}>
          <section>
            <div class={styles.brand}>
              <img src={logo}/>
              <p>JuicyWorlds</p>
            </div>
            <div class={styles["first-text"]}>
              <p class={styles.textForgot}>Forgot your password?</p>
              <p class={styles.textForgot2}>Don't worry, we got your back!</p>
            </div>
            <div class={styles["input-btn"]}>
              <input type="text" placeholder="Enter your email adress to get link"/>
              <div class={`${styles.btn} ${styles.send}`}>
                <p>Send</p>
              </div>
            </div>
            <div class={styles["resend-btn"]}>
              <div class={styles["count-text"]}>
                  <p>Click here if you didn't receive any link in 2 minutes</p>
                  <p class={styles.time}>01:52</p>
              </div>
              <div class={`${styles.btn} ${styles.resend}`}>
                <p>Resend Link</p>
              </div>
            </div>
          </section>
          <footer class={styles["footer-container"]}>
            <aside class={`col-6 ${styles.left}`}>
              <section class={`${styles.brand} ${styles.footer}`}>
                <img src={logo}/>
                <p>JuicyWorlds</p>
              </section>
              <p class={styles["about-footer"]}>Juicy Worlds is a store that sells some good meals, and
                especially coffee. We provide high quality beans</p>
              <div class={styles["footer-logo"]}>
                <div class={styles["back-logo"]}>
                  <img class={styles["logo-img"]} src={fb} alt="" />
              </div>
              <div class={styles["back-logo"]}>
                <img class={styles["logo-img"]} src={twitter} alt="" />
              </div>
              <div class={styles["back-logo"]}>
                <img class={styles["logo-img"]} src={ig} alt="" />
              </div>
            </div>
              <span class={styles.copyright}>©2022 JuicyWorlds</span>
            </aside>
            <aside class={`col-6 ${styles.rightss}`}>
              <div class={styles["about-content"]}>
                <p>Product</p>
                <ul class={styles["list-product"]}>
                  <aside>
                  <li>Download</li>
                  <li>Locations</li>
                  <li>Blog</li>
                  </aside>
                  <aside class={styles["detail-right"]}>
                    <li>Pricing</li>
                    <li>Countries</li>
                  </aside>
                </ul>
              </div>
              <div class={styles["about-content"]}>
                <p>Engage</p>
                <ul class={styles["list-product"]}>
                  <aside>
                  <li>Coffe Shop ?</li>
                  <li>FAQ</li>
                  <li>Terms of Service</li>
                  </aside>
                  <aside class={styles["detail-right"]}>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                  </aside>
                </ul>
              </div>
            </aside>
          </footer>
        </aside>
      </div>
    </div>
  </>;
}

const NewForgot = withNavigate(Forgot);

export default NewForgot;

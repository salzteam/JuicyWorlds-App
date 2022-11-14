import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Home.module.css";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import content1 from "../assets/img/content.jpg";
import content2 from "../assets/img/COBA.png";
import favo1 from "../assets/img/favo1.png";
import favo2 from "../assets/img/favo2.png";
import favo3 from "../assets/img/favo3.png";
import ceklistsmall from "../assets/img/ceklist2.png";
import ceklist from "../assets/img/ceklist.png";
import cust from "../assets/img/cust.png";
import staff from "../assets/img/staff.png";
import location from "../assets/img/location.png";
import amazon from "../assets/img/amazon.png";
import discord from "../assets/img/discord.png";
import netflix from "../assets/img/netflix.png";
import spotify from "../assets/img/spotify.png";
import reddit from "../assets/img/reddit.png";
import list from "../assets/img/list.png";
import left from "../assets/img/left.png";
import right from "../assets/img/right.png";
import withNavigate from "../helpers/withNavigate";
import NavbarMobile from "../components/NavbarHome";
import CardCmt from "../components/Card/CardComment";
import Test from "../components/Test";
import NavbarLogout from "../components/Navbarlogout";
class Home extends React.Component {
  state = {
    navbar: <Test />,
  };
  componentDidMount() {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userinfo) {
      this.setState({
        navbar: <Test />,
      });
    }
  }
  render() {
    return (
      <>
        {this.state.navbar}
        <main className={styles["home-main"]}>
          <header className={styles["home-header"]}>
            <section className={styles["details-header"]}>
              <p className={styles["starting-text"]}>
                Start Your Day with Coffe and Good Meals
              </p>
              <p className={styles["about-text"]}>
                We provide high quality beans, good taste, and healthy meals
                made by love just for you. Start your day with us for a bigger
                smile!
              </p>
              <div className={styles.btn}>
                <Link className={styles["btn-linked"]} href="/register">
                  <p>Get Started</p>
                </Link>
              </div>
            </section>
          </header>
          <section className={styles["flying-properties"]}>
            <div className={styles["flying-staff"]}>
              <div className={styles.icon}>
                <div className={styles["back-img"]}>
                  <img src={staff} alt="" />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles["flying-text"]}>90+</p>
                <p className={styles["flying-name"]}>Staff</p>
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles["flying-stores"]}>
              <div className={styles.icon}>
                <div className={styles["back-img"]}>
                  <img src={location} alt="" />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles["flying-text-stores"]}>30+</p>
                <p className={styles["flying-name-stores"]}>Stores</p>
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles["flying-cust"]}>
              <div className={styles.icon}>
                <div className={styles["back-img"]}>
                  <img src={cust} alt="" />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles["flying-text-cust"]}>800+</p>
                <p className={styles["flying-name-cust"]}>Customers</p>
              </div>
            </div>
          </section>
          <div className="container-fluid">
            <div
              className={`row padding-style ${styles["row-settings-mobile"]}`}
            >
              <div className={`col-6 ${styles["content-team"]}`}>
                <img
                  className={`${styles["settings-mobile-img"]} ${styles["content-team-img"]}`}
                  src={content1}
                  alt=""
                />
              </div>
              <div className={`col-6 ${styles["content-team"]}`}>
                <div className={styles["row-content-text"]}>
                  <div className={styles["side-text"]}>
                    <p className={styles["side-text-top"]}>
                      We Provide Good Coffee and Healthy Meals
                    </p>
                    <p className={styles["side-text-middle"]}>
                      You can explore the menu that we provide with fun and have
                      their own taste and make your day better.
                    </p>
                  </div>
                  <div className={styles["other-content"]}>
                    <img src={ceklist} alt="" />
                    <p>High quality beans</p>
                  </div>
                  <div className={styles["other-content"]}>
                    <img src={ceklist} alt="" />
                    <p>Healthy meals, you can request the ingredients</p>
                  </div>
                  <div className={styles["other-content"]}>
                    <img src={ceklist} alt="" />
                    <p>
                      Chat with our staff to get better experience for ordering
                    </p>
                  </div>
                  <div className={styles["other-content"]}>
                    <img src={ceklist} alt="" />
                    <p>
                      Free member card with a minimum purchase of IDR 200.000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className={styles["favorite-list"]}>
            <p className={styles["favo-text"]}>Here is People's Favorite</p>
            <p className={styles["favo-text-second"]}>
              Let’s choose and have a bit taste of poeple’s favorite. It might
              be yours too!
            </p>
            <div
              className={`row justify-content-around ${styles["style-mobile"]}`}
            >
              <div
                className={`col-4 ${styles["menu-list-favorite"]} ${styles.first}`}
              >
                <img className={styles["img-product"]} src={favo1} alt="" />
                <p className={styles["title-favorite"]}>Hazelnut Latte</p>
                <div className={styles["list-favorite"]}>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>HazelnutSyrup</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Wanilla Whipped Cream</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Ice / Hot</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Sliced Banana on Top</p>
                  </div>
                </div>
                <p className={styles["price-favorite"]}>IDR 25.000</p>
                <Link to={"/"}>
                  <button className={styles["btn-order"]}>Order Now</button>
                </Link>
              </div>
              <div className={`col-4 ${styles["menu-list-favorite"]}`}>
                <img className={styles["img-product"]} src={favo2} alt="" />
                <p className={styles["title-favorite"]}>Pinky Promise</p>
                <div className={styles["list-favorite"]}>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>1 Shot of Coffe</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Vanilla Whipped Cream</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Chocolate Biscuits</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Strawberry Syrup</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Sliced strawberry on Top</p>
                  </div>
                </div>
                <p className={styles["price-favorite"]}>IDR 30.000</p>
                <Link to={"/"}>
                  <button className={styles["btn-order"]}>Select</button>
                </Link>
              </div>
              <div className={`col-4 ${styles["menu-list-favorite-last"]}`}>
                <img
                  className={styles["img-left-favorite"]}
                  src={left}
                  alt=""
                />
                <img
                  className={styles["img-right-favorite"]}
                  src={right}
                  alt=""
                />
                <img className={styles["img-product"]} src={favo3} alt="" />
                <p className={styles["title-favorite"]}>Chicken Wings</p>
                <div className={styles["list-favorite"]}>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Wings</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Drum Sticks</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Mayonaise and Lemon</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Hot Fried</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Secret Recipe</p>
                  </div>
                  <div className={styles["menu-list"]}>
                    <img src={ceklistsmall} alt="" />
                    <p>Buy 1 Get 1 only for Dine in</p>
                  </div>
                </div>
                <p className={styles["price-favorite"]}>IDR 40.000</p>
                <Link to={"/"}>
                  <button className={styles["btn-order-last"]}>Select</button>
                </Link>
              </div>
            </div>
          </section>
          <section className={styles["list-map"]}>
            <div className={styles.title}>
              <p className={styles["title-map"]}>
                Visit Our Store in the Spot on the Map Below
              </p>
              <p className={styles["detail-map"]}>
                See our store in every city on the spot and spen your good day
                there. See you soon!
              </p>
            </div>
            <img className={styles["map-img"]} src={content2} alt="" />
            <p className={styles.partner}>Our Partner</p>
            <div className={styles["icon-partner"]}>
              <img className={styles.netflix} src={netflix} alt="" />
              <img src={reddit} alt="" />
              <img src={amazon} alt="" />
              <img src={discord} alt="" />
              <img src={spotify} alt="" />
            </div>
          </section>
          <section className={styles.comment}>
            <div className={styles["title-list-comment"]}>
              <p className={styles["title-comment"]}>
                Loved by Thousands of Happy Customer
              </p>
              <p className={styles["other-comment"]}>
                These are the stories of our customers who have visited us with
                great pleasure.
              </p>
            </div>
            <div className={`row ${styles["row-content"]}`}>
              <CardCmt />
              <CardCmt />
            </div>
            <div
              className={`${styles["row-content"]} ${styles["next-comment"]}`}
            >
              <div className={`col-6 ${styles["left-list"]}`}>
                <img className={styles["set-width"]} src={list} alt="" />
              </div>
              <div className={`col-6 ${styles["right-list"]}`}>
                <img className={styles["img-left"]} src={left} alt="" />
                <img className={styles["img-right"]} src={right} alt="" />
              </div>
            </div>
          </section>
          <section className={`row ${styles["other-flying"]}`}>
            <div className={`col-12 ${styles["content-flying"]}`}>
              <div className={`col-6 ${styles["flying-left"]}`}>
                <p className={styles["top-text"]}>Check our promo today!</p>
                <p className={styles["bottom-text"]}>
                  Let's see the deals and pick yours!
                </p>
              </div>
              <div className={`col-6 ${styles["flying-right"]}`}>
                <Link href="/product">
                  <button className={styles["flying-button"]}>See Promo</button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <footer className={styles["footer-container"]}>
          <div className={styles["left-foot-content"]}>
            <div className={styles["logo-detail"]}>
              <img className={styles.logo} src={logo} alt="cof" />
              <h2>JuicyWorlds</h2>
            </div>
            <div className={styles["about-detail"]}>
              <p>
                Juicy Worlds is a store that sells some good meals, and
                especially coffee. We provide high quality beans.
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
            <p className={styles.copyright}>&copy2022 JuicyWorlds</p>
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
}

const NewHome = withNavigate(Home);

export default NewHome;

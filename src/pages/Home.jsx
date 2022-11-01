import React from 'react'
import { Link } from "react-router-dom";

import styles from "../styles/Home.module.css"
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import content1 from "../assets/img/content.jpg"
import content2 from "../assets/img/COBA.png"
import favo1 from "../assets/img/favo1.png"
import favo2 from "../assets/img/favo2.png"
import favo3 from "../assets/img/favo3.png"
import ceklistsmall from "../assets/img/ceklist2.png"
import ceklist from "../assets/img/ceklist.png"
import cust from "../assets/img/cust.png"
import staff from "../assets/img/staff.png"
import location from "../assets/img/location.png"
import amazon from "../assets/img/amazon.png"
import discord from "../assets/img/discord.png"
import netflix from "../assets/img/netflix.png"
import spotify from "../assets/img/spotify.png"
import reddit from "../assets/img/reddit.png"
import list from "../assets/img/list.png"
import left from "../assets/img/left.png"
import right from "../assets/img/right.png"
import withNavigate from "../helpers/withNavigate";
import NavbarMobile from "../components/NavbarHome"
import CardCmt from "../components/Card/CardComment"
import Test from "../components/Test"
import NavbarLogout from "../components/Navbarlogout"
class Home extends React.Component {
    state= {
        navbar: <NavbarLogout/>
    }
    componentDidMount(){
        const userinfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userinfo) {
        this.setState({
            navbar: <Test/>
        })
        }
    }
    render(){
  return (
    <>
        {this.state.navbar}
        <div className={styles["nav-ipad"]}>
                <NavbarMobile/>
            </div>
        <main class={styles["home-main"]}>
            <header class={styles["home-header"]}>
                <section class={styles["details-header"]}>
                    <p class={styles["starting-text"]}>Start Your Day with Coffe and
                        Good
                        Meals</p>
                    <p class={styles["about-text"]}>We provide high quality beans,
                        good
                        taste, and healthy
                        meals made by love just for you. Start your day with
                        us
                        for a bigger smile!</p>
                    <div class={styles.btn}>
                        <Link class={styles["btn-linked"]} href="/register">
                            <p>Get Started</p>
                        </Link>
                    </div>
                </section>
            </header>
            <section class={styles["flying-properties"]}>
                <div class={styles["flying-staff"]}>
                    <div class={styles.icon}>
                        <div class={styles["back-img"]}>
                            <img src={staff} alt=""/>
                        </div>
                    </div>
                    <div class={styles.text}>
                        <p class={styles["flying-text"]}>90+</p>
                        <p class={styles["flying-name"]}>Staff</p>
                    </div>
                </div>
                <hr class={styles.hr}/>
                <div class={styles["flying-stores"]}>
                    <div class={styles.icon}>
                        <div class={styles["back-img"]}>
                            <img src={location} alt=""/>
                        </div>
                    </div>
                    <div class={styles.text}>
                        <p class={styles["flying-text-stores"]}>30+</p>
                        <p class={styles["flying-name-stores"]}>Stores</p>
                    </div>
                </div>
                <hr class={styles.hr}/>
                <div class={styles["flying-cust"]}>
                    <div class={styles.icon}>
                        <div class={styles["back-img"]}>
                            <img src={cust} alt=""/>
                        </div>
                    </div>
                    <div class={styles.text}>
                        <p class={styles["flying-text-cust"]}>800+</p>
                        <p class={styles["flying-name-cust"]}>Customers</p>
                    </div>
                </div>
            </section>
            <div class="container-fluid">
                <div class={`row padding-style ${styles["row-settings-mobile"]}`}>
                    <div class={`col-6 ${styles["content-team"]}`}>
                        <img class={`${styles["settings-mobile-img"]} ${styles["content-team-img"]}`}
                            src={content1} alt=""/>
                    </div>
                    <div class={`col-6 ${styles["content-team"]}`}>
                        <div class={styles["row-content-text"]}>
                            <div class={styles["side-text"]}>
                                <p class={styles["side-text-top"]}>We Provide Good
                                    Coffee
                                    and
                                    Healthy Meals</p>
                                <p class={styles["side-text-middle"]}>You can explore
                                    the
                                    menu
                                    that we provide with fun
                                    and
                                    have their own taste and make your day
                                    better.</p>
                            </div>
                            <div class={styles["other-content"]}>
                                <img src={ceklist} alt=""/>
                                <p>High quality beans</p>
                            </div>
                            <div class={styles["other-content"]}>
                                <img src={ceklist} alt=""/>
                                <p>Healthy meals, you can request the
                                    ingredients</p>
                            </div>
                            <div class={styles["other-content"]}>
                                <img src={ceklist} alt=""/>
                                <p>Chat with our staff to get better
                                    experience
                                    for ordering</p>
                            </div>
                            <div class={styles["other-content"]}>
                                <img src={ceklist} alt=""/>
                                <p>Free member card with a minimum purchase
                                    of
                                    IDR 200.000.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class={styles["favorite-list"]}>
                <p class={styles["favo-text"]}>Here is People's Favorite</p>
                <p class={styles["favo-text-second"]}>Let’s choose and have a bit
                    taste of
                    poeple’s favorite. It
                    might be yours too!</p>
                <div class={`row justify-content-around ${styles["style-mobile"]}`}>
                    <div class={`col-4 ${styles["menu-list-favorite"]} ${styles.first}`}>
                        <img class={styles["img-product"]}
                            src={favo1}
                            alt=""/>
                        <p class={styles["title-favorite"]}>Hazelnut Latte</p>
                        <div class={styles["list-favorite"]}>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>HazelnutSyrup</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Wanilla Whipped Cream</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Ice / Hot</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Sliced Banana on Top</p>
                            </div>
                        </div>
                        <p class={styles["price-favorite"]}>IDR 25.000</p>
                        <Link to={"/"}>
                            <button class={styles["btn-order"]}>Order Now</button>
                        </Link>
                    </div>
                    <div class={`col-4 ${styles["menu-list-favorite"]}`}>
                        <img class={styles["img-product"]}
                            src={favo2}
                            alt=""/>
                        <p class={styles["title-favorite"]}>Pinky Promise</p>
                        <div class={styles["list-favorite"]}>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>1 Shot of Coffe</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Vanilla Whipped Cream</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Chocolate Biscuits</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Strawberry Syrup</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Sliced strawberry on Top</p>
                            </div>
                        </div>
                        <p class={styles["price-favorite"]}>IDR 30.000</p>
                        <Link to={"/"}>
                            <button class={styles["btn-order"]}>Select</button>
                        </Link>
                    </div>
                    <div class={`col-4 ${styles["menu-list-favorite-last"]}`}>
                        <img class={styles["img-left-favorite"]}
                            src={left}
                            alt=""/>
                        <img class={styles["img-right-favorite"]}
                            src={right}
                            alt=""/>
                        <img class={styles["img-product"]}
                            src={favo3}
                            alt=""/>
                        <p class={styles["title-favorite"]}>Chicken Wings</p>
                        <div class={styles["list-favorite"]}>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Wings</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Drum Sticks</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Mayonaise and Lemon</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Hot Fried</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Secret Recipe</p>
                            </div>
                            <div class={styles["menu-list"]}>
                                <img src={ceklistsmall}
                                    alt=""/>
                                <p>Buy 1 Get 1 only for Dine in</p>
                            </div>
                        </div>
                        <p class={styles["price-favorite"]}>IDR 40.000</p>
                        <Link to={"/"}>
                            <button class={styles["btn-order-last"]}>Select</button>
                        </Link>
                    </div>
                </div>
            </section>
            <section class={styles["list-map"]}>
                <div class={styles.title}>
                    <p class={styles["title-map"]}>Visit Our Store in the Spot on the
                        Map
                        Below</p>
                    <p class={styles["detail-map"]}>See our store in every city on the
                        spot and spen your
                        good
                        day there. See you soon!</p>
                </div>
                <img class={styles["map-img"]} src={content2} alt=""/>
                <p class= {styles.partner}>Our Partner</p>
                <div class={styles["icon-partner"]}>
                    <img class={styles.netflix} src={netflix}
                        alt=""/>
                    <img src={reddit} alt=""/>
                    <img src={amazon}
                        alt=""/>
                    <img src={discord} alt=""/>
                    <img src={spotify} alt=""/>
                </div>
            </section>
            <section class={styles.comment}>
                <div class={styles["title-list-comment"]}>
                    <p class={styles["title-comment"]}>Loved by Thousands of Happy
                        Customer</p>
                    <p class={styles["other-comment"]}>These are the stories of our
                        customers
                        who have visited us
                        with great pleasure.</p>
                </div>
                <div class={`row ${styles["row-content"]}`}>
                    <CardCmt/>
                    <CardCmt/>
                </div>
                <div class={`${styles["row-content"]} ${styles["next-comment"]}`}>
                    <aside class={`col-6 ${styles["left-list"]}`}>
                        <img class={styles["set-width"]} src={list}
                            alt=""/>
                    </aside>
                    <aside class={`col-6 ${styles["right-list"]}`}>
                        <img class={styles["img-left"]} src={left}
                            alt=""/>
                        <img class={styles["img-right"]}
                            src={right}
                            alt=""/>
                    </aside>
                </div>
            </section>
            <section class={`row ${styles["other-flying"]}`}>
                <div class={`col-12 ${styles["content-flying"]}`}>
                    <aside class={`col-6 ${styles["flying-left"]}`}>
                        <p class={styles["top-text"]}>Check our promo today!</p>
                        <p class={styles["bottom-text"]}>Let's see the deals and pick
                            yours!</p>
                    </aside>
                    <aside class={`col-6 ${styles["flying-right"]}`}>
                        <Link href="/product">
                            <button class={styles["flying-button"]}>See Promo</button></Link>
                    </aside>
                </div>
            </section>
        </main>
        <footer class={styles["footer-container"]}>
        <div class={styles["left-foot-content"]}>
          <div class={styles["logo-detail"]}>
            <img class={styles.logo} src={logo} alt="cof" />
            <h2>JuicyWorlds</h2>
          </div>
          <div class={styles["about-detail"]}>
            <p>
              Juicy Worlds is a store that sells some good meals, and especially
              coffee. We provide high quality beans.
            </p>
          </div>
          <div class={styles["sosmed-detail"]}>
            <div class={styles.box}>
              <div class={styles["back-logo"]}></div>
              <img class={styles["img-logo"]} src={fb} alt="" />
            </div>
            <div class={styles.box}>
              <div class={styles["back-logo"]}></div>
              <img class={styles["img-logo"]} src={twitter} alt="" />
            </div>
            <div class={styles.box}>
              <div class={styles["back-logo"]}></div>
              <img class={styles["img-logo"]} src={ig} alt="" />
            </div>
          </div>
          <p class={styles.copyright}>&copy2022 JuicyWorlds</p>
        </div>
        <div class={styles["right-foot-content"]}>
          <div class={styles["content-detail"]}>
            <h2>Product</h2>
            <ol>
              <li>Download</li>
              <li>Pricing</li>
              <li>Locations</li>
              <li>Contries</li>
              <li>Blog</li>
            </ol>
          </div>
          <div class={styles["content-detail"]}>
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
  )
}}

const NewHome = withNavigate(Home);

export default NewHome
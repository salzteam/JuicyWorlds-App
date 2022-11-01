import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import Footer from '../components/Footer'
import styles from "../styles/Payment.module.css"
import checklist from "../assets/img/payment/ceklist.png"
import Card from "../components/Card/CardPayments"
import debit from "../assets/img/payment/card.png"
import bank from "../assets/img/payment/bank.png"
import cod from "../assets/img/payment/cod.png"
import withNavigate from "../helpers/withNavigate";

export class Payment extends Component {
  render() {
    return (
      <>
        <div className={styles["navbar-pc"]}>
          <Navbar/>
        </div>
        <div className={styles["navbar-mobile"]}>
          <NavbarMobile/>
        </div>
        <main className={styles.main}>
            <section className={styles.container}>
                <div className={styles.status}> 
                    <div className={styles["circle-list"]}>
                        <span className={styles.circle}>
                            <img className={styles["second-sircle"]} src={checklist} alt='checklist'/>
                        </span>
                        <p>Order</p>
                    </div>
                    <hr className={styles["vertical-line"]}/>
                    <hr className={styles["vertical-linee"]}/>
                    <div className={styles["circle-list"]}>
                        <span className={styles.circle}>
                            <img className={styles["second-sircle"]} src={checklist} alt='checklist'/>
                        </span>
                        <p>Checkout</p>
                    </div>
                    <hr className={styles["vertical-line"]}/>
                    <hr className={styles["vertical-lineee"]}/>
                    <div className={styles["circle-list"]}>
                        <span className={styles.circle}>
                            <span className={styles["three-sircle"]}></span>
                        </span>
                            <p>Payment</p>
                    </div>
                </div>
                <div className={styles["header-title"]}>
                    <p>Checkout your item now!</p>
                </div>
            </section>
            <section className={styles["container-side"]}>
                <aside className={styles["side-left"]}>
                    <p className={styles["title-order"]}>Order Summary</p>
                    <div className={styles["card-settings"]}>
                        <Card/>
                        <Card/>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles["total-list"]}>
                        <div>
                            <p>SUBTOTAL</p>
                            <p>TAX & FEES</p>
                            <p>SHIPPING</p>
                        </div>
                        <div>
                            <p>IDR 120.000</p>
                            <p>IDR 20.000</p>
                            <p>IDR 10.000</p>
                        </div>
                    </div>
                    <div className={styles["final-total"]}>
                        <p>TOTAL</p>
                        <p>IDR 150.000</p>
                    </div>
                </aside>
                <aside className={styles["side-right"]}>
                    <div className={styles["right-top"]}>
                        <div className={styles["title-top"]}>
                            <p className={styles["addres-title"]}>Address details</p>
                            <p className={styles["edit-title"]}>edit</p>
                        </div>
                        <div className={styles.top}>
                            <div className={styles["address-text"]}>
                                <div className={styles.delivery}>
                                    <span className='me-1'>Delivery </span> 
                                    <p>to Iskandar Street</p>
                                </div>
                                <hr className={styles.hr}/>
                                <p>Km 5 refinery road oppsite republic road, effurun, Jakarta</p>
                                <hr className={styles.hr}/>
                                <p>+62 81348287878</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["right-top"]}>
                        <div className={styles["title-top"]}>
                            <p className={styles["addres-title"]}>Payment method</p>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles["button-radio"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" name='via' ></input>
                                    <div className={styles["logo-card"]}>
                                        <img src={debit} alt='card'/>
                                    </div>
                                    <p>Card</p>
                                </div>
                            </div>
                                <hr className={styles.hrRadio}/>
                            <div className={styles["button-radio"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" name='via' ></input>
                                    <div className={styles["logo-card-bank"]}>
                                        <img src={bank} alt='card'/>
                                    </div>
                                    <p>Bank acoount</p>
                                </div>
                            </div>
                                <hr className={styles.hrRadio}/>
                            <div className={styles["button-radio-cod"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" name='via' ></input>
                                    <div className={styles["logo-card-cod"]}>
                                        <img src={cod} alt='card'/>
                                    </div>
                                    <p>Cash on delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={styles.btn}>Confirm and Pay</p>
                </aside>
            </section>
        </main>
        <Footer/>
      </>
    )
  }
}

const NewPayment = withNavigate(Payment);

export default NewPayment
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Test'
import NavbarMobile from '../components/NavbarMobile'
import Footer from '../components/Footer'
import styles from "../styles/Payment.module.css"
import checklist from "../assets/img/payment/ceklist.png"
import Card from "../components/Card/CardPayments"
import debit from "../assets/img/payment/card.png"
import bank from "../assets/img/payment/bank.png"
import cod from "../assets/img/payment/cod.png"
import withNavigate from "../helpers/withNavigate";
import Axios from "axios"
import { Navigate } from "react-router-dom";


export class Payment extends Component {
    state = {
        address: "",
        product: [],
        userdata: [],
        user: [],
        userinfo:  JSON.parse(localStorage.getItem("userInfo")),
        payment: null
      }

    getRequset = () => {
        this.state.product.map((product) => {
            const Payment = this.state.payment
            const status_id = "2"
            const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/payment/${product.transaction_id}`
            Axios.patch(url,{status_id : status_id,payment_id: Payment}, 
            {headers: {"x-access-token": this.state.userinfo.token}}).then((results) => {
            }).then((result) => {
                this.setState({
                    product: []
                })
            })
        })
    }

    componentDidMount(){
        if (this.state.userinfo.token){
          this.getDatas()
        }
      }

    getDatas = (userinfo) => {
        const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/history/pending`;
        Axios.get(url, {
          headers: {
            "x-access-token": this.state.userinfo.token,
          },
        }).then((res) => {
            this.setState({
                product: res.data.data
            })
            Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${this.state.userinfo.token}`, {
                headers: {
                  "x-access-token": this.state.userinfo.token,
                },
              }).then((results) => {
                this.setState({
                    userdata: results.data.data.profileUser[0],
                    user: results.data.data.profileData[0]
                }, () => {
                    console.log(this.state);
                })
              });
            })
    }

    setGender(event) {
        this.setState({
            payment:event.target.value
        })
      }

      getSize = () => {
        if (this.state.product.size == "R") return "Reguler";
        if (this.state.product.size == "L") return "Large";
        if (this.state.product.size == "XL") return "XL";
      };
    
      getTotalPrice = (price, qty, discount, cost) => {
        const finalDiscount = (parseInt(discount) / 100) * parseInt(price)
        const finalPrice = (price  - finalDiscount + cost) * qty
        return this.costing(finalPrice)
      }

      costing = (price) => {
        return (
          "IDR " +
          parseFloat(price)
            .toFixed()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        );
      };
  render() {
    let subTotal = 0
    let tax = 0
    let shipping = 0
    return (
      <>
        <div>
          <Navbar/>
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
                        {this.state.product.map((product) => {
                            subTotal += product.subtotal
                            tax += parseInt(product.tax)
                            shipping += parseInt(product.shipping)
                            return <Card title={product.product_name} price={this.costing(product.subtotal)} image={product.image} size={this.getSize()} qty={product.qty}/>})}
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles["total-list"]}>
                        <div>
                            <p>SUBTOTAL</p>
                            <p>TAX & FEES</p>
                            <p>SHIPPING</p>
                        </div>
                        <div>
                            <p>{this.costing(subTotal)}</p>
                            <p>{this.costing(tax)}</p>
                            <p>{this.costing(shipping)}</p>
                        </div>
                    </div>
                    <div className={styles["final-total"]}>
                        <p>TOTAL</p>
                        <p>{this.costing(subTotal + tax + shipping)}</p>
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
                                    <p>{this.state.userdata.adress}</p>
                                </div>
                                <hr className={styles.hr}/>
                                <p>{this.state.userdata.adress}</p>
                                <hr className={styles.hr}/>
                                <p>{this.state.user.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["right-top"]} onChange={this.setGender.bind(this)}>
                        <div className={styles["title-top"]}>
                            <p className={styles["addres-title"]}>Payment method</p>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles["button-radio"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" value="1" name='via' ></input>
                                    <div className={styles["logo-card"]}>
                                        <img src={debit} alt='card'/>
                                    </div>
                                    <p>Card</p>
                                </div>
                            </div>
                                <hr className={styles.hrRadio}/>
                            <div className={styles["button-radio"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" value="2" name='via' ></input>
                                    <div className={styles["logo-card-bank"]}>
                                        <img src={bank} alt='card'/>
                                    </div>
                                    <p>Bank acoount</p>
                                </div>
                            </div>
                                <hr className={styles.hrRadio}/>
                            <div className={styles["button-radio-cod"]}>
                                <div className={styles["card-button"]}>
                                    <input type="radio" value="3" name='via' ></input>
                                    <div className={styles["logo-card-cod"]}>
                                        <img src={cod} alt='card'/>
                                    </div>
                                    <p>Cash on delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={styles.btn} onClick={() => {
                        this.getRequset()
                    }}>Confirm and Pay</p>
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
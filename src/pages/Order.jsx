import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Test";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import styles from "../styles/Order.module.css";
import checklist from "../assets/img/payment/ceklist.png";
import Card from "../components/Card/CardPayments";
import debit from "../assets/img/payment/card.png";
import bank from "../assets/img/payment/bank.png";
import cod from "../assets/img/payment/cod.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import image from "../assets/img/favo1.png";

export class Payment extends Component {
  state = {
    address: "",
    isLoading: true,
    message: "Woops! Nothing Transaction Pending Here",
    LoadingPayment: false,
    next: null,
    pending: null,
    notfound: false,
    userdata: [],
    user: [],
    userinfo: JSON.parse(localStorage.getItem("userInfo")),
    payment: null,
  };

  getRequset = () => {
    const status_id = "2";
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/payment/${this.state.pending.transaction_id}`;
    Axios.patch(
      url,
      { status_id: status_id },
      { headers: { "x-access-token": this.state.userinfo.token } }
    ).then((result) => {
      if (this.state.next) return this.getDatas(this.state.next);
      return this.setState({ isLoading: false, pending: null, notfound: true });
    });
  };

  // componentDidUpdate() {
  //   if (!this.state.pending) this.getDatas();
  // }

  componentDidMount() {
    if (this.state.userinfo.token) {
      this.getDatas(`/api/v1/transactions/?page=1&limit=1`);
    }
  }

  getDatas = (url) => {
    const link = `${process.env.REACT_APP_BACKEND_HOST}${url}`;
    Axios.get(link, {
      headers: {
        "x-access-token": this.state.userinfo.token,
      },
    })
      .then((res) => {
        let nexPrev = res.data.data.next;
        console.log(nexPrev);
        const data = res.data.data.data[0];
        let py = null;
        if (data.mpayment === "Card") py = 1;
        if (data.mpayment === "Bank Account") py = 2;
        if (data.mpayment === "Cash On Delivery") py = 3;
        this.setState({
          payment: py,
          pending: data,
          next: nexPrev,
          isLoading: false,
        });
      })
      .catch((err) => {
        const msg = err.response.data.message;
        if (msg === "data_not_found") {
          this.setState({
            isLoading: false,
            notfound: true,
          });
        }
      });
  };

  // setGender(event) {
  //   this.setState({
  //     payment: event.target.value,
  //   });
  // }

  getSize = () => {
    if (this.state.pending.size === "R") return "Reguler";
    if (this.state.pending.size === "L") return "Large";
    if (this.state.pending.size === "XL") return "XL";
  };

  getTotalPrice = (price, qty, discount, cost) => {
    const finalDiscount = (parseInt(discount) / 100) * parseInt(price);
    const finalPrice = (price - finalDiscount + cost) * qty;
    return this.costing(finalPrice);
  };

  costing = (price) => {
    return (
      "IDR " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };
  setTitle = () => {
    let response = null;
    if (this.state.pending.method === "pick up") response = "Pick Up";
    if (this.state.pending.method === "dine in") response = "Dine In";
    if (this.state.pending.method === "door delivery")
      response = "Door Delivery";
    return `${response} for ${this.state.pending.display_name}`;
  };
  render() {
    let st = 0;
    let tx = 0;
    let sp = 0;
    if (!this.state.isLoading && this.state.pending) {
      st = this.state.pending.subtotal || 0;
      tx = this.state.pending.tax || 0;
      sp = this.state.pending.shipping || 0;
    }
    let subTotal = st;
    let tax = tx;
    let shipping = sp;
    const datas = this.state.pending || 0;
    return (
      <>
        <div>
          <Navbar />
        </div>
        <main className={styles.main}>
          <section className={styles.container}>
            <div className={styles.status}>
              <div className={styles["circle-list"]}>
                <span className={styles.circle}>
                  <img
                    className={styles["second-sircle"]}
                    src={checklist}
                    alt="checklist"
                  />
                </span>
                <p>Order</p>
              </div>
              <hr className={styles["vertical-line"]} />
              <hr className={styles["vertical-linee"]} />
              <div className={styles["circle-list"]}>
                <span className={styles.circle}>
                  <img
                    className={styles["second-sircle"]}
                    src={checklist}
                    alt="checklist"
                  />
                </span>
                <p>Checkout</p>
              </div>
              <hr className={styles["vertical-line"]} />
              <hr className={styles["vertical-lineee"]} />
              <div className={styles["circle-list"]}>
                <span className={styles.circle}>
                  <span className={styles["three-sircle"]}></span>
                </span>
                <p>Finish Order</p>
              </div>
            </div>
            <div className={styles["header-title"]}>
              <p>Finish your customer order now.</p>
            </div>
          </section>
          <section className={styles["container-side"]}>
            <div>
              <div className={styles["card-three"]}>
                <aside className={styles["side-left"]}>
                  {/* {this.state.notfound && (
                    <div className={styles["notfound"]}>
                      <p className={styles.ntfound}>
                        {this.state.notfound ? undefined : this.state.message}
                      </p>
                    </div>
                  )} */}
                  {this.state.notfound ? (
                    <div className={styles["notfound"]}>
                      <p className={styles.ntfound}>{this.state.message}</p>
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <p className={styles["title-order"]}>
                        {!this.state.isLoading && this.state.pending
                          ? this.setTitle()
                          : "Loading..."}
                      </p>
                      <div className={styles["card-settings"]}>
                        {!this.state.isLoading &&
                        this.state.pending &&
                        !this.state.notfound ? (
                          <div className={styles["card-payment"]}>
                            <img src={datas.image} alt="food1" />
                            <div className={styles["menu-item"]}>
                              <p className={styles["detail-item"]}>
                                {datas.product_name}
                              </p>
                              <p className={styles["detail-item"]}>
                                x {datas.qty}
                              </p>
                              <p className={styles["detail-item"]}>
                                {this.getSize(datas.size)}
                              </p>
                            </div>
                            <p className={styles.price}>
                              {this.costing(datas.price)}
                            </p>
                          </div>
                        ) : (
                          <div className={styles["loader-container"]}>
                            <div className={styles.spinner}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className={styles.hr} />
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
                <div className={styles.first}></div>
                <div className={styles.second}></div>
              </div>
              <div
                className={styles["btn-next"]}
                onClick={() => {
                  this.setState({ isLoading: true });
                  let nexts = this.state.next;
                  if (!nexts) nexts = `/api/v1/transactions/?page=1&limit=1`;
                  this.getDatas(nexts);
                }}
              >
                <div>
                  <p>Slide to see upcoming orders</p>
                </div>
                <div>
                  <p className={styles["arrows"]}>&#8594;</p>
                </div>
              </div>
            </div>
            <div className={styles["side-right-con"]}>
              <aside className={styles["side-right"]}>
                <div
                  className={styles["right-top"]}
                  // onChange={this.setGender.bind(this)}
                >
                  <div className={styles["title-top"]}>
                    <p className={styles["addres-title"]}>Payment method</p>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles["button-radio"]}>
                      <div className={styles["card-button"]}>
                        <input
                          type="radio"
                          value="1"
                          name="via"
                          disabled={true}
                          defaultChecked={this.state.payment}
                        ></input>
                        <div className={styles["logo-card"]}>
                          <img src={debit} alt="card" />
                        </div>
                        <p>Card</p>
                      </div>
                    </div>
                    <hr className={styles.hrRadio} />
                    <div className={styles["button-radio"]}>
                      <div className={styles["card-button"]}>
                        <input
                          type="radio"
                          value="2"
                          name="via"
                          disabled={true}
                          defaultChecked={this.state.payment}
                        ></input>
                        <div className={styles["logo-card-bank"]}>
                          <img src={bank} alt="card" />
                        </div>
                        <p>Bank acoount</p>
                      </div>
                    </div>
                    <hr className={styles.hrRadio} />
                    <div className={styles["button-radio-cod"]}>
                      <div className={styles["card-button"]}>
                        <input
                          type="radio"
                          value="3"
                          name="via"
                          disabled={true}
                          defaultChecked={this.state.payment}
                        ></input>
                        <div className={styles["logo-card-cod"]}>
                          <img src={cod} alt="card" />
                        </div>
                        <p>Cash on delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className={
                    this.state.pending ? styles.btn : styles["btn-non-select"]
                  }
                  onClick={() => {
                    if (this.state.pending) {
                      this.setState({
                        isLoading: true,
                      });
                      this.getRequset();
                    }
                  }}
                >
                  Mark as done
                </p>
              </aside>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const NewPayment = withNavigate(Payment);

export default NewPayment;

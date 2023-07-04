import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../components/Test";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import styles from "../styles/Payment.module.css";
import checklist from "../assets/img/payment/ceklist.png";
import Card from "../components/Card/CardPayments";
import debit from "../assets/img/payment/card.png";
import bank from "../assets/img/payment/bank.png";
import cod from "../assets/img/payment/cod.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { addCartActions } from "../redux/actions/counter";

export class Payment extends Component {
  state = {
    address: "",
    isLoading: true,
    message: "Woops! Nothing Transaction Here",
    LoadingPayment: false,
    product: [],
    userdata: [],
    user: [],
    userinfo: JSON.parse(localStorage.getItem("userInfo")),
    payment: null,
  };

  getRequset = () => {
    const Payment = this.state.payment;
    const {
      qty,
      size_id,
      subTotal,
      delivery_id,
      tax,
      product_id,
      shippihg,
      sizeCost,
    } = this.props.cart;
    let promo = 999;
    const fixTotal = subTotal + tax + shippihg + sizeCost;
    if (this.props.products.promo !== 999) promo = this.props.products.promo.id;
    const status_id = "1";
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`;
    Axios.post(
      url,
      {
        status: status_id,
        payment: Payment,
        fee: tax,
        delivery: delivery_id,
        promo_id: promo,
        size: size_id,
        qty: qty,
        subtotal: fixTotal,
        product_id: product_id,
      },
      { headers: { "x-access-token": this.state.userinfo.token } }
    ).then((result) => {
      const size = null;
      const qty = null;
      const image = null;
      const name = null;
      const price = null;
      const size_id = null;
      const subTotal = null;
      const shipping = null;
      const sizeCost = null;
      const delivery = null;
      const id = null;
      this.setState({
        isLoading: false,
        product: [],
      });
      window.open(result.data.redirctUrl, "_blank");
      return this.props.dispatch(
        addCartActions(
          size,
          qty,
          image,
          name,
          price,
          size_id,
          subTotal,
          shipping,
          sizeCost,
          delivery,
          id
        )
      );
    });
  };

  componentDidMount() {
    if (this.state.userinfo.token) {
      this.getDatas();
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
        product: res.data.data,
      });
      Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${this.state.userinfo.token}`,
        {
          headers: {
            "x-access-token": this.state.userinfo.token,
          },
        }
      ).then((results) => {
        this.setState({
          userdata: results.data.data.profileUser[0],
          user: results.data.data.profileData[0],
          isLoading: false,
        });
      });
    });
  };

  setGender(event) {
    this.setState({
      payment: event.target.value,
    });
  }

  getSize = () => {
    if (this.state.product.size == "R") return "Reguler";
    if (this.state.product.size == "L") return "Large";
    if (this.state.product.size == "XL") return "XL";
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
  sendCart = () => {
    const product = this.props.cart;
    return (
      <Card
        title={product.name}
        price={this.costing(product.price)}
        image={product.image}
        size={product.size}
        qty={product.qty}
      />
    );
  };
  render() {
    let subTotal = this.props.cart.subTotal || 0;
    let tax = this.props.cart.tax + this.props.cart.sizeCost || 0;
    let shipping = this.props.cart.shippihg || 0;
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
              <div
                className={
                  !this.state.isLoading && this.props.cart < 1
                    ? styles.crds
                    : styles["card-settings"]
                }
              >
                {!this.props.cart.subTotal && (
                  <div className={styles["notfound"]}>
                    <p className={styles.ntfound}>
                      {this.state.isLoading ? undefined : this.state.message}
                    </p>
                  </div>
                )}
                {this.state.isLoading ? (
                  <div className={styles["loader-container"]}>
                    <div className={styles.spinner}></div>
                  </div>
                ) : (
                  this.props.cart.subTotal && this.sendCart()
                )}
              </div>
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
            <aside className={styles["side-right"]}>
              <div className={styles["right-top"]}>
                <div className={styles["title-top"]}>
                  <p className={styles["addres-title"]}>Address details</p>
                  {/* <p className={styles["edit-title"]}>edit</p> */}
                </div>
                <div className={styles.top}>
                  <div className={styles["address-text"]}>
                    <div className={styles.delivery}>
                      <span className="me-1">Delivery </span>
                      <p>{this.state.userdata.adress}</p>
                    </div>
                    <hr className={styles.hr} />
                    <p>{this.state.userdata.adress}</p>
                    <hr className={styles.hr} />
                    <p>{this.state.user.phone}</p>
                  </div>
                </div>
              </div>
              <div
                className={styles["right-top"]}
                onChange={this.setGender.bind(this)}
              >
                <div className={styles["title-top"]}>
                  <p className={styles["addres-title"]}>Payment method</p>
                </div>
                <div className={styles.bottom}>
                  <div className={styles["button-radio"]}>
                    <div className={styles["card-button"]}>
                      <input type="radio" value="1" name="via"></input>
                      <div className={styles["logo-card"]}>
                        <img src={debit} alt="card" />
                      </div>
                      <p>Card</p>
                    </div>
                  </div>
                  <hr className={styles.hrRadio} />
                  <div className={styles["button-radio"]}>
                    <div className={styles["card-button"]}>
                      <input type="radio" value="2" name="via"></input>
                      <div className={styles["logo-card-bank"]}>
                        <img src={bank} alt="card" />
                      </div>
                      <p>Bank acoount</p>
                    </div>
                  </div>
                  <hr className={styles.hrRadio} />
                  <div className={styles["button-radio-cod"]}>
                    <div className={styles["card-button"]}>
                      <input type="radio" value="3" name="via"></input>
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
                  this.props.cart.name ? styles.btn : styles["btn-non-select"]
                }
                onClick={() => {
                  if (this.props.cart.name) {
                    this.setState({
                      isLoading: true,
                      message: "Payment Success!",
                    });
                    this.getRequset();
                  }
                }}
              >
                Confirm and Pay
              </p>
            </aside>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const NewPayment = withNavigate(Payment);

const mapStateToProps = (reduxState) => {
  return {
    products: reduxState.products,
    cart: reduxState.cart,
  };
};

export default connect(mapStateToProps)(NewPayment);

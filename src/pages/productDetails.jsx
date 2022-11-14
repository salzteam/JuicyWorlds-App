import React, { Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Test";
import NavbarLogout from "../components/Navbarlogout";
import Footer from "../components/Footer";
import styles from "../styles/ProductDetails.module.css";
import arrow from "../assets/img/details/panah.png";
import withLocation from "../helpers/withLocation";
import withSearchParams from "../helpers/withSearchParams";
import withNavigate from "../helpers/withNavigate";
import withRouteParams from "../helpers/withRouteParams";
import productsActions from "../redux/actions/product";
import { addCartActions } from "../redux/actions/counter";
import { createTransactionAction } from "../redux/actions/transactions";

class productDetails extends React.Component {
  state = {
    navbar: <Navbar />,
    id: "",
    name: "",
    price: "",
    image: "",
    desc: "",
    qty: 1,
    size: "Reguler",
    promo: [],
    isChange: false,
    dinein: styles.dinein,
    door: styles.dooroff,
    pickup: styles.pickupoff,
    yes: styles.yes,
    no: styles.nooff,
    reguler: styles["reguler-select"],
    large: styles.large,
    xl: styles.xl,
    created: [],
    userinfo: JSON.parse(localStorage.getItem("userInfo")),
  };

  validate = () => {
    if (!this.state.userinfo) {
      return this.props.navigate(`/login`);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.products.dataDel !== this.props.products.dataDel)
      return this.props.navigate("/product");
    if (prevProps.cart !== this.props.cart) console.log(this.props.cart);
  }

  deleteProduct = () => {
    this.props.dispatch(
      productsActions.deleteProductAction(
        this.state.userinfo.token,
        this.props.params.id
      )
    );
  };

  getRequset = () => {
    const { size, qty } = this.state;
    const { image, name, price, id } = this.props.products;
    const images = this.props.cart.image;
    const sizes = this.props.cart.size;
    const qtys = this.props.cart.qty;
    const namess = this.props.cart.name;
    if (images || sizes || qtys || namess)
      return this.setState({ isChange: true });
    let shipping = null;
    let size_id = null;
    let sizeCost = null;
    let delivery = null;
    if (this.state.dinein === styles.dinein) {
      shipping = 0;
      delivery = "1";
    }
    if (this.state.door === styles.doorin) {
      shipping = 10000;
      delivery = "2";
    }
    if (this.state.pickup === styles.pickupin) {
      shipping = 0;
      delivery = "3";
    }
    if (this.state.dinein === styles.dinein) shipping = 0;
    if (this.state.door === styles.doorin) shipping = 10000;
    if (this.state.pickup === styles.pickupin) shipping = 0;
    if (size === "Reguler") size_id = "1";
    if (size === "Large") {
      size_id = "2";
      sizeCost = 4000;
    }
    if (size === "Xl") {
      size_id = "3";
      sizeCost = 6000;
    }
    let discountValue = 0;
    if (this.props.products.promo !== 999)
      discountValue = this.props.products.promo.discount;
    let finalDiscount = 0;
    if (discountValue !== 0)
      finalDiscount = (parseInt(discountValue) / 100) * parseInt(price);
    let subTotal = parseInt(price) * parseInt(qty) - finalDiscount + sizeCost;
    if (discountValue == 0)
      subTotal = parseInt(price) * parseInt(qty) + parseInt(sizeCost);
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
  };
  getRequest = () => {
    const { size, qty } = this.state;
    const { image, name, price, id } = this.props.products;
    let shipping = null;
    let size_id = null;
    let sizeCost = null;
    let delivery = null;
    if (this.state.dinein === styles.dinein) {
      shipping = 0;
      delivery = "1";
    }
    if (this.state.door === styles.doorin) {
      shipping = 10000;
      delivery = "2";
    }
    if (this.state.pickup === styles.pickupin) {
      shipping = 0;
      delivery = "3";
    }
    if (size === "Reguler") size_id = "1";
    if (size === "Large") {
      size_id = "2";
      sizeCost = 4000;
    }
    if (size === "Xl") {
      size_id = "3";
      sizeCost = 6000;
    }
    let discountValue = 0;
    if (this.props.products.promo !== 999)
      discountValue = this.props.products.promo.discount;
    let finalDiscount = 0;
    if (discountValue !== 0)
      finalDiscount = (parseInt(discountValue) / 100) * parseInt(price);
    let subTotal = parseInt(price) * parseInt(qty) - finalDiscount + sizeCost;
    if (discountValue == 0)
      subTotal = parseInt(price) * parseInt(qty) + parseInt(sizeCost);
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
  };

  // getRequset = () => {
  //   this.validate();
  //   let size = "";
  //   let delivery = "";
  //   let qty = this.state.qty;
  //   let product_id = this.props.params.id;
  //   let sizeCost = 0;
  //   if (this.state.dinein === styles.dinein) delivery = "1";
  //   if (this.state.door === styles.doorin) delivery = "2";
  //   if (this.state.pickup === styles.pickupin) delivery = "3";
  //   if (this.state.size === "Reguler") size = "1";
  //   if (this.state.size === "Large") {
  //     size = "2";
  //     sizeCost = 4000;
  //   }
  //   if (this.state.size === "Xl") {
  //     size = "3";
  //     sizeCost = 6000;
  //   }
  //   let discountValue = 0;
  //   if (this.props.products.promo !== 999)
  //     discountValue = this.props.products.promo.discount;
  //   let finalDiscount = 0;
  //   if (discountValue !== 0)
  //     finalDiscount =
  //       (parseInt(discountValue) / 100) * parseInt(this.props.products.price);
  //   let subTotal =
  //     parseInt(this.props.products.price) * parseInt(qty) -
  //     finalDiscount +
  //     sizeCost;
  //   if (discountValue == 0)
  //     subTotal =
  //       parseInt(this.props.products.price) * parseInt(qty) +
  //       parseInt(sizeCost);
  //   const data = {
  //     size: size,
  //     delivery: delivery,
  //     qty: qty,
  //     product_id: product_id,
  //     status_id: "1",
  //     subtotal: subTotal,
  //   };
  //   this.props.dispatch(
  //     createTransactionAction(data, this.state.userinfo.token)
  //   );
  //   // const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`
  //   // Axios.post(url,
  //   //   , {headers: {
  //   //     "x-access-token": this.state.userinfo.token
  //   //   }
  //   // }).then((results) => {
  //   //   this.setState({
  //   //     created: results.data.data
  //   //   },() => {
  //   //   })
  //   // }).catch((err)=> [
  //   //   console.log(err)
  //   // ])
  // };

  showQty = () => {
    // let sizeName = "Reguler";
    // if (!this.props.transaction.data) return <p>{``}</p>;
    // if (this.props.transaction.data.size === "2") sizeName = "Large";
    // if (this.props.transaction.data.size === "3") sizeName = "Xl";
    // console.log(this.props.cart);
    if (this.props.cart.qty && this.props.cart.size)
      return <p>{`x${this.props.cart.qty} (${this.props.cart.size})`}</p>;
  };

  componentDidMount() {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userinfo) {
      this.setState({
        navbar: <Navbar />,
      });
    }
    // const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products/${this.props.params.id}`
    // Axios.get(url).then((res) =>
    // this.setState({
    //   id: res.data.data.dataProduct.id,
    //   name: res.data.data.dataProduct.product_name,
    //   price: res.data.data.dataProduct.price,
    //   image: res.data.data.dataProduct.image,
    //   desc: res.data.data.dataProduct.description,
    //   ctg: res.data.data.dataProduct.category_name,
    //   promo: res.data.data.dataPromo
    // },() => {
    //   console.log(this.state)
    // })
    // ).catch((err) => console.log(err))
    // this.props.products.data.map((product) => {
    //   if (product.id === this.props.params.id){
    //     this.setState({
    //       id: product.id,
    //       name: product.product_name,
    //       price: product.price,
    //       image: product.image,
    //       desc: product.description,
    //       ctg: product.category_name,
    //     },() => {console.log(this.state)})
    //   }
    // })
    this.props.dispatch(
      productsActions.getPromoProductAction(this.props.params.id)
    );
    // console.log(this.props.products)
  }

  setCtg = (category) => {
    if (category === "foods") return (category = "Foods");
    if (category === "non coffee") return (category = "Non Coffee");
    if (category === "coffee") return (category = "Coffee");
    if (category === "addon") return (category = "Add-On");
  };

  addqty = () => {
    let next = parseInt(this.state.qty) + 1;
    this.setState({
      qty: next,
    });
  };
  delqty = () => {
    if (this.state.qty > 1) {
      let next = parseInt(this.state.qty) - 1;
      this.setState({
        qty: next,
      });
    }
  };

  costing = (price) => {
    return (
      "IDR " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  nextCart = (target) => {
    if (!target) return <p className={styles.addbtn}></p>;
    return <p className={styles.addbtn}>{this.state.qty}</p>;
  };

  getAdmin = () => {
    if (this.state.userinfo && this.state.userinfo.role === "admin")
      return "Edit Product";
    return "Ask a Staff";
  };
  getCart = () => {
    if (this.state.userinfo && this.state.userinfo.role === "admin")
      return "Delete Product";
    return "Add to Cart";
  };
  totalPrice = () => {
    const price = this.props.products.price;
    const qty = this.state.qty;
    let total = price;
    if (qty !== 1) total = price * qty;
    return this.costing(total);
  };
  showImg = () => {
    if (this.props.cart.image)
      return <img src={this.props.cart.image} alt="NOT FOUND" />;
  };
  showTitle = () => {
    if (this.props.cart.name)
      return <p className={styles.stylecold}>{this.props.cart.name}</p>;
  };
  render() {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    let admin = null;
    if (userinfo && userinfo.role === "admin") admin = userinfo.role;
    return (
      <>
        {this.props.transaction.isLoading ||
          (this.props.products.delLoading && (
            <div className={styles["postion-pending"]}>
              <div className={styles["loader-container"]}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          ))}
        {this.state.navbar}
        {this.state.isChange && (
          <div className={styles.modalLogout}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <p className={styles["modal-title"]}>
                  Cart is already filled with some product
                </p>
              </div>
              <div className={styles["modal-body"]}>
                <p>Do you sure want to change product?</p>
              </div>
              <div className={styles["modal-footer"]}>
                <button
                  className={styles.button}
                  onClick={() => {
                    this.setState({ isChange: false });
                    this.getRequest();
                  }}
                >
                  {this.state.isLogout ? (
                    <div className={styles["loader-container-logout"]}>
                      <div className={styles.spinnerLogout}></div>
                    </div>
                  ) : (
                    "YES"
                  )}
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    this.setState({ isChange: false });
                  }}
                >
                  NO
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    this.setState({ isChange: false });
                    this.props.navigate(`/payment`);
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={styles.dark}>
          <main className={styles.main}>
            <p
              className={styles.title}
              onClick={() => {
                this.props.navigate(`/product`);
              }}
            >
              {" "}
              {this.setCtg(this.props.products.ctg)}{" "}
              <span className={styles.span}>
                {" "}
                &gt; {this.props.products.name}
              </span>
            </p>
            <div className={`${styles["container-fluid"]} ${styles.margins}`}>
              <div className={`row ${styles.container}`}>
                <div
                  className={`col-6 ${
                    !admin ? styles["content-left"] : styles["content-left-adm"]
                  }`}
                >
                  <img src={this.props.products.image} alt="NOT FOUND" />
                  {!admin && (
                    <div className={`col-12 ${styles["container-delivery"]}`}>
                      <p className={styles["title-delivery"]}>
                        Delivery and Time
                      </p>
                      <div className={`${styles["button-delivery"]}`}>
                        <p
                          className={this.state.dinein}
                          onClick={() => {
                            this.setState({
                              dinein: styles.dinein,
                              door: styles.dooroff,
                              pickup: styles.pickupoff,
                            });
                          }}
                        >
                          Dine In
                        </p>
                        <p
                          className={this.state.door}
                          onClick={() => {
                            this.setState({
                              dinein: styles.dineoff,
                              door: styles.doorin,
                              pickup: styles.pickupoff,
                            });
                          }}
                        >
                          Door Delivery
                        </p>
                        <p
                          className={this.state.pickup}
                          onClick={() => {
                            this.setState({
                              dinein: styles.dineoff,
                              door: styles.dooroff,
                              pickup: styles.pickupin,
                            });
                          }}
                        >
                          Pick up
                        </p>
                      </div>
                      <div className={styles["button-now"]}>
                        <p className={styles.now}>Now</p>
                        <div className={styles["yes-no"]}></div>
                        <p
                          className={this.state.yes}
                          onClick={() => {
                            this.setState({
                              yes: styles.yes,
                              no: styles.nooff,
                            });
                          }}
                        >
                          Yes
                        </p>
                        <p
                          className={this.state.no}
                          onClick={() => {
                            this.setState({
                              yes: styles.yesoff,
                              no: styles.no,
                            });
                          }}
                        >
                          No
                        </p>
                      </div>
                      <div className={styles.time}>
                        <p>Set time</p>
                        <input type="time" />
                      </div>
                    </div>
                  )}
                </div>
                <div className={`col-6 ${styles["content-right"]}`}>
                  <p className={styles["cold-brew"]}>
                    {this.props.products.name}
                  </p>
                  <p className={styles.aboutproduct}>
                    {this.props.products.desc}
                  </p>
                  <p className={styles.deliveryonly}>
                    {" "}
                    Delivery only on{" "}
                    <span className={styles["span-delivery"]}>
                      Monday to friday{" "}
                    </span>
                    at<span className={styles["span-delivery"]}> 1 - 7 pm</span>
                  </p>
                  <div className={`col-12 ${styles.buttonadd}`}>
                    <div className={`col-2 ${styles.plusminus}`}>
                      <div className={styles.borderminus}>
                        <p
                          className={styles.addbtn}
                          onClick={() => {
                            this.delqty();
                          }}
                        >
                          -
                        </p>
                      </div>
                      <div className={styles.bordermiddle}>
                        <p className={styles.addbtn}>{this.state.qty}</p>
                      </div>
                      <div className={styles.borderminus}>
                        <p
                          className={styles.addbtn}
                          onClick={() => {
                            this.addqty();
                          }}
                        >
                          +
                        </p>
                      </div>
                    </div>
                    <p className={styles.price}>{this.totalPrice()}</p>
                  </div>
                  <p
                    className={`${styles["styles.btn"]} ${styles.cart}`}
                    onClick={() => {
                      const check = this.getCart();
                      if (check === "Delete Product")
                        return this.deleteProduct();
                      return this.getRequset();
                    }}
                  >
                    {this.getCart()}
                  </p>
                  <p
                    className={`${styles["styles.btn"]} ${styles.staff}`}
                    onClick={() => {
                      const check = this.getAdmin();
                      if (check === "Edit Product")
                        return this.props.navigate(
                          `/product/${this.props.params.id}/edit`
                        );
                    }}
                  >
                    {this.getAdmin()}
                  </p>
                </div>
              </div>
            </div>
            {!admin && (
              <div className="container-fluid">
                <div className="row">
                  <div className={`col-4 ${styles["choose-size"]}`}>
                    <p className={styles.chosee}>Choose a size</p>
                    <div className={styles.size}>
                      <p
                        className={this.state.reguler}
                        onClick={() => {
                          this.setState({
                            reguler: styles["reguler-select"],
                            large: styles["large"],
                            xl: styles["xl"],
                            size: "Reguler",
                          });
                        }}
                      >
                        R
                      </p>
                      <p
                        className={this.state.large}
                        onClick={() => {
                          this.setState({
                            reguler: styles["reguler"],
                            large: styles["large-select"],
                            xl: styles["xl"],
                            size: "Large",
                          });
                        }}
                      >
                        L
                      </p>
                      <p
                        className={this.state.xl}
                        onClick={() => {
                          this.setState({
                            reguler: styles["reguler"],
                            large: styles["large"],
                            xl: styles["xl-select"],
                            size: "Xl",
                          });
                        }}
                      >
                        XL
                      </p>
                    </div>
                  </div>

                  <div className={`col-8 ${styles.checkout}`}>
                    <div className={styles.chart}>
                      {this.showImg()}
                      <div className={styles.detailsqty}>
                        {this.showTitle()}
                        {this.showQty()}
                      </div>
                    </div>
                    <div className={styles["checkout-left"]}>
                      <p>Checkout</p>
                      <div
                        className={styles.divarrow}
                        onClick={() => {
                          this.props.navigate(`/payment`);
                        }}
                      >
                        <img
                          className={styles.arrows}
                          src={arrow}
                          alt="NOT FOUND"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

const NewproductDetails = withLocation(
  withSearchParams(withRouteParams(withNavigate(productDetails)))
);

const mapStateToProps = (reduxState) => {
  return {
    products: reduxState.products,
    transaction: reduxState.transaction,
    cart: reduxState.cart,
  };
};

export default connect(mapStateToProps)(NewproductDetails);

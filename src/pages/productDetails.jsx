import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Test'
import NavbarLogout from "../components/Navbarlogout"
import Footer from '../components/Footer'
import styles from '../styles/ProductDetails.module.css'
import arrow from "../assets/img/details/panah.png"
import withLocation from "../helpers/withLocation";
import withSearchParams from "../helpers/withSearchParams";
import withNavigate from "../helpers/withNavigate";
import withRouteParams from "../helpers/withRouteParams";
import Axios from "axios"
import { Navigate } from "react-router-dom";


class productDetails extends React.Component {
  state = {
    navbar: <NavbarLogout/>,
    id: "",
    name: "",
    price: "",
    image: "",
    desc: "",
    qty: "1",
    size: "Reguler",
    promo: [],
    dinein : styles.dinein,
    door: styles.dooroff,
    pickup: styles.pickupoff,
    yes: styles.yes,
    no: styles.nooff,
    reguler: styles["reguler-select"],
    large: styles.large,
    xl: styles.xl,
    created: [],
    userinfo:  JSON.parse(localStorage.getItem("userInfo"))
  }

  validate = () => {
    if (!this.state.userinfo){
      return this.props.navigate(`/login`);
    }
  }

  getRequset = () => {
    this.validate()
    let size = ""
    let delivery = ""
    let qty = this.state.qty
    let product_id = this.props.params.id
    let sizeCost = 0
    if (this.state.dinein === styles.dinein) delivery = "1"
    if (this.state.door === styles.doorin) delivery = "2"
    if (this.state.pickup === styles.pickupin) delivery = "3"
    if (this.state.size === "Reguler") size = "1"
    if (this.state.size === "Large") {size = "2" 
    sizeCost = 4000}
    if (this.state.size === "Xl") {size = "3"
    sizeCost = 6000}
    let discountValue = 0
    if (this.state.promo !== 999) discountValue = this.state.promo.discount
    let finalDiscount = 0
    if(discountValue !== 0) finalDiscount = (parseInt(discountValue) / 100) * parseInt(this.state.price)
    let subTotal = (parseInt(this.state.price) * parseInt(qty)) - finalDiscount + sizeCost
    if(discountValue == 0) subTotal = (parseInt(this.state.price) * parseInt(qty)) + parseInt(sizeCost)
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`
    Axios.post(url, {
      size: size,
      delivery: delivery,
      qty: qty,
      product_id: product_id,
      status_id: "1",
      subtotal: subTotal
    }
      , {headers: {
        "x-access-token": this.state.userinfo.token
      }
    }).then((results) => {
      this.setState({
        created: results.data.data
      },() => {
      })
    }).catch((err)=> [
      console.log(err)
    ])
  }

  showQty = () => {
    let sizeName = "Reguler"
    if (this.state.created.length === 0) return <p>{``}</p>
    if (this.state.created.size === "2") sizeName = "Large"
    if (this.state.created.size === "3") sizeName = "Xl"
    return <p>{`x${this.state.created.qty} (${sizeName})`}</p>
  }


  componentDidMount(){
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userinfo) {
    this.setState({
        navbar: <Navbar/>
    })
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products/${this.props.params.id}`
    Axios.get(url).then((res) => 
    this.setState({
      id: res.data.data.dataProduct.id,
      name: res.data.data.dataProduct.product_name,
      price: res.data.data.dataProduct.price,
      image: res.data.data.dataProduct.image,
      desc: res.data.data.dataProduct.description,
      ctg: res.data.data.dataProduct.category_name,
      promo: res.data.data.dataPromo
    },() => {
      console.log(this.state)
    })
    ).catch((err) => console.log(err))
  }

  setCtg = (category) => {
    if (category === "foods") return category = "Foods"
    if (category === "non coffee") return category = "Non Coffee"
    if (category === "coffee") return category = "Coffee"
  }

  addqty = () => {
    let next = parseInt(this.state.qty) + 1
    this.setState({
      qty: next
    })
  }
  delqty = () => {
    if (this.state.qty > 0) {
      let next = parseInt(this.state.qty) - 1
      this.setState({
        qty: next
      })
    }
  }

  costing= (price) => {
    return 'IDR ' +  parseFloat(price).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  nextCart = (target) => {
    if (!target) return <p className={styles.addbtn}></p>
    return <p className={styles.addbtn}>{this.state.qty}</p>
  }

  render() {
    return (
      <>
          {this.state.navbar}
          <main className={styles.main}>
            <p className={styles.title} onClick={()=>{
              this.props.navigate(`/product`);
            }}> {this.setCtg(this.state.ctg)} <span className={styles.span}> &gt; {this.state.name}</span></p>
            <div className={`${styles["container-fluid"]} ${styles.margins}`}>
              <div className={`row ${styles.container}`}>
                <div className={`col-6 ${styles["content-left"]}`}>
                  <img src={this.state.image} alt="NOT FOUND"/>
                  <div className={`col-12 ${styles["container-delivery"]}`}>
                    <p className={styles["title-delivery"]}>Delivery and Time</p>
                    <div className={`${styles["button-delivery"]}`}>
                      <p className={this.state.dinein} onClick={()=>{
                        this.setState({
                          dinein: styles.dinein,
                          door: styles.dooroff,
                          pickup: styles.pickupoff,
                        })
                      }}>Dine In</p>
                      <p className={this.state.door} onClick={()=>{
                        this.setState({
                          dinein: styles.dineoff,
                          door: styles.doorin,
                          pickup: styles.pickupoff,
                        })
                      }}>Door Delivery</p>
                      <p className={this.state.pickup} onClick={()=>{
                        this.setState({
                          dinein: styles.dineoff,
                          door: styles.dooroff,
                          pickup: styles.pickupin,
                        })
                      }}>Pick up</p>
                    </div>
                    <div className={styles["button-now"]}>
                      <p className={styles.now}>Now</p>
                      <div className={styles["yes-no"]}></div>
                      <p className={this.state.yes} onClick={()=>{
                        this.setState({
                          yes: styles.yes,
                          no: styles.nooff
                        })
                      }}>Yes</p>
                      <p className={this.state.no} onClick={()=>{
                        this.setState({
                          yes: styles.yesoff,
                          no: styles.no
                        })
                      }}>No</p>
                    </div>
                    <div className={styles.time}>
                      <p>Set time</p>
                      <input type="time"/>
                    </div>
                  </div>
                </div>
                <div className={`col-6 ${styles["content-right"]}`}>
                  <p className={styles["cold-brew"]}>{this.state.name}</p>
                  <p className={styles.aboutproduct}>{this.state.desc}</p>
                  <p className={styles.deliveryonly}> Delivery only on <span className={styles["span-delivery"]}>Monday to friday </span>at<span className={styles["span-delivery"]}> 1 - 7 pm</span></p> 
                  <div className={`col-12 ${styles.buttonadd}`}>
                    <div className={`col-2 ${styles.plusminus}`}>
                      <div className={styles.borderminus}>
                        <p className={styles.addbtn} onClick={() => {
                          this.delqty()
                        }}>-</p>
                      </div>
                      <div className={styles.bordermiddle}>
                        <p className={styles.addbtn}>{this.state.qty}</p>
                      </div>
                      <div className={styles.borderminus}>
                        <p className={styles.addbtn} onClick={()=>{
                          this.addqty()
                        }}>+</p>
                      </div>
                    </div>
                    <p className={styles.price}>{this.costing(this.state.price)}</p>
                  </div>
                  <p className={`${styles["styles.btn"]} ${styles.cart}`} onClick={() =>{
                    this.getRequset()
                  }}>Add to Cart</p>
                  <p className={`${styles["styles.btn"]} ${styles.staff}`}>Ask a Staff</p>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className={`col-4 ${styles["choose-size"]}`}>
                  <p className={styles.chosee}>Choose a size</p>
                  <div className={styles.size}>
                    <p className={this.state.reguler} onClick={()=>{
                      this.setState({
                        reguler: styles["reguler-select"],
                        large: styles["large"],
                        xl: styles["xl"],
                        size: "Reguler"
                      })
                    }} >R</p>
                    <p className={this.state.large} onClick={()=>{
                      this.setState({
                        reguler: styles["reguler"],
                        large: styles["large-select"],
                        xl: styles["xl"],
                        size: "Large"
                      })
                    }} >L</p>
                    <p className={this.state.xl} onClick={()=>{
                      this.setState({
                        reguler: styles["reguler"],
                        large: styles["large"],
                        xl: styles["xl-select"],
                        size: "Xl"
                      })
                    }} >XL</p>
                  </div>
                </div>
                <div className={`col-8 ${styles.checkout}`}>
                  <img src={this.state.image} alt="NOT FOUND"/>
                  <div className={styles.detailsqty}>
                    <p className={styles.stylecold}>{this.state.name}</p>
                    {this.showQty()}
                  </div>
                  <div className={styles["checkout-left"]}>
                    <p>Checkout</p>
                    <div className={styles.divarrow} onClick={() => {
                        this.props.navigate(`/payment`);
                    }}>
                        <img className={styles.arrows} src={arrow} alt="NOT FOUND"/>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer/>
      </>
    )
  }
}

const NewproductDetails = withLocation(withSearchParams(withRouteParams(withNavigate(productDetails))));

export default NewproductDetails
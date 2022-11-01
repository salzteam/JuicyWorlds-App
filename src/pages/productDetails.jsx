import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import Footer from '../components/Footer'
import styles from '../styles/ProductDetails.module.css'
import arrow from "../assets/img/details/panah.png"
import withLocation from "../helpers/withLocation";
import withSearchParams from "../helpers/withSearchParams";
import withNavigate from "../helpers/withNavigate";
import withRouteParams from "../helpers/withRouteParams";
import Axios from "axios"

class productDetails extends React.Component {
  state = {
    id: "",
    name: "",
    price: "",
    image: "",
    desc: "",
    qty: "1",
    size: "Reguler",
    dinein : styles.dinein,
    door: styles.dooroff,
    pickup: styles.pickupoff,
    yes: styles.yes,
    no: styles.nooff,
    reguler: styles["reguler-select"],
    large: styles.large,
    xl: styles.xl
  }

  showQty = () => {
    const size = this.state.size
    const qty = this.state.qty
    return <p>{`x${qty} (${size})`}</p>
  }

  // getSize = (size) => {
  //   for (const [key, value] of Object.entries(this.state.listqty)) {
  //     if (size === key){
  //       let number =  parseInt(value) + 1
  //       this.setState({
  //         key: number
  //       }, () => {
  //         console.log(this.state)
  //       })
  //     }
  //   }
  // }

  // selectSize = () => {
  //   for (const [key, value] of Object.entries(this.state)) {
  //     const datas = `${key}: ${value}`
  //     if (value === "ProductDetails_reguler-select__2ANyI" || value === "ProductDetails_large-select__8OT0Z" || value === "ProductDetails_xl-select__ebKiE" ){
  //       this.setState({
  //         size: key
  //       }, () => {
  //         console.log(this.state);
  //       })
  //     }
  //   }
  // }

  componentDidMount(){
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products/${this.props.params.id}`
    Axios.get(url).then((res) => 
    // console.log(res.data.data)
    this.setState({
      id: res.data.data["0"].id,
      name: res.data.data["0"].product_name,
      price: res.data.data["0"].price,
      image: res.data.data["0"].image,
      desc: res.data.data["0"].description,
      ctg: res.data.data["0"].category_name
    })).catch((err) => console.log(err))
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

  render() {
    return (
      <>
        <div className={styles.navbar}>
          <div className={styles["navbar-pc"]}>
            <Navbar/>
          </div>
          <div className={styles["navbar-mobile"]}>
            <NavbarMobile/>
          </div>
        </div>
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
                    this.selectSize()
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
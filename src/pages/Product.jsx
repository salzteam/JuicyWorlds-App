import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import styles from "../styles/Product.module.css";
import grandma from "../assets/img/image-46.png";
import father from "../assets/img/father.png";
import prof from "../assets/img/prof.png";
import withNavigate from "../helpers/withNavigate";
import Card from "../components/Card/CardProduct"
import Footer from '../components/Footer'
import NavbarMobile from '../components/NavbarMobile'
import withLocation from "../helpers/withLocation";
import withSearchParams from "../helpers/withSearchParams";
import Test from '../components/Test'
import NavbarLogout from "../components/Navbarlogout"
import productsActions from "../redux/actions/product";

class Product extends React.Component {
  state = {
    search: "",
    product: [],
    navbar: <NavbarLogout/>,
    tglnext: styles.hide,
    tglprev: styles.hide,
    categoryFoods: "next-content",
    categoryCoffee: "next-content",
    categoryNonCoffee: "next-content",
    categoryPromo: "start-content",
    categoryAddOn: "next-content",
    searchParams: {
      filter: ""
    }
  }

  setPosition = () => {
    if(this.state.tglnext == styles.hide) return styles["bungkusan-left"]
    if(this.state.tglprev == styles.hide) return styles["bungkusan-right"]
    return styles.bungkusan
  }

  getCategory = () => {
    for (const [key, value] of Object.entries(this.state)) {
      const datas = `${key}: ${value}`
      if (value == "start-content") return datas
    }
  }

  something=(event)=> {
      if (event.keyCode === 13) {
      }
  }
  checkDiscount= (value) => {
    if (!value){
      return value = null
    }
    return value
  }
  componentDidMount(){
      // const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?transactions=popular&page=1&limit=12`
      // Axios.get(url).then((res) => 
      // this.setState({
      //   product: res.data.data.data
      // })).catch((err) => console.log(err))
      // this.getData("page=1&limit=12")
      this.props.dispatch(productsActions.getProductAction("page=1&limit=12"));
      if (this.props.products.next){
        this.setState({
          tglnext: styles.next,
        })
      }
      if (this.props.products.prev){
        this.setState({
          tglprev: styles.prev,
        })
      }
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo) {
      this.setState({
          navbar: <Test/>
      })
      }
  }
  onSearchHandler = (search) => {
    console.log(search)
    this.setState(
      (prevState) => ({
        searchParams: { ...prevState.searchParams, filter: search },
      }),
      () => {
        this.props.setSearchParams(this.state.searchParams);
      }
    );
  };
  getData = (limit) => {
    this.props.dispatch(productsActions.getProductAction(limit));
      if(this.props.products.next){
        this.setState({
          tglnext: styles.next
        })
      }
      if(this.props.products.prev){
        this.setState({
          tglprev: styles.prev
        })
      }
      if(!this.props.products.next){
        this.setState({
          tglnext: styles.hide
        })
      }
      if(!this.props.products.prev){
        this.setState({
          tglprev: styles.hide
        })
      }
  }

  fetchDatas = (text) => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?${text.toString()}`
    Axios.get(url).then((res) => 
    this.setState({
      product: res.data.data.data
    })).catch((err) => console.log(err))
  }
  costing= (price) => {
    return 'IDR ' +  parseFloat(price).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchParams.toString() !== this.props.searchParams.toString()){  
      this.fetchDatas(this.props.searchParams)
  }}
  render (){
    const { setSearchParams, params } = this.props;
    return(
    <>
        <div className={styles["navbar-pc"]}>
          {this.state.navbar}
        </div>
      <main className={styles["product-main"]}>
        <aside className={styles["left-content"]}>
          <h2 className={styles["title-left-content"]}>Promo Today</h2>
          <p className={styles["date-coupon"]}>
            Coupons will be updated every weeks. Check them out!{" "}
          </p>
          <div className={styles["promo-ipad"]}>
            <section className={styles["mother-border"]}>
              <div className={styles["mother-icon"]}>
                <img src={grandma} alt="" />
              </div>
              <div className={styles["mother-title"]}>
                <p className={styles["happy-title"]}>HAPPY MOTHER'S DAY! </p>
                <p className={styles["get-title"]}>
                  Get one of our favorite menu for free!
                </p>
              </div>
            </section>
            <section className={styles["father-border"]}>
              <div className={styles["father-icon"]}>
                <img src={father} alt="" />
              </div>
              <div className={styles["father-title"]}>
                <p className={styles["happy-title"]}>
                  Get a cup of coffee for free on sunday morning
                </p>
                <p className={styles["get-title-father"]}>Only at 7 to 9 AM</p>
              </div>
            </section>
            <section className={styles["mother-border2"]}>
              <div className={styles["mother-icon"]}>
                <img src={grandma} alt="" />
              </div>
              <div className={styles["mother-title"]}>
                <p className={styles["happy-title"]}>HAPPY MOTHER'S DAY! </p>
                <p className={styles["get-title"]}>
                  Get one of our favorite menu for free!
                </p>
              </div>
            </section>
            <section className={styles["prof-border"]}>
              <div className={styles["prof-icon"]}>
                <img src={prof} alt="" />
              </div>
              <div className={styles["prof-title"]}>
                <p className={styles["happy-title-prof"]}>HAPPY HALLOWEEN!</p>
                <p className={styles["get-title-prof"]}>
                  Do you like chicken wings? Get 1 free only if you buy pinky
                  promise
                </p>
              </div>
            </section>
          </div>
          <p className={`${styles.btn} ${styles["Apply-btn"]}`}>Apply Coupon</p>
          <br />
          <section className={styles["section-style"]}>
            <p className={styles.last}>Terms and Condition</p>
            <br />
            <section className={styles["last-left"]}>
              <ol>
                <li>You can only apply 1 coupon per day</li>
                <li>It only for dine in</li>
                <li>Buy 1 get 1 only for new user</li>
                <li>Should make member card to apply coupon</li>
              </ol>
            </section>
          </section>
        </aside>
        <aside className={styles["right-content"]}>
          <ul>
            <li className={styles[this.state.categoryPromo]} onClick={() =>{
              this.props.dispatch(productsActions.getPromoAction());
              this.setState({
                categoryPromo: "start-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "next-content",
              })
              this.onSearchHandler("promo")}} >Favorite & Promo</li>
            <li className={styles[this.state.categoryCoffee]} onClick={() =>{
              this.props.dispatch(productsActions.getCoffeAction());
              this.setState({
                categoryPromo: "next-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "start-content",
              })
              this.onSearchHandler("coffee")
            }}>Coffee</li>
            <li className={styles[this.state.categoryNonCoffee]} onClick={() => {
              this.props.dispatch(productsActions.getNoncoffeAction());
              this.setState({
                categoryPromo: "next-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "start-content",
                categoryAddOn: "next-content",
                categoryCoffee: "next-content",
              })
                this.onSearchHandler("non coffee")
            }}>Non Coffee</li>
            <li className={styles[this.state.categoryFoods]} onClick={() => {
              this.props.dispatch(productsActions.getFoodsAction());
              this.setState({
                categoryPromo: "next-content",
                categoryFoods: "start-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "next-content",
              })
                this.onSearchHandler("foods")
            }}>Foods</li>
            <li className={styles[this.state.categoryAddOn]}>Add-on</li>
          </ul>
          <section className={`container-fluid text-center ${styles.cardPadding}`}>
            <div
              className={`row list-content ${styles["gap-Row"]} ${styles["position-settings"]}`}
            >
              {!this.props.products.isLoading ? this.props.products.data.map((product) => {
                console.log(product)
                return <Card title={product.product_name} price={this.costing(product.price)} discount={this.checkDiscount(product.discount)} image={product.image} id={product.id} listCategory={this.getCategory()}/>
              })
            : 
            <div className={styles["loader-container"]}>
              <div className={styles.spinner}></div>
            </div>
            }
            </div>
            <div className={this.setPosition()}>
            <p className={this.state.tglprev}onClick={()=>{
                this.getData(this.props.products.prev)
              }}>PREV</p>
              <p className={this.state.tglnext} onClick={()=>{
                this.getData(this.props.products.prev)
              }}>NEXT</p>
            </div>
          </section>
          <section className={styles["bottom-list-pc"]}>
            <p>*the price has been cutted by discount appears</p>
          </section>
          <section className={styles["bottom-list-mb"]}>
            <p>*the price has been cutted by discount appears</p>
          </section>
        </aside>
      </main>
      <Footer/>
    </>
    )
  }
}

const NewProduct = withSearchParams(withLocation(withNavigate(Product)));

const mapStateToProps = (reduxState) => {
  return {
    products: reduxState.products,
  };
};


export default  connect(mapStateToProps)(NewProduct);

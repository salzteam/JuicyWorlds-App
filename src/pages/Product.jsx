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
    dropdown: false,
    isEdit: false,
    navbar: <NavbarLogout/>,
    categoryFoods: "next-content",
    categoryCoffee: "next-content",
    categoryNonCoffee: "next-content",
    categoryPromo: "start-content",
    categoryAddOn: "next-content",
    searchParams: {}
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
      this.onTransactionHandler("popular")
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userinfo) {
      this.setState({
          navbar: <Test/>
      })
      }
  }
  onSearchHandler = (search) => {
    this.setState(
      (prevState) => ({
        searchParams: { filter: search },
      }),
      () => {
        this.props.setSearchParams(this.state.searchParams);
      }
    );
  };
  onTransactionHandler = (search) => {
    this.setState(
      (prevState) => ({
        searchParams: {transactions: search },
      }),
      () => {
        this.props.setSearchParams(this.state.searchParams);
      }
    );
  };
  
  onSorthHandler = (search) => {
    const urlPrev = new URL(window.location.href);
    let params = new URLSearchParams(urlPrev.search);
    params.append("sort", search);
    this.props.setSearchParams(params);
    this.setState(
      (prevState) => ({
        searchParams: { ...prevState.searchParams, sort: search },
      }),
      () => {
        this.props.setSearchParams(this.state.searchParams);
      }
    );
  };
  onPricehHandler = (search) => {
    this.setState(
      (prevState) => ({
        searchParams: { ...prevState.searchParams, price: search },
      }),
      () => {
        this.props.setSearchParams(this.state.searchParams);
      }
    );
  };
  
  getData = (limit) => {
    this.props.dispatch(productsActions.getProductNextAction(limit));
  }

  fetchDatas = (text) => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?${text.toString()}`
    Axios.get(url).then((res) => 
    this.setState({
      product: res.data.data.data
    }))
  }
  costing= (price) => {
    return 'IDR ' +  parseFloat(price).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchParams.toString() !== this.props.searchParams.toString()){ 
      // console.log(this.props.searchParams.toString());
      this.props.dispatch(productsActions.getProductSelectAction(this.props.searchParams.toString(),"page=1&limit=12"));
  }}
  render (){
    const userinfo =  JSON.parse(localStorage.getItem("userInfo"))
    let admin = null
    if (userinfo && userinfo.role === "admin") admin = userinfo.role
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
          {admin && 
          <div className={styles["admin-promo"]}>
            <p>Edit promo</p>
            <p>Add new promo</p>
          </div>}
        </aside>
        <aside className={styles["right-content"]}>
          <ul>
            <li className={styles[this.state.categoryPromo]} onClick={() =>{
              this.props.dispatch(productsActions.getProductAction("page=1&limit=12"));
              this.setState({
                categoryPromo: "start-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "next-content",
              })
              this.onTransactionHandler("popular")}} >Favorite</li>
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
            <li className={styles[this.state.categoryAddOn]}onClick={() => {
              this.props.dispatch(productsActions.getAddOnAction());
              this.setState({
                categoryPromo: "next-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "start-content",
                categoryCoffee: "next-content",
              })
                this.onSearchHandler("addon")
            }}>Add-on</li>
          </ul>
          <div className={styles["setting-dropdown"]} onClick={() => {this.setState((prevState) => ({dropdown: prevState.dropdown ? false :true}))}}>
            <p className={styles.filters}>Filter &#8595;</p>
            <div className={this.state.dropdown ? styles.list : styles["list-hide"]}>
              <p onClick={()=>{this.onSorthHandler("newst")}}>Newst &#8617;</p>
              <p onClick={() => {this.onSorthHandler("latest")}}>Latest &#8617;</p>
              <p onClick={() => {this.onPricehHandler("pricey")}}>Pricey &#8617;</p>
              <p onClick={() => {this.onPricehHandler("cheap")}}>Cheap &#8617;</p>
            </div>
          </div>
          <section className={`container-fluid text-center ${styles.cardPadding}`}>
            <div
              className={`row list-content ${styles["gap-Row"]} ${styles["position-settings"]}`}
            > 
            {this.props.products.isError && <p>DATA NOT FOUND!</p>}
              {!this.props.products.isLoading ? this.props.products.data.map((product) => {
                if(product.id !== 999)
                return <Card key={product.id} title={product.product_name} price={this.costing(product.price)} discount={this.checkDiscount(product.discount)} image={product.image} id={product.id} listCategory={this.getCategory()} isEdit={this.state.isEdit} />
              })
            : 
            <div className={styles["loader-container"]}>
              <div className={styles.spinner}></div>
            </div>
            }
            </div>
            <div className={styles.bungkusan}>
            <p className={this.props.products.tglprev}onClick={()=>{
              if (this.props.products.tglprev !== styles.hide) return this.getData(!this.props.products.isLoading && this.props.products.prev)
              }}>PREV</p>
              <p className={this.props.products.tglnext} onClick={()=>{
                if (this.props.products.tglnext !== styles.hide) return this.getData(!this.props.products.isLoading && this.props.products.next)
              }}>NEXT</p>
            </div>
          </section>
          <section className={styles["bottom-list-pc"]}>
            <p>*the price has been cutted by discount appears</p>
          </section>
          {admin &&
            <div className={styles.admin}>
              <p onClick={() => {this.setState((prevState) => ({isEdit: prevState.isEdit?false:true}))}}>Edit product</p>
              <p onClick={() => {
                this.props.navigate("/product/addproduct")
              }}>Add new product</p>
            </div>}
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

import React from "react";
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
import Axios from "axios";
import Test from '../components/Test'
import NavbarLogout from "../components/Navbarlogout"

class Product extends React.Component {
  state = {
    search: "",
    product: [],
    navbar: <NavbarLogout/>,
    next: "",
    prev: "",
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
      this.getData("page=1&limit=12")
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
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?transactions=popular&${limit}`
    Axios.get(url).then((res) => {
      this.setState({
        product: res.data.data.data,
        next: res.data.data.next,
        prev: res.data.data.prev,
      })
      if(res.data.data.next !== null){
        this.setState({
          tglnext: styles.next
        })
      }
      if(res.data.data.prev !== null){
        this.setState({
          tglprev: styles.prev
        })
      }
      if(res.data.data.next == null){
        this.setState({
          tglnext: styles.hide
        })
      }
      if(res.data.data.prev == null){
        this.setState({
          tglprev: styles.hide
        })
      }
  })
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
      {/* <header className={`${styles["nav-pc"]} ${styles["product-header"]}`}>
        <div className={styles.navBrand}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <p>Juicy Worlds</p>
        </div>
        <div className={styles.navList}>
          <ul>
            <Link to={"/"} className={styles["new-Navlist"]}>
              <li className={styles["nav-text"]}>Home</li>
            </Link>
            <Link to={"/product"} className={styles["new-Navlist"]}>
              <li className={styles.product}>Product</li>
            </Link>
            <Link to={"/"} className={styles["new-Navlist"]}>
              <li className={styles["nav-text"]}>Your Cart</li>
            </Link>
            <Link to={"/history"} className={styles["new-Navlist"]}>
              <li className={styles["nav-text"]}>History</li>
            </Link>
          </ul>
        </div>
        <div className={styles["Nav-Search"]}>
          <i
            className={`fa-solid fa-magnifying-glass ${styles["new-Navsearch"]}`}
          ></i>
          <input className={styles.search} id="searchProduct"type="text" placeholder="Search" onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.onSearchHandler(e.target.value);
            }
          }}/>
        </div>
        <div className={styles.navSide}>
          <Link to={"/product"}>
            <img className={styles["nav-chat"]} src={chat} alt="" />
          </Link>
          <Link to={"/profile"}>
            <img className={styles["nav-profile"]} src={pp} alt="" />
          </Link>
          <div className={styles.content}>
            <p>1</p>
          </div>
        </div>
      </header>
      <div className={styles["mobile-header"]}>
        <NavbarMobile/>
      </div> */}
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
              const urlpromo = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/promo`
              Axios.get(urlpromo).then((res) => 
              this.setState({
                categoryPromo: "start-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "next-content",
                product: res.data.data.data,
                tglnext: styles.hide,
                tglprev: styles.hide,
              })).catch((err) => console.log(err))
              this.onSearchHandler("promo")}} >Favorite & Promo</li>
            <li className={styles[this.state.categoryCoffee]} onClick={() =>{
              const urlcoffee = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=coffee`
              Axios.get(urlcoffee).then((res) => 
              this.setState({
                categoryPromo: "next-content",
                categoryFoods: "next-content",
                categoryNonCoffee: "next-content",
                categoryAddOn: "next-content",
                categoryCoffee: "start-content",
                product: res.data.data.data,
                tglnext: styles.hide,
                tglprev: styles.hide,
              })).catch((err) => console.log(err))
              this.onSearchHandler("coffee")
            }}>Coffee</li>
            <li className={styles[this.state.categoryNonCoffee]} onClick={() => {
                const urlnoncoffee = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=non%20coffee`
                Axios.get(urlnoncoffee).then((res) => 
                
                this.setState({
                  categoryPromo: "next-content",
                  categoryFoods: "next-content",
                  categoryNonCoffee: "start-content",
                  categoryAddOn: "next-content",
                  categoryCoffee: "next-content",
                  product: res.data.data.data,
                  tglnext: styles.hide,
                  tglprev: styles.hide,
                }
                )).catch((err) => console.log(err))
                this.onSearchHandler("non coffee")
            }}>Non Coffee</li>
            <li className={styles[this.state.categoryFoods]} onClick={() => {
                const urlfoods = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=foods`
                Axios.get(urlfoods).then((res) => 
                this.setState({
                  categoryPromo: "next-content",
                  categoryFoods: "start-content",
                  categoryNonCoffee: "next-content",
                  categoryAddOn: "next-content",
                  categoryCoffee: "next-content",
                  product: res.data.data.data,
                  tglnext: styles.hide,
                  tglprev: styles.hide,
                })).catch((err) => console.log(err))
                this.onSearchHandler("foods")
            }}>Foods</li>
            <li className={styles[this.state.categoryAddOn]}>Add-on</li>
          </ul>
          <section className="container-fluid text-center">
            <div
              className={`row list-content justify-content-center
                            ${styles["gap-Row"]} ${styles["position-settings"]}`}
            >
              {this.state.product.map((product) => {
                return <Card title={product.product_name} price={this.costing(product.price)} discount={this.checkDiscount(product.discount)} image={product.image} id={product.id} listCategory={this.getCategory()}/>
              })}
            </div>
            <div className={this.setPosition()}>
            <p className={this.state.tglprev}onClick={()=>{
                console.log(this.state.prev)
                this.getData(this.state.prev)
              }}>PREV</p>
              <p className={this.state.tglnext} onClick={()=>{
                console.log(this.state.next)
                this.getData(this.state.next)
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

export default NewProduct;

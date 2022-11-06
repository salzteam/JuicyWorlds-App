import React from "react";
import { connect } from "react-redux";
import styles from "../styles/Addproduct.module.css";
import Header from "../components/Test";
import Footer from "../components/Footer";
import Camera from "../assets/img/default.png";
import productsActions from "../redux/actions/product";
import withNavigate from "../helpers/withNavigate";

class AddProduct extends React.Component {
    state = {
        selectCategory : false,
        category: "Choose Category",
        ctg_id: null,
        nameProduct: null,
        priceProduct: null,
        description: null,
        newPicture: null,
        errProduct: null,
        errPrice: null,
        errDescription: null,
        errPicture: null,
        errCategory: null,
        error: 0
    }
    sendCreate = () => {
        this.setState({
            errProduct: null,
            errPrice: null,
            errDescription: null,
            errPicture: null,
            errCategory: null,
            error: 0
        })
        const userinfo =  JSON.parse(localStorage.getItem("userInfo"))
        if (!this.state.nameProduct) this.setState({errProduct: "*** Product name is required! ***", error: 1}) 
        if (!this.state.priceProduct)  this.setState({errPrice: "*** Product price is required! ***", error: 2}) 
        if (!this.state.description)  this.setState({errDescription: "*** Product description is required! ***", error: 3}) 
        if (!this.state.newPicture)  this.setState({errPicture: "*** Product picture is required! ***", error: 4}) 
        if (!this.state.ctg_id)  this.setState({errCategory: "*** Product Category is required! ***", error: 5})
        setTimeout(() =>{
            if (this.state.error !== 0) return
            let body = new FormData();
            body.append('nameProduct', this.state.nameProduct)
            body.append('priceProduct', this.state.priceProduct)
            body.append('categoryproduct', this.state.ctg_id)
            body.append('description', this.state.description)
            body.append('image', this.state.newPicture)
            this.props.dispatch(productsActions.createProductAction(body, userinfo.token));
        }, 10)
    }
    componentDidUpdate(prevProps){
        if (prevProps.product.dataCreate !== this.props.product.dataCreate)return this.props.navigate(`/product-details/${this.props.product.dataCreate.id}`)
    }
    imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.setState({ newPicture:  e.target.files[0]});
        }
      };
    render(){
        return (
            <>
            <Header />
            {this.props.product.isLoading && 
            <div className={styles["loader-container"]}>
                <div className={styles.spinner}></div>
            </div>}
            <main>
                <div className="container">
                <div className="row">
                    <div className="col-12">
                    <div className={styles.title} onClick={() => {this.props.navigate("/product")}}>
                        <p>
                        Favorite & Promo
                        <span> &gt; Add new product </span>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="container">
                <div className="row ">
                    <div className="col-lg-4 text-center">
                    <section className={styles["left-content"]}>
                        <div className={styles["photo-detail"]}>
                        <img src={this.state.newPicture? URL.createObjectURL(this.state.newPicture) : Camera} alt="img"className={styles["photo-promo"]}>
                            {/* <img src={this.state.newPicture? URL.createObjectURL(this.state.newPicture) : Camera} alt="default" /> */}
                        </img>
                        {this.state.errPicture && <p className={styles.err}>{this.state.errPicture}</p>}
                        <div className={styles["take-picture"]}>
                            <p className={`${styles.btn} ${styles["take-img"]}`}>Take a picture</p>
                        </div>
                        <div className={styles["from-gallery"]}>
                            <label className={`${styles.btn} ${styles["choose-img"]}`}>
                                <input type="file" onChange={(e) => {this.imageChange(e)}}/>Choose from gallery
                            </label>
                        </div>
                        </div>
                        <form action="">
                        <div className={`${styles["promo-details"]} `}>
                            <div
                            className={`${styles["coupon-code"]} ${styles["input-box"]}`}
                            >
                            <label className={styles["input-title"]}>
                                Select Category :
                            </label>
                            <div className={styles["box-dropdown"]} onClick={()=>{this.setState((prevState) => ({selectCategory: prevState.selectCategory?false:true}))}}>
                                <p>{this.state.category}</p>
                                <div className={styles.arrows}>
                                    <p>&#9586;</p>
                                    <p>&#9585;</p>
                                </div>
                            </div>
                                <div className={this.state.selectCategory ? styles["list-dropdown"] : styles.none}>
                                    <p onClick={()=>{this.setState({category : "Foods", ctg_id: 1, selectCategory: false})}}>Foods</p>
                                    <p onClick={()=>{this.setState({category : "Coffee", ctg_id: 2, selectCategory: false})}}>Coffee</p>
                                    <p onClick={()=>{this.setState({category : "Non Coffee", ctg_id: 3, selectCategory: false})}}>Non Coffe</p>
                                    <p onClick={()=>{this.setState({category : "Add Ons", ctg_id: 4, selectCategory: false})}}>Add Ons</p>
                                </div>
                            </div>
                            {this.state.errCategory && <p className={styles.err}>{this.state.errCategory}</p>}
                        </div>
                        </form>
                    </section>
                    </div>
                    <div className="col-lg-7 offset-lg-1">
                    <section className={styles["right-content"]}>
                        <form action="">
                        <div className={styles["promo-details"]}>
                            <div className={styles["input-box"]}>
                            <label className={styles["input-title"]}>Name :</label>
                            <input
                                type="text"
                                name="stock"
                                required
                                placeholder="Type product name"
                                onChange={(e)=>{this.setState({nameProduct: e.target.value})}}
                            />
                            </div>
                            {this.state.errProduct && <p className={styles.err}>{this.state.errProduct}</p>}
                            <div className={styles["input-box"]}>
                            <label className={styles["input-title"]}>
                                Normal Price :
                            </label>
                            <input
                                type="number"
                                name="code"
                                placeholder="Type the normal price"
                                onChange={(e)=>{this.setState({priceProduct: e.target.value})}}
                            />
                            </div>
                            {this.state.errPrice && <p className={styles.err}>{this.state.errPrice}</p>}
                            <div className={styles["input-box"]}>
                            <label className={styles["input-title"]}>
                                Description :
                            </label>
                            <input
                                type="text"
                                name="code"
                                placeholder="Describe your product"
                                onChange={(e)=>{this.setState({description: e.target.value})}}
                            />
                            </div>
                            {this.state.errDescription && <p className={styles.err}>{this.state.errDescription}</p>}
                            {/* <div>
                                <div className={styles["input-box"]}>
                                    <p className={styles["input-title"]}>Input product size :</p>
                                    <p className={styles["select-title"]}>Click size you want to use for this product</p>
                                    <div className={styles["box-btn-methods"]}>
                                        <div className={`${styles.sizes} ${styles.nonSelect}`}><p>R</p></div>
                                        <div className={`${styles.sizes} ${styles.nonSelect}`}><p>L</p></div>
                                        <div className={`${styles.sizes} ${styles.nonSelect}`}><p>XL</p></div>
                                        <div className={styles.gram}><p>250 gr</p></div>
                                        <div className={styles.gram}><p>300 gr</p></div>
                                        <div className={styles.gram}><p>500 gr</p></div>
            
                                    </div>
                                </div>
                                <div className={styles["input-box"]}>
                                    <p className={styles["input-title"]}>Input delivery methods :</p>
                                    <p className={styles["select-title"]}>Click methods you want to use for this product</p>
                                    <div className={styles["box-btn-methods"]}>
                                        <p className={`${styles["btn-methods"]}  ${styles.select}`}>Home Delivery</p>
                                        <p className={`${styles["btn-methods"]}  ${styles.select}`}>Dine in</p>
                                        <p className={`${styles["btn-methods"]}  ${styles.select}`}>Take away</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        </form>
                        <div className={styles["save-change"]} onClick={()=>{this.sendCreate()}}>
                        <p className={`${styles.btn} ${styles["save-btn"]}`}>Save Product</p>
                        </div>
                        <div className={styles.cancel}>
                        <p className={`${styles.btn} ${styles["cancel-btn"]}`} onClick={()=>{
                            this.setState({
                                selectCategory : false,
                                category: "Choose Category",
                                nameProduct: null,
                                priceProduct: null,
                                description: null,
                                newPicture: null,
                                errProduct: null,
                                errPrice: null,
                                errDescription: null,
                                errPicture: null,
                                errCategory: null,
                            })
                        }}>Cancel</p>
                        </div>
                    </section>
                    </div>
                </div>
                </div>
            </main>
            <Footer />
            </>
        );
}}

const mapStateToProps = (reduxState) => {
  return {
    product: reduxState.products,
  };
};

export default connect(mapStateToProps)(withNavigate(AddProduct));

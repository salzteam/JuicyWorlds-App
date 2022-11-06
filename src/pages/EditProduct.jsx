import React from "react";
import { connect } from "react-redux";
import styles from "../styles/Editproduct.module.css";
import Header from "../components/Test";
import Footer from "../components/Footer";
import Camera from "../assets/img/default.png";
import productsActions from "../redux/actions/product";
import withNavigate from "../helpers/withNavigate";
import withRouteParams from "../helpers/withRouteParams";

class AddProduct extends React.Component {
    state = {
        selectCategory : false,
        ctg_id: null,
        nameProduct: null,
        priceProduct: null,
        description: null,
        newPicture: null,
        selectCtg: null,
    }

    componentDidMount(){
        this.props.dispatch(productsActions.getPromoProductAction(this.props.params.id));
    }

    getCategory = () => {
        if (!this.props.product.isLoading){
            if(this.props.product.ctg) return `${this.props.product.ctg}`
            return "Loading...."
        } return "Loading...."
    }

    sendEdit = () => {
        const userinfo =  JSON.parse(localStorage.getItem("userInfo"))
        let body = new FormData();
        if (this.state.nameProduct) body.append('nameProduct', this.state.nameProduct)
        if (this.state.priceProduct) body.append('priceProduct', this.state.priceProduct)
        if (this.state.description) body.append('description', this.state.description)
        if (this.state.newPicture) body.append('image', this.state.newPicture)
        if (this.state.ctg_id) body.append('category_id', this.state.ctg_id)
        console.log(this.state.ctg_id)
        this.props.dispatch(productsActions.editProductAction(body, userinfo.token, this.props.params.id));
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.product.dataEdit !== this.props.product.dataEdit)return this.props.navigate(`/product-details/${this.props.params.id}`)
        // if (prevState.state !== this.state){
        //     return this.sendSelect()
        // }
    }
    imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.setState({ newPicture:  e.target.files[0]});
        }
      };
    setDisplay = () => {
        if (!this.props.product.isLoading && !this.props.product.image && !this.state.newPicture) return Camera
        if (!this.props.product.isLoading && this.props.product.image && !this.state.newPicture) return this.props.product.image
        if (!this.props.product.isLoading && this.props.product.image && this.state.newPicture) return URL.createObjectURL(this.state.newPicture)
    }
    sendSelect = () => {
        const product = this.state
        if (product.nameProduct || product.priceProduct || product.selectCtg || product.description || product.newPicture){
            return `${styles.btn} ${styles["save-btn"]}`
        } 
        return `${styles.btn} ${styles["save-btn-none"]}`
    }
    setCtg = (category) => {
        if (category === "foods") return category = "Foods"
        if (category === "non coffee") return category = "Non Coffee"
        if (category === "coffee") return category = "Coffee"
        if (category === "addon") return category = "Add-On"
      }
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
                    <div className={styles.title} onClick={()=>{
                        this.props.navigate(`/product-details/${this.props.params.id}`)
                    }}>
                        <p>
                        {!this.props.product.isLoading && this.setCtg(this.props.product.ctg)}
                        <span> &gt; Edit product </span>
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
                        <img src={this.props.product.isLoading ? Camera :  this.setDisplay()} alt="img"className={styles["photo-promo"]}>
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
                                {/* <p>{!this.props.product.isLoading ? this.props.product.ctg: this.state.category}</p> */}
                                <p>{this.state.selectCtg ? this.state.selectCtg : this.getCategory()}</p>
                                <div className={styles.arrows}>
                                    <p>&#9586;</p>
                                    <p>&#9585;</p>
                                </div>
                            </div>
                                <div className={this.state.selectCategory ? styles["list-dropdown"] : styles.none}>
                                    <p onClick={()=>{this.setState({selectCtg : "Foods", ctg_id: 1, selectCategory: false})}}>Foods</p>
                                    <p onClick={()=>{this.setState({selectCtg : "Coffee", ctg_id: 2, selectCategory: false})}}>Coffee</p>
                                    <p onClick={()=>{this.setState({selectCtg : "Non Coffee", ctg_id: 3, selectCategory: false})}}>Non Coffe</p>
                                    <p onClick={()=>{this.setState({selectCtg : "Add Ons", ctg_id: 4, selectCategory: false})}}>Add Ons</p>
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
                                placeholder={!this.props.product.isLoading ? this.props.product.name : "Loading..."}
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
                                placeholder={!this.props.product.isLoading ? this.props.product.price : "Loading..."}
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
                                placeholder={!this.props.product.isLoading ? this.props.product.desc : "Loading..."}
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
                        <div className={styles["save-change"]} onClick={()=>{
                            const check = this.sendSelect()
                            if(check !== `${styles.btn} ${styles["save-btn-none"]}`) return this.sendEdit()}}>
                        <p className={this.sendSelect()}>Save Product</p>
                        </div>
                        <div className={styles.cancel}>
                        <p className={`${styles.btn} ${styles["cancel-btn"]}`} onClick={()=>{
                            this.setState({
                                selectCategory : false,
                                selectCtg: null,
                                nameProduct: null,
                                priceProduct: null,
                                description: null,
                                newPicture: null,
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

export default connect(mapStateToProps)(withRouteParams(withNavigate(AddProduct)));

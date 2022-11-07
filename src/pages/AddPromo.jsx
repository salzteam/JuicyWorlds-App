import React from "react";
import styles from "../styles/AddPromo.module.css";
import Header from "../components/Test";
import Footer from "../components/Footer";
import Camera from "../assets/img/default.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios"
import { addpromoAction } from "../redux/actions/promo"

class AddPromo extends React.Component {
  state = {
    selectProduct : false,
    isLoading: false,
    product: "Select Product...",
    select_id: null,
    newPicture: null,
    newName: null,
    newDesc: null,
    newDiscount: null,
    newColor: null,
    newStart: null,
    newEnd: null,
    newCode: null,
    errMsg: null,
    data: {},
  }
  componentDidMount(){
    Axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/products`).then((result) => {
      this.setState({
        data: result.data.data.data
      })
    }).catch((err)=>{ this.setState({errMsg: "*** sistem error, try again later ***", isLoading:false})})
  }
  componentDidUpdate(prevState){
    // if (prevState.select_id !== this.state.select_id) return console.log(this.state.select_id)
    // if (prevState.data !== this.state.data) return this.setState({isLoading: false})
  }
  imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ newPicture: e.target.files[0]});
    }
  };
  sendData = () => {
    const {select_id,newPicture,newName,newDesc,newDiscount,newColor,newStart,newEnd,newCode} = this.state
    let body = new FormData();
    if (!select_id || !newPicture || !newName || !newDesc || !newDiscount || !newColor || !newStart || !newEnd || !newCode) return this.setState({errMsg: "*** all data must be filled ***"})
    if (select_id) body.append('product_id', select_id)
    if (newPicture) body.append('image', newPicture)
    if (newName) body.append('title', newName)
    if (newDesc) body.append('desc', newDesc)
    if (newDiscount) body.append('discount', newDiscount)
    if (newColor) body.append('color', newColor)
    if (newStart) body.append('start', newStart)
    if (newEnd) body.append('end', newEnd)
    if (newCode) body.append('code', newCode)
    this.setState({isLoading:true})
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    Axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/promo/create`, body, {
      headers: {
        "x-access-token": userinfo.token,
      },
    }).then(()=>{
      this.setState({isLoading: false})
      this.props.navigate("/product")
    }).catch((err)=>{
      this.setState({errMsg: "*** sistem error, try again later ***", isLoading:false})
    })
  }
  render () {
    const { selectProduct,product, newPicture } = this.state
    return (
      <>
        <Header />
        {this.state.isLoading && 
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
                    <span> &gt; Add new promo</span>
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
                      <img src={newPicture? URL.createObjectURL(newPicture) : Camera} alt="img"className={styles["photo-promo"]}>
                              {/* <img src={this.state.newPicture? URL.createObjectURL(this.state.newPicture) : Camera} alt="default" /> */}
                          </img>
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
                      <div className={`${styles["coupon-code"]} ${styles["input-box"]}`}>
                          <label className={styles["input-title"]}>
                              Select Product :
                          </label>
                          <div className={styles["box-dropdown"]} onClick={()=>{this.setState((prevState) => ({selectProduct: prevState.selectProduct?false:true}))}}>
                              <p>{product}</p>
                              <div className={styles.arrows}>
                                  <p>&#9586;</p>
                                  <p>&#9585;</p>
                              </div>
                          </div>
                              <div className={selectProduct ? styles["list-dropdown"] : styles.none}>
                                <div>{this.state.data.length > 0 && this.state.data.map((product,index)=>{
                                    if (product.id !== 999)return <p key={index} onClick={()=>{
                                      const select = product.id
                                      this.setState({select_id: select, selectProduct:false, product: product.product_name})
                                    }}>{index+1}. {product.product_name}</p>
                                  // <p>{product.product_name}</p>
                                })}</div>
                              </div>
                          </div>
                      </div>
                    <div className={`${styles["promo-details"]} `}>
                      <div
                        className={`${styles["enter-discount"]} ${styles["input-box"]}`}
                      >
                        <label className={styles["input-title"]}>
                          Select Color :
                        </label>
                        <input
                        className={styles.color}
                          type="color"
                          name="stock"
                          required
                          onChange={(e)=>{this.setState({newColor: e.target.value})}}
                          // placeholder="Input stock"
                        />
                      </div>
                      <div
                        className={`${styles["expire-date"]} ${styles["input-box"]}`}
                      >
                        <label className={styles["input-title"]}>
                          Expire date :
                        </label>
                        <input
                          type="date"
                          name="start"
                          required
                          placeholder="Select start date"
                          onChange={(e)=>{this.setState({newStart: e.target.value})}}
                        />
                        <input
                          type="date"
                          name="end"
                          required
                          placeholder="Select end date "
                          onChange={(e)=>{this.setState({newEnd: e.target.value})}}
                        />
                      </div>
                      <div
                        className={`${styles["coupon-code"]} ${styles["input-box"]}`}
                      >
                        <label className={styles["input-title"]}>
                          Input coupon code :
                        </label>
                        <input type="text" name="code" placeholder="Input code" onChange={(e)=>{this.setState({newCode: e.target.value})}} />
                      </div>
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
                          placeholder="Type promo name min. 50 characters"
                          onChange={(e)=>{this.setState({newName: e.target.value})}}
                        />
                      </div>  
                      <div className={styles["input-box"]}>
                        <label className={styles["input-title"]}>
                          Description :
                        </label>
                        <input
                          type="text"
                          name="code"
                          placeholder="Describe your promo min. 150 characters"
                          onChange={(e)=>{this.setState({newDesc: e.target.value})}}
                        />
                      </div>
                      <div className={styles["input-box"]}>
                        <label className={styles["input-title"]}>
                          Discount Product :
                        </label>
                        <input
                          type="number"
                          name="code"
                          placeholder="Input discount here"
                          onChange={(e)=>{this.setState({newDiscount: e.target.value})}}
                        />
                      </div>
                    </div>
                  </form>
                  <div className={styles["save-change"]} onClick={() => {this.sendData()}}>
                  {this.state.errMsg && <p className={styles.err}>{this.state.errMsg}</p>}
                  <p className={`${styles.btn} ${styles["save-btn"]}`}>Save Promo</p>
                  </div>
                  <div className={styles.cancel}>
                  <p className={`${styles.btn} ${styles["cancel-btn"]}`} onClick={() => {
                    this.setState({
                      product: "Select Product...",
                      select_id: null,
                      newPicture: null,
                      newName: null,
                      newDesc: null,
                      newDiscount: null,
                      newColor: null,
                      newStart: null,
                      newEnd: null,
                      newCode: null,
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
  }
}

export default withNavigate(AddPromo);

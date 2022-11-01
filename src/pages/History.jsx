import React, { Component } from 'react'
import Test from '../components/Test'
import NavbarMobile from '../components/NavbarMobile'
import Footer from '../components/Footer'
import Card from "../components/Card/CardHistory"
import styles from "../styles/History.module.css"
import withNavigate from "../helpers/withNavigate";
import Axios from "axios"


export class History extends Component {
  state = {
    product: [],
    next: "",
    prev: "",
    isChecked: false,
    tglnext: styles.hide,
    tglprev: styles.hide
  }
  costing= (price) => {
    return 'IDR ' +  parseFloat(price).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  
  setPosition = () => {
    if(this.state.tglnext == styles.hide) return styles["bungkusan-left"]
    if(this.state.tglprev == styles.hide) return styles["bungkusan-right"]
    return styles.bungkusan
  }

  getData = (limit) => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    if (!userinfo){
      return this.props.navigate("/login");
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/history?${limit}`
    Axios.get(url,{headers: {
      "x-access-token": userinfo.token
    }}).then((res) => {
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

  componentDidMount(){
    this.getData("page=1&limit=15")
  }
  render() {
    return (
      <>
        <div>
          <Test />
        </div>
         <main className={styles.main}>
            <section className={styles.container}>
                <div className={styles["title-settings"]}>
                    <p className={styles["title-history"]}>Let's see what you have bought!</p>
                    <p className={styles["second-history"]}>Select item to delete</p>
                </div>
                <div className={styles["select-delete"]}>
                    <p onClick={()=>{
                      let value = true;
                      if (this.state.isChecked == true) value = false
                      this.setState({
                        isChecked: value
                      })
                    }}>Select All</p>
                </div>
                <div className={styles["container-card"]}>
                <div className="row">
                <div className={`col-12 ${styles.anjas}`}>
                    <div className={`row ${styles.testing}`}>
                    {this.state.product.map((product) => {
                      return <Card title={product.product_name} subtotal={this.costing(product.subtotal)} status={product.status_name} image={product.image} checked={this.state.isChecked}/>})}
                    </div>
                </div>
                </div>
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
         </main>
         <Footer/>
      </>
    )
  }
}

export default withNavigate(History)
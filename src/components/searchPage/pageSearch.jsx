import React, { PureComponent } from 'react'
import css from "../searchPage/pageSearch.module.css"
import Test from '../Test'
import Card from "../Card/CardSearch"
import Footer from '../Footer'
import withLocation from "../../helpers/withLocation";
import withSearchParams from "../../helpers/withSearchParams";
import withNavigate from "../../helpers/withNavigate";
import axios from 'axios'

export class pageSearch extends PureComponent {
    state ={
        product: []
    }
    componentDidMount(){
        const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?${this.props.searchParams.toString()}`;
        axios.get(url).then((res)=>{
            this.setState({
                product: res.data.data.data
            })
        })
    }
    getCategory = () => {
        for (const [key, value] of Object.entries(this.state)) {
          const datas = `${key}: ${value}`
          if (value == "start-content") return datas
        }
      }
    costing= (price) => {
        return 'IDR ' +  parseFloat(price).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      }
      checkDiscount= (value) => {
        if (!value){
          return value = null
        }
        return value
      }
  render() { 
    return (
      <>
        <Test/>
        <main className={css.container}>
            <h1>SEARCH RESULTS :</h1>
            <section className="container-fluid text-center">
                <div className={`row list-content justify-content-center${css["gap-Row"]} ${css["position-settings"]}`}>
                    {this.state.product.map((product) => {return <Card title={product.product_name} price={this.costing(product.price)} discount={this.checkDiscount(product.discount)} image={product.image} id={product.id} listCategory={this.getCategory()}/>})}
                </div>
            </section>
        </main>
        <Footer />
      </>
    )
  }
}

export default withNavigate(withSearchParams(withLocation(pageSearch)))
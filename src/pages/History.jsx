import React, { Component } from "react";
import Test from "../components/Test";
import Footer from "../components/Footer";
import Card from "../components/Card/CardHistory";
import styles from "../styles/History.module.css";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios";
import { Navigate } from "react-router-dom";

export class History extends Component {
  state = {
    product: [],
    next: "",
    prev: "",
    text: "Select All",
    isChecked: false,
    tglnext: styles.hide,
    tglprev: styles.hide,
    userinfo: JSON.parse(localStorage.getItem("userInfo")),
  };

  costing = (price) => {
    return (
      "IDR " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  setPosition = () => {
    if (this.state.tglnext == styles.hide) return styles["bungkusan-left"];
    if (this.state.tglprev == styles.hide) return styles["bungkusan-right"];
    return styles.bungkusan;
  };

  getData = (limit) => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/history?${limit}`;
    Axios.get(url, {
      headers: {
        "x-access-token": this.state.userinfo.token,
      },
    }).then((res) => {
      this.setState({
        product: res.data.data.data,
        next: res.data.data.next,
        prev: res.data.data.prev,
      });
      if (res.data.data.next !== null) {
        this.setState({
          tglnext: styles.next,
        });
      }
      if (res.data.data.prev !== null) {
        this.setState({
          tglprev: styles.prev,
        });
      }
      if (res.data.data.next == null) {
        this.setState({
          tglnext: styles.hide,
        });
      }
      if (res.data.data.prev == null) {
        this.setState({
          tglprev: styles.hide,
        });
      }
    });
  };

  deleteData = () => {
    this.state.product.map((product) => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/delete/${product.transaction_id}`;
      Axios.delete(url, {
        headers: {
          "x-access-token": this.state.userinfo.token,
        },
      }).then(() => {
        this.setState({
          product: [],
          tglnext: styles.hide,
          tglprev: styles.hide,
        });
      });
    });
  };

  componentDidMount() {
    if (this.state.userinfo.token) {
      this.getData("page=1&limit=15");
    }
  }
  setText = () => {
    if (this.state.isChecked) {
      return this.setState({
        text: "Delete",
      });
    }
  };
  render() {
    return (
      <>
        <div>
          <Test />
        </div>
        <main className={styles.main}>
          {!this.state.isChecked ? (
            <p></p>
          ) : (
            <div className={styles.modal} data-keyword={true} backdrop={true}>
              <p className={styles.title}>
                Are you sure want to delete the selected items?
              </p>
              <div className={styles.btn}>
                <p
                  className={styles["btn-cancel"]}
                  onClick={(e) => {
                    this.setState({
                      text: "Select All",
                      isChecked: false,
                    });
                  }}
                >
                  Cancel
                </p>
                <p
                  className={styles["btn-delete"]}
                  onClick={() => {
                    this.deleteData();
                    this.setState({
                      text: "Select All",
                      isChecked: false,
                    });
                  }}
                >
                  Delete
                </p>
              </div>
            </div>
          )}
          <section
            className={`${styles.container} ${
              this.state.isChecked && styles.on
            }`}
          >
            <div className={styles["title-settings"]}>
              <p className={styles["title-history"]}>
                Let's see what you have bought!
              </p>
              <p className={styles["second-history"]}>Select item to delete</p>
            </div>
            <div className={styles["select-delete"]}>
              <p
                onClick={() => {
                  let value = true;
                  if (this.state.isChecked == true) value = false;
                  this.setState(
                    {
                      isChecked: value,
                    },
                    () => {
                      this.setText();
                    }
                  );
                }}
              >
                {this.state.text}
              </p>
            </div>
            <div className={styles["container-card"]}>
              <div className="row">
                <div className={`col-12 ${styles.anjas}`}>
                  <div className={`row ${styles.testing}`}>
                    {this.state.product.map((product) => {
                      return (
                        <Card
                          title={product.product_name}
                          subtotal={this.costing(product.subtotal)}
                          status={product.status_name}
                          image={product.image}
                          checked={this.state.isChecked}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={this.setPosition()}>
              <p
                className={this.state.tglprev}
                onClick={() => {
                  console.log(this.state.prev);
                  this.getData(this.state.prev);
                }}
              >
                PREV
              </p>
              <p
                className={this.state.tglnext}
                onClick={() => {
                  console.log(this.state.next);
                  this.getData(this.state.next);
                }}
              >
                NEXT
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default withNavigate(History);

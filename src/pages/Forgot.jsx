import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../styles/Forgot.module.css"
import logo from "../assets/img/logo.jpeg"
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import withNavigate from "../helpers/withNavigate";
import {forgotAction} from "../redux/actions/auth";

class Forgot extends React.Component {
  state = {
    isSend: false,
    isCode: false,
    isPswd: false,
    email: null,
    code: null,
    password: null,
    minutes: 2,
    seconds: 0,
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
          this.setState(({ seconds }) => ({
              seconds: seconds - 1
          }))
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(this.myInterval)
          } else {
              this.setState(({ minutes }) => ({
                  minutes: minutes - 1,
                  seconds: 59
              }))
          }
      } 
  }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
}

handlerSend = () => {
  // this.isSend
  this.setState((prevState) => ({isSend: prevState.isSend ? false : true}),()=>{console.log(this.state)})
}

sendEmail = () => {

}
  render(){
    const { minutes, seconds } = this.state
    return <>
      <div className={styles["container-fluid"]}>
        <div className="row">
          <aside className={`col-6 ${styles["side-image"]}`}>p</aside>
          <aside className={`col-6 ${styles.right}`}>
            <section>
              <div className={styles.brand}>
                <img src={logo}/>
                <p>JuicyWorlds</p>
              </div>
              <div className={styles["first-text"]}>
                <p className={styles.textForgot}>Forgot your password?</p>
                <p className={styles.textForgot2}>Don't worry, we got your back!</p>
              </div>
              <div className={styles["input-btn"]}>
                <input type="text" className={this.state.isSend && styles.hide} placeholder={!this.state.isSend && "Enter your email adress to get link"} onChange={(e)=>{
                  this.setState({
                    email: e.target.value
                  })
                }}/>
                <input type="text" className={!this.state.isSend && styles.hide} placeholder={this.state.isSend && "Input Code Here"} onChange={(e)=>{
                  this.setState({
                    code: e.target.value
                  })
                }}/>
                <input type="password" className={!this.state.pwd && styles.hide} placeholder={this.state.isSend && "Input Code Here"} onChange={(e)=>{
                  this.setState({
                    password: e.target.value
                  })
                }}/>
                <div className={`${styles.btn} ${styles.send}`} onClick={()=>{
                  this.setState((prevState) => ({isSend: prevState.isSend ? false : true}),()=>{console.log(this.state)})
                }}>
                  <p>Send</p>
                </div>
              </div>
              {this.state.isSend &&
              <div className={styles["resend-btn"]}>
                <div className={styles["count-text"]}>
                    <p>Click here if you didn't receive any link in 2 minutes</p>
                    <p className={styles.time}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                </div>
                <div className={this.state.minutes === 0 && this.state.seconds === 0 ? `${styles.btn} ${styles.resend}` : `${styles["btn-none"]} ${styles.resend}`}>
                  <p>Resend Link</p>
                </div>
              </div>}
            </section>
            <footer className={this.state.isSend ? styles["footer-container"] : styles["footer-padding"]}>
              <aside className={`col-6 ${styles.left}`}>
                <section className={`${styles.brand} ${styles.footer}`}>
                  <img src={logo}/>
                  <p>JuicyWorlds</p>
                </section>
                <p className={styles["about-footer"]}>Juicy Worlds is a store that sells some good meals, and
                  especially coffee. We provide high quality beans</p>
                <div className={styles["footer-logo"]}>
                  <div className={styles["back-logo"]}>
                    <img className={styles["logo-img"]} src={fb} alt="" />
                </div>
                <div className={styles["back-logo"]}>
                  <img className={styles["logo-img"]} src={twitter} alt="" />
                </div>
                <div className={styles["back-logo"]}>
                  <img className={styles["logo-img"]} src={ig} alt="" />
                </div>
              </div>
                <span className={styles.copyright}>©2022 JuicyWorlds</span>
              </aside>
              <aside className={`col-6 ${styles.rightss}`}>
                <div className={styles["about-content"]}>
                  <p>Product</p>
                  <ul className={styles["list-product"]}>
                    <aside>
                    <li>Download</li>
                    <li>Locations</li>
                    <li>Blog</li>
                    </aside>
                    <aside className={styles["detail-right"]}>
                      <li>Pricing</li>
                      <li>Countries</li>
                    </aside>
                  </ul>
                </div>
                <div className={styles["about-content"]}>
                  <p>Engage</p>
                  <ul className={styles["list-product"]}>
                    <aside>
                    <li>Coffe Shop ?</li>
                    <li>FAQ</li>
                    <li>Terms of Service</li>
                    </aside>
                    <aside className={styles["detail-right"]}>
                      <li>About Us</li>
                      <li>Privacy Policy</li>
                    </aside>
                  </ul>
                </div>
              </aside>
            </footer>
          </aside>
        </div>
      </div>
    </>; 
  }
}

const NewForgot = withNavigate(Forgot);

const mapStateToProps = (reduxState) => {
  return {
    forgot: reduxState.auth,
  };
};

export default connect(mapStateToProps)(NewForgot);

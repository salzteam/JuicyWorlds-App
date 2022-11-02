import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import google from "../assets/img/iconGoogle.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios";
import Modal from "../components/ModalDialog"

class Login extends React.Component {
  state = {
    shwPwd: false,
    email: "",
    pwd: "",
    showModal: null,
    errorModal: null
  }

  showModal = () => {
    this.setState({
      showModal: <Modal title={"Login Success"} body={"HAPPY SHOPING"} tos={"/"}/>
    })
  }

  errorModal = () => {
    this.setState({
      showModal: <Modal title={"Login Error"} body={"Wrong Input Email OR Password"} tos={"/login"}/>
    })
  }

  showPassword = () => {
    if (!this.state.shwPwd) return "password"
    return "text" 
  }

  iconShow = () => {
    if (this.state.shwPwd) return "fa-regular fa-eye"
    return "fa-regular fa-eye-slash"
  }

  saveToken = (token) => {
    return window.localStorage.setItem("x-access-token", token)
  }
  toLogin = () => {
    console.log(process.env.REACT_APP_BACKEND_HOST);
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`
    const email = this.state.email
    const password = this.state.pwd
    Axios.post(url, {email, password}).then((response) => {
      localStorage.setItem("userInfo", JSON.stringify(response.data.data))
      this.showModal()
      setTimeout(() => {
        this.props.navigate(`/`);
      }, 1000)
      // this.props.navigate(`/`);
    }).catch((err) => {
      this.errorModal()
      // alert("INVALID EMAIL OR PASSWORD!")
      console.log(err);
    })
  }

  render (){
  return (
    <div class={styles.container}>
      <div class={styles["image-side"]}></div>
      <main class={styles["main-login"]}>
        <section class={styles["login-section"]}>
          <div class={styles.navbar}>
            <div class={styles["brand-nav"]}>
              <Link to={"/"}>
                <img class={styles["nav-image"]} src={logo} alt="" />
              </Link>
              <h1>Juicy Worlds</h1>
            </div>
            <p class={styles.login}>Login</p>
          </div>
          {this.state.showModal}
          <form class={styles["login-form"]}>
            <label class={styles["login-label"]}>Email Address:</label>
            <input class={styles["login-input"]} type="text" placeholder="Enter your email" onChange={(e)=>{
              this.setState({
                email: e.target.value
              },()=>{
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toLogin()
              }
            }}/>
            <label class={styles["login-label"]}>Password:</label>
            <input  class={styles["login-input"]}  type={this.showPassword()} placeholder="Enter your password" onChange={(e)=>{
              this.setState({
                pwd: e.target.value
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toLogin()
              }
            }}/>
            <i class={`${this.iconShow()} ${styles.passwords}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd: prevState.shwPwd ? false : true,
                }));
            }}></i>
            <Link to={"/forgot-password"} class={styles.forgot}>
              Forgot password?
            </Link>
            <div class={`${styles["btn"]} ${styles["login-btn"]}`} onClick={(e)=> {
              this.toLogin()
            }}>
              <p>Login</p>
            </div>
            <div class={`${styles["btn"]} ${styles["google-btn"]}`}>
              <img src={google} alt="" />
              <p>Login with Google</p>
            </div>
          </form>
          <div class={styles.divider}>
            <div class={styles["divider-line"]}></div>
            <p class={styles.account}> Don't have an account? </p>
            <div class={styles["divider-line"]}></div>
          </div>
          <Link
            class={`${styles["btn"]} ${styles["signup-btn"]}`}
            to={"/register"}
          >
            Sign up here
          </Link>
        </section>
        <footer class={styles["footer-login"]}>
          <div class={styles["footer-left"]}>
            <div class={styles["brand-footer"]}>
              <img class={styles["nav-image"]} src={logo} alt="" />
              <p class={styles["title-footer"]}>Juicy Worlds</p>
            </div>
            <div class={styles["about-footer"]}>
              <p>
                Juicy Worlds is a store that sells some good meals, and
                especially coffee. We provide high quality beans
              </p>
            </div>
            <div class={styles["footer-logo"]}>
              <div class={styles["back-logo"]}>
                <img class={styles["logo-img"]} src={fb} alt="" />
              </div>
              <div class={styles["back-logo"]}>
                {" "}
                <img class={styles["logo-img"]} src={twitter} alt="" />
              </div>
              <div class={styles["back-logo"]}>
                <img class={styles["logo-img"]} src={ig} alt="" />
              </div>
            </div>
            <p class={styles.copyright}>&copy2022JuicyWorlds</p>
          </div>
          <div class={styles["footer-right"]}>
            <p class={styles["about-title"]}>Product</p>
            <div class={styles.product}>
              <div class={styles["about-left"]}>
                <p class={styles["about-content"]}>Download</p>
                <p class={styles["about-content"]}>Locations</p>
                <p class={styles["about-content"]}>Blog</p>
              </div>
              <div class={styles["about-right"]}>
                <p class={styles["about-content"]}>Pricing</p>
                <p class={styles["about-content"]}>Countries</p>
              </div>
            </div>
            <p class={styles["about-title"]}>Engage</p>
            <div class={styles.engage}>
              <div class={styles["about-left"]}>
                <p class={styles["about-content"]}>Coffe Shop?</p>
                <p class={styles["about-content"]}>FAQ</p>
                <p class={styles["about-content"]}>Terms of Service</p>
              </div>
              <div class={styles["about-right"]}>
                <p class={styles["about-content"]}>About Us</p>
                <p class={styles["about-content"]}>Privacy Policy</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}}

const NewLogin = withNavigate(Login);

export default NewLogin;

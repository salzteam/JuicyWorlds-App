import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Register.module.css";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import google from "../assets/img/iconGoogle.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios"
import Modal from "../components/ModalDialog"

class Register extends React.Component {
  state = {
    showPwd: false,
    email: "",
    pwd: "",
    phone: "",
    showModal: null,
    errorModal: null
  }

  showPassword = () => {
    if (!this.state.shwPwd) return "password"
    return "text" 
  }

  showModal = () => {
    this.setState({
      showModal: <Modal title={"Register Success"} body={"CLICK NEXT TO LOGIN PAGE"} tos={"/login"}/>
    })
  }

  errorModal = () => {
    this.setState({
      showModal: <Modal title={"Register Error"} body={"Invalid Input Data"} tos={"/"}/>
    })
  }

  iconShow = () => {
    if (this.state.shwPwd) return "fa-regular fa-eye"
    return "fa-regular fa-eye-slash"
  }
  toRegister = () => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/register`
    const email = this.state.email
    const password = this.state.pwd
    const phone = this.state.phone
    Axios.post(url, {email, password,phone}).then((response) => {
      this.showModal()
    }).catch((err) => {
      this.errorModal()
      console.log(err);
    })
  }
  render (){
  return (
    <div class={styles.container}>
      <aside class={styles["image-side"]}></aside>
      <main class={styles["main-register"]}>
        <section class={styles["section-register"]}>
          <div class={styles.navbar}>
            <div class={styles["brand-nav"]}>
              <Link to={"/"}>
                <img class={styles["nav-image"]} src={logo} alt="" />
              </Link>
              <h1>Juicy Worlds</h1>
            </div>
            <p class={styles["sign-up"]}>Sign Up</p>
          </div>
          <form class={styles["register-form"]}>
            <label class={styles["register-label"]}>Email Address:</label>
            <input class={styles["register-input"]} type="text" placeholder="Enter your email" onChange={(e)=>{
              this.setState({
                email: e.target.value
              },()=>{
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <label class={styles["register-label"]}>Password:</label>
            <input class={styles["register-input"]} type={this.showPassword()} placeholder="Enter your password" onChange={(e)=>{
              this.setState({
                pwd: e.target.value
              })
            }}  onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <i class={`${this.iconShow()} ${styles.passwords}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd: prevState.shwPwd ? false : true,
                }));
            }}></i>
            {this.state.showModal}
            <label class={styles["register-label"]}>Phone Number:</label>
            <input class={styles["register-input"]} type="tel" placeholder="Enter your phone number" onChange={(e)=>{
              this.setState({
                phone: e.target.value
              })
            }}  onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <div class={`${styles["btn"]} ${styles["signup-btn"]}`} onClick={(e)=> {
              this.toRegister()
            }}>
              <p>Sign Up</p>
            </div>
            <div class={`${styles["btn"]} ${styles["google-btn"]}`}>
              <img src={google} alt="" />
              <p>Sign up with Google</p>
            </div>
          </form>
          {}
          <div class={styles.divider}>
            <div class={styles["divider-line"]}></div>
            <p class={styles.account}> Already have an account? </p>
            <div class={styles["divider-line"]}></div>
          </div>
          <Link class={styles["login-btn"]} to={"/login"}>
            Login Here
          </Link>
        </section>
        <footer class={styles["footer-login"]}>
          <aside class={styles["footer-left"]}>
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
          </aside>
          <aside class={styles["footer-right"]}>
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
          </aside>
        </footer>
      </main>
    </div>
  );
}}
const NewRegister = withNavigate(Register);

export default NewRegister;

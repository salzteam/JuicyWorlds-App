import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../styles/Register.module.css";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import google from "../assets/img/iconGoogle.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios"
import Modal from "../components/ModalDialog"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {doRegisterAction} from "../redux/actions/register";

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

  componentDidUpdate(prevProps){
    if (prevProps.Register.isError !== this.props.Register.isError){this.showToastMessageError(this.props.Register.err)}
    if (prevProps.Register.isLoading !== this.props.Register.isLoading){this.loadingScreen()}
    if (prevProps.Register.data !== this.props.Register.data){
      this.showToastMessageSucces()
      setTimeout(() => {
        this.props.navigate(`/login`);
      }, 6000)
    }
  }

  loadingScreen = () => {
    if (this.props.Register.isLoading){
      <div className={styles["loader-container"]}>
          <div className={styles.spinner}></div>
      </div>
    }
  }

  toRegister = () => {
    const email = this.state.email
    const password = this.state.pwd
    const phone = this.state.phone
    this.props.dispatch(doRegisterAction(email,password,phone));
  }

  showToastMessageError = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
};
  showToastMessageSucces = () => {
    toast.success('Register Success! go to page login', {
        position: toast.POSITION.TOP_RIGHT
    });
};
  render (){
  return (
    <div className={styles.container}>
      <aside className={styles["image-side"]}></aside>
      <main className={styles["main-register"]}>
        <section className={styles["section-register"]}>
          <div className={styles.navbar}>
            <div className={styles["brand-nav"]}>
              <Link to={"/"}>
                <img className={styles["nav-image"]} src={logo} alt="" />
              </Link>
              <h1>Juicy Worlds</h1>
            </div>
            <p className={styles["sign-up"]}>Sign Up</p>
          </div>
          <div>
            <ToastContainer />
        </div>
          <form className={styles["register-form"]}>
            <label className={styles["register-label"]}>Email Address:</label>
            <input className={styles["register-input"]} type="text" placeholder="Enter your email" onChange={(e)=>{
              this.setState({
                email: e.target.value
              },()=>{
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <label className={styles["register-label"]}>Password:</label>
            <input className={styles["register-input"]} type={this.showPassword()} placeholder="Enter your password" onChange={(e)=>{
              this.setState({
                pwd: e.target.value
              })
            }}  onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <i className={`${this.iconShow()} ${styles.passwords}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd: prevState.shwPwd ? false : true,
                }));
            }}></i>
            {/* {this.state.showModal} */}
            <label className={styles["register-label"]}>Phone Number:</label>
            <input className={styles["register-input"]} type="tel" placeholder="Enter your phone number (08)" onChange={(e)=>{
              this.setState({
                phone: e.target.value
              })
            }}  onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toRegister()
              }
            }}/>
            <div className={`${styles["btn"]} ${styles["signup-btn"]}`} onClick={(e)=> {
              this.toRegister()
            }}>
              {this.props.Register.isLoading ?       <div className={styles["loader-container"]}>
          <div className={styles.spinner}></div>
      </div> : <p>Sign Up</p>}
            </div>
            <div className={`${styles["btn"]} ${styles["google-btn"]}`}>
              <img src={google} alt="" />
              <p>Sign up with Google</p>
            </div>
          </form>
          {}
          <div className={styles.divider}>
            <div className={styles["divider-line"]}></div>
            <p className={styles.account}> Already have an account? </p>
            <div className={styles["divider-line"]}></div>
          </div>
          <Link className={styles["login-btn"]} to={"/login"}>
            Login Here
          </Link>
        </section>
        <footer className={styles["footer-login"]}>
          <aside className={styles["footer-left"]}>
            <div className={styles["brand-footer"]}>
              <img className={styles["nav-image"]} src={logo} alt="" />
              <p className={styles["title-footer"]}>Juicy Worlds</p>
            </div>
            <div className={styles["about-footer"]}>
              <p>
                Juicy Worlds is a store that sells some good meals, and
                especially coffee. We provide high quality beans
              </p>
            </div>
            <div className={styles["footer-logo"]}>
              <div className={styles["back-logo"]}>
                <img className={styles["logo-img"]} src={fb} alt="" />
              </div>
              <div className={styles["back-logo"]}>
                {" "}
                <img className={styles["logo-img"]} src={twitter} alt="" />
              </div>
              <div className={styles["back-logo"]}>
                <img className={styles["logo-img"]} src={ig} alt="" />
              </div>
            </div>
            <p className={styles.copyright}>&copy2022JuicyWorlds</p>
          </aside>
          <aside className={styles["footer-right"]}>
            <p className={styles["about-title"]}>Product</p>
            <div className={styles.product}>
              <div className={styles["about-left"]}>
                <p className={styles["about-content"]}>Download</p>
                <p className={styles["about-content"]}>Locations</p>
                <p className={styles["about-content"]}>Blog</p>
              </div>
              <div className={styles["about-right"]}>
                <p className={styles["about-content"]}>Pricing</p>
                <p className={styles["about-content"]}>Countries</p>
              </div>
            </div>
            <p className={styles["about-title"]}>Engage</p>
            <div className={styles.engage}>
              <div className={styles["about-left"]}>
                <p className={styles["about-content"]}>Coffe Shop?</p>
                <p className={styles["about-content"]}>FAQ</p>
                <p className={styles["about-content"]}>Terms of Service</p>
              </div>
              <div className={styles["about-right"]}>
                <p className={styles["about-content"]}>About Us</p>
                <p className={styles["about-content"]}>Privacy Policy</p>
              </div>
            </div>
          </aside>
        </footer>
      </main>
    </div>
  );
}}
const NewRegister = withNavigate(Register);

const mapStateToProps = (reduxState) => {
  return {
    Register: reduxState.regist,
  };
};


export default connect(mapStateToProps)(NewRegister);

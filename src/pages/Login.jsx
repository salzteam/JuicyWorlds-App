import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../styles/Login.module.css";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import logo from "../assets/img/logo.WebP";
import google from "../assets/img/iconGoogle.png";
import withNavigate from "../helpers/withNavigate";
import Modal from "../components/ModalDialog"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {doLoginAction} from "../redux/actions/auth";

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
    const email = this.state.email
    const password = this.state.pwd
    this.props.dispatch(doLoginAction(email,password));
    // Axios.post(url, {email, password}).then((response) => {
    //   localStorage.setItem("userInfo", JSON.stringify(response.data.data))
    //   this.showToastMessageSucces()

    //   // this.props.navigate(`/`);
    // }).catch((err) => {
    //   this.showToastMessageError()
    //   // this.errorModal()
    //   // alert("INVALID EMAIL OR PASSWORD!")
    //   console.log(err);
    // })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Login.isError !== this.props.Login.isError){this.errorNotif()}
    if (prevProps.Login.isLoading !== this.props.Login.isLoading){this.loadingScreen()}
    if (prevProps.Login.token !== this.props.Login.token){
        this.showToastMessageSucces()
        this.handleTimeout()
    }
    }

  componentWillUnmount(){
    this.handleTimeout()
  }

  handleTimeout = () => {
    setTimeout(() => {
      this.props.navigate(`/`);
    }, 1000)
  }

  showToastMessageError = (text) => {
    toast.error(text, {
        position: toast.POSITION.TOP_RIGHT
    });
};
  showToastMessageSucces = () => {
    toast.success('Login Success!', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  loadingScreen = () => {
    if (this.props.Login.isLoading){
      <div className={styles["loader-container"]}>
          <div className={styles.spinner}></div>
      </div>
    }
  }
  errorNotif = () => {
    // console.log(this.props.Login.isError, this.props.Login.err);
    if (this.props.Login.isError) return this.showToastMessageError(this.props.Login.err)
  }
  LoginNotif = () => {
    if (!this.props.Login.isError && !this.props.Login.isLoading){
      this.showToastMessageSucces()
      localStorage.setItem("userInfo", JSON.stringify(this.props.Login.data))
  }}
  render (){
  return (
    <div className={styles.container}>
      <div className={styles["image-side"]}></div>
      <main className={styles["main-login"]}>
        <section className={styles["login-section"]}>
          <div className={styles.navbar}>
            <div className={styles["brand-nav"]}>
              <Link to={"/"}>
                <img className={styles["nav-image"]} src={logo} alt="" />
              </Link>
              <h1>Juicy Worlds</h1>
            </div>
            <p className={styles.login}>Login</p>
          </div>
          <div>
            <ToastContainer />
        </div>
          {/* {this.state.showModal} */}
          <form className={styles["login-form"]}>
            <label className={styles["login-label"]}>Email Address:</label>
            <input className={styles["login-input"]} type="text" placeholder="Enter your email" onChange={(e)=>{
              this.setState({
                email: e.target.value
              },()=>{
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toLogin()
              }
            }}/>
            <label className={styles["login-label"]}>Password:</label>
            <input  className={styles["login-input"]}  type={this.showPassword()} placeholder="Enter your password" onChange={(e)=>{
              this.setState({
                pwd: e.target.value
              })
            }} onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.toLogin()
              }
            }}/>
            <i className={`${this.iconShow()} ${styles.passwords}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd: prevState.shwPwd ? false : true,
                }));
            }}></i>
            <Link to={"/forgot-password"} className={styles.forgot}>
              Forgot password?
            </Link>
            <div className={`${styles["btn"]} ${styles["login-btn"]}`} onClick={(e)=> {
              this.toLogin()
            }}>
              {this.props.Login.isLoading ?       <div className={styles["loader-container"]}>
          <div className={styles.spinner}></div>
      </div> : <p>Login</p>}
            </div>
            <div className={`${styles["btn"]} ${styles["google-btn"]}`}>
              <img src={google} alt="" />
              <p>Login with Google</p>
            </div>
          </form>
          <div className={styles.divider}>
            <div className={styles["divider-line"]}></div>
            <p className={styles.account}> Don't have an account? </p>
            <div className={styles["divider-line"]}></div>
          </div>
          <Link
            className={`${styles["btn"]} ${styles["signup-btn"]}`}
            to={"/register"}
          >
            Sign up here
          </Link>
        </section>
        <footer className={styles["footer-login"]}>
          <div className={styles["footer-left"]}>
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
          </div>
          <div className={styles["footer-right"]}>
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
          </div>
        </footer>
      </main>
    </div>
  );
}}

const NewLogin = withNavigate(Login);

const mapStateToProps = (reduxState) => {
  return {
    Login: reduxState.auth,
  };
};

export default connect(mapStateToProps)(NewLogin);

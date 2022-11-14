import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Forgot.module.css";
import logo from "../assets/img/logo.jpeg";
import fb from "../assets/img/facebook.png";
import twitter from "../assets/img/twitter.png";
import ig from "../assets/img/instagram.png";
import withNavigate from "../helpers/withNavigate";
import Axios from "axios";

class Forgot extends React.Component {
  state = {
    isEmail: true,
    isCode: false,
    isPswd: false,
    isFooter: true,
    isLoading: false,
    shwPwd: false,
    shwPwdd: false,
    pin: null,
    errMsg: null,
    email: null,
    code: null,
    password: null,
    conpassword: null,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  countDown = () => {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  sendAll = () => {
    const { password, conpassword, code, email } = this.state;
    if (!password) return this.setState({ errMsg: "Input Passoword!" });
    if (!conpassword)
      return this.setState({ errMsg: "Input Confirm Passoword!" });
    if (password !== conpassword)
      return this.setState({ errMsg: "Password doesn't match!" });
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
    this.setState({ isLoading: true, errMsg: null });
    Axios.patch(url, { code: code, new_password: password, email: email }).then(() => {
      this.setState({ isLoading: false }, () => {
        this.props.navigate("/login");
      });
    });
  };

  checkCode = () => {
    const { code, pin } = this.state;
    if (code === pin) {
      return this.setState({
        isPswd: true,
        isCode: false,
        isFooter: true,
        errMsg: null,
      });
    }
    return this.setState({ errMsg: "PINCODE NOT VALID!" });
  };

  // resendLink = () => {
  //   // const {email} = this.state
  //   // const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`
  //   // this.setState({isLoading: true})
  //   //   Axios.patch(url, {email : email}).then((response)=>{
  //   //     this.setState({pin: response.data.data.code, isLoading:false},()=>{!this.state.isLoading && this.setState({errMsg: null, minutes: 2},()=>{this.countDown()});})
  //   //   }).catch((err) => {
  //   //     if (err.response.data.message === "Code already send to email!") return this.setState({errMsg: "*** Code Already Send ! If you not in page input code please wait 2 more minutes again! ***", isLoading:false})
  //   //     if (err.response.data.message === "Email/Password is Wrong") return this.setState({errMsg: "*** Email/Password is Wrong! ***", isLoading:false})
  //   //   })
  // }

  sendEmail = () => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
    let data = null;
    if (this.state.email) {
      data = this.state.email;
      let atps = data.indexOf("@");
      let dots = data.lastIndexOf(".");
      if (atps < 1 || dots < atps + 2 || dots + 2 >= data.length) {
        return this.setState({ errMsg: "*** Input email is wrong ***" });
      }
      this.setState({ isLoading: true });
      Axios.patch(url, { email: data })
        .then((response) => {
          // console.log(response);
          this.setState(
            { pin: response.data.data.code, isLoading: false },
            () => {
              !this.state.isLoading &&
                this.setState(
                  {
                    isEmail: false,
                    isCode: true,
                    isFooter: false,
                    errMsg: null,
                    minutes: 2,
                  },
                  () => {
                    this.countDown();
                  }
                );
            }
          );
        })
        .catch((err) => {
          if (err.response.data.message === "Code already send to email!")
            return this.setState({
              errMsg:
                "*** Code Already Send ! If you not in page input code please wait 2 more minutes again! ***",
              isLoading: false,
            });
          if (err.response.data.message === "Email/Password is Wrong")
            return this.setState({
              errMsg: "*** Email/Password is Wrong! ***",
              isLoading: false,
            });
        });
    }
  };
  loadingScreen = () => {
    if (this.props.Login.isLoading) {
      <div className={styles["loader-container"]}>
        <div className={styles.spinner}></div>
      </div>;
    }
  };
  iconShow = () => {
    if (this.state.shwPwd) return "fa-regular fa-eye";
    return "fa-regular fa-eye-slash";
  };
  iconShoww = () => {
    if (this.state.shwPwdd) return "fa-regular fa-eye";
    return "fa-regular fa-eye-slash";
  };
  render() {
    const {
      minutes,
      seconds,
      isCode,
      isPswd,
      isEmail,
      isFooter,
      isLoading,
      errMsg,
    } = this.state;
    return (
      <>
        <div className={styles["container-fluid"]}>
          <div className="row">
            <aside className={`col-6 ${styles["side-image"]}`}>p</aside>
            <aside className={`col-6 ${styles.right}`}>
              <section>
                <div className={styles.brand}>
                  <Link to={"/"} className={styles.logolink}>
                    <img src={logo} alt="logo" />
                    <p>JuicyWorlds</p>
                  </Link>
                </div>
                <div className={styles["first-text"]}>
                  <p className={styles.textForgot}>Forgot your password?</p>
                  <p className={styles.textForgot2}>
                    Don't worry, we got your back!
                  </p>
                </div>
                <div className={styles["input-btn"]}>
                  <input
                    type="email"
                    className={!isEmail ? styles.hide : undefined}
                    placeholder={"Enter your email adress to get link"}
                    onChange={(e) => {
                      this.setState({
                        email: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    className={!isCode ? styles.hide : undefined}
                    placeholder={"Input Code Here"}
                    onChange={(e) => {
                      this.setState({
                        code: e.target.value,
                      });
                    }}
                  />
                  <input
                    type={this.state.shwPwd ? "text" : "password"}
                    className={!isPswd ? styles.hide : undefined}
                    placeholder={"New Password"}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                      });
                    }}
                  />
                  <i
                    className={
                      isPswd
                        ? `${this.iconShoww()} ${styles.passwords}`
                        : styles.hide
                    }
                    onClick={() => {
                      this.setState((prevState) => ({
                        shwPwd: prevState.shwPwd ? false : true,
                      }));
                    }}
                  ></i>
                  <input
                    type={this.state.shwPwdd ? "text" : "password"}
                    className={!isPswd ? styles.hide : undefined}
                    placeholder={"Confirm Password"}
                    onChange={(e) => {
                      this.setState({
                        conpassword: e.target.value,
                      });
                    }}
                  />
                  <i
                    className={
                      isPswd
                        ? `${this.iconShoww()} ${styles.passwordss}`
                        : styles.hide
                    }
                    onClick={() => {
                      this.setState((prevState) => ({
                        shwPwdd: prevState.shwPwdd ? false : true,
                      }));
                    }}
                  ></i>
                  {errMsg && <p className={styles.err}>{errMsg}</p>}
                  <div
                    className={`${styles.btn} ${styles.send}`}
                    onClick={() => {
                      // this.setState((prevState) => ({isSend: prevState.isSend ? false : true}),()=>{console.log(this.state)})
                      if (isEmail) {
                        return this.sendEmail();
                      }
                      if (isCode) {
                        this.checkCode();
                      }
                      if (isPswd) {
                        this.sendAll();
                      }
                    }}
                  >
                    {isLoading ? (
                      <div className={styles["loader-container"]}>
                        <div className={styles.spinner}></div>
                      </div>
                    ) : (
                      <p>Send</p>
                    )}
                  </div>
                </div>
                {isCode && (
                  <div className={styles["resend-btn"]}>
                    <div className={styles["count-text"]}>
                      <p>
                        Click here if you didn't receive any link in 2 minutes
                      </p>
                      <p className={styles.time}>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    </div>
                    <div
                      className={
                        minutes === 0 && seconds === 0
                          ? `${styles.btn} ${styles.resend}`
                          : `${styles["btn-none"]} ${styles.resend}`
                      }
                    >
                      <p
                        onClick={() => {
                          minutes === 0 && seconds === 0 && this.sendEmail();
                        }}
                      >
                        Resend Link
                      </p>
                    </div>
                  </div>
                )}
              </section>
              <footer
                className={
                  !isFooter
                    ? styles["footer-container"]
                    : styles["footer-padding"]
                }
              >
                <aside className={`col-6 ${styles.left}`}>
                  <section className={`${styles.brand} ${styles.footer}`}>
                    <img src={logo} alt="logo" />
                    <p>JuicyWorlds</p>
                  </section>
                  <p className={styles["about-footer"]}>
                    Juicy Worlds is a store that sells some good meals, and
                    especially coffee. We provide high quality beans
                  </p>
                  <div className={styles["footer-logo"]}>
                    <div className={styles["back-logo"]}>
                      <img className={styles["logo-img"]} src={fb} alt="" />
                    </div>
                    <div className={styles["back-logo"]}>
                      <img
                        className={styles["logo-img"]}
                        src={twitter}
                        alt=""
                      />
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
      </>
    );
  }
}

const NewForgot = withNavigate(Forgot);

export default NewForgot;

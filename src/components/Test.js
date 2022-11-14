import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/test.module.css";
import logo from "../assets/img/logo.WebP";
import search from "../assets/img/search.png";
import chat from "../assets/img/chat.png";
import withNavigate from "../helpers/withNavigate";
import withSearchParams from "../helpers/withSearchParams";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";

class NavbarMobile extends React.Component {
  state = {
    searchbtn: "search",
    setLogout: false,
    isLogout: false,
    pictrue:
      "https://res.cloudinary.com/dwo9znbl6/image/upload/v1667575327/JuicyWorlds/default-profile-pic_tjjaqo.webp",
    searchToogle: "pembungkus-none",
    display: "",
    searchParams: {
      search: "",
    },
  };
  componentDidUpdate(prevState) {
    // if (prevState.logout !== this.state.logout) return this.getData();
    // console.log(this.state.searchParams);
    const userinfo = JSON.parse(localStorage.getItem("userInfo")) || null;
    if (!userinfo) {
      if (
        window.location.pathname.includes("/new") ||
        window.location.pathname.includes("/edit")
      )
        return this.props.navigate("/login");
    }
  }
  onSearchHandler = (search) => {
    // console.log(this.props.searchParams.toString());
    const urlPrev = new URL(window.location.href);
    let params = new URLSearchParams(urlPrev.search);
    if (!urlPrev.searchParams.get("search")) {
      params.append("search", search);
      if (window.location.pathname !== "/product") {
        return this.props.navigate(
          `/product?transactions=popular&search=${search}`
        );
        // return this.props.setSearchParams(params);
      }
      this.props.setSearchParams(params);
    }
    params.delete("search");
    params.append("search", search);
    this.props.setSearchParams(params);
    // this.setState(
    //   (prevState) => ({
    //     searchParams: { ...prevState.searchParams, search: search },
    //   }),
    //   () => {
    //     this.props.setSearchParams(this.state.searchParams);
    //   }
    // );
    // if (window.location.pathname !== "/search")
    //   return this.props.navigate(`/search?search=${search}`);
    // this.props.navigate(`/search?search=${search}`);
  };
  getRole = () => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    let admin = null;
    if (userinfo && userinfo.role === "admin") return (admin = userinfo.role);
    return admin;
  };
  componentDidMount() {
    if (this.props.searchParams.toString() === "transactions=popular") {
      this.setState({
        searchParams: { transactions: "popular" },
      });
    }
    if (
      this.props.searchParams.toString() === "filter=coffee" ||
      this.props.searchParams.toString() === "filter=non+coffee" ||
      this.props.searchParams.toString() === "filter=foods" ||
      this.props.searchParams.toString() === "filter=addon"
    ) {
      this.setState({
        searchParams: { filter: this.props.searchParams.get("filter") },
      });
    }
    this.getData();
  }
  getData = () => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userinfo) {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${userinfo.id}`;
      Axios.get(url, {
        headers: {
          "x-access-token": userinfo.token,
        },
      }).then((res) => {
        let dp = res.data.data.profileUser[0].displaypicture;
        if (!res.data.data.profileUser[0].displaypicture)
          dp =
            "https://res.cloudinary.com/dwo9znbl6/image/upload/v1667575327/JuicyWorlds/default-profile-pic_tjjaqo.webp";
        this.setState({
          display: dp,
        });
      });
    }
  };
  doLogout = (token) => {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
    return Axios.delete(url, {
      headers: { "x-access-token": token },
    }).then((result) => {
      localStorage.removeItem("userInfo");
      this.setState({ isLogout: false, setLogout: false });
    });
  };
  render() {
    const { image } = this.props;
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    let admin = null;
    if (userinfo && userinfo.role === "admin") admin = userinfo.role;
    return (
      <div className={styles.maincontainer}>
        {this.state.setLogout && (
          <div className={styles.modalLogout}>
            <div className={styles["modal-content"]}>
              <div className={styles["modal-header"]}>
                <p className={styles["modal-title"]}>Logout</p>
              </div>
              <div className={styles["modal-body"]}>
                Are you sure want to log out?
              </div>
              <div className={styles["modal-footer"]}>
                <button
                  className={styles.button}
                  onClick={() => {
                    this.setState({ isLogout: true });
                    this.doLogout(userinfo.token);
                  }}
                >
                  {this.state.isLogout ? (
                    <div className={styles["loader-container-logout"]}>
                      <div className={styles.spinnerLogout}></div>
                    </div>
                  ) : (
                    "YES"
                  )}
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    this.setState({ setLogout: false });
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
        <header className={styles.navigationBar}>
          <div className={styles.navBar}>
            <div className={styles.leftContent}>
              <Link className={styles.a} to={"/"}>
                <img src={logo} alt="" />
              </Link>
              <p>Juicy Worlds</p>
            </div>
            <div className={styles.midContent}>
              <ol className={styles.nav}>
                <Link to={"/"} className={styles.a}>
                  <li>Home</li>
                </Link>
                <Link to={"/product"} className={styles.a}>
                  <li>Product</li>
                </Link>
                <Link
                  to={this.getRole() === "admin" ? "/order" : "/payment"}
                  className={styles.a}
                >
                  <li>{this.getRole() == "admin" ? "Orders" : "Your Cart"}</li>
                </Link>
                <Link
                  to={this.getRole() === "admin" ? "/dashboard" : "/history"}
                  className={styles.a}
                >
                  <li>
                    {this.getRole() === "admin" ? "Dashboard" : "History"}
                  </li>
                </Link>
              </ol>
            </div>
            {userinfo ? (
              <div
                className={
                  this.state.searchToogle == "pembungkus-block"
                    ? styles.onSearch
                    : styles.rightContent
                }
              >
                <div className={styles[this.state.searchToogle]}>
                  <div className={styles["Nav-Search"]}>
                    <i
                      className={`fa-solid fa-magnifying-glass ${styles["new-Navsearch"]}`}
                    ></i>
                    <input
                      className={styles.searchh}
                      id="searchProduct"
                      type="text"
                      placeholder="Search"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          this.onSearchHandler(e.target.value);
                        }
                      }}
                    />
                    <i
                      className={`fa-solid fa-xmark ${styles["close-icon"]}`}
                      onClick={() => {
                        this.setState({
                          searchbtn: "search",
                          searchToogle: "pembungkus-none",
                        });
                      }}
                    ></i>
                  </div>
                </div>
                <img
                  className={styles[this.state.searchbtn]}
                  src={search}
                  alt=""
                  onClick={() => {
                    this.setState({
                      searchToogle: "pembungkus-block",
                      searchbtn: "search-display",
                    });
                  }}
                />
                {!admin ? (
                  <>
                    <img
                      className={
                        this.state.searchToogle === "pembungkus-block"
                          ? styles.icon2
                          : styles.icon1
                      }
                      src={chat}
                      alt=""
                    />
                    <Link to={"/profile"}>
                      <img
                        className={styles.pp}
                        src={
                          this.state.display
                            ? this.state.display
                            : this.state.pictrue
                        }
                        alt=""
                      />
                    </Link>
                  </>
                ) : (
                  <div
                    className={styles.btn}
                    onClick={() => {
                      this.setState({ setLogout: true });
                    }}
                  >
                    <p>LOGOUT</p>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles["btn-navbar"]}>
                <Link className={styles["btn-login"]} to={"/login"}>
                  Login
                </Link>
                <Link to={"/register"}>
                  <button className={styles["btn-signup"]}>Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

const NewNavbarMobile = withSearchParams(withNavigate(NavbarMobile));

export default NewNavbarMobile;

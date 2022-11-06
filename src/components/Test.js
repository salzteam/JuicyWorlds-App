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
    searchToogle: "pembungkus-none",
    display: "",
    searchParams: {
      search: "",
    },
  };
  componentDidUpdate(prevState) {
    // console.log(this.state.searchParams);
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
  }
  render() {
    const { image } = this.props;
    return (
      <div className={styles.maincontainer}>
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
                <Link to={"/payment"} className={styles.a}>
                  <li>Your Cart</li>
                </Link>
                <Link to={"/history"} className={styles.a}>
                  <li>History</li>
                </Link>
              </ol>
            </div>
            <div className={styles.rightContent}>
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
              <img className={styles.icon1} src={chat} alt="" />
              <Link to={"/profile"}>
                <img className={styles.pp} src={this.state.display} alt="" />
              </Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const NewNavbarMobile = withSearchParams(withNavigate(NavbarMobile));

export default NewNavbarMobile;

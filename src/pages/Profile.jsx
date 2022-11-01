import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import ppbig from "../assets/img/image40.png";
import pen from "../assets/img/Vector22.png";
import Test from "../components/Test"
import Footer from "../components/Footer"
import withNavigate from "../helpers/withNavigate";
import NavbarMobile from '../components/NavbarMobile'
import Axios from "axios"

class Profile extends React.Component {
  state = {
    picture: "",
    username: "",
    email: "",
    newPicture: "",
    newEmail: "",
    newAddress: "",
    newPhone: "",
    newDisplayname: "",
    newFirstName: "",
    newLastName: "",
    newFirstName: "",
    newBorn: "",
    newGender: ""
  };
  componentDidMount(){
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userinfo) {
      this.props.navigate("/login");
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${userinfo.id}`;
    Axios.get(url, {
      headers: {
        "x-access-token": userinfo.token,
      },
    }).then((res) => {
      this.setState({
        picture: res.data.data.profileUser[0].displaypicture,
        username: res.data.data.profileUser[0].display_name,
        email: res.data.data.profileData[0].email
      },() => {
        console.log(this.state);
      });
    });
  }
  removeItem = () => localStorage.removeItem("userInfo")
  render(){
  return (
    <Fragment>
      <div>
        <Test />
      </div>
      {/* <div className="nav-ipad">
        <NavbarMobile/>
      </div> */}
      <main class={styles.bg}>
        <p class={styles["user-text"]}>User Profile</p>
        <section class={styles["profile-section"]}>
          <aside class={styles["content-img"]}>
            <img src={this.state.picture} alt="" />
            <div class={styles["user-content"]}>
              <h3>{this.state.username}</h3>
              <p class={styles["content-email"]}>{this.state.email}</p>
            </div>
            <div class={styles["input-img-content"]}>
              <form class={styles.chose}>
                <label>
                  Choose photo
                  <input type="file" />
                </label>
              </form>
              <button class={styles.remove}>Remove photo</button>
            </div>
            <button class={styles.password}>Edit Password</button>
            <p class={styles["content-change"]}>
              Do you want to save the change?
            </p>
            <button class={styles.save}>Save Change</button>
            <button class={styles.cancel}>Cancel</button>
            <Link to={"/login"} class={styles["width-pc"]}>
              <button class={styles.logout} onClick={()=>{
                this.removeItem()
                this.props.navigate(`/`);
              }}>Log out</button>
            </Link>
          </aside>
          <aside class={styles["content-input"]}>
            <div class={styles["img-content"]}>
              <img class={styles.icon} src={pen} alt="" />
            </div>
            <div>
              <h2 class={styles["contact-input"]}>Contacts</h2>
              <form class={styles.contact}>
                <side class={styles["left-input"]}>
                  <div class={styles.email}>
                    <label for={styles.email}>Email adress :</label>
                    <input type="text" id="email" onClick={(e)=> {
                      this.setState({
                        newEmail: e.target.value
                      })
                    }} />
                  </div>
                  <div class={styles.adress}>
                    <label for="adress">Delivery adress :</label>
                    <input type="text" id="adress" onClick={(e)=> {
                      this.setState({
                        newAddress: e.target.value
                      })
                    }} />
                  </div>
                </side>
                <side class={styles["right-input"]}>
                  <label for="phone">Mobile number :</label>
                  <input type="tel" id="phone" onClick={(e)=> {
                      this.setState({
                        newPhone: e.target.value
                      })
                    }} />
                </side>
              </form>
            </div>
            <div>
              <h2 class={styles["details-input"]}>Details</h2>
              <form class={styles.profile}>
                <div class={styles["left-input"]}>
                  <div class={styles["display-name"]}>
                    <label for="displayname">Display name:</label>
                    <input type="text" id="displayname" onClick={(e)=> {
                      this.setState({
                        newDisplayname: e.target.value
                      })
                    }} />
                  </div>
                  <div class={styles["first-name"]}>
                    <label for="firstname">First name:</label>
                    <input type="text" id="firstname" onClick={(e)=> {
                      this.setState({
                        newFirstName: e.target.value
                      })
                    }}  />
                  </div>
                  <div class={styles["last-nam"]}>
                    <label for="lastname">Last name:</label>
                    <input type="text" id="lastname" onClick={(e)=> {
                      this.setState({
                        newLastName: e.target.value
                      })
                    }} />
                  </div>
                </div>
                <div class={styles["right-input"]}>
                  <label for="born">DD/MM/YY</label>
                  <input type="date" id="born" onClick={(e)=> {
                      this.setState({
                        newBorn: e.target.value
                      })
                    }} />
                </div>
              </form>
              <div class={styles.gender}>
                <form class={styles["gender-form"]}>
                  <div class={styles.male}>
                    <input
                      type="radio"
                      aria-label="male"
                      name="gender"
                      value="male"
                      onClick={(e)=> {
                        this.setState({
                          newGender: e.target.value
                        })
                      }} 
                      checked
                    />
                    <p>Male</p>
                  </div>
                  <div class={styles.female}>
                    <input
                      type="radio"
                      aria-label="female"
                      name="gender"
                      value="female"
                      onClick={(e)=> {
                        this.setState({
                          newGender: e.target.value
                        })
                      }} 
                      checked
                    />
                    <p>Female</p>
                  </div>
                </form>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer/>
    </Fragment>
  );
}
}
const NewProfile = withNavigate(Profile);

export default NewProfile;

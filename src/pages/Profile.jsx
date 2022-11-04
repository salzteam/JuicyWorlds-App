import React, { Fragment } from "react";
import { connect } from "react-redux";
import styles from "../styles/Profile.module.css";
import pen from "../assets/img/Vector22.png";
import Test from "../components/Test"
import Footer from "../components/Footer"
import withNavigate from "../helpers/withNavigate";
import {doLogoutAction} from "../redux/actions/auth";
import {doProfileAction} from "../redux/actions/profile";

class Profile extends React.Component {
  state = {
    isEdit: false,
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
    newBorn: "",
    newGender: ""
  };
  componentDidMount(){
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userinfo) {
      this.props.navigate("/login");
    }
    this.props.dispatch(doProfileAction(userinfo.id, userinfo));

    // console.log(this.props.Profile)
    // const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${userinfo.id}`;
    // Axios.get(url, {
    //   headers: {
    //     "x-access-token": userinfo.token,
    //   },
    // }).then((res) => {
    //   this.setState({
    //     picture: res.data.data.profileUser[0].displaypicture,
    //     username: res.data.data.profileUser[0].display_name,
    //     email: res.data.data.profileData[0].email
    //   },() => {
    //   });
    // });
  }
  componentDidUpdate(prevProps){
    if (prevProps.Logout.token !== this.props.Logout.token){return this.props.navigate("/login")}
  }
  // onEdit = () => {
  //   this.state.isEdit ? placeholder="test":disabled="disabled"
  // }

  getBorn = () => {
    const date = new Date(this.props.Profile.dataProfile[0].date_of_birth)
    const display = date.toLocaleDateString()
    return display
  }
  render(){
  return (
    <div>
      {this.props.Profile.isLoading ?
          <div className={styles["loader-container"]}>
              <div className={styles.spinner}></div>
          </div>
      : this.props.Profile.dataProfile.length > 0 ?
        <Fragment>
          <div>
            <Test />
          </div>
          {/* <div className="nav-ipad">
            <NavbarMobile/>
          </div> */}
          <main className={styles.bg}>
            <p className={styles["user-text"]}>User Profile</p>
            <section className={styles["profile-section"]}>
              <aside className={styles["content-img"]}>
                <img src={this.props.Profile.dataProfile[0].displaypicture} alt="" />
                <div className={styles["user-content"]}>
                  <h3>{this.props.Profile.dataProfile[0].display_name}</h3>
                  <p className={styles["content-email"]}>{this.props.Profile.dataUser[0].email}</p>
                </div>
                <div className={styles["input-img-content"]}>
                  <form className={styles.chose}>
                    <label>
                      Choose photo
                      <input type="file" />
                    </label>
                  </form>
                  <button className={styles.remove}>Remove photo</button>
                </div>
                <button className={styles.password}>Edit Password</button>
                {this.state.isEdit ? 
                <div className={styles["set-display"]}>
                  <p className={styles["content-change"]}>Do you want to save the change?</p>
                  <button className={styles.save}>Save Change</button>
                  <button className={styles.cancel} onClick={()=> {
                    this.setState({
                      isEdit:false
                    })
                  }}>Cancel</button> 
                </div>
                : <div></div> }
                  <button className={`${styles.logout} ${styles["width-pc"]}`} onClick={()=>{
                    const userinfo=  JSON.parse(localStorage.getItem("userInfo"))
                    this.props.dispatch(doLogoutAction(userinfo.token));
                  }}>Log out</button>
              </aside>
              <aside className={styles["content-input"]}>
                <div className={styles["img-content"]} onClick={()=>{
                  this.setState({
                    isEdit: true
                  })
                }}>
                  <img className={styles.icon} src={pen} alt="" />
                </div>
                <div>
                  <h2 className={styles["contact-input"]}>Contacts</h2>
                  <form className={styles.contact}>
                    <aside className={styles["left-input"]}>
                      <div className={styles.email}>
                        <label className={styles.email}>Email adress :</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataUser[0].email} id="email" onClick={(e)=> {
                          this.setState({
                            newEmail: e.target.value
                          })
                        }} />
                      </div>
                      <div className={styles.adress}>
                        <label value="adress">Delivery adress :</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].adress} id="adress" onClick={(e)=> {
                          this.setState({
                            newAddress: e.target.value
                          })
                        }} />
                      </div>
                    </aside>
                    <aside className={styles["right-input"]}>
                      <label value="phone">Mobile number :</label>
                      <input type="tel" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataUser[0].phone} id="phone" onClick={(e)=> {
                          this.setState({
                            newPhone: e.target.value
                          })
                        }} />
                    </aside>
                  </form>
                </div>
                <div>
                  <h2 className={styles["details-input"]}>Details</h2>
                  <form className={styles.profile}>
                    <div className={styles["left-input"]}>
                      <div className={styles["display-name"]}>
                        <label value="displayname">Display name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].display_name} id="displayname" onClick={(e)=> {
                          this.setState({
                            newDisplayname: e.target.value
                          })
                        }} />
                      </div>
                      <div className={styles["first-name"]}>
                        <label value="firstname">First name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].firstname} id="firstname" onClick={(e)=> {
                          this.setState({
                            newFirstName: e.target.value
                          })
                        }}  />
                      </div>
                      <div className={styles["last-nam"]}>
                        <label value="lastname">Last name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].lastname} id="lastname" onClick={(e)=> {
                          this.setState({
                            newLastName: e.target.value
                          })
                        }} />
                      </div>
                    </div>
                    <div className={styles["right-input"]}>
                      <label value="born">DD/MM/YY</label>
                      {console.log(Date.parse(this.props.Profile.dataProfile[0].date_of_birth))}
                      <input type={this.state.isEdit? "date" : "text"} value={this.state.isEdit?"":this.getBorn()} disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].date_of_birth}id="born" onClick={(e)=> {
                          this.setState({
                            newBorn: e.target.value
                          })
                        }} />
                    </div>
                  </form>
                  
                  <div className={styles.gender}>
                    <form className={styles["gender-form"]}>
                      <div className={styles.male}>
                        <input
                          type="radio"
                          aria-label="male"
                          name="gender"
                          value="male"
                          disabled={this.state.isEdit?false:true}
                          defaultChecked={()=>{
                            console.log(this.props.Profile.dataProfile[0].gender)
                            if (this.props.Profile.dataProfile[0].gender === "male") return true
                            return false
                          }}
                          onClick={(e)=> {
                            this.setState({
                              newGender: e.target.value
                            })
                          }} 
                        />
                        <p>Male</p>
                      </div>
                      <div className={styles.female}>
                        <input
                          type="radio"
                          aria-label="female"
                          name="gender"
                          value="female"
                          disabled={this.state.isEdit?false:true}
                          defaultChecked={()=>{
                            if (this.props.Profile.dataProfile[0].gender === "male") return false
                            return true
                          }}
                          onClick={(e)=> {
                            this.setState({
                              newGender: e.target.value
                            })
                          }} 
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
      :<div></div>
      }
    </div>)
}
}
const NewProfile = withNavigate(Profile);
const mapStateToProps = (reduxState) => {
  return {
    Logout: reduxState.auth,
    Profile: reduxState.profile,
  };
};

export default connect(mapStateToProps)(NewProfile);

import React, { Fragment } from "react";
import { connect } from "react-redux";
import styles from "../styles/Profile.module.css";
import pen from "../assets/img/Vector22.png";
import Test from "../components/Test"
import Footer from "../components/Footer"
import withNavigate from "../helpers/withNavigate";
import {doLogoutAction} from "../redux/actions/auth";
import {doProfileAction, doUpdateProfileAction, doUpdateUserAction, changepwdAction} from "../redux/actions/profile";

class Profile extends React.Component {
  state = {
    isEdit: false,
    editPwd: false,
    shwPwd: false,
    shwPwd2: false,
    shwPwd3: false,
    pictrue: "https://res.cloudinary.com/dwo9znbl6/image/upload/v1667575327/JuicyWorlds/default-profile-pic_tjjaqo.webp",
    oldPwd: null,
    newPwd: null,
    ConPwd: null,
    notsameErr: null,
    newPicture: null,
    deletepictrue: null,
    newEmail: null,
    newAddress: null,
    newPhone: null,
    newDisplayname: null,
    newFirstName: null,
    newLastName: null,
    newBorn: null,
    newGender: null
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
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (prevProps.Profile.data !== this.props.Profile.data){return this.props.dispatch(doProfileAction(userinfo.id, userinfo));}
  }
  // onEdit = () => {
  //   this.state.isEdit ? placeholder="test":disabled="disabled"
  // }
  changePassword = () => {
    const userinfo=  JSON.parse(localStorage.getItem("userInfo"))
    if (this.state.oldPwd && this.state.newPwd && this.state.ConPwd){
      if (this.state.newPwd !== this.state.ConPwd) return this.setState({notsameErr: "Passwords are not the same"})
      const data = {
        password: this.state.oldPwd,
        new_password: this.state.ConPwd
      }
      this.props.dispatch(changepwdAction(data, userinfo));
    }
  }

  sendQuery = () => {
    const userinfo=  JSON.parse(localStorage.getItem("userInfo"))
    let bodyFormDataProfile = new FormData();
    let bodyFormDataUser  = null;
    let imageFile = null
    if (this.state.newPicture) imageFile = this.state.newPicture
    if (!this.state.newPicture && this.state.deletepictrue) imageFile = this.state.deletepictrue
    if (imageFile) {bodyFormDataProfile.append('image',imageFile); }
    if (this.state.newDisplayname) bodyFormDataProfile.append('display_name', this.state.newDisplayname);
    if (this.state.newFirstName) bodyFormDataProfile.append('firstname', this.state.newFirstName);
    if (this.state.newLastName) bodyFormDataProfile.append('lastname', this.state.newLastName);
    if (this.state.newAddress) bodyFormDataProfile.append('adress', this.state.newAddress);
    if (this.state.newGender) bodyFormDataProfile.append('gender', this.state.newGender);
    if (this.state.newBorn) bodyFormDataProfile.append('date_of_birth', this.state.newBorn);
    if (this.state.newEmail && this.state.newPhone) bodyFormDataUser = {email : this.state.newEmail, phone: this.state.newPhone}
    if (this.state.newEmail && !this.state.newPhone) bodyFormDataUser = {email : this.state.newEmail}
    if (this.state.newPhone && !this.state.newEmail) bodyFormDataUser = {phone : this.state.newPhone}
    let countPorfile = 0
    let countUser = 0
    for (const pair of bodyFormDataProfile.entries()) {
    countPorfile += 1 
    }
    if (countPorfile > 0) this.props.dispatch(doUpdateProfileAction(bodyFormDataProfile,userinfo.token));
    if (bodyFormDataUser) this.props.dispatch(doUpdateUserAction(bodyFormDataUser,userinfo.token));
  }


  getBorn = () => {
    const date = new Date(this.props.Profile.dataProfile[0].date_of_birth)
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }
  // getBorn = () => {
  //   const date = new Date(this.props.Profile.dataProfile[0].date_of_birth)
  //   const display = date.toLocaleDateString()
  //   return display
  // }
  imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ newPicture:  e.target.files[0], pictrue: null,isEdit:true});
    }
  };

  selectImage = () => {
    if (!this.props.Profile.dataProfile[0].displaypicture && !this.state.newPicture && !this.state.deletepictrue) return this.state.pictrue
    if (this.state.newPicture && !this.state.pictrue) return URL.createObjectURL(this.state.newPicture)
    if (!this.state.newPicture && this.state.deletepictrue) return this.state.deletepictrue
    return this.props.Profile.dataProfile[0].displaypicture
  }
  iconShow = () => {
    if (this.state.shwPwd) return "fa-regular fa-eye"
    return "fa-regular fa-eye-slash"
  }
  iconShow2 = () => {
    if (this.state.shwPwd2) return "fa-regular fa-eye"
    return "fa-regular fa-eye-slash"
  }
  iconShow3 = () => {
    if (this.state.shwPwd3) return "fa-regular fa-eye"
    return "fa-regular fa-eye-slash"
  }
  render(){
  return (
    <div>
      {this.props.Profile.isError && this.props.Profile.err}
      {this.props.Profile.isLoading &&
          <div className={styles["loader-container"]}>
              <div className={styles.spinner}></div>
          </div>}
       {!this.props.Profile.isLoading && this.props.Profile.dataProfile.length > 0 &&
        <Fragment>
          <div>
            <Test />
          </div>
          {/* <div className="nav-ipad">
            <NavbarMobile/>
          </div> */}
          {!this.state.editPwd ? undefined : 
          <div className={styles.modalPwd}>
                <div className={styles["modal-top"]}>
                  <i className={`fa-regular fa-rectangle-xmark ${styles.iconPwd}`} onClick={()=>{
                    this.setState({
                      editPwd: false
                    })
                  }}></i>
                </div>
                <div>
                  <form className={styles["modal-middle"]}>
                    <label>Old Password : </label>
                    <input type={this.state.shwPwd? "text" : "password"} onChange={(e) => {
                      this.setState({
                        oldPwd: e.target.value
                      })
                    }}></input>
                    <i className={`${this.iconShow()} ${styles.passwords}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd: prevState.shwPwd ? false : true,
                }));
            }}></i>
                    <label>New Password : </label>
                    <input type={this.state.shwPwd2? "text" : "password"} onChange={(e) => {
                      this.setState({
                        newPwd: e.target.value
                      })
                    }}></input>
                    <i className={`${this.iconShow2()} ${styles.passwords2}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd2: prevState.shwPwd2 ? false : true,
                }));
            }}></i>
                    <label>Confirm Password :</label>
                    <input type={this.state.shwPwd3? "text" : "password"} onChange={(e) => {
                      this.setState({
                        ConPwd: e.target.value
                      })
                    }}></input>
                    <i className={`${this.iconShow3()} ${styles.passwords3}`} onClick={() => {
                this.setState((prevState) => ({
                  shwPwd3: prevState.shwPwd3 ? false : true,
                }));
            }}></i>
                  </form>
                </div>
                {!this.props.Profile.isError && <p className={styles["sukses"]}>{this.props.Profile.resPwd}</p>}
                {this.props.Profile.isError && <p className={styles["error"]}>{this.props.Profile.errPwd}</p>}
                {this.state.notsameErr && <p className={styles["error"]}>{this.state.notsameErr}</p>}
                <div className={styles["modal-bottom"]} onClick={() => {
                    this.changePassword()
                    if (this.state.notsameErr){
                      return this.setState({
                        notsameErr: null
                      })
                    }
                  }}>
                  <p className={styles["btnPwd"]}>Save Password</p>
                </div>
            </div>}
          <main className={`${styles.bg} ${this.state.editPwd && styles["show-modal"]}`}>
            <p className={styles["user-text"]}>User Profile</p>
            <section className={styles["profile-section"]}>
              <aside className={styles["content-img"]}>
                <img src={this.selectImage()} alt="" />
                <div className={styles["user-content"]}>
                  <h3>{this.props.Profile.dataProfile[0].display_name}</h3>
                  <p className={styles["content-email"]}>{this.props.Profile.dataUser[0].email}</p>
                </div>
                <div className={styles["input-img-content"]}>
                  <form className={styles.chose}>
                    <label>
                      Choose photo
                      <input type="file" onChange={(e) => {this.imageChange(e)}}/>
                    </label>
                  </form>
                    <p className={styles.errorMsgDp}>{this.props.Profile.isError && this.props.Profile.err}</p>
                  <button className={styles.remove} onClick={()=>{this.setState({
                      newPicture: "",
                      deletepictrue: "https://res.cloudinary.com/dwo9znbl6/image/upload/v1667575327/JuicyWorlds/default-profile-pic_tjjaqo.webp",
                      isEdit:true
                  })}}>Remove photo</button>
                </div>
                <button className={styles.password} onClick={()=>{
                  this.setState({
                    editPwd: true
                  })
                }}>Edit Password</button>
                {this.state.isEdit && 
                <div className={styles["set-display"]}>
                  <p className={styles["content-change"]}>Do you want to save the change?</p>
                  <button className={styles.save} onClick={(e)=> {
                    this.sendQuery()
                    this.setState({
                      newPicture: null,
                      deletepictrue: null,
                      newEmail: null,
                      newAddress: null,
                      newPhone: null,
                      newDisplayname: null,
                      newFirstName: null,
                      newLastName: null,
                      newBorn: null,
                      newGender: null,
                      isEdit: false
                    })
                  }}>Save Change</button>
                  <button className={styles.cancel} onClick={(e)=> {
                    this.setState({
                      isEdit:false,
                      newPicture: null,
                      pictrue: null,
                    })
                  }}>Cancel</button> 
                </div> }
                  <button className={`${styles.logout} ${styles["width-pc"]}`} onClick={()=>{
                    const userinfo=  JSON.parse(localStorage.getItem("userInfo"))
                    this.props.dispatch(doLogoutAction(userinfo.token));
                    this.navigate("/login")
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
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input Email...":this.props.Profile.dataUser[0].email} id="email" onChange={(e)=> {
                          this.setState({
                            newEmail: e.target.value
                          })
                        }} />
                        <p className={styles.errorMsg}>{this.props.Profile.isError && this.props.Profile.email}</p>
                      </div>
                      <div className={styles.adress}>
                        <label value="adress">Delivery adress :</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input Address...":this.props.Profile.dataProfile[0].adress} id="adress" onChange={(e)=> {
                          this.setState({
                            newAddress: e.target.value
                          })
                        }} />
                      </div>
                    </aside>
                    <aside className={styles["right-input"]}>
                      <label value="phone">Mobile number :</label>
                      <input type="tel" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input Phone Number...":this.props.Profile.dataUser[0].phone} id="phone" onChange={(e)=> {
                          this.setState({
                            newPhone: e.target.value
                          })
                        }} />
                      <p className={styles.errorMsg}>{this.props.Profile.isError && this.props.Profile.phone}</p>
                    </aside>
                  </form>
                </div>
                <div>
                  <h2 className={styles["details-input"]}>Details</h2>
                  <form className={styles.profile}>
                    <div className={styles["left-input"]}>
                      <div className={styles["display-name"]}>
                        <label value="displayname">Display name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input Display Name...":this.props.Profile.dataProfile[0].display_name} id="displayname" onChange={(e)=> {
                          this.setState({
                            newDisplayname: e.target.value
                          })
                        }} />
                      </div>
                      <div className={styles["first-name"]}>
                        <label value="firstname">First name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input First Name...":this.props.Profile.dataProfile[0].firstname} id="firstname" onChange={(e)=> {
                          this.setState({
                            newFirstName: e.target.value
                          })
                        }}  />
                      </div>
                      <div className={styles["last-nam"]}>
                        <label value="lastname">Last name:</label>
                        <input type="text" disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"Input Last Name...":this.props.Profile.dataProfile[0].lastname} id="lastname" onChange={(e)=> {
                          this.setState({
                            newLastName: e.target.value
                          })
                        }} />
                      </div>
                    </div>
                    <div className={styles["right-input"]}>
                      <label value="born">DD/MM/YY</label>
                      <input type={this.state.isEdit? "date" : "text"} defaultValue={this.state.isEdit?"":this.getBorn()} disabled={this.state.isEdit?false:true} placeholder={this.state.isEdit?"":this.props.Profile.dataProfile[0].date_of_birth}id="born" onClick={(e)=> {
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
                          defaultValue="male"
                          disabled={this.state.isEdit?false:true}
                          defaultChecked={!this.state.isEdit ? this.props.Profile.dataProfile[0].gender === "male" ?  true : false : false}
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
                          defaultValue="female"
                          disabled={this.state.isEdit?false:true}
                          defaultChecked={!this.state.isEdit ? this.props.Profile.dataProfile[0].gender === "female" ?  true : false : false}
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

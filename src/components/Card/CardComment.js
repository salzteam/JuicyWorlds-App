import React, { Component } from "react";
import styles from "../Card/Card-Comment.module.css";
import user1 from "../../assets/img/user.png";
import star from "../../assets/img/star.png";

export class CardComment extends Component {
  render() {
    return (
      <>
        <div className={`col-4 ${styles["comment-user-first"]}`}>
          <div className={styles.top}>
            <div
              className={`${styles["detail-top"]} ${styles["first-content"]}`}
            >
              <div className={`col-9 ${styles["detail-comment"]}`}>
                <img className={styles["image-profile"]} src={user1} alt="" />
                <div className={styles["name-address"]}>
                  <p className={styles["name-profile"]}>Viezh Robert</p>
                  <p className={styles["address-profile"]}>Warsaw, Poland</p>
                </div>
              </div>
              <div className={`col-3 ${styles["detail-rate"]}`}>
                <p>4.5</p>
                <img src={star} alt="" />
              </div>
            </div>
            <div className={styles["detail-bottom"]}>
              <p>
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the coffee and meals tho. I like it here!! Very
                recommended!"
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CardComment;

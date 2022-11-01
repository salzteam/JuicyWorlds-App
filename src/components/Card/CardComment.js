import React, { Component } from "react";
import styles from "../Card/Card-Comment.module.css";
import user1 from "../../assets/img/user.png";
import star from "../../assets/img/star.png";

export class CardComment extends Component {
  render() {
    return (
      <>
        <div class={`col-4 ${styles["comment-user-first"]}`}>
          <div class={styles.top}>
            <side class={`${styles["detail-top"]} ${styles["first-content"]}`}>
              <side class={`col-9 ${styles["detail-comment"]}`}>
                <img class={styles["image-profile"]} src={user1} alt="" />
                <div class={styles["name-address"]}>
                  <p class={styles["name-profile"]}>Viezh Robert</p>
                  <p class={styles["address-profile"]}>Warsaw, Poland</p>
                </div>
              </side>
              <side class={`col-3 ${styles["detail-rate"]}`}>
                <p>4.5</p>
                <img src={star} alt="" />
              </side>
            </side>
            <side class={styles["detail-bottom"]}>
              <p>
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the coffee and meals tho. I like it here!! Very
                recommended!"
              </p>
            </side>
          </div>
        </div>
      </>
    );
  }
}

export default CardComment;

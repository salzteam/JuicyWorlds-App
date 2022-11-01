import React from "react";
import styles from "../../components/Card/Card-Payments.module.css";
import food1 from "../../assets/img/payment/food2.png";

function CardPayments() {
  return (
    <>
      <div className={styles["card-payment"]}>
        <img src={food1} alt="food1" />
        <div className={styles["menu-item"]}>
          <p className={styles["detail-item"]}>Hazelnut Latte</p>
          <p className={styles["detail-item"]}>x 1</p>
          <p className={styles["detail-item"]}>Regular</p>
        </div>
        <p className={styles.price}>IDR 24.0</p>
      </div>
    </>
  );
}

export default CardPayments;

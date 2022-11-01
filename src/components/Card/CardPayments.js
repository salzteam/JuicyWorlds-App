import React from "react";
import styles from "../../components/Card/Card-Payments.module.css";

class CardPayments extends React.Component {
  render() {
    const { title, price, image, size, qty } = this.props;
    return (
      <>
        <div className={styles["card-payment"]}>
          <img src={image} alt="food1" />
          <div className={styles["menu-item"]}>
            <p className={styles["detail-item"]}>{title}</p>
            <p className={styles["detail-item"]}>x {qty}</p>
            <p className={styles["detail-item"]}>{size}</p>
          </div>
          <p className={styles.price}>{price}</p>
        </div>
      </>
    );
  }
}

export default CardPayments;

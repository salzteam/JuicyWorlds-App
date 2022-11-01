import React from "react";
import styles from "../Card/CardHistory.module.css";
import food1 from "../../assets/img/food1.png";

class card extends React.Component {
  getChecked = (checkedValue) => {
    if (checkedValue == true) {
      return <input type="checkbox" checked />;
    }
    return <input type="checkbox" />;
  };
  render() {
    const { title, subtotal, status, image, checked } = this.props;
    return (
      <>
        <div className={`col-4 ${styles.card}`}>
          <div className={styles["main-content"]}>
            <img src={image} alt="NOT FOUND" />
            <div className={styles["content-title"]}>
              <p className={styles.title}>{title}</p>
              <p className={styles.price}>{subtotal}</p>
              <div className={styles["check-box"]}>
                <p className={styles.price}>{status}</p>
                {this.getChecked(checked)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default card;

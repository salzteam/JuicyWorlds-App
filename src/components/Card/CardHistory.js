import React from "react";
import styles from "../Card/CardHistory.module.css";
import food1 from "../../assets/img/food1.png";

class card extends React.Component {
  getChecked = (checkedValue) => {
    if (checkedValue == true) {
      return <input type="checkbox" checked className={styles.input} />;
    }
    return <input type="checkbox" className={styles.input} />;
  };
  render() {
    const { title, subtotal, status, image, checked } = this.props;
    return (
      <>
        <div className={`col-4 ${styles.card}`}>
          <div className={styles["main-content"]}>
            <img src={image} alt="NOT FOUND" />
            <div className={styles["content-title"]}>
              <div className={styles.width}>
                <p className={styles.title}>{title}</p>
                <p className={styles.price}>{subtotal}</p>
                <p className={styles.price}>{status}</p>
                <div className={styles["check-box"]}></div>
              </div>
              {this.getChecked(checked)}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default card;

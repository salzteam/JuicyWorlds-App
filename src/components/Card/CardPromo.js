import React from "react";
import styles from "../../components/Card/Card-Promo.module.css";

export class CardPromo extends React.Component {
  render() {
    const { id, image, bgcolor, title, desc } = this.props;
    return (
      <>
        <section
          className={id === 999 ? styles.display : styles["mother-border"]}
          style={{ backgroundColor: bgcolor }}
        >
          <div className={styles["mother-icon"]}>
            <img src={image} alt="" />
          </div>
          <div className={styles["mother-title"]}>
            <p className={styles["happy-title"]}>{title}</p>
            <p className={styles["get-title"]}>{desc}</p>
          </div>
        </section>
      </>
    );
  }
}

export default CardPromo;

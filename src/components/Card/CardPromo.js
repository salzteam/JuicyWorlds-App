import React from "react";
import styles from "../../components/Card/Card-Promo.module.css";
import pencil from "../../assets/img/Vector22.png";
import withNavigate from "../../helpers/withNavigate";

export class CardPromo extends React.Component {
  render() {
    const { id, image, bgcolor, title, desc, isEdit } = this.props;
    return (
      <>
        <section
          className={id === 999 ? styles.display : styles["mother-border"]}
          style={{ backgroundColor: bgcolor }}
        >
          <div
            className={isEdit ? styles.pencil : styles["pencil-none"]}
            onClick={() => {
              this.props.navigate(`/product/editpromo/${id}`);
            }}
          >
            <img src={pencil} alt="pencil" />
          </div>
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

export default withNavigate(CardPromo);

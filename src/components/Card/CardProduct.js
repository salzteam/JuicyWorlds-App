import React from "react";
import styles from "../../components/Card/Card-Product.module.css";
import withNavigate from "../../helpers/withNavigate";
import pencil from "../../assets/img/Vector22.png";

class CardProduct extends React.Component {
  check = (discount) => {
    if (!discount) {
      return "label-promo-none";
    }
    return "label-promo";
  };
  render() {
    const { title, price, discount, image, id, isEdit } = this.props;
    return (
      <>
        <div
          className={`col-md-2 p-4 align-content-center position-relative ${
            isEdit ? styles["content-product-none"] : styles["content-product"]
          }`}
          onClick={() => {
            if (!isEdit) return this.props.navigate(`/product-details/${id}`);
          }}
        >
          <div
            className={isEdit ? styles.pencil : styles["pencil-none"]}
            onClick={() => {
              this.props.navigate(`/product/${id}/edit`);
            }}
          >
            <img src={pencil} alt="pencil" />
          </div>
          <img
            className={styles["image-content"]}
            src={image}
            alt="NOT-FOUND"
          />
          <div className={styles[this.check(discount)]}>
            <p>{discount}%</p>
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.price}>{price}</p>
        </div>
      </>
    );
  }
}

export default withNavigate(CardProduct);

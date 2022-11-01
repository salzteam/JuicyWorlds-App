import React from "react";
import styles from "../../components/Card/Card-Product.module.css";
import withNavigate from "../../helpers/withNavigate";

class CardProduct extends React.Component {
  check = (discount) => {
    if (!discount) {
      return "label-promo-none";
    }
    return "label-promo";
  };
  render() {
    const { title, price, discount, image, id } = this.props;
    return (
      <>
        <div
          className={`col-md-2 p-4 align-content-center position-relative ${styles["content-product"]}`}
          onClick={() => {
            this.props.navigate(`/product-details/${id}`);
          }}
        >
          <img
            className={styles["image-content"]}
            src={`http://localhost:8080${image}`}
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

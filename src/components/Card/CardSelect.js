import React, { Component } from "react";
import styles from "./CardSelect.module.css";
import Camera from "../../assets/img/default.png";
import { connect } from "react-redux";
import { addPromoAction } from "../../redux/actions/addpromo";

export class CardSelect extends Component {
  render() {
    const { image, name, ctg, price, id } = this.props;
    return (
      <>
        <div
          className={styles.content}
          onClick={() => {
            const {
              newCode,
              newPicture,
              newColor,
              newDesc,
              newDiscount,
              newEnd,
              newName,
              newStart,
              product,
              select_id,
              select,
            } = this.props.promo;
            const idProduct = id;
            const selectName = name;
            const selects = false;
            this.props.dispatch(
              addPromoAction(
                name,
                idProduct,
                newPicture,
                newName,
                newDesc,
                newDiscount,
                newColor,
                newStart,
                newEnd,
                newCode,
                selects
              )
            );
          }}
        >
          <img alt="image" src={image} />
          <div className={styles["content-title"]}>
            <p className={styles.first}>{name}</p>
            <div className={styles["title-bot"]}>
              <p className={styles.second}>{ctg}</p>
              <p className={styles.price}>{price}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    promo: reduxState.addPromo,
  };
};

export default connect(mapStateToProps)(CardSelect);

import React from "react";
import bg from "../assets/img/error.webp"
import css from "../styles/Error.module.css"

const Error = () => {
  return (
  <div id="error-page">
    <img class={css.error} src={bg} alt="error"/>
  </div>
  )
};

export default Error;

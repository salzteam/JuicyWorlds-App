import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo.svg";
import styles from "../styles/App.module.css";
import withNavigate from "../helpers/withNavigate";

class App extends React.Component {
  state = {
    color: "primary",
  };
  componentDidMount() {
    console.log("did mount");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("previous", prevState);
    console.log("now", this.state);
  }
  render() {
    return (
      <div className={styles.App}>
        <header
          className={`${styles["App-header"]} ${styles[this.state.color]}`}
        >
          <img src={logo} className={styles["App-logo"]} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div
            className={styles.btn}
            onClick={() => {
              this.setState((state) => ({
                color: state.color === "primary" ? "secondary" : "primary",
              }));
            }}
          >
            Change Background
          </div>
          <Link className={styles["no-underline"]} to={"/register"}>
            {/* <a href="/login"> */}
            <div className={styles.btn}>Register Here</div>
            {/* </a> */}
          </Link>
          <div
            className={styles.btn}
            onClick={() => {
              this.props.navigate("/position");
            }}
          >
            Position
          </div>
        </header>
        <main className="container-fluid">
          <section className="row">
            <div className="col-6 col-md-4 bg-primary text-white">
              bg-primary
            </div>
            <div className="col-6 col-md-4 bg-secondary text-white">
              bg-secondary
            </div>
            <div className="col-6 col-md-4 bg-info text-dark">bg-info</div>
          </section>
        </main>
      </div>
    );
  }
}

const NewComponent = withNavigate(App);

export default NewComponent;

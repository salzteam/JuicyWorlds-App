import React, { Component } from 'react'
import NavbarLogin from "../components/Test"
import Footer from "../components/Footer"
import css from "../styles/Dashboard.module.css"

import FilterIcon from "../assets/img/icon/icon.png"
import FilterText from "../assets/img/icon/Filter.png"
import User from "../assets/img/icon/user.png"
import Bar from "../assets/img/icon/bar.png"
import Persent from "../assets/img/icon/76.png"
import donut1 from "../assets/img/icon/donut1.png"
import donut2 from "../assets/img/icon/donut2.png"
import chart from "../assets/img/icon/Chart.png"

export class Dashboard extends Component {

  render() { 
    const userinfo =  JSON.parse(localStorage.getItem("userInfo"))
    return (
      <>
      <NavbarLogin/>
      <main className={css.container}>
        <p className={css["title-header"]}>See how your store progress so far</p>
        <div className={css.title}>
            <div className={css.filter}>
                <img src={FilterIcon} alt='signal'/>
                <img src={FilterText} alt='filter'/>
            </div>
            <p>15 April - 21 April 2020</p>
            <div className={css.slideBtn}>
                <p>&#60;</p>
                <p>&#62;</p>
            </div>
        </div>
        <div className={css["container-side"]}>
          <aside className={css.left}>
            <div className={`${css.top}`}>
              <p className={css["Monthly-report"]}>Monthly Report</p>
              <div className={css["box-titik"]}>
                <div className={`${css.titik}`}></div>
                <div className={`${css.titik}`}></div>
                <div className={`${css.titik}`}></div>
              </div>
            </div>
              <p className={css.date}>15 April - 20 April</p>
              <img className={css.chart} src={chart} alt='chart'/>
          </aside>
          <aside className={css.right}>
            <div className={css["right-top"]}>
              <div className={css["top-best"]}>
                <img className={css.images} src={User} alt="best-staff"/>
                <div className={css["box-name"]}>
                  <p className={css.name}>Cheryn Laurent</p>
                  <p className={css.comment }>Keep up the good work and spread love!</p>
                </div>
              </div>
                  <hr className={css["vertical-line"]}/>
                  <div className={css["top-bottom"]}>
                    <p className={css.bestTitle}>Best Staff of the Month</p>
                    <img className={css.size} src={Bar}alt="Progress"/>
                    <p className={css.inform}>Achieved 3.5M of total 5M</p>
                    <p className={css.inform}>478 Customer</p>
                  </div>
            </div>
            <div className={css["right-bottom"]}>
              <div>
                <p className={css.goals}>Goals</p>
                <p className={css.urGoals}>Your goals is still on 76%. Keep up the good work!</p>
                <div className={css.precent}>
                  <img className={css.image1} src={donut1} alt='cirlce1'/>
                  <img className={css.image2} src={donut2} alt='circle2'/>
                  <img className={css.textPersent} src={Persent} alt='circle3'/>
                </div>
                <div className={css["circle-bottom"]}>
                  <div className={`${css["circles"]} ${css.leftC} `}></div>
                  <div className={`${css["circles"]} ${css.middleC} `}></div>
                  <div className={`${css["circles"]} ${css.middleC} `}></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
          <div className={css.sectionBtn}>
            <div className={css.btn}>
              <p>Download Report</p>
            </div>
            <div className={css.btn2}>
              <p>Share Report</p>
            </div>
          </div>
      </main>
      <Footer />
      </>
    )
  }
}

export default Dashboard
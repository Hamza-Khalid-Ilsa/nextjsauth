import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

function Header(props) {
  let FirstHead = "",
    SecoundHead;
  if (props.head.link1 == "/signIn") {
    FirstHead = "Sigin up";
  } else {
    FirstHead = "Profile";
  }
  if (props.head.link2 == "/login") {
    SecoundHead = "Login";
  } else {
    SecoundHead = "Dashbord";
  }
  const Logout = () => {
    if (props.head.link1 == "/Profile" || props.head.link2 == "/Dashboard") {
      console.log(props.head.link1,"in logout")
      return (
        <li className={styles.li}>
          <Link href="/login" >Logout</Link>
        </li>
      );
    }
    else{
      return;
    }
  };
  return (
    <ul className={styles.ul}>
      <li className={styles.li}>
        <Link href={props.head.link1}>{FirstHead}</Link>
      </li>
      <li className={styles.li}>
        <Link href={props.head.link2}>{SecoundHead}</Link>
      </li>
      <Logout/>
    </ul>
  );
}

export default Header;

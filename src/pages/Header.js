import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
function Header(props) {
  let FirstHead = "",
    SecoundHead;
  if (props.head.link1 == "/signUp") {
    FirstHead = "Sign up";
    SecoundHead = "Login";
  } else {
    FirstHead = "Profile";
    SecoundHead = "Dashbord";
  }

  const Logout = () => {
    const router = useRouter();

    const logoutButton = () => {
      Cookies.remove("user");
      router.push("/login");
    };

    if (props.head.link1 == "/Profile" || props.head.link2 == "/Dashboard") {
      return (
        <li className={styles.li}>
          <a onClick={logoutButton}>Logout</a>
        </li>
      );
    } else {
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
      <Logout />
    </ul>
  );
}

export default Header;

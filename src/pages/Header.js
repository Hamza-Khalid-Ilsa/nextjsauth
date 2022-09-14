import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getAuth, signOut as userSignOut } from "firebase/auth";
import { app } from "../firebase/index";
import {signOut,useSession} from "next-auth/react"


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
    const {data:session}=useSession();

    const logoutButton = () => {
      if(session)
      {
        signOut();
      }
      else{
        const auth = getAuth(app);
        userSignOut(auth)
        .then(() => {
          Cookies.remove("user");
          router.push("/login");
        })
        .catch((error) => {
          window.alert("user not signout");
        });
      }
     

      
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

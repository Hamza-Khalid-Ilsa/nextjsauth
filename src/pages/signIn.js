import Header from "./Header";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Cookies,{getCookie} from "cookies-next";

import Signup from "../components/Signup";

function signIn(props) {
  return (
    <>
      <Header  head={{link1 :"/signIn",link2:"/login", point:"login"}}/>
      <Signup />
    </>
  );
}
export async function getServerSideProps({ req, res }) {
  const cooki = getCookie("user", { req, res }) || null;

  if (cooki === null) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/Dashboard",
        permanent: false,
      },
    };
  }
}

export default signIn;

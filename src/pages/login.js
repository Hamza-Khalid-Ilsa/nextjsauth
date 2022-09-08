import Header from "./Header";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Cookies, { getCookie,removeCookies } from "cookies-next";

function login() {
  return (
    <>
      <Header head={{ link1: "/signIn", link2: "/login", point: "login" }} />
      <Login />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  removeCookies("user",{ req, res })
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

export default login;

import Header from "./Header";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Cookies, { getCookie, removeCookies } from "cookies-next";
import * as firebaseAdmin from "firebase-admin";
import { authenticateUser } from "../firebase/admin";

function login() {
  return (
    <>
      <Header head={{ link1: "/signUp", link2: "/login", point: "login" }} />
      <Login />
    </>
  );
}

// export async function getServerSideProps({ req, res }) {

//   const cooki = getCookie("user", { req, res }) || null;

//   if (cooki === null) {
//     return {
//       props: {},
//     };
//   } else {
//     return {
//       redirect: {
//         destination: "/Dashboard",
//         permanent: false,
//       },
//     };
//   }
// }
export async function getServerSideProps({ req, res }) {
  const cooki = getCookie("user", { req, res }) || "";
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
    });
  }
  const responce = await authenticateUser(cooki);
  console.log(responce, "responce");
  if (responce === "User Authenticated") {
    return {
      redirect: {
        destination: "/Dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default login;

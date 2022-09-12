import Header from "./Header";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Cookies, { getCookie } from "cookies-next";
import * as firebaseAdmin from "firebase-admin";
import { authenticateUser } from "../firebase/admin";
import Signup from "../components/Signup";

function signUp(props) {
  return (
    <>
      <Header head={{ link1: "/signUp", link2: "/login", point: "login" }} />
      <Signup />
    </>
  );
}
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

export default signUp;

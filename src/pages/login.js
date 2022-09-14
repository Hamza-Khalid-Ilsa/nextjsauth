import Header from "./Header";
import React from "react";
import Login from "../components/Login";
import { getCookie } from "cookies-next";
import * as firebaseAdmin from "firebase-admin";
import { authenticateUser } from "../firebase/admin";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

function login() {
  return (
    <>
      <Header head={{ link1: "/signUp", link2: "/login", point: "login" }} />
      <Login />
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

  const session = await unstable_getServerSession(req, res, authOptions);
  if (session || responce === "User Authenticated") {
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

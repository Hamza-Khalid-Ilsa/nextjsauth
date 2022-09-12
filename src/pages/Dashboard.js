import React from "react";
import Header from "./Header";
import { getCookie } from "cookies-next";
import DashboardComponent from "../components/DashboardComponent";
import { useRouter } from "next/router";
import * as firebaseAdmin from "firebase-admin";
import { authenticateUser } from "../firebase/admin";

function Dashboard({ props }) {
  return (
    <>
      <Header
        head={{ link1: "/Profile", link2: "/Dashboard", point: "afterlogin" }}
      />
      <DashboardComponent />
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
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default Dashboard;

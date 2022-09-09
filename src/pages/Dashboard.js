import React from "react";
import Header from "./Header";
import { getCookie } from "cookies-next";
import DashboardComponent from "../components/DashboardComponent";
import { useRouter } from "next/router";
import { initializeApp } from "firebase-admin/app";

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
  const cooki = getCookie("user", { req, res });
  if (cooki === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Dashboard;

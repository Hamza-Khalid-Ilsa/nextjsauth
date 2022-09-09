import React from "react";
import Header from "./Header";
import ProfileComponent from "../components/ProfileComponent";
import Cookies, { getCookie } from "cookies-next";

function Profile() {
  return (
    <>
      <Header
        head={{ link1: "/Profile", link2: "/Dashboard", point: "afterlogin" }}
      />
      <ProfileComponent />
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

export default Profile;

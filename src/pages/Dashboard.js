import React from "react";
import Header from "./Header";
import Cookies,{getCookie} from "cookies-next";
import DashboardComponent from "../components/DashboardComponent";
import { useRouter } from "next/router";

function Dashboard({props}) {
  return (
    <>
      <Header
        head={{ link1: "/Profile", link2: "/Dashboard", point: "afterlogin" }}
      />
      <DashboardComponent />
    </>
  );
}
export async function getServerSideProps({req,res}) {
    const cooki=getCookie("user",{req,res});
    console.log("hmhmj",getCookie("user",{req,res}))
    if(cooki === undefined)
    {
        return {
            redirect: {
              destination: "/login",
              permanent: false,
            },
          };
    }
    else{
        return {
           props:{}
          }

    }
    
  }

export default Dashboard;

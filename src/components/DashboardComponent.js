import React from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

const DashboardComponent = () => {
  const { data: session } = useSession();

  return session ? (
    <>
      <h1>Dashboard Component</h1>
      <img
        src={session?.user?.image}
        className={styles.profileimage}
        alt="User Image"
      ></img>
      <h4>{session.user?.email}</h4>
      <h4>{session.user?.name}</h4>
    </>
  ) : (
    <>
      <h1>Dashboard Component</h1>
    </>
  );
};

export default DashboardComponent;

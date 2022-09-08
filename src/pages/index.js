import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./Header";
export default function Home() {
  const NavBar = () => {
    return (
      <Header/>
    );
  };
  return <NavBar />;
}

import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    Cookies.remove("user");
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    let user, errorCode, errorMessage;
    console.log(email, password);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        console.log(user);
        Cookies.set("user", JSON.stringify(user.accessToken), {
          expires: 1 / 24,
        });
        router.push("/Dashboard");
        console.log("jason data", JSON.parse(Cookies.get("user")));

        // ...
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
        console.log(errorCode, "pl", errorMessage);
        window.alert("Incorrect Credentiale");
      });
  };
  return (
    <>
      <h1 className={styles.signUpName}>Login</h1>
      <div className={styles.signUp}>
        <form className={styles.signUpFormInput} onSubmit={submitForm}>
          <label>Email or Phone Number</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={`${styles.signUpFormInput} ${styles.inputField}`}
          />

          <label>Enter password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={`${styles.signUpFormInput} ${styles.inputField}`}
          />
          <input
            type="submit"
            className={`${styles.button} ${styles.button1}`}
            value="Login"
          />
        </form>
      </div>
    </>
  );
}

export default Login;

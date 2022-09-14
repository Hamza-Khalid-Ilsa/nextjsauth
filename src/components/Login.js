import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFlage, setEmailFlage] = useState();
  const [passFlage, setPassFlage] = useState();
  const router = useRouter();
  const auth = getAuth(app);

  const handlerChangeValue = (value = "") => {
    setEmail(value);
    var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const e = email.test(value);
    if (e == true) {
      setEmailFlage(true);
    } else {
      setEmailFlage(false);
    }
    console.log("email", emailFlage);
  };
  const handlerChangePassword = (value = "") => {
    setPassword(value);
    const pass = /^^[a-zA-Z0-9_.-]{6,20}$/;
    const p = pass.test(value);
    if (p == true) {
      setPassFlage(true);
    } else {
      setPassFlage(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    let user;
    if (emailFlage == true && passFlage == true) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          user = userCredential.user;
          Cookies.set("user", user.accessToken, {
            expires: 1 / 24,
          });
          router.push("/Dashboard");

          // ...
        })
        .catch((error) => {
          errorCode = error.code;
          errorMessage = error.message;
          window.alert("Incorrect Credentiale");
        });
    } else {
      if (emailFlage == false) {
        window.alert("Wrong Email");
      }
      if (passFlage == false) {
        window.alert(
          "Password Must contain atleast one special character and atleast one number"
        );
      }
    }
  };

  return (
    <>
      <h1 className={styles.signUpName}>Login</h1>
      <div className={styles.signUp}>
        <form className={styles.signUpFormInput} onSubmit={submitForm}>
          <label>
            Enter Email
            <input
              type="text"
              value={email}
              onChange={(e) => {
                handlerChangeValue(e.target.value);
              }}
              className={`${styles.signUpFormInput} ${styles.inputField}`}
            />
          </label>

          <label>Enter password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              handlerChangePassword(e.target.value);
            }}
            className={`${styles.signUpFormInput} ${styles.inputField}`}
          />
          <input
            type="submit"
            className={`${styles.button} ${styles.button1}`}
            value="Login"
          />
          <input
            type="submit"
            onClick={() => {
              signIn("google");
            }}
            className={`${styles.button} ${styles.button1}`}
            value="Login With Google"
          />
          <input
            type="submit"
            onClick={() => {
              router.push("/LoginWithPhone");
            }}
            className={`${styles.button} ${styles.button1}`}
            value="Login Phone Number"
          />
        </form>
      </div>
    </>
  );
}

export default Login;

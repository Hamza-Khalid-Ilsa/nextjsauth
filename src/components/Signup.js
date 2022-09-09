import { useState } from "react";
import React from "react";
import styles from "../styles/Home.module.css";
import { sigupwithemail } from "../firebase";
import { useRouter } from "next/router";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberFlage, setNumberFlage] = useState();
  const [emailFlage, setEmailFlage] = useState();
  const [passFlage, setPassFlage] = useState();
  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    if (numberFlage == true && passFlage == true) {
    } else if (emailFlage == true && passFlage == true) {
      sigupwithemail(email, password);
      router.push("/login");
    } else {
      if (emailFlage == false || numberFlage == false) {
        window.alert("Wrong Email/Phone Number");
      }
      if (passFlage == false) {
        window.alert(
          "Password Must contain atleast one special character and atleast one number"
        );
      }
    }
  };
  const handlerChangeValue = (value = "") => {
    setEmail(value);
    var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var phone = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    const e = email.test(value);
    const p = phone.test(value);
    if (e == true) {
      setNumberFlage(false);
      setEmailFlage(true);
    } else if (p == true) {
      setNumberFlage(true);
      setEmailFlage(false);
    } else {
      setNumberFlage(false);
      setEmailFlage(false);
    }
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

  return (
    <>
      <h1 className={styles.signUpName}>Sign up</h1>
      <div className={styles.signUp}>
        <form className={styles.signUpFormInput} onSubmit={submitForm}>
          <div className={styles.signUpFormInput}>
            <label>Email or Phone Number</label>
          </div>
          <div className={styles.signUpFormInput}>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                handlerChangeValue(e.target.value);
              }}
              className={`${styles.signUpFormInput} ${styles.inputField}`}
            />
          </div>

          <div className={styles.signUpFormPassword}>
            <label>Enter password</label>
          </div>
          <div className={styles.signUpFormPassword}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                handlerChangePassword(e.target.value);
              }}
              className={`${styles.signUpFormInput} ${styles.inputField}`}
            />
          </div>

          <input
            type="submit"
            className={`${styles.button} ${styles.button1}`}
            value="Sigin"
          />
        </form>
      </div>
    </>
  );
}

export default Signup;

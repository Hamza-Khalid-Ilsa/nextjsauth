import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import { app } from "../firebase";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

function LoginWithPhoneComp() {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [numberFlage, setNumberFlage] = useState();
  const [passFlage, setPassFlage] = useState();
  const [smssend, setSmsSend] = useState(false);
  const [smsFlage, setSmsFlage] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const smsSend = () => {
    setSmsFlage(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sendcode",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setSmsSend(true);
      })
      .catch((error) => {
        window.alert(error.message);
        grecaptcha.reset(window.recaptchaWidgetId);
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };
  const handlerChangeValue = (value = "") => {
    setphone(value);
    var phone = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    const p = phone.test(value);
    if (p == true) {
      setNumberFlage(true);
    } else {
      setNumberFlage(false);
    }
    console.log("numberflage", numberFlage);
  };
  const handlerChangePassword = (value = "") => {
    setPassword(value);
    var pin = /^[0-9]{6,6}$/;
    const code = pin.test(value);
    if (code == true) {
      setPassFlage(true);
    } else {
      setPassFlage(false);
    }
    console.log("pin", password, passFlage);
  };
  const onSignbyphone = (value) => {
    const code = value;
    confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        Cookies.set("user", user.accessToken, {
          expires: 1 / 24,
        });
        router.push("/Dashboard");
        // ...
      })
      .catch((error) => {
        window.alert("Bad Verfication ", error.message);
        console.log(error);
        grecaptcha.reset(window.recaptchaWidgetId);

        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };
  const submitForm = (e) => {
    e.preventDefault();
    let user, errorCode, errorMessage;
    if (numberFlage == true && passFlage == true && smsFlage == true) {
      onSignbyphone(password);
    } else {
      if (numberFlage == false) {
        window.alert("Wrong Phone Number");
      }
      if (passFlage == false) {
        window.alert("Password Must Contain 6 Pin Code");
      }
    }
  };

  return (
    <>
      <h1 className={styles.signUpName}>Login</h1>
      <div className={styles.signUp}>
        <form className={styles.signUpFormInput} onSubmit={submitForm}>
          <label>
            Phone Number
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                handlerChangeValue(e.target.value);
              }}
              className={`${styles.signUpFormInput} ${styles.inputField}`}
            />
            {numberFlage == true ? (
              <input
                type="button"
                id="sendcode"
                onClick={smsSend}
                className={`${styles.button} ${styles.button1}`}
                value="Send code"
              />
            ) : (
              ""
            )}
          </label>
          {smssend == true ? (
            <>
              <label>Pin Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  handlerChangePassword(e.target.value);
                }}
                className={`${styles.signUpFormInput} ${styles.inputField}`}
              />
            </>
          ) : (
            ""
          )}

          <input
            type="submit"
            className={`${styles.button} ${styles.button1}`}
            value="Login With Phone Number"
          />
          <input
            type="submit"
            onClick={() => {
              signIn("google");
            }}
            className={`${styles.button} ${styles.button1}`}
            value="Login With Google"
          />
        </form>
      </div>
    </>
  );
}

export default LoginWithPhoneComp;

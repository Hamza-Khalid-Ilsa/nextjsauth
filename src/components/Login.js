import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "../styles/Home.module.css";
import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberFlage, setNumberFlage] = useState();
  const [emailFlage, setEmailFlage] = useState();
  const [passFlage, setPassFlage] = useState();
  const [smsFlage, setSmsFlage] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const onSignInSubmit = () => {
    const appVerifier = window.recaptchaVerifier;
    grecaptcha.reset(window.recaptchaWidgetId);
    // Or, if you haven't stored the widget ID:

    signInWithPhoneNumber(auth, email, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };
  const smsSend = () => {
    setSmsFlage(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sendcode",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, email, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error.message);
        window.alert(error.message);
        grecaptcha.reset(window.recaptchaWidgetId);
        // Or, if you haven't stored the widget ID:
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
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
  const onSignbyphone = (value) => {
    const code = value;
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        Cookies.set("user", user.accessToken, {
          expires: 1 / 24,
        });
        router.push("/Dashboard");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        window.alert("Bad Verfication ", error.message);
        grecaptcha.reset(window.recaptchaWidgetId);
        // Or, if you haven't stored the widget ID:
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
    } else if (emailFlage == true && passFlage == true) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
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
  return (
    <>
      <h1 className={styles.signUpName}>Login</h1>
      <div className={styles.signUp}>
        <form className={styles.signUpFormInput} onSubmit={submitForm}>
          <label>
            Email or Phone Number
            <input
              type="text"
              value={email}
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

          <label>Enter password or pin code</label>
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
        </form>
      </div>
    </>
  );
}

export default Login;

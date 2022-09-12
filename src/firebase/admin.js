import { async } from "@firebase/util";
import * as firebaseAdmin from "firebase-admin";

import { initializeApp } from "firebase-admin";
import serviceAccount from "./secret.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
  });
}

export async function authenticateUser(user) {
  console.log("mohad: ", user);
  let u = user;
  console.log("U: ", u);
  let responce = "";

  user !== undefined
    ? await firebaseAdmin
        .auth()
        .verifyIdToken(user)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          responce = "User Authenticated";
          console.log("User Authenticated");
          // ...
        })
        .catch((error) => {
          // Handle error
          responce = "Authentication Failed";
          console.log("Authentication Failed");
        })
    : "";
  console.log("gagag", responce);

  return responce;
}

export { firebaseAdmin };

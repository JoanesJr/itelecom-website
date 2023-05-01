import { db } from "../index";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

export async function getsocial(city) {
  try {
    const socialRef = collection(db, "social");

    let arraysocial = [];

    const q = query(socialRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      arraysocial.push(monta);
    });

    return arraysocial;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatesocial(
  { instagram, twitter, facebook, whatsapp, whatsappNumber, city },
  id,
  type
) {
  try {
    if (type == "edit") {
      await setDoc(doc(db, "social", id), {
        instagram,
        twitter,
        facebook,
        whatsapp,
        whatsappNumber,
        city,
      });
    } else {
      const idNew = uuid();
      await setDoc(doc(db, "social", idNew), {
        instagram,
        twitter,
        facebook,
        whatsapp,
        city,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlan(id) {
  try {
    const docRef = doc(db, "social", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

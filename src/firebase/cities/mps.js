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

export async function getmps(city) {
  try {
    const mpsRef = collection(db, "mps");

    let arraymps = [];

    const q = query(mpsRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      arraymps.push(monta);
    });

    return arraymps;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatemps(
  { mp1Desc, mp1Title, mp2Desc, mp2Title, mp3Desc, mp3Title, city },
  id,
  type
) {
  try {
    if (type == "edit") {
      await setDoc(doc(db, "mps", id), {
        mp1Desc,
        mp1Title,
        mp2Desc,
        mp2Title,
        mp3Desc,
        mp3Title,
        city,
      });
    } else {
      const idNew = uuid();
      await setDoc(doc(db, "mps", idNew), {
        mp1Desc,
        mp1Title,
        mp2Desc,
        mp2Title,
        mp3Desc,
        mp3Title,
        city,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlan(id) {
  try {
    const docRef = doc(db, "mps", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

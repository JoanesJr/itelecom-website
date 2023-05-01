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

export async function getbanner(city) {
  try {
    const bannerRef = collection(db, "banner");

    let arraybanner = [];

    const q = query(bannerRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      arraybanner.push(monta);
    });

    return arraybanner;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatebanner({ imageURL, name, city }, id, type) {
  try {
    if (type == "edit") {
      await setDoc(doc(db, "banner", id), {
        imageURL,
        name,
        city,
      });
    } else {
      const idNew = uuid();
      await setDoc(doc(db, "banner", idNew), {
        imageURL,
        name,
        city,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlan(id) {
  try {
    const docRef = doc(db, "banner", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

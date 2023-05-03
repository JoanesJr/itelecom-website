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

export async function deletePlans(id) {
  try {
    await deleteDoc(doc(db, "plans", id));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlans(city) {
  try {
    const plansRef = collection(db, "plans");

    let arrayplans = [];

    const q = query(plansRef, where("city", "==", city), orderBy("mb", "asc"));
    // const q = query(plansRef, where("city", "==", city), orderBy("mb", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      console.log(monta);

      arrayplans.push(monta);
    });

    return arrayplans;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatePlans(
  { mb, value, instalacaoGratis, image, wifi, roteador5g, destaque, city, tvGratis },
  id,
  type
) {
  try {
    if (type == "edit") {
      await setDoc(doc(db, "plans", id), {
        mb,
        value,
        instalacaoGratis,
        image,
        wifi,
        roteador5g,
        destaque,
        tvGratis,
        city,
      });
    } else {
      const idNew = uuid();
      await setDoc(doc(db, "plans", idNew), {
        mb,
        value,
        instalacaoGratis,
        image,
        wifi,
        roteador5g,
        destaque,
        tvGratis,
        city,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlan(id) {
  try {
    const docRef = doc(db, "plans", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

import { db } from "../index";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export async function deleteCity(id) {
  try {
    await deleteDoc(doc(db, "city", id));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getCities() {
  try {
    const cityRef = collection(db, "city");
    // const querySnapshot = await getDocs(collection(db, "city"));
    const q = query(cityRef, orderBy("name", "asc"));
    let arraycity = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      arraycity.push(monta);
    });

    // querySnapshot.forEach((doc) => {
    //   const monta = {
    //     id: doc.id,
    //     ...doc.data(),
    //   };
    //   arraycity.push(monta);
    // });

    return arraycity;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateCity({ name, state, id }) {
  try {
    await setDoc(doc(db, "city", id || name), {
      name,
      state,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

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

export async function getlocalizacao(city) {
  try {
    const localizacaoRef = collection(db, "localizacao");

    let arraylocalizacao = [];

    const q = query(localizacaoRef, where("city", "==", city));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const monta = {
        id: doc.id,
        ...doc.data(),
      };

      arraylocalizacao.push(monta);
    });

    return arraylocalizacao;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatelocalizacao({ address, localizacao, city }, id, type) {
  try {
    if (type == "edit") {
      await setDoc(doc(db, "localizacao", id), {
        address,
        localizacao,
        city,
      });
    } else {
      const idNew = uuid();
      await setDoc(doc(db, "localizacao", idNew), {
        address,
        localizacao,
        city,
      });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPlan(id) {
  try {
    const docRef = doc(db, "localizacao", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

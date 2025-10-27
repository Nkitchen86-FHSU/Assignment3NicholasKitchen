// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a item
export async function addItemToFirebase(item) {
  try {
    const docRef = await addDoc(collection(db, "inventory"), item);
    return { id: docRef.id, ...item };
  } catch (e) {
    console.error("Error adding item: ", e);
  }
}

export async function getItemsFromFirebase() {
  const items = [];
  try {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving items: ", e);
  }
  return items;
}

export async function deleteItemFromFirebase(id) {
  try {
    await deleteDoc(doc(db, "inventory", id));
  } catch (e) {
    console.error("Error deleting item: ", e);
  }
}

export async function updateItemInFirebase(id, updatedData) {
  console.log(updatedData, id);
  try {
    const itemRef = doc(db, "inventory", id);
    console.log(itemRef);
    await updateDoc(itemRef, updatedData);
  } catch (e) {
    console.error("Error updating item: ", e);
  }
}

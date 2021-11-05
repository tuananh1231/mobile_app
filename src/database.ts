import { openDB } from "idb";
import { UserRental } from "./Model";

const DBRental = "Rental";

init().then(() => {
  console.log("done!");
});
export async function updateDB(userRent: any) {
  const db = await openDB(DBRental, 1);
  const productDB = (await db.get("userRental", userRent.id!)) as UserRental;
  productDB.kindRom = userRent.kindRom;
  productDB.Bedrooms = userRent.Bedrooms;
  productDB.date = userRent.date;
  productDB.price = userRent.price;
  productDB.Furniture = userRent.Furniture;
  productDB.name = userRent.name;
  productDB.contact = userRent.contact;
  productDB.note = userRent.note;

  await db.put("userRental", userRent);
}
export async function getUserID(id: number) {
  const db = await openDB(DBRental, 1);
  return db.get("userRental", id);
}
export async function deleteElement(id: number) {
  const db = await openDB(DBRental, 1);
  return db.delete("userRental", id);
}
export async function getAllDB() {
  const db = await openDB(DBRental, 1);
  return await db.transaction("userRental").objectStore("userRental").getAll();
}
export async function insertDB(userRental: any) {
  const db = await openDB(DBRental, 1);
  return await db
    .transaction("userRental", "readwrite")
    .objectStore("userRental")
    .put(userRental);
}
async function init() {
  const db = await openDB(DBRental, 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore("userRental", {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
    },
  });
}

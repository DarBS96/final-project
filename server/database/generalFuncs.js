import db from "./connection.js";

export const pushUserInfoToDB = (table, property) => {
  return db.table(table).insert(property).returning("*");
};

export const pushAnyInfoToDB = (table, property, where) => {
  return db.table(table).insert(property).where(where).returning("*");
};

export const checkIfExist = (table, property) => {
  const isExist = db(table)
    .select("*")
    .where(property)
    .then((res) => !!res.length)
    .catch((err) => err.message);
  return isExist;
};

export const getProperty = (table, property, where) => {
  return db(table).select(property).where(where);
};

export const getAllProperties = (table) => {
  return db(table).select("*");
};

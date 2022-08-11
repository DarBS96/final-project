import db from "./connection.js";

export const pushUserInfoToDB = (table, property) => {
  return db.table(table).insert(property).returning("*");
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

export const getAllProperties = (table, property) => {
  return db(table).select(property);
};

export const updateProperty = (table, property, where) => {
  return db.table(table).update(property).where(where).returning("*");
};

export const getAverage = (table, column, property) => {
  return db.table(table).avg(column).where(property);
};

export const deleteProperty = (table, property, where) => {
  return db.table(table).del(property).where(where);
};

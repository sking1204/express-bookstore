/** Common config for bookstore. */


// let DB_URI = `postgresql://`;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = `${DB_URI}/books-test`;
// } else {
//   DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
// }


// module.exports = { DB_URI };

const DB_URI = (process.env.NODE_ENV === "test")
  ? "postgresql:///express_auth_test"
  : "postgresql:///express_auth";

// const SECRET_KEY = process.env.SECRET_KEY || "fHt$TRcC%25HmE8gC'vD$!Ka%8sOt;~V,XItr+8t+)8;x}O/rSQgGyG7}o^c1')"

// const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI  
};

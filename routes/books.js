const express = require("express");
const Book = require("../models/book");
// const jsonschema = require("jsonschema")
const bookSchema1 = require("../schemas/bookSchema1.json");
const bookSchema2 = require("../schemas/bookSchema2.json");
const {validate} = require("jsonschema")
const ExpressError = require("../expressError");


const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

// router.post("/", async function (req, res, next) {
//   try {
//     const validation =jsonschema.validate(req.body, bookSchema);
//     if(!validation.valid){
//       console.log(result);
//       const errorsList =result.errors.map(e => e.stack);
//       const err = new ExpressError(errorsList, 400);
//       return next(err)
//     }
//     const book = await Book.create(req.body);
//     return res.status(201).json({ book });
//   } catch (err) {
//     return next(err);
//   }
// });


router.post("/", async function(req, res, next) {
  try {
    const validation = validate(req.body, bookSchema2);
    if (!validation.valid) {
      return next({
        status: 400,
        error: validation.errors.map(e => e.stack)
      });
    }
    const book = await Book.create(req.body);
    return res.status(201).json({book});
  }

  catch (err) {
    return next(err);
  }
});


/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

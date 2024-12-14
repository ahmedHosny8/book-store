const author = require("../models/authorSchema");
const book = require("../models/bookSchema");
const bucket = require("../config/firebaseConfig");
const AppError = require("../utils/appError");

const createAuthor = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.files["file"] ? req.files["file"][0] : null;

    if (!name) {
      return res.status(400).json({ error: "Author name must be provided" });
    }

    let imageUrl = null;
    if (image) {
      const sanitizedImageFilename = image.originalname.replace(/\s+/g, "_");
      const firebaseImageFile = bucket.file(`authors/${sanitizedImageFilename}`);
      const imageStream = firebaseImageFile.createWriteStream({
        metadata: { contentType: image.mimetype },
      });

      imageStream.end(image.buffer);

      await new Promise((resolve, reject) => {
        imageStream.on("finish", async () => {
          const [url] = await firebaseImageFile.getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          });
          imageUrl = url;
          resolve();
        });
        imageStream.on("error", reject);
      });
    }

    const newAuthor = new author({
      name,
      image: imageUrl,
    });

    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    next(new AppError("Failed to create author: " + error, 500));
  }
};

const updateAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const authorData = await author.findById(id);

    if (!authorData) {
      return res.status(404).json({ error: "Author not found" });
    }

    
    if (req.files && req.files['file']) {
      const imageFile = req.files['file'][0];

      if (imageFile) {
        
        if (authorData.image) {
          const previousImageFileName = authorData.image
            .split("/")
            .pop()
            .split("?")[0];
          const previousImageFile = bucket.file(`authors/${previousImageFileName.trim()}`);
          await previousImageFile.delete();
        }

        
        const sanitizedImageFilename = imageFile.originalname.replace(/\s+/g, "_");
        const firebaseImageFile = bucket.file(`authors/${sanitizedImageFilename}`);
        const imageStream = firebaseImageFile.createWriteStream({
          metadata: { contentType: imageFile.mimetype },
        });

        imageStream.end(imageFile.buffer);

        
        await new Promise((resolve, reject) => {
          imageStream.on("finish", resolve);
          imageStream.on("error", reject);
        });

        
        const [imageUrl] = await firebaseImageFile.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });

        
        req.body.image = imageUrl;
      }
    }

    
    const updatedAuthor = await author.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedAuthor);
  } catch (error) {
    next(new AppError("Failed to update author" + error, 500));
  }
};


const deleteAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const authorData = await author.findById(id);

    if (!authorData) {
      return res.status(404).json({ error: "Author not found" });
    }

    
    const books = await book.find({ author: authorData.name }); 
    for (const b of books) {
      const previousBookFileName = b.sourcePath
        .split("/")
        .pop()
        .split("?")[0]
        .trim();
      const previousBookFile = bucket.file(`books/${previousBookFileName}`);
      await previousBookFile.delete();

      const previousCoverFileName = b.coverImage
        .split("/")
        .pop()
        .split("?")[0]
        .trim();
      const previousCoverFile = bucket.file(`covers/${previousCoverFileName}`);
      await previousCoverFile.delete();

      const previousSampleFileName = b.samplePdf
        .split("/")
        .pop()
        .split("?")[0]
        .trim();
      const previousSampleFile = bucket.file(
        `samples/${previousSampleFileName}`
      );
      await previousSampleFile.delete();

      await book.findByIdAndDelete(b._id); 
    }

    
    authorData.books = [];
    await authorData.save();

    
    await author.findByIdAndDelete(id); 
    res.json({ message: "Author and their books deleted successfully" });
  } catch (error) {
    next(new AppError("Failed to delete author and books: " + error, 500));
  }
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    
    const authorData = await author.findById(id)
      .populate({
        path: "books.bookId",  
        model: "Book",         
      });


    res.json(authorData);
  } catch (error) {
    next(new AppError("Failed to get author: " + error, 500));
  }
};

const getAllAuthors = async (req, res, next) => {
  try {
    const getAllAuthors = await author.find();
    res.json(getAllAuthors);
  } catch (error) {
    next(new AppError("Failed to get authors" + error, 500));
  }
};
module.exports = {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
  getAllAuthors,
};

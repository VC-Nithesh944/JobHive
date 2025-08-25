import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({ storage });
{
  /*Here we are storing the storage object is the storage key */
}

export default upload;

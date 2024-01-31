import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)  //multiple files with same name can be posted, but the operation is for tiny amount of time at our server
    }
  })
  
export const upload = multer({ 
    storage,
})
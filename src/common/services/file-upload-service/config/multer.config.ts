import { memoryStorage } from 'multer';

export const multerConfig = {
  storage: memoryStorage(),

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

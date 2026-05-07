import { memoryStorage } from 'multer';

export const multerImageConfig = {
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

export const multerVideoConfig = {
  storage: memoryStorage(),

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(mp4|avi|mov|wmv)$/)) {
      return cb(new Error('Only video files are allowed'), false);
    }
    cb(null, true);
  },

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
};

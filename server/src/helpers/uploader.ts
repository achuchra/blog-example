import multer, { Multer, StorageEngine } from 'multer';
import path from 'path';

export class Uploader {
  multer: Multer;
  storage: StorageEngine;

  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../uploads/'));
      },
      filename: (req, file, cb) => {
        const filename = `${file.fieldname}_${Date.now()}.${
          file.originalname.split('.')[file.originalname.split('.').length - 1]
        }`;

        cb(null, filename);
      },
    });

    this.multer = multer({
      storage: this.storage,
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') {
          return cb(new Error('Extension not suported'));
        }

        cb(null, true);
      },
    });
  }

  storeSingle(fieldname: string) {
    return this.multer.single(fieldname);
  }

  storeMultiple(fieldname: string, maxCount: number) {
    return this.multer.array(fieldname, maxCount);
  }
}

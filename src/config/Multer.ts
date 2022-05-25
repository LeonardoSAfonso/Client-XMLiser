import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import AppError from '../shared/errors/AppError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface FileFilterCallback {
  (error: AppError): void;
  (error: null, acceptFile: boolean): void;
}

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder),

  storage: multer.diskStorage({
    destination: tmpFolder,
  }),
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter(
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ): void {
    const allowedMimes = ['.xml'];

    const fileType = file.originalname.substring(
      file.originalname.indexOf('.'),
    );

    if (allowedMimes.includes(fileType)) {
      callback(null, true);
    } else {
      callback(new AppError('ERRO: Tipo de arquivo inválido.', 415));
    }
  },
};

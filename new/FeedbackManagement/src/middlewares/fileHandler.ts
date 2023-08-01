import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer'
import { generateUniqueFileName } from '../utils';


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, './uploads');
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        const uniqueFileName = generateUniqueFileName(file.originalname);
        callback(null, uniqueFileName);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(null, false);
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return cb(null, false);
    }

    cb(null, true);
};


// Create multer upload instance
export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {

    upload.array('files', 5)(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const files: Express.Multer.File[] = req.files as Express.Multer.File[];
        const errors: string[] = [];

        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });

        if (errors.length > 0) {

            files.forEach((file) => {
                fs.unlinkSync(file.path);
            });

            return res.status(400).json({ errors });
        }

        req.files = files;

        next();
    });
};

export default uploadMiddleware;

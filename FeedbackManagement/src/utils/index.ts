import jwt from 'jsonwebtoken';
import { auth_constant, feedbackFormUrl } from '../constants/constants';
import { LinkBodyDto } from '../types/feedback';
import path from 'path';
import crypto from 'crypto'


export function areContiguousIntegersStartingFromOne(numbers: number[]): boolean {
    if (numbers.length === 0) {
        return false;
    }

    const sortedNumbers = numbers.slice().sort((a, b) => a - b);

    if (sortedNumbers[0] !== 1) {
        return false;
    }

    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] - sortedNumbers[i - 1] !== 1) {
            return false;
        }
    }

    return true;
}

export function generateUrlWithToken(templateId: string, linkBodyDto: LinkBodyDto) {
    const payload = {
        templateId: templateId,
        linkBodyDto
    };

    const secretKey = auth_constant.secret;

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    const baseUrl = feedbackFormUrl;
    const urlWithToken = `${baseUrl}/${token}`;

    return urlWithToken;
}


export function generateUniqueFileName(originalFileName: string) {
    const fileExtension = path.extname(originalFileName);
    
    const randomString = crypto.randomBytes(3).toString('hex');
    const timestamp = new Date().getTime();
    
    const uniqueName = `${path.basename(originalFileName, fileExtension)}_${randomString}_${timestamp}${fileExtension}`;
    
    return uniqueName;
  }
import { decodeBase64 } from "./decodeBase64";
import { convert } from 'html-to-text';
import { htmlToCleanText } from "./htmlToCleanText";

export const getEmailBody = (payload: any): string => {
    let html = '';
    let text = '';

    const extract = (part: any) => {
        if (part.mimeType === 'text/html' && part.body?.data) {
            html = decodeBase64(part.body.data);
        }

        if (part.mimeType === 'text/plain' && part.body?.data) {
            text = decodeBase64(part.body.data);
        }

        if (part.parts) {
            part.parts.forEach(extract);
        }
    };

    extract(payload);


    if (html) {
        return htmlToCleanText(html);
    }


    return text
        .replace(/https?:\/\/\S+/gi, '')
        .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n\s*\n\s*\n+/g, '\n\n')
        .trim();
};
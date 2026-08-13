import { getEmailBody } from "./getEmailBody";
import { getHeader } from "./getHeader";

export const parseEmail = (email: any) => {
    const headers = email.payload?.headers ?? [];

    return {
        id: email.id,
        threadId: email.threadId,
        from: getHeader(headers, 'From'),
        to: getHeader(headers, 'To'),
        subject: getHeader(headers, 'Subject'),
        date: getHeader(headers, 'Date'),
        snippet: email.snippet,
        body: getEmailBody(email.payload),
    };
};
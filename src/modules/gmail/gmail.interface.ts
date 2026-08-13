export interface GmailTokens {
    access_token?: string | null;
    refresh_token?: string | null;
}

export interface ParsedEmail {
    id: string;
    threadId: string;
    from: string;
    to: string;
    subject: string;
    date: string;
    snippet: string;
    body: string;
}
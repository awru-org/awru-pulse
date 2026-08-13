import { convert } from 'html-to-text';

export const htmlToCleanText = (html: string): string => {
    return convert(html, {
        wordwrap: false,

        selectors: [
            {
                selector: 'img',
                format: 'skip',
            },
            {
                selector: 'a',
                options: {
                    ignoreHref: true,
                },
            },
            {
                selector: 'style',
                format: 'skip',
            },
            {
                selector: 'script',
                format: 'skip',
            },
        ],
    })
        // Remove URLs that may still exist in the text
        .replace(/https?:\/\/\S+/gi, '')

        // Remove invisible Unicode characters
        .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')

        // Remove excessive spaces
        .replace(/[ \t]+/g, ' ')

        // Clean excessive newlines
        .replace(/\n\s*\n\s*\n+/g, '\n\n')

        .trim();
};
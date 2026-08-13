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

        .replace(/https?:\/\/\S+/gi, '')

        .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')

        .replace(/[ \t]+/g, ' ')

        .replace(/\n\s*\n\s*\n+/g, '\n\n')

        .trim();
};
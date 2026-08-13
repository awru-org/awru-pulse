export const getHeader = (
    headers: { name?: string | null; value?: string | null }[],
    name: string
) => {
    return headers.find(
        (header) =>
            header.name?.toLowerCase() === name.toLowerCase()
    )?.value ?? '';
};
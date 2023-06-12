export const generateSlug = (text: string) =>
    text
        .substring(0, 200) // Limit to 200 chars
        .normalize("NFD") // Normalize Unicode characters to separate diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .toLowerCase() // Convert to lowercase
        .replace(/[^\p{L}\p{N}\s-]/gu, "") // Remove non-letter, non-number, non-space, non-dash characters
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .trim(); // Remove leading/trailing spaces

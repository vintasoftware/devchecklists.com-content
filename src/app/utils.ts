export const generateSlug = (text: string) =>
    text
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .substring(0, 200) // Limit to 200 chars
        .trim(); // Remove leading/trailing spaces

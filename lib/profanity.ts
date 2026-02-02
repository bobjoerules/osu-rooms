export async function checkProfanity(text: string): Promise<boolean> {
    if (!text || text.trim().length === 0) return false;

    try {
        const response = await fetch(
            `https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(text)}`
        );

        if (!response.ok) {
            console.warn("Profanity API failed, falling back to permissive mode.");
            return false;
        }

        const result = await response.text();
        return result === "true";
    } catch (error) {
        console.error("Error calling profanity API:", error);
        return false;
    }
}

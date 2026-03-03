import Constants from 'expo-constants';

const DISCORD_WEBHOOK_URL = Constants.expoConfig?.extra?.discordWebhookUrl || '';

export async function sendDiscordNotification(data: {
    title: string;
    description?: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    color?: number;
    url?: string;
    thumbnailUrl?: string;
    imageUrls?: string[];
}) {
    if (!DISCORD_WEBHOOK_URL) {
        console.warn('Discord webhook URL is not configured.');
        return;
    }

    try {
        const embeds = [
            {
                title: data.title,
                description: data.description,
                color: data.color || 0x2b2d31,
                url: data.url,
                thumbnail: data.thumbnailUrl ? { url: data.thumbnailUrl } : undefined,
                fields: data.fields,
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'OSU Rooms',
                },
                image: data.imageUrls && data.imageUrls.length > 0 ? { url: data.imageUrls[0] } : undefined,
            },
        ];

        if (data.imageUrls && data.imageUrls.length > 1) {
            for (let i = 1; i < Math.min(data.imageUrls.length, 4); i++) {
                embeds.push({
                    url: data.url || '',
                    image: { url: data.imageUrls[i] },
                    title: undefined as any,
                    description: undefined as any,
                    color: undefined as any,
                    fields: undefined as any,
                    timestamp: undefined as any,
                    footer: undefined as any,
                    thumbnail: undefined as any,
                });
            }
        }

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: embeds,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Discord webhook failed:', error);
        }
    } catch (err) {
        console.error('Error sending Discord notification:', err);
    }
}

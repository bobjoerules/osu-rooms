export default ({ config }) => {
    return {
        ...config,
        extra: {
            ...config.extra,
            discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
        },
    };
};

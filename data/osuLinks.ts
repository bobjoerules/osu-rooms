export interface OsuLink {
    title: string;
    url: string;
    androidUrl?: string;
    websiteUrl?: string;
    icon?: string;
    appScheme?: string;
    category: 'Apps' | 'Websites';
}

export const OSU_LINKS: OsuLink[] = [
    {
        title: 'Canvas',
        url: 'https://apps.apple.com/us/app/canvas-by-instructure/id480883488',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.instructure.candroid',
        websiteUrl: 'https://canvas.oregonstate.edu',
        icon: 'school',
        appScheme: 'canvas-courses://',
        category: 'Apps',
    },
    {
        title: 'OSU Events',
        url: 'https://apps.apple.com/us/app/oregon-state-events/id1641761931',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.osuhonorsapp',
        websiteUrl: 'https://events.oregonstate.edu',
        icon: 'megaphone',
        appScheme: 'https://osu-honors-backend.web.app/viewevent',
        category: 'Apps',
    },
    {
        title: 'Outlook',
        url: 'https://apps.apple.com/us/app/microsoft-outlook/id951937596',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.microsoft.office.outlook',
        websiteUrl: 'https://outlook.office.com/mail/',
        icon: 'mail',
        appScheme: 'ms-outlook://',
        category: 'Apps',
    },
    {
        title: 'Zoom',
        url: 'https://apps.apple.com/us/app/zoom-one-platform-to-connect/id546505307',
        androidUrl: 'https://play.google.com/store/apps/details?id=us.zoom.videomeetings',
        websiteUrl: 'https://oregonstate.zoom.us',
        icon: 'videocam',
        appScheme: 'zoomus://',
        category: 'Apps',
    },
    {
        title: 'Duo Mobile',
        url: 'https://apps.apple.com/us/app/duo-mobile/id422663827',
        androidUrl: 'https://play.google.com/store/apps/details?id=com.duosecurity.duomobile',
        websiteUrl: 'https://duo.oregonstate.edu',
        icon: 'shield-checkmark',
        category: 'Apps',
    },
    {
        title: 'BeaverHub',
        url: 'https://beaverhub.oregonstate.edu',
        icon: 'grid',
        category: 'Websites',
    },
    {
        title: 'Campus Map',
        url: 'https://map.oregonstate.edu',
        icon: 'map',
        category: 'Websites',
    },
    {
        title: 'Food',
        url: 'https://food.oregonstate.edu',
        icon: 'restaurant',
        category: 'Websites',
    },
    {
        title: 'Class Schedule',
        url: 'https://prodapps.isadm.oregonstate.edu/StudentRegistrationSsb/ssb/registrationHistory/registrationHistory',
        icon: 'calendar',
        category: 'Websites',
    },
    {
        title: 'OSU VPN',
        url: 'https://technology.oregonstate.edu/services/vpn',
        icon: 'lock-closed',
        category: 'Websites',
    },
    {
        title: 'OSU Link Shortener',
        url: 'https://beav.es/',
        icon: 'link',
        category: 'Websites',
    },
];
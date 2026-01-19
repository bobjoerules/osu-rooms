const STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/osu-room-rates.firebasestorage.app/o';

const firebaseImage = (path: string): string => {
    const encodedPath = encodeURIComponent(path);
    return `${STORAGE_URL}/${encodedPath}?alt=media`;
};

export interface Room {
    id: string;
    images: any[];
    floor: string;
    capacity: string;
    roomType: string;
    searchAliases?: string[];
}

export interface Building {
    id: string;
    name: string;
    images?: any[];
    rooms: Room[];
}

export const BUILDINGS_DATA: Building[] = [
    {
        id: 'owen',
        name: 'Owen Hall',
        images: [firebaseImage('building-images/owenhall.jpg')],
        rooms: [
            {
                id: 'owen-hall-101',
                images: [
                    firebaseImage('room-images/owen-hall-101.jpeg'),
                ],
                floor: '1',
                capacity: '84',
                roomType: 'Classroom',
                searchAliases: ['Owen 101'],
            },
            {
                id: 'owen-hall-102',
                images: [
                    firebaseImage('room-images/owen-hall-102.jpeg'),
                ],
                floor: '1',
                capacity: '94',
                roomType: 'Lecture Hall',
                searchAliases: ['Owen 102'],
            },
            {
                id: 'owen-hall-106',
                images: [
                    firebaseImage('room-images/owen-hall-106.jpeg'),
                ],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['Owen 106'],
            },
            {
                id: 'owen-hall-109',
                images: [
                    firebaseImage('room-images/owen-hall-109.jpeg')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Lab Classroom',
                searchAliases: ['Owen 109'],
            },
            {
                id: 'owen-hall-110',
                images: [
                    firebaseImage('room-images/owen-hall-110.jpeg')
                ],
                floor: '1',
                capacity: '41',
                roomType: 'Classroom',
                searchAliases: ['Owen 110', 'Survey Lab'],
            },
            {
                id: 'owen-hall-217',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '13',
                roomType: 'Lab Room',
                searchAliases: ['Owen 217', 'Photogrammetry Lab'],
            },
            {
                id: 'owen-hall-224',
                images: [
                    firebaseImage('room-images/owen-hall-224.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Meeting Room',
                searchAliases: ['Owen 224'],
            },
            {
                id: 'owen-hall-237',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '41',
                roomType: 'Unknown',
                searchAliases: ['Owen 237'],
            },
            {
                id: 'owen-hall-241',
                images: [
                    firebaseImage('room-images/owen-hall-241.jpeg')
                ],
                floor: '2',
                capacity: '63',
                roomType: 'Computer Room',
                searchAliases: ['Owen 241'],
            },
            {
                id: 'owen-hall-424',
                images: [
                    firebaseImage('room-images/owen-hall-424.jpeg')
                ],
                floor: '4',
                capacity: '12',
                roomType: 'Meeting Room',
                searchAliases: ['Owen 424'],
            },
            {
                id: 'owen-hall-433',
                images: [
                    firebaseImage('room-images/owen-hall-433.jpeg')
                ],
                floor: '4',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['Owen 433'],
            },
        ]
    },
    {
        id: 'linc',
        name: 'Learning Innovation Center (LINC)',
        images: [firebaseImage('building-images/linc.jpeg')],
        rooms: [
            {
                id: 'linc-100',
                images: [
                    firebaseImage('room-images/linc-100.jpeg')
                ],
                floor: '1',
                capacity: '588',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 100'],
            },
            {
                id: 'linc-128',
                images: [
                    firebaseImage('room-images/linc-128.jpeg')
                ],
                floor: '1',
                capacity: '395',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 128'],
            },
            {
                id: 'linc-200',
                images: [
                    firebaseImage('room-images/linc-200.jpeg')
                ],
                floor: '2',
                capacity: '174',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 200'],
            },
            {
                id: 'linc-210',
                images: [
                    firebaseImage('room-images/linc-210.jpeg')
                ],
                floor: '2',
                capacity: '225',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 210'],
            },
            {
                id: 'linc-228',
                images: [
                    firebaseImage('room-images/linc-228.jpeg')
                ],
                floor: '2',
                capacity: '277',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 228'],
            },
            {
                id: 'linc-268',
                images: [
                    firebaseImage('room-images/linc-268.jpeg')
                ],
                floor: '2',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['LINC 268'],
            },
            {
                id: 'linc-302',
                images: [
                    firebaseImage('room-images/linc-302.jpeg')
                ],
                floor: '3',
                capacity: '96',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 302'],
            },
            {
                id: 'linc-303',
                images: [
                    firebaseImage('room-images/linc-303.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Collaborative Pods',
                searchAliases: ['LINC 303'],
            },
            {
                id: 'linc-307',
                images: [
                    firebaseImage('room-images/linc-307.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Collaborative Pods',
                searchAliases: ['LINC 307'],
            },
            {
                id: 'linc-314',
                images: [
                    firebaseImage('room-images/linc-314.jpeg')
                ],
                floor: '3',
                capacity: '60',
                roomType: 'U-Shaped Lecture Hall',
                searchAliases: ['LINC 314'],
            },
            {
                id: 'linc-343',
                images: [
                    firebaseImage('room-images/linc-343.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LINC 343'],
            },
            {
                id: 'linc-345',
                images: [
                    firebaseImage('room-images/linc-345.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LINC 345'],
            },
            {
                id: 'linc-350',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['LINC 350'],
            },
            {
                id: 'linc-360',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['LINC 360'],
            },
            {
                id: 'linc-368',
                images: [
                    firebaseImage('room-images/linc-368.jpeg')
                ],
                floor: '3',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['LINC 368'],
            },
        ]
    },
    {
        id: 'wgnd',
        name: 'Wiegand Hall',
        images: [firebaseImage('building-images/wgnd.jpeg')],
        rooms: [
            {
                id: 'wgnd-106',
                images: [
                    firebaseImage('room-images/wgnd-106.jpeg')
                ],
                floor: '1',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['WGND 106'],
            },
            {
                id: 'wgnd-115',
                images: [
                    firebaseImage('room-images/wgnd-115.jpeg')
                ],
                floor: '1',
                capacity: '217',
                roomType: 'Lecture Hall',
                searchAliases: ['WGND 115'],
            },
            {
                id: 'wgnd-118',
                images: [
                    firebaseImage('room-images/wgnd-118.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Lab Classroom',
                searchAliases: ['WGND 118'],
            },
            {
                id: 'wgnd-120',
                images: [
                    firebaseImage('room-images/wgnd-120.jpeg')
                ],
                floor: '1',
                capacity: '10',
                roomType: 'Food Lab',
                searchAliases: ['WGND 120'],
            },
            {
                id: 'wgnd-126',
                images: [
                    firebaseImage('room-images/wgnd-126.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Lab Room',
                searchAliases: ['WGND 126'],
            },
            {
                id: 'wgnd-130',
                images: [
                    firebaseImage('room-images/wgnd-130.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WGND 130'],
            },
            {
                id: 'wgnd-132',
                images: [
                    firebaseImage('room-images/wgnd-132.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['WGND 132'],
            },
            {
                id: 'wgnd-206',
                images: [
                    firebaseImage('room-images/wgnd-206.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['WGND 206'],
            },
            {
                id: 'wgnd-238',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['WGND 238'],
            },
        ]
    },
    {
        id: 'phar',
        name: 'Pharmacy Building',
        images: [firebaseImage('building-images/phar.jpeg')],
        rooms: [
            {
                id: 'phar-107',
                images: [
                    firebaseImage('room-images/phar-107.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['PHAR 107'],
            },
            {
                id: 'phar-213',
                images: [
                    firebaseImage('room-images/phar-213.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Meeting Room',
                searchAliases: ['PHAR 213'],
            },
            {
                id: 'phar-219',
                images: [
                    firebaseImage('room-images/phar-219.jpeg')
                ],
                floor: '2',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['PHAR 219'],
            },
            {
                id: 'phar-227',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Lab Room',
                searchAliases: ['PHAR 227'],
            },
            {
                id: 'phar-237',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['PHAR 237'],
            },
            {
                id: 'phar-305',
                images: [
                    firebaseImage('room-images/phar-305.jpeg')
                ],
                floor: '3',
                capacity: '149',
                roomType: 'Lecture Hall',
                searchAliases: ['PHAR 305'],
            },
            {
                id: 'phar-329',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['PHAR 329'],
            },
        ]
    },
    {
        id: 'cord',
        name: 'Cordley Hall',
        images: [firebaseImage('building-images/cord.jpeg')],
        rooms: [
            {
                id: 'cord-1100',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Unknown',
                searchAliases: ['CORD 1100'],
            },
            {
                id: 'cord-1112',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1112'],
            },
            {
                id: 'cord-1200',
                images: [
                    firebaseImage('room-images/cord-1200.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1200'],
            },
            {
                id: 'cord-1210',
                images: [
                    firebaseImage('room-images/cord-1210.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1210'],
            },
            {
                id: 'cord-1302',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1302'],
            },
            {
                id: 'cord-1316',
                images: [
                    firebaseImage('room-images/cord-1316.jpeg')
                ],
                floor: '1',
                capacity: '211',
                roomType: 'Lecture Hall',
                searchAliases: ['CORD 1316'],
            },
            {
                id: 'cord-1424',
                images: [
                    firebaseImage('room-images/cord-1424.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Classroom',
                searchAliases: ['CORD 1424'],
            },
            {
                id: 'cord-1506',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1506'],
            },
            {
                id: 'cord-1518',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1518'],
            },
            {
                id: 'cord-1604',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '37',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1604'],
            },
            {
                id: 'cord-1616',
                images: [
                    firebaseImage('room-images/cord-1616.jpeg')
                ],
                floor: '1',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['CORD 1616'],
            },
            {
                id: 'cord-2200',
                images: [
                    firebaseImage('room-images/cord-2200.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Classroom',
                searchAliases: ['CORD 2200'],
            },
            {
                id: 'cord-2212',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2212'],
            },
            {
                id: 'cord-2306',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2306'],
            },
            {
                id: 'cord-2316',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2316'],
            },
            {
                id: 'cord-2406',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2406'],
            },
            {
                id: 'cord-2414',
                images: [
                    firebaseImage('room-images/cord-2414.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Conference Room',
                searchAliases: ['CORD 2414'],
            },
            {
                id: 'cord-2602',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['CORD 2602'],
            },
            {
                id: 'cord-4629',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '8',
                roomType: 'Conference/Office Room',
                searchAliases: ['CORD 4629'],
            },
        ]

    },
    {
        id: 'mlm',
        name: 'Milam Hall',
        images: [firebaseImage('building-images/mlm.jpeg')],
        rooms: [
            {
                id: 'mlm-006',
                images: [
                    firebaseImage('room-images/mlm-006.jpeg')
                ],
                floor: '0',
                capacity: '16',
                roomType: 'Lab Room',
                searchAliases: ['MLM 006'],
            },
            {
                id: 'mlm-019',
                images: [
                    firebaseImage('room-images/mlm-019.jpeg')
                ],
                floor: '0',
                capacity: '69',
                roomType: 'Classroom',
                searchAliases: ['MLM 019'],
            },
            {
                id: 'mlm-026',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: 'Unknown',
                roomType: 'Lecture Hall',
                searchAliases: ['MLM 026'],
            },
            {
                id: 'mlm-031A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '14',
                roomType: 'Lab Room',
                searchAliases: ['MLM 031A'],
            },
            {
                id: 'mlm-033',
                images: [
                    firebaseImage('room-images/mlm-033.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 033'],
            },
            {
                id: 'mlm-119',
                images: [
                    firebaseImage('room-images/mlm-119.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Conference Room',
                searchAliases: ['MLM 119'],
            },
            {
                id: 'mlm-123',
                images: [
                    firebaseImage('room-images/mlm-123.jpeg')
                ],
                floor: '1',
                capacity: '62',
                roomType: 'Classroom',
                searchAliases: ['MLM 123'],
            },
            {
                id: 'mlm-159',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['MLM 159'],
            },
            {
                id: 'mlm-202',
                images: [
                    firebaseImage('room-images/mlm-202.jpeg')
                ],
                floor: '2',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['MLM 202'],
            },
            {
                id: 'mlm-203',
                images: [
                    firebaseImage('room-images/mlm-203.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['MLM 203'],
            },
            {
                id: 'mlm-205',
                images: [
                    firebaseImage('room-images/mlm-205.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Lab Room',
                searchAliases: ['MLM 205'],
            },
            {
                id: 'mlm-206',
                images: [
                    firebaseImage('room-images/mlm-206.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['MLM 206'],
            },
            {
                id: 'mlm-213',
                images: [
                    firebaseImage('room-images/mlm-213.jpeg')
                ],
                floor: '2',
                capacity: '61',
                roomType: 'Classroom',
                searchAliases: ['MLM 213'],
            },
            {
                id: 'mlm-215',
                images: [
                    firebaseImage('room-images/mlm-215.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 215'],
            },
            {
                id: 'mlm-218',
                images: [
                    firebaseImage('room-images/mlm-218.jpeg')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['MLM 218'],
            },
            {
                id: 'mlm-233',
                images: [
                    firebaseImage('room-images/mlm-233.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Lab Room',
                searchAliases: ['MLM 233'],
            },
            {
                id: 'mlm-234',
                images: [
                    firebaseImage('room-images/mlm-234.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 234'],
            },
            {
                id: 'mlm-236',
                images: [
                    firebaseImage('room-images/mlm-236.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 236'],
            },
            {
                id: 'mlm-301',
                images: [
                    firebaseImage('room-images/mlm-301.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Meeting Room',
                searchAliases: ['MLM 301'],
            },
            {
                id: 'mlm-318',
                images: [
                    firebaseImage('room-images/mlm-318.jpeg')
                ],
                floor: '3',
                capacity: '64',
                roomType: 'Classroom',
                searchAliases: ['MLM 318'],
            },
            {
                id: 'mlm-319',
                images: [
                    firebaseImage('room-images/mlm-319.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 319'],
            },
            {
                id: 'mlm-319A',
                images: [
                    firebaseImage('room-images/mlm-319a.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['MLM 319A'],
            },
            {
                id: 'mlm-332',
                images: [
                    firebaseImage('room-images/mlm-332.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 332'],
            },
            {
                id: 'mlm-335',
                images: [
                    firebaseImage('room-images/mlm-335.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 335'],
            },
            {
                id: 'mlm-336',
                images: [
                    firebaseImage('room-images/mlm-336.jpeg')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['MLM 336'],
            },
            {
                id: 'mlm-337',
                images: [
                    firebaseImage('room-images/mlm-337.jpeg')
                ],
                floor: '3',
                capacity: '43',
                roomType: 'Classroom',
                searchAliases: ['MLM 337'],
            },
        ]
    },
    {
        id: 'casc',
        name: 'Cascade Hall',
        images: [firebaseImage('building-images/casc.jpeg')],
        rooms: [
            {
                id: 'casc-118',
                images: [
                    firebaseImage('room-images/casc-118.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['CASC 118'],
            },
            {
                id: 'casc-120',
                images: [
                    firebaseImage('room-images/casc-120.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['CASC 120'],
            },
            {
                id: 'casc-134',
                images: [
                    firebaseImage('room-images/casc-134.jpeg')
                ],
                floor: '1',
                capacity: '31',
                roomType: 'Classroom',
                searchAliases: ['CASC 134'],
            },
            {
                id: 'casc-135',
                images: [
                    firebaseImage('room-images/casc-135.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['CASC 135'],
            },
            {
                id: 'casc-137',
                images: [
                    firebaseImage('room-images/casc-137.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['CASC 137'],
            },
            {
                id: 'casc-139',
                images: [
                    firebaseImage('room-images/casc-139.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['CASC 139'],
            },
            {
                id: 'casc-141',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '31',
                roomType: 'Classroom',
                searchAliases: ['CASC 141'],
            },
            {
                id: 'casc-143',
                images: [
                    firebaseImage('room-images/casc-143.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['CASC 143'],
            },
        ]
    },
    {
        id: 'stag',
        name: 'Strand Agriculture Hall',
        images: [firebaseImage('building-images/stag.jpeg')],
        rooms: [
            {
                id: 'stag-110',
                images: [
                    firebaseImage('room-images/stag-110.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 110'],
            },
            {
                id: 'stag-111',
                images: [
                    firebaseImage('room-images/stag-111.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 111'],
            },
            {
                id: 'stag-112',
                images: [
                    firebaseImage('room-images/stag-112.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['STAG 112'],
            },
            {
                id: 'stag-113',
                images: [
                    firebaseImage('room-images/stag-113.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 113'],
            },
            {
                id: 'stag-118',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '13',
                roomType: 'Unknown',
                searchAliases: ['STAG 118'],
            },
            {
                id: 'stag-131',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['STAG 131'],
            },
            {
                id: 'stag-160',
                images: [
                    firebaseImage('room-images/stag-160.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 160'],
            },
            {
                id: 'stag-161',
                images: [
                    firebaseImage('room-images/stag-161.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 161'],
            },
            {
                id: 'stag-162',
                images: [
                    firebaseImage('room-images/stag-162.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 162'],
            },
            {
                id: 'stag-163',
                images: [
                    firebaseImage('room-images/stag-163.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 163'],
            },
            {
                id: 'stag-210',
                images: [
                    firebaseImage('room-images/stag-210.jpeg')
                ],
                floor: '2',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 210'],
            },
            {
                id: 'stag-211',
                images: [
                    firebaseImage('room-images/stag-211.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 211'],
            },
            {
                id: 'stag-212',
                images: [
                    firebaseImage('room-images/stag-212.jpeg')
                ],
                floor: '2',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 212'],
            },
            {
                id: 'stag-213',
                images: [
                    firebaseImage('room-images/stag-213.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 213'],
            },
            {
                id: 'stag-240',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['STAG 240'],
            },
            {
                id: 'stag-260',
                images: [
                    firebaseImage('room-images/stag-260.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['STAG 260'],
            },
            {
                id: 'stag-261',
                images: [
                    firebaseImage('room-images/stag-261.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 261'],
            },
            {
                id: 'stag-262',
                images: [
                    firebaseImage('room-images/stag-262.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['STAG 262'],
            },
            {
                id: 'stag-263',
                images: [
                    firebaseImage('room-images/stag-263.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 263'],
            },
            {
                id: 'stag-311',
                images: [
                    firebaseImage('room-images/stag-311.jpeg')
                ],
                floor: '3',
                capacity: '39',
                roomType: 'Classroom',
                searchAliases: ['STAG 311'],
            },
            {
                id: 'stag-313',
                images: [
                    firebaseImage('room-images/stag-313.jpeg')
                ],
                floor: '3',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['STAG 313'],
            },
            {
                id: 'stag-340',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['STAG 340'],
            },
            {
                id: 'stag-361',
                images: [
                    firebaseImage('room-images/stag-361.jpeg')
                ],
                floor: '3',
                capacity: '31',
                roomType: 'Computer Lab/Classroom',
                searchAliases: ['STAG 361'],
            },
            {
                id: 'stag-363',
                images: [
                    firebaseImage('room-images/stag-363.jpeg')
                ],
                floor: '3',
                capacity: '29',
                roomType: 'Computer Lab/Classroom',
                searchAliases: ['STAG 363'],
            },
        ]
    },
    {
        id: 'als',
        name: 'Agricultural & Life Sciences',
        images: [firebaseImage('building-images/als.jpeg')],
        rooms: [
            {
                id: 'als-0006',
                images: [
                    firebaseImage('room-images/als-0006.jpeg')
                ],
                floor: '0',
                capacity: '43',
                roomType: 'Classroom',
                searchAliases: ['ALS 0006'],
            },
            {
                id: 'als-0007',
                images: [
                    firebaseImage('room-images/als-0007.jpeg')
                ],
                floor: '0',
                capacity: '31',
                roomType: 'Lab Room',
                searchAliases: ['ALS 0007'],
            },
            {
                id: 'als-0012',
                images: [
                    firebaseImage('room-images/als-0012.jpeg')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Classroom',
                searchAliases: ['ALS 0012'],
            },
            {
                id: 'als-0018',
                images: [
                    firebaseImage('room-images/als-0018.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['ALS 0018'],
            },
            {
                id: 'als-0023',
                images: [
                    firebaseImage('room-images/als-0023.jpeg')
                ],
                floor: '0',
                capacity: '63',
                roomType: 'Lab Room',
                searchAliases: ['ALS 0023'],
            },
            {
                id: 'als-1019A',
                images: [
                    firebaseImage('room-images/als-1019A.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019A'],
            },
            {
                id: 'als-1019B',
                images: [
                    firebaseImage('room-images/als-1019B.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019B'],
            },
            {
                id: 'als-1019C',
                images: [
                    firebaseImage('room-images/als-1019C.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019C'],
            },
            {
                id: 'als-2009A',
                images: [
                    firebaseImage('room-images/als-2009A.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2009A'],
            },
            {
                id: 'als-2018',
                images: [
                    firebaseImage('room-images/als-2018.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['ALS 2018'],
            },
            {
                id: 'als-2034',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2034'],
            },
            {
                id: 'als-2040',
                images: [
                    firebaseImage('room-images/als-2040.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2040'],
            },
            {
                id: 'als-2114',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Unknown',
                searchAliases: ['ALS 2114'],
            },
            {
                id: 'als-2116',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Unknown',
                searchAliases: ['ALS 2116'],
            },
            {
                id: 'als-3005',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '47',
                roomType: 'Classroom',
                searchAliases: ['ALS 3005'],
            },
            {
                id: 'als-3006A',
                images: [
                    firebaseImage('room-images/als-3006A.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['ALS 3006A'],
            },
            {
                id: 'als-3096',
                images: [
                    firebaseImage('room-images/als-3096.jpeg')
                ],
                floor: '3',
                capacity: '18',
                roomType: 'Conference Room',
                searchAliases: ['ALS 3096'],
            },
            {
                id: 'als-4000',
                images: [
                    firebaseImage('room-images/als-4000.jpeg')
                ],
                floor: '4',
                capacity: '65',
                roomType: 'Classroom',
                searchAliases: ['ALS 4000'],
            },
            {
                id: 'als-4001',
                images: [
                    firebaseImage('room-images/als-4001.jpeg')
                ],
                floor: '4',
                capacity: '96',
                roomType: 'Lecture Hall',
                searchAliases: ['ALS 4001'],
            },
            {
                id: 'als-4009',
                images: [
                    firebaseImage('room-images/als-4009.jpeg')
                ],
                floor: '4',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['ALS 4009'],
            },
            {
                id: 'als-4103',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['ALS 4103'],
            },
            {
                id: 'als-4120B',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['ALS 4120B'],
            }
        ]
    },
    {
        id: 'bexl',
        name: 'Bexell Hall',
        images: [firebaseImage('building-images/bexl.jpeg')],
        rooms: [
            {
                id: 'bexl-100M',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Computer Lab',
                searchAliases: ['BEXL 100M'],
            },
            {
                id: 'bexl-103',
                images: [
                    firebaseImage('room-images/bexl-103.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Colab Classroom',
                searchAliases: ['BEXL 103'],
            },
            {
                id: 'bexl-120',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['BEXL 120'],
            },
            {
                id: 'bexl-207',
                images: [
                    firebaseImage('room-images/bexl-207.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['BEXL 207'],
            },
            {
                id: 'bexl-211',
                images: [
                    firebaseImage('room-images/bexl-211.jpeg')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 211'],
            },
            {
                id: 'bexl-320',
                images: [
                    firebaseImage('room-images/bexl-320.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['BEXL 320'],
            },
            {
                id: 'bexl-321',
                images: [
                    firebaseImage('room-images/bexl-321.jpeg')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 321'],
            },
            {
                id: 'bexl-322',
                images: [
                    firebaseImage('room-images/bexl-322.jpeg')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['BEXL 322'],
            },
            {
                id: 'bexl-323',
                images: [
                    firebaseImage('room-images/bexl-323.jpeg')
                ],
                floor: '3',
                capacity: '36',
                roomType: 'Collab Classroom',
                searchAliases: ['BEXL 323'],
            },
            {
                id: 'bexl-324',
                images: [
                    firebaseImage('room-images/bexl-324.jpeg')
                ],
                floor: '3',
                capacity: '45',
                roomType: 'Computer Classroom',
                searchAliases: ['BEXL 324'],
            },
            {
                id: 'bexl-326',
                images: [
                    firebaseImage('room-images/bexl-326.jpeg')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 326'],
            },
            {
                id: 'bexl-328',
                images: [
                    firebaseImage('room-images/bexl-328.jpeg')
                ],
                floor: '3',
                capacity: '37',
                roomType: 'U-Shaped Classroom',
                searchAliases: ['BEXL 328'],
            },
            {
                id: 'bexl-412',
                images: [
                    firebaseImage('room-images/bexl-412.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 412'],
            },
            {
                id: 'bexl-414',
                images: [
                    firebaseImage('room-images/bexl-414.jpeg')
                ],
                floor: '4',
                capacity: '26',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 414'],
            },
            {
                id: 'bexl-415',
                images: [
                    firebaseImage('room-images/bexl-415.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 415'],
            },
            {
                id: 'bexl-416',
                images: [
                    firebaseImage('room-images/bexl-416.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 416'],
            },
            {
                id: 'bexl-417',
                images: [
                    firebaseImage('room-images/bexl-417.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 417'],
            },
        ]
    },
    {
        id: 'gbad',
        name: 'Gilbert Hall Addition',
        images: [firebaseImage('building-images/gbad.jpeg')],
        rooms: [
            {
                id: 'gbad-009',
                images: [
                    firebaseImage('room-images/gbad-009.jpeg')
                ],
                floor: '0',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 009'],
            },
            {
                id: 'gbad-101',
                images: [
                    firebaseImage('room-images/gbad-101.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 101'],
            },
            {
                id: 'gbad-103',
                images: [
                    firebaseImage('room-images/gbad-103.jpeg')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['GBAD 103'],
            },
            {
                id: 'gbad-209',
                images: [
                    firebaseImage('room-images/gbad-209.jpeg')
                ],
                floor: '2',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 209'],
            },
            {
                id: 'gbad-209F',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 209F'],
            },
            {
                id: 'gbad-211',
                images: [
                    firebaseImage('room-images/gbad-211.jpeg')
                ],
                floor: '2',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['GBAD 211'],
            },
            {
                id: 'gbad-220',
                images: [
                    firebaseImage('room-images/gbad-220.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 220'],
            },
            {
                id: 'gbad-309',
                images: [
                    firebaseImage('room-images/gbad-309.jpeg')
                ],
                floor: '3',
                capacity: '90',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 309'],
            },
            {
                id: 'gbad-311',
                images: [
                    firebaseImage('room-images/gbad-311.jpeg')
                ],
                floor: '3',
                capacity: '19',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 311'],
            },
            {
                id: 'gbad-409',
                images: [
                    firebaseImage('room-images/gbad-409.jpeg')
                ],
                floor: '4',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 409'],
            },
            {
                id: 'gbad-411',
                images: [
                    firebaseImage('room-images/gbad-411.jpeg')
                ],
                floor: '4',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['GBAD 411'],
            }
        ]
    },
    {
        id: 'gilb',
        name: 'Gilbert Hall',
        images: [firebaseImage('building-images/gilb.jpeg')],
        rooms: [
            {
                id: 'gilb-109',
                images: [
                    firebaseImage('room-images/gilb-109.jpeg')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Meeting Room',
                searchAliases: ['GILB 109'],
            },
            {
                id: 'gilb-124',
                images: [
                    firebaseImage('room-images/gilb-124.jpeg')
                ],
                floor: '1',
                capacity: '192',
                roomType: 'Lecture Hall',
                searchAliases: ['GILB 124'],
            },
            {
                id: 'gilb-224',
                images: [
                    firebaseImage('room-images/gilb-224.jpeg')
                ],
                floor: '2',
                capacity: '197',
                roomType: 'Lecture Hall',
                searchAliases: ['GILB 224'],
            },
            {
                id: 'gilb-228',
                images: [
                    firebaseImage('room-images/gilb-228.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['GILB 228'],
            },
            {
                id: 'gilb-324',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '53',
                roomType: 'Classroom',
                searchAliases: ['GILB 324'],
            }
        ]
    },
    {
        id: 'wb',
        name: 'Women\'s Building',
        images: [firebaseImage('building-images/wb.jpeg')],
        rooms: [
            {
                id: 'wb-0005',
                images: [
                    firebaseImage('room-images/wb-0005.jpeg')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Pool',
                searchAliases: ['WB 0005, POOL'],
            },
            {
                id: 'wb-003',
                images: [
                    firebaseImage('room-images/wb-003.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['WB 003'],
            },
            {
                id: 'wb-008',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['WB 008'],
            },
            {
                id: 'wb-009',
                images: [
                    firebaseImage('room-images/wb-009.jpeg')
                ],
                floor: '0',
                capacity: '45',
                roomType: 'Gym',
                searchAliases: ['WB 009, Gym'],
            },
            {
                id: 'wb-015',
                images: [
                    firebaseImage('room-images/wb-015.jpeg')
                ],
                floor: '0',
                capacity: '2',
                roomType: 'Studio Room',
                searchAliases: ['WB 015'],
            },
            {
                id: 'wb-112',
                images: [
                    firebaseImage('room-images/wb-112.jpeg')
                ],
                floor: '1',
                capacity: '160',
                roomType: 'Gymnasium',
                searchAliases: ['WB 112', 'Gymnasium', 'WB Gymnasium', 'Women\'s Building Gymnasium', 'Basketball Court', 'Women\'s Building Basketball Court'],
            },
            {
                id: 'wb-116',
                images: [
                    firebaseImage('room-images/wb-116.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Ballroom',
                searchAliases: ['WB 116', 'Ballroom', 'Women\'s Building Ballroom'],
            },
            {
                id: 'wb-118',
                images: [
                    firebaseImage('room-images/wb-118.jpeg')
                ],
                floor: '1',
                capacity: '52',
                roomType: 'Ballet Studio',
                searchAliases: ['WB 118', 'Ballet Studio', 'Women\'s Building Ballet Studio'],
            },
            {
                id: 'wb-204',
                images: [
                    firebaseImage('room-images/wb-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Yoga Studio',
                searchAliases: ['WB 204', 'Yoga Studio', 'Women\'s Building Yoga Studio'],
            },
            {
                id: 'wb-205',
                images: [
                    firebaseImage('room-images/wb-205.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['WB 205'],
            },
            {
                id: 'wb-210',
                images: [
                    firebaseImage('room-images/wb-210.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['WB 210'],
            },
        ]
    },
    {
        id: 'gilm',
        name: 'Gilmore Hall',
        images: [firebaseImage('building-images/gilm.jpeg')],
        rooms: [
            {
                id: 'gilm-206',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['GILM 206'],
            },
            {
                id: 'gilm-234',
                images: [
                    firebaseImage('room-images/gilm-234.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['GILM 234'],
            },
        ]
    },
    {
        id: 'gman',
        name: 'Gilmore Annex',
        images: [firebaseImage('building-images/gman.jpeg')],
        rooms: [
            {
                id: 'gman-101',
                images: [
                    firebaseImage('room-images/gman-101.jpeg')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Conference Room',
                searchAliases: ['GMAN 101'],
            },
        ]
    },
    {
        id: 'aust',
        name: 'Austin Hall',
        images: [firebaseImage('building-images/aust.jpeg')],
        rooms: [
            {
                id: 'aust-100',
                images: [
                    firebaseImage('room-images/aust-100.jpeg')
                ],
                floor: '1',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['AUST 100'],
            },
            {
                id: 'aust-126',
                images: [
                    firebaseImage('room-images/aust-126.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['AUST 126'],
            },
            {
                id: 'aust-183',
                images: [
                    firebaseImage('room-images/aust-183.jpeg')
                ],
                floor: '1',
                capacity: '250',
                roomType: 'Lecture Hall',
                searchAliases: ['AUST 183'],
            },
            {
                id: 'aust-200',
                images: [
                    firebaseImage('room-images/aust-200.jpeg')
                ],
                floor: '2',
                capacity: '55',
                roomType: 'Computer Lab',
                searchAliases: ['AUST 200'],
            },
            {
                id: 'aust-216',
                images: [
                    firebaseImage('room-images/aust-216.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 216'],
            },
            {
                id: 'aust-222',
                images: [
                    firebaseImage('room-images/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 222'],
            },
            {
                id: 'aust-226',
                images: [
                    firebaseImage('room-images/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 226'],
            },
            {
                id: 'aust-260',
                images: [
                    firebaseImage('room-images/aust-260.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 260'],
            },
            {
                id: 'aust-270',
                images: [
                    firebaseImage('room-images/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 270'],
            },
            {
                id: 'aust-274',
                images: [
                    firebaseImage('room-images/aust-274.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 274'],
            },
            {
                id: 'aust-388',
                images: [
                    firebaseImage('room-images/aust-388.jpeg')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 388'],
            },
            {
                id: 'aust-390',
                images: [
                    firebaseImage('room-images/aust-388.jpeg')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 390'],
            },
            {
                id: 'aust-440',
                images: [
                    firebaseImage('room-images/aust-440.jpeg')
                ],
                floor: '4',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['AUST 440'],
            },
        ]
    },
    {
        id: 'bale',
        name: 'Ballard Extension Hall',
        images: [firebaseImage('building-images/bale.jpeg')],
        rooms: [
            {
                id: 'bale-200C',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Conference Room',
                searchAliases: ['BALE 200C'],
            },
            {
                id: 'bale-219',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Conference Room',
                searchAliases: ['BALE 219'],
            },
            {
                id: 'bale-310',
                images: [
                    firebaseImage('room-images/bale-310.jpeg')
                ],
                floor: '3',
                capacity: '21',
                roomType: 'Conference Room',
                searchAliases: ['BALE 310'],
            },
        ]
    },
    {
        id: 'bat',
        name: 'Batcheller Hall',
        images: [firebaseImage('building-images/bat.jpeg')],
        rooms: [
            {
                id: 'bat-045',
                images: [
                    firebaseImage('room-images/bat-045.jpeg')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['BAT 045'],
            },
            {
                id: 'bat-050',
                images: [
                    firebaseImage('room-images/bat-050.jpeg')
                ],
                floor: '0',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['BAT 050'],
            },
            {
                id: 'bat-144',
                images: [
                    firebaseImage('room-images/bat-144.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['BAT 144'],
            },
            {
                id: 'bat-150',
                images: [
                    firebaseImage('room-images/bat-150.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['BAT 150'],
            },
            {
                id: 'bat-244',
                images: [
                    firebaseImage('room-images/bat-244.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Computer Lab',
                searchAliases: ['BAT 244'],
            },
            {
                id: 'bat-250',
                images: [
                    firebaseImage('room-images/bat-250.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['BAT 250'],
            },
        ]
    },
    {
        id: 'brc',
        name: 'Beth Ray Center for Academic Support',
        images: [firebaseImage('building-images/brc.jpeg')],
        rooms: [
            {
                id: 'brc-133',
                images: [
                    firebaseImage('room-images/brc-133.jpeg')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['BRC 133'],
            },
            {
                id: 'brc-136',
                images: [
                    firebaseImage('room-images/brc-136.jpeg')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['BRC 136'],
            },
            {
                id: 'brc-138',
                images: [
                    firebaseImage('room-images/brc-138.jpeg')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['BRC 138'],
            },
            {
                id: 'brc-161',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Computer Lab',
                searchAliases: ['BRC 161'],
            },
        ]
    },
    {
        id: 'burt',
        name: 'Burt Hall',
        images: [firebaseImage('building-images/burt.jpeg')],
        rooms: [
            {
                id: 'burt-128',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '35',
                roomType: 'Classroom',
                searchAliases: ['BURT 128'],
            },
            {
                id: 'burt-166',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['BURT 166'],
            },
            {
                id: 'burt-193',
                images: [
                    firebaseImage('room-images/burt-193.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['BURT 193'],
            },
            {
                id: 'burt-326A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '7',
                roomType: 'Conference Room',
                searchAliases: ['BURT 326A'],
            },
        ]
    },
    {
        id: 'bates',
        name: 'Bates Hall',
        images: [firebaseImage('building-images/bates.jpeg')],
        rooms: [
            {
                id: 'bates-129',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['BATES 129'],
            },
        ]
    },
    {
        id: 'buxton',
        name: 'Buxton Hall',
        images: [firebaseImage('building-images/buxton.jpeg')],
        rooms: [
            {
                id: 'buxton-169',
                images: [
                    firebaseImage('room-images/buxton-169.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['BUXTON 169'],
            },
        ]
    },
    {
        id: 'call',
        name: 'Callahan Hall',
        images: [firebaseImage('building-images/call.jpeg')],
        rooms: [
            {
                id: 'call-125',
                images: [
                    firebaseImage('room-images/call-125.jpeg')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Classroom',
                searchAliases: ['CALL 125'],
            },
        ]
    },
    {
        id: 'clkl',
        name: 'Clark Laboratory',
        images: [firebaseImage('building-images/clkl.jpeg')],
        rooms: [
            {
                id: 'clkl-104',
                images: [
                    firebaseImage('room-images/clkl-104.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Lab Room',
                searchAliases: ['CLKL 104'],
            },
            {
                id: 'clkl-104B',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Unknown',
                searchAliases: ['CLKL 104B'],
            },
            {
                id: 'clkl-106',
                images: [
                    firebaseImage('room-images/clkl-106.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Lab Room',
                searchAliases: ['CLKL 106'],
            },
        ]
    },
    {
        id: 'coar',
        name: 'Coast Range Building',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'coar-2123',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Unknown',
                searchAliases: ['COAR 2123'],
            },
            {
                id: 'coar-2196',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Conference Room',
                searchAliases: ['COAR 2196'],
            },
        ]
    },
    {
        id: 'comh',
        name: 'Community Hall',
        images: [firebaseImage('building-images/comh.jpeg')],
        rooms: [
            {
                id: 'comh-102',
                images: [
                    firebaseImage('room-images/comh-102.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Piano Room',
                searchAliases: ['COMH 102', 'Piano Room'],
            },
            {
                id: 'comh-104',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COMH 104'],
            },
            {
                id: 'comh-106',
                images: [
                    firebaseImage('room-images/comh-106.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Classroom',
                searchAliases: ['COMH 106'],
            },
            {
                id: 'comh-202',
                images: [
                    firebaseImage('room-images/comh-202.jpeg')
                ],
                floor: '2',
                capacity: '100',
                roomType: 'Band Room',
                searchAliases: ['COMH 202', 'Band Room'],
            },
            {
                id: 'comh-203',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Unknown',
                searchAliases: ['COMH 203'],
            },
            {
                id: 'comh-204',
                images: [
                    firebaseImage('room-images/comh-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Choir Rehearsal Room',
                searchAliases: ['COMH 204', 'Choir Rehearsal Room'],
            },
            {
                id: 'comh-300',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '5',
                roomType: 'Office',
                searchAliases: ['COMH 300'],
            },
            {
                id: 'comh-300A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '7',
                roomType: 'Classroom',
                searchAliases: ['COMH 300A'],
            },
            {
                id: 'comh-303',
                images: [
                    firebaseImage('room-images/comh-303.jpeg')
                ],
                floor: '3',
                capacity: '80',
                roomType: 'Recital Hall',
                searchAliases: ['COMH 303'],
            },
            {
                id: 'comh-305A',
                images: [
                    firebaseImage('room-images/comh-305A.jpeg')
                ],
                floor: '3',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['COMH 305A'],
            }
        ]
    },
    {
        id: 'covl',
        name: 'Covell Hall',
        images: [firebaseImage('building-images/covl.jpeg')],
        rooms: [
            {
                id: 'covl-001',
                images: [
                    firebaseImage('room-images/covl-001.jpeg')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COVL 001'],
            },
            {
                id: 'covl-006',
                images: [
                    firebaseImage('room-images/covl-006.jpeg')
                ],
                floor: '0',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['COVL 006'],
            },
            {
                id: 'covl-017',
                images: [
                    firebaseImage('room-images/covl-017.jpeg')
                ],
                floor: '0',
                capacity: '3',
                roomType: 'Lab Room',
                searchAliases: ['COVL 017'],
            },
            {
                id: 'covl-020',
                images: [
                    firebaseImage('room-images/covl-020.jpeg')
                ],
                floor: '0',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['COVL 020'],
            },
            {
                id: 'covl-021',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COVL 021'],
            },
            {
                id: 'covl-022',
                images: [
                    firebaseImage('room-images/covl-022.jpeg')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['COVL 022'],
            },
            {
                id: 'covl-216',
                images: [
                    firebaseImage('room-images/covl-216.jpeg')
                ],
                floor: '2',
                capacity: '151',
                roomType: 'Lecture Hall',
                searchAliases: ['COVL 216'],
            },
            {
                id: 'covl-218',
                images: [
                    firebaseImage('room-images/covl-218.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['COVL 218'],
            },
            {
                id: 'covl-221',
                images: [
                    firebaseImage('room-images/covl-221.jpeg')
                ],
                floor: '2',
                capacity: '75',
                roomType: 'Classroom',
                searchAliases: ['COVL 221'],
            },
        ]
    },
    {
        id: 'crps',
        name: 'Crop Science Building',
        images: [firebaseImage('building-images/crps.jpeg')],
        rooms: [
            {
                id: 'crps-119',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Conference Room',
                searchAliases: ['CRPS 119'],
            },
            {
                id: 'crps-122',
                images: [
                    firebaseImage('room-images/crps-122.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['CRPS 122'],
            },
            {
                id: 'crps-138',
                images: [
                    firebaseImage('room-images/crps-138.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['CRPS 138'],
            },
            {
                id: 'crps-150',
                images: [
                    firebaseImage('room-images/crps-150.jpeg')
                ],
                floor: '1',
                capacity: '26',
                roomType: 'Computer Lab',
                searchAliases: ['CRPS 150'],
            },
            {
                id: 'crps-232',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '9',
                roomType: 'Conference Room',
                searchAliases: ['CRPS 232'],
            },
        ]
    },
    {
        id: 'dear',
        name: 'Dearborn Hall',
        images: [firebaseImage('building-images/dear.jpeg')],
        rooms: [
            {
                id: 'dear-001E',
                images: [
                    firebaseImage('room-images/dear-001E.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 001E'],
            },
            {
                id: 'dear-001G',
                images: [
                    firebaseImage('room-images/dear-001G.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 001G'],
            },
            {
                id: 'dear-002',
                images: [
                    firebaseImage('room-images/dear-002.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 002'],
            },
            {
                id: 'dear-004',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: 'Unknown',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 004'],
            },
            {
                id: 'dear-005',
                images: [
                    firebaseImage('room-images/dear-005.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 005'],
            },
            {
                id: 'dear-009',
                images: [
                    firebaseImage('room-images/dear-009.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 009'],
            },
            {
                id: 'dear-115',
                images: [
                    firebaseImage('room-images/dear-115.jpeg')
                ],
                floor: '1',
                capacity: '61',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 115'],
            },
            {
                id: 'dear-118',
                images: [
                    firebaseImage('room-images/dear-118.jpeg')
                ],
                floor: '1',
                capacity: '168',
                roomType: 'Lecture Hall',
                searchAliases: ['DEAR 118'],
            },
            {
                id: 'dear-120',
                images: [
                    firebaseImage('room-images/dear-120.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['DEAR 120'],
            },
            {
                id: 'dear-201',
                images: [
                    firebaseImage('room-images/dear-201.jpeg')
                ],
                floor: '2',
                capacity: '90',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 201'],
            },
            {
                id: 'dear-203',
                images: [
                    firebaseImage('room-images/dear-203.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 203'],
            },
            {
                id: 'dear-206',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 206'],
            },
            {
                id: 'dear-208',
                images: [
                    firebaseImage('room-images/dear-208.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 208'],
            },
            {
                id: 'dear-211',
                images: [
                    firebaseImage('room-images/dear-211.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 211'],
            },
            {
                id: 'dear-222',
                images: [
                    firebaseImage('room-images/dear-222.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 222'],
            },
            {
                id: 'dear-300',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 300'],
            },
            {
                id: 'dear-302A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 302A'],
            },
            {
                id: 'dear-303',
                images: [
                    firebaseImage('room-images/dear-303.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['DEAR 303'],
            },
            {
                id: 'dear-312',
                images: [
                    firebaseImage('room-images/dear-312.jpeg')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 312'],
            }
        ]
    },
    {
        id: 'dryd',
        name: 'Dryden Hall',
        images: [firebaseImage('building-images/dryd.jpeg')],
        rooms: [
            {
                id: 'dryd-104',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '35',
                roomType: 'Classroom',
                searchAliases: ['DRYD 104'],
            },
            {
                id: 'dryd-212B',
                images: [
                    firebaseImage('room-images/dryd-212B.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['DRYD 212B'],
            },
        ]
    },
    {
        id: 'dxrc',
        name: 'Dixon Recreation Center',
        images: [firebaseImage('building-images/dxrc.jpeg')],
        rooms: [
            {
                id: 'dxrc-126',
                images: [
                    firebaseImage('room-images/dxrc-126.jpeg')
                ],
                floor: '1',
                capacity: '60',
                roomType: 'Racquet Ball Court',
                searchAliases: ['DXRC 126', 'Racquet Ball Court'],
            },
            {
                id: 'dxrc-140J',
                images: [
                    firebaseImage('room-images/dxrc-140J.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['DXRC 140J'],
            },
            {
                id: 'dxrc-201',
                images: [
                    firebaseImage('room-images/dxrc-201.jpeg')
                ],
                floor: '2',
                capacity: '46',
                roomType: 'Fitness Studio',
                searchAliases: ['DXRC 201'],
            },
            {
                id: 'dxrc-207',
                images: [
                    firebaseImage('room-images/dxrc-207.jpeg')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['DXRC 207'],
            },
            {
                id: 'dxrc-209',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['DXRC 209'],
            },
            {
                id: 'dxrc-260',
                images: [
                    firebaseImage('room-images/dxrc-260.jpeg')
                ],
                floor: '2',
                capacity: '100',
                roomType: 'Gym',
                searchAliases: ['DXRC 260', 'Gym', 'Basketball Court'],
            },
            {
                id: 'dxrc-Indoor-Climbing-Center',
                images: [
                    firebaseImage('room-images/dxrc-ICC.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Indoor Climbing Center',
                searchAliases: ['DXRC 134', 'Indoor Climbing Center', 'DXRC ICC'],
            },
            {
                id: 'dxrc-Pool',
                images: [
                    firebaseImage('room-images/dxrc-Pool.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Pool Room',
                searchAliases: ['DXRC 190', 'Pool'],
            }
        ]
    },
    {
        id: 'dybn',
        name: 'DC Dairy Barn',
        images: [firebaseImage('building-images/dybn.jpeg')],
        rooms: [
            {
                id: 'dybn-101',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['DYBN 101'],
            },
        ]
    },
    {
        id: 'egrn',
        name: 'East Greenhouse 16',
        images: [firebaseImage('building-images/egrn.jpeg')],
        rooms: [
            {
                id: 'egrn-16',
                images: [
                    firebaseImage('room-images/egrn-16.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Greenhouse',
                searchAliases: ['EGRN 16'],
            },
        ]
    },
    {
        id: 'emac',
        name: 'Entomology Machine Storage',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'emac-130',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Storage Room',
                searchAliases: ['EMAC 130'],
            },
        ]
    },
    {
        id: 'fair',
        name: 'Fairbanks Hall',
        images: [firebaseImage('building-images/fair.jpeg')],
        rooms: [
            {
                id: 'fair-104',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 104'],
            },
            {
                id: 'fair-127',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '26',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 127'],
            },
            {
                id: 'fair-204',
                images: [
                    firebaseImage('room-images/fair-204.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['FAIR 204'],
            },
            {
                id: 'fair-207',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 207'],
            },
            {
                id: 'fair-215',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 215'],
            },
            {
                id: 'fair-227',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 227'],
            },
            {
                id: 'fair-304',
                images: [
                    firebaseImage('room-images/fair-304.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Classroom',
                searchAliases: ['FAIR 304'],
            },
            {
                id: 'fair-327',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 327'],
            },
            {
                id: 'fair-404',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['FAIR 404'],
            },
            {
                id: 'fair-415',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '19',
                roomType: 'Classroom',
                searchAliases: ['FAIR 415'],
            },
            {
                id: 'fair-427',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '29',
                roomType: 'Classroom',
                searchAliases: ['FAIR 427'],
            },
        ]
    },
    {
        id: 'furm',
        name: 'Joyce Collin Furman Hall',
        images: [firebaseImage('building-images/furm.jpeg')],
        rooms: [
            {
                id: 'furm-100',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['FURM 100'],
            },
            {
                id: 'furm-101',
                images: [
                    firebaseImage('room-images/furm-101.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['FURM 101'],
            },
            {
                id: 'furm-102',
                images: [
                    firebaseImage('room-images/furm-102.jpeg')
                ],
                floor: '1',
                capacity: '96',
                roomType: 'Classroom',
                searchAliases: ['FURM 102'],
            },
            {
                id: 'furm-105',
                images: [
                    firebaseImage('room-images/furm-105.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['FURM 105'],
            },
            {
                id: 'furm-200',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['FURM 200'],
            },
            {
                id: 'furm-201G',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '6',
                roomType: 'Conference Room',
                searchAliases: ['FURM 201G'],
            },
            {
                id: 'furm-202',
                images: [
                    firebaseImage('room-images/furm-202.jpeg')
                ],
                floor: '2',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['FURM 202'],
            },
            {
                id: 'furm-300',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['FURM 300'],
            },
            {
                id: 'furm-303',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['FURM 303'],
            },
            {
                id: 'furm-404',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['FURM 404'],
            },
            {
                id: 'furm-405',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['FURM 405'],
            },
            {
                id: 'furm-411',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['FURM 411'],
            },
        ]
    },
    {
        id: 'gilk',
        name: 'Gilkey Hall',
        images: [firebaseImage('building-images/gilk.jpeg')],
        rooms: [
            {
                id: 'gilk-100',
                images: [
                    firebaseImage('room-images/gilk-100.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['GILK 100'],
            },
            {
                id: 'gilk-104',
                images: [
                    firebaseImage('room-images/gilk-104.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['GILK 104'],
            },
            {
                id: 'gilk-108',
                images: [
                    firebaseImage('room-images/gilk-108.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['GILK 108'],
            },
            {
                id: 'gilk-113',
                images: [
                    firebaseImage('room-images/gilk-113.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['GILK 113'],
            },
            {
                id: 'gilk-115',
                images: [
                    firebaseImage('room-images/gilk-115.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['GILK 115'],
            },
        ]
    },
    {
        id: 'glsn',
        name: 'Gleeson Hall',
        images: [firebaseImage('building-images/glsn.jpeg')],
        rooms: [
            {
                id: 'glsn-003',
                images: [
                    firebaseImage('room-images/glsn-003.jpeg')
                ],
                floor: '0',
                capacity: '28',
                roomType: 'Lab Room',
                searchAliases: ['GLSN 003'],
            },
            {
                id: 'glsn-009',
                images: [
                    firebaseImage('room-images/glsn-009.jpeg')
                ],
                floor: '0',
                capacity: '63',
                roomType: 'Lab Room',
                searchAliases: ['GLSN 009'],
            },
            {
                id: 'glsn-100',
                images: [
                    firebaseImage('room-images/glsn-100.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['GLSN 100'],
            },
            {
                id: 'glsn-200',
                images: [
                    firebaseImage('room-images/glsn-200.jpeg')
                ],
                floor: '2',
                capacity: '88',
                roomType: 'Classroom',
                searchAliases: ['GLSN 200'],
            },
            {
                id: 'glsn-306',
                images: [
                    firebaseImage('room-images/glsn-306.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['GLSN 306'],
            },
            {
                id: 'glsn-308',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '27',
                roomType: 'Lab Room',
                searchAliases: ['GLSN 308'],
            },
        ]
    },
    {
        id: 'graf',
        name: 'Graf Hall',
        images: [firebaseImage('building-images/graf.jpeg')],
        rooms: [
            {
                id: 'graf-106',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '39',
                roomType: 'Lab Room',
                searchAliases: ['GRAF 106'],
            },
            {
                id: 'graf-107',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['GRAF 107'],
            },
        ]
    },
    {
        id: 'gvgc',
        name: 'Gladys Valley Gymnastics Center',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'gvgc-106',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Lab Room',
                searchAliases: ['GVGC 106'],
            },
            {
                id: 'gvgc-107',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Lab Room',
                searchAliases: ['GVGC 107'],
            },
            {
                id: 'gvgc-109',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['GVGC 109'],
            },
        ]
    },
    {
        id: 'indp',
        name: 'Merritt Truax Indoor Center',
        images: [firebaseImage('building-images/indp.jpeg')],
        rooms: [
            {
                id: 'indp-101',
                images: [
                    firebaseImage('room-images/indp-101.jpeg')
                ],
                floor: '1',
                capacity: '500',
                roomType: 'Indoor Football Practice Field',
                searchAliases: ['INDP 101', 'A0101', 'Football Field'],
            },
        ]
    },
    {
        id: 'haml',
        name: 'Hogg Animal Metabolism Lab',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'haml-0100',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['HAML 0100'],
            },
        ]
    },
    {
        id: 'hfc',
        name: 'Hallie E. Ford Center',
        images: [firebaseImage('building-images/hfc.jpeg')],
        rooms: [
            {
                id: 'hfc-115',
                images: [
                    firebaseImage('room-images/hfc-115.jpeg')
                ],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['HFC 115'],
            },
        ]
    },
    {
        id: 'hkrt',
        name: 'Heckart Lodge',
        images: [firebaseImage('building-images/hkrt.jpeg')],
        rooms: [
            {
                id: 'hkrt-110',
                images: [
                    firebaseImage('room-images/hkrt-110.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['HKRT 110'],
            },
        ]
    },
    {
        id: 'hov',
        name: 'Hovland Hall',
        images: [firebaseImage('building-images/hov.jpeg')],
        rooms: [
            {
                id: 'hov-100',
                images: [
                    firebaseImage('room-images/hov-100.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['HOV 100'],
            },
            {
                id: 'hov-104',
                images: [
                    firebaseImage('room-images/hov-104.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['HOV 104'],
            },
            {
                id: 'hov-202',
                images: [
                    firebaseImage('room-images/hov-202.jpeg')
                ],
                floor: '2',
                capacity: '37',
                roomType: 'Classroom',
                searchAliases: ['HOV 202'],
            },
        ]
    },
    {
        id: 'hsbn',
        name: 'Horse Barn',
        images: [firebaseImage('building-images/hsbn.jpeg')],
        rooms: [
            {
                id: 'hsbn-100',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Barn',
                searchAliases: ['HSBN 100', 'Horse Barn'],
            },
        ]
    },
    {
        id: 'hwrl',
        name: 'Hindsdale Wave Research Lab',
        images: [firebaseImage('building-images/hwrl.jpeg')],
        rooms: [
            {
                id: 'hwrl-M0201',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['HWRL M0201'],
            },
        ]
    },
    {
        id: 'illc',
        name: 'International Learning-Living Center (ILLC)',
        images: [firebaseImage('building-images/illc.jpeg')],
        rooms: [
            {
                id: 'illc-134',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '22',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 134'],
            },
            {
                id: 'illc-136',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 136'],
            },
            {
                id: 'illc-144',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 144'],
            },
            {
                id: 'illc-155',
                images: [
                    firebaseImage('room-images/illc-155.jpeg')
                ],
                floor: '1',
                capacity: '105',
                roomType: 'Lecture Hall',
                searchAliases: ['ILLC 155'],
            },
            {
                id: 'illc-242',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 242'],
            },
            {
                id: 'illc-244',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['ILLC 244'],
            },
            {
                id: 'illc-250',
                images: [
                    firebaseImage('room-images/illc-250.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 250'],
            },
            {
                id: 'illc-252',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 252'],
            },
            {
                id: 'illc-253',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 253'],
            },
            {
                id: 'illc-255',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 255'],
            },
            {
                id: 'illc-342',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 342'],
            },
            {
                id: 'illc-344',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 344'],
            },
            {
                id: 'illc-345',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 345'],
            },
            {
                id: 'illc-345-347',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['ILLC 345/347'],
            },
            {
                id: 'illc-347',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 347'],
            },
            {
                id: 'illc-350',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 350'],
            },
            {
                id: 'illc-350-352',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['ILLC 350/352'],
            },
            {
                id: 'illc-352',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 352'],
            },
            {
                id: 'illc-353',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 353'],
            },
            {
                id: 'illc-355',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 355'],
            },
            {
                id: 'illc-442',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['ILLC 442'],
            },
            {
                id: 'illc-444',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 444'],
            },
            {
                id: 'illc-450',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 450'],
            },
            {
                id: 'illc-450-452',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 450-452'],
            },
            {
                id: 'illc-452',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 452'],
            },
            {
                id: 'illc-453',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 453'],
            },
            {
                id: 'illc-455',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 455'],
            },
            {
                id: 'illc-542',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 542'],
            },
            {
                id: 'illc-544',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 544'],
            },
            {
                id: 'illc-545',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 545'],
            },
            {
                id: 'illc-545-547',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 545-547'],
            },
            {
                id: 'illc-547',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 547'],
            },
            {
                id: 'illc-550',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 550'],
            },
            {
                id: 'illc-550-552',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 550-552'],
            },
            {
                id: 'illc-552',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 552'],
            },
            {
                id: 'illc-553',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 553'],
            },
            {
                id: 'illc-555',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 555'],
            },
        ]
    },
    {
        id: 'john',
        name: 'Johnson Hall',
        images: [firebaseImage('building-images/john.jpeg')],
        rooms: [
            {
                id: 'john-102',
                images: [
                    firebaseImage('room-images/john-102.jpeg')
                ],
                floor: '1',
                capacity: '118',
                roomType: 'Lecture Hall',
                searchAliases: ['JOHN 102'],
            },
            {
                id: 'john-214',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 214'],
            },
            {
                id: 'john-214B',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 214'],
            },
            {
                id: 'john-221',
                images: [
                    firebaseImage('room-images/john-221.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['JOHN 221'],
            },
            {
                id: 'john-300',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 300'],
            },
            {
                id: 'john-316A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['JOHN 316A'],
            },
        ]
    },
    {
        id: 'kear',
        name: 'Kearney Hall',
        images: [firebaseImage('building-images/kear.jpeg')],
        rooms: [
            {
                id: 'kear-112',
                images: [
                    firebaseImage('room-images/kear-112.jpeg')
                ],
                floor: '1',
                capacity: '106',
                roomType: 'Lecture Hall',
                searchAliases: ['KEAR 112'],
            },
            {
                id: 'kear-124',
                images: [
                    firebaseImage('room-images/kear-124.jpeg')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['KEAR 124'],
            },
            {
                id: 'kear-202',
                images: [
                    firebaseImage('room-images/kear-202.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['KEAR 202'],
            },
            {
                id: 'kear-205',
                images: [
                    firebaseImage('room-images/kear-205.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['KEAR 205'],
            },
            {
                id: 'kear-212',
                images: [
                    firebaseImage('room-images/kear-212.jpeg')
                ],
                floor: '2',
                capacity: '83',
                roomType: 'Classroom',
                searchAliases: ['KEAR 212'],
            },
            {
                id: 'kear-302',
                images: [
                    firebaseImage('room-images/kear-302.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Computer Lab',
                searchAliases: ['KEAR 302'],
            },
            {
                id: 'kear-305',
                images: [
                    firebaseImage('room-images/kear-305.jpeg')
                ],
                floor: '3',
                capacity: '63',
                roomType: 'Classroom',
                searchAliases: ['KEAR 305'],
            },
            {
                id: 'kear-312',
                images: [
                    firebaseImage('room-images/kear-312.jpeg')
                ],
                floor: '3',
                capacity: '84',
                roomType: 'Classroom',
                searchAliases: ['KEAR 312'],
            },
        ]
    },
    {
        id: 'kec',
        name: 'Kelley Engineering Center',
        images: [firebaseImage('building-images/kec.jpeg')],
        rooms: [
            {
                id: 'kec-1001',
                images: [
                    firebaseImage('room-images/kec-1001.jpeg')
                ],
                floor: '1',
                capacity: '70',
                roomType: 'Classroom',
                searchAliases: ['KEC 1001'],
            },
            {
                id: 'kec-1003',
                images: [
                    firebaseImage('room-images/kec-1003.jpeg')
                ],
                floor: '1',
                capacity: '66',
                roomType: 'Classroom',
                searchAliases: ['KEC 1003'],
            },
            {
                id: 'kec-1005',
                images: [
                    firebaseImage('room-images/kec-1005.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['KEC 1005'],
            },
            {
                id: 'kec-1007',
                images: [
                    firebaseImage('room-images/kec-1007.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['KEC 1007'],
            },
        ]
    },
    {
        id: 'kidd',
        name: 'Kidder Hall',
        images: [firebaseImage('building-images/kidd.jpeg')],
        rooms: [
            {
                id: 'kidd-022',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '0 (No one can be in it as if you enter you will disappear for ever)',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 022'],
            },
            {
                id: 'kidd-028',
                images: [
                    firebaseImage('room-images/kidd-028.jpeg')
                ],
                floor: '0',
                capacity: '34',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 028'],
            },
            {
                id: 'kidd-033',
                images: [
                    firebaseImage('room-images/kidd-033.jpeg')
                ],
                floor: '0',
                capacity: '26',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 033'],
            },
            {
                id: 'kidd-070',
                images: [
                    firebaseImage('room-images/kidd-070.jpeg')
                ],
                floor: '0',
                capacity: '21',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 070'],
            },
            {
                id: 'kidd-108',
                images: [
                    firebaseImage('room-images/kidd-108.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['KIDD 108'],
            },
            {
                id: 'kidd-108G',
                images: [
                    firebaseImage('room-images/kidd-108G.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 108G'],
            },
            {
                id: 'kidd-108H',
                images: [
                    firebaseImage('room-images/kidd-108H.jpeg')
                ],
                floor: '1',
                capacity: '62',
                roomType: 'Classroom',
                searchAliases: ['KIDD 108H'],
            },
            {
                id: 'kidd-108J',
                images: [
                    firebaseImage('room-images/kidd-108J.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 108J'],
            },
            {
                id: 'kidd-128',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Dean\'s Office and Reception',
                searchAliases: ['KIDD 128', 'Dean\'s Office and Reception'],
            },
            {
                id: 'kidd-128B',
                images: [
                    firebaseImage('room-images/kidd-128B.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Dean\'s Office Conference Room',
                searchAliases: ['KIDD 128B', 'Dean\'s Office Conference Room'],
            },
            {
                id: 'kidd-200',
                images: [
                    firebaseImage('room-images/kidd-200.jpeg')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 200'],
            },
            {
                id: 'kidd-202',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['KIDD 202'],
            },
            {
                id: 'kidd-228',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '3 (A very small class I guess)',
                roomType: 'Classroom',
                searchAliases: ['KIDD 228'],
            },
            {
                id: 'kidd-236',
                images: [
                    firebaseImage('room-images/kidd-236.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['KIDD 236'],
            },
            {
                id: 'kidd-237',
                images: [
                    firebaseImage('room-images/kidd-237.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['KIDD 237'],
            },
            {
                id: 'kidd-238',
                images: [
                    firebaseImage('room-images/kidd-238.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['KIDD 238'],
            },
            {
                id: 'kidd-274',
                images: [
                    firebaseImage('room-images/kidd-274.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['KIDD 274'],
            },
            {
                id: 'kidd-278',
                images: [
                    firebaseImage('room-images/kidd-278.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['KIDD 278'],
            },
            {
                id: 'kidd-280',
                images: [
                    firebaseImage('room-images/kidd-280.jpeg')
                ],
                floor: '2',
                capacity: '37',
                roomType: 'Classroom',
                searchAliases: ['KIDD 280'],
            },
            {
                id: 'kidd-350',
                images: [
                    firebaseImage('room-images/kidd-350.jpeg')
                ],
                floor: '3',
                capacity: '109',
                roomType: 'Lecture Hall',
                searchAliases: ['KIDD 350'],
            },
            {
                id: 'kidd-356',
                images: [
                    firebaseImage('room-images/kidd-356.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['KIDD 356'],
            },
            {
                id: 'kidd-358',
                images: [
                    firebaseImage('room-images/kidd-358.jpeg')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 358'],
            },
            {
                id: 'kidd-364',
                images: [
                    firebaseImage('room-images/kidd-364.jpeg')
                ],
                floor: '3',
                capacity: '109',
                roomType: 'Lecture Hall',
                searchAliases: ['KIDD 364'],
            },
        ]
    },
    {
        id: 'lang',
        name: 'Langton Hall',
        images: [firebaseImage('building-images/lang.jpeg')],
        rooms: [
            {
                id: 'lang-006',
                images: [
                    firebaseImage('room-images/lang-006.jpeg')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Weight Room',
                searchAliases: ['LANG 006', 'Weight Room'],
            },
            {
                id: 'lang-013',
                images: [
                    firebaseImage('room-images/lang-013.jpeg')
                ],
                floor: '0',
                capacity: '40',
                roomType: 'Therapeutic Exercise Room',
                searchAliases: ['LANG 013', 'Therapeutic Exercise Room'],
            },
            {
                id: 'lang-124',
                images: [
                    firebaseImage('room-images/lang-124.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['LANG 124'],
            },
            {
                id: 'lang-126',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['LANG 126'],
            },
            {
                id: 'lang-127',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['LANG 127'],
            },
            {
                id: 'lang-129',
                images: [
                    firebaseImage('room-images/lang-129.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['LANG 129'],
            },
            {
                id: 'lang-130',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LANG 130'],
            },
            {
                id: 'lang-134',
                images: [
                    firebaseImage('room-images/lang-134.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Exercise Room',
                searchAliases: ['LANG 134', 'Exercise Room'],
            },
            {
                id: 'lang-200',
                images: [
                    firebaseImage('room-images/lang-200.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Aerobics Room',
                searchAliases: ['LANG 200', 'Aerobics Room'],
            },
            {
                id: 'lang-300',
                images: [
                    firebaseImage('room-images/lang-300.jpeg')
                ],
                floor: '3',
                capacity: '307',
                roomType: 'Large Gym',
                searchAliases: ['LANG 300', 'Large Gym'],
            },
            {
                id: 'lang-301',
                images: [
                    firebaseImage('room-images/lang-301.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Wrestling Room',
                searchAliases: ['LANG 301', 'Wrestling Room'],
            },
            {
                id: 'lang-310',
                images: [
                    firebaseImage('room-images/lang-310.jpeg')
                ],
                floor: '3',
                capacity: '114',
                roomType: 'Gymnastics Room',
                searchAliases: ['LANG 310', 'Gymnastics Room'],
            },
            {
                id: 'lang-arch',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: 'Nan',
                capacity: '35',
                roomType: 'Outdoors Archery Range',
                searchAliases: ['LANG ARCH', 'Outdoors Archery Range'],
            },
            {
                id: 'lang-0018',
                images: [
                    firebaseImage('room-images/lang-0018.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Pool',
                searchAliases: ['LANG 0018', 'Pool'],
            },
        ]
    },
    {
        id: 'lpsc',
        name: 'Linus Pauling Science Center',
        images: [firebaseImage('building-images/lpsc.jpeg')],
        rooms: [
            {
                id: 'lpsc-125',
                images: [
                    firebaseImage('room-images/lpsc-125.jpeg')
                ],
                floor: '1',
                capacity: '180',
                roomType: 'Lecture Hall',
                searchAliases: ['LPSC 125'],
            },
            {
                id: 'lpsc-160',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 160'],
            },
            {
                id: 'lpsc-176',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 176'],
            },
            {
                id: 'lpsc-178',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 178'],
            },
            {
                id: 'lpsc-219',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '69',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 219'],
            },
            {
                id: 'lpsc-239',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['LPSC 239'],
            },
            {
                id: 'lpsc-259',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['LPSC 259'],
            },
            {
                id: 'lpsc-402',
                images: [
                    firebaseImage('room-images/lpsc-402.jpeg')
                ],
                floor: '4',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['LPSC 402'],
            },
        ]
    },
    {
        id: 'magr',
        name: 'Magruder Hall',
        images: [firebaseImage('building-images/magr.jpeg')],
        rooms: [
            {
                id: 'magr-102',
                images: [
                    firebaseImage('room-images/magr-102.jpeg')
                ],
                floor: '1',
                capacity: '100',
                roomType: 'Classroom',
                searchAliases: ['MAGR 102'],
            },
            {
                id: 'magr-113',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['MAGR 113'],
            },
            {
                id: 'magr-1152',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '98',
                roomType: 'Classroom',
                searchAliases: ['MAGR 1152'],
            },
            {
                id: 'magr-118A',
                images: [
                    firebaseImage('room-images/magr-118A.jpeg')
                ],
                floor: '1',
                capacity: '58',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 118A'],
            },
            {
                id: 'magr-202',
                images: [
                    firebaseImage('room-images/magr-202.jpeg')
                ],
                floor: '2',
                capacity: '75',
                roomType: 'Classroom',
                searchAliases: ['MAGR 202'],
            },
            {
                id: 'magr-202-205',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '143',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['MAGR 202/205'],
            },
            {
                id: 'magr-205',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '82',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 205'],
            },
            {
                id: 'magr-208',
                images: [
                    firebaseImage('room-images/magr-208.jpeg')
                ],
                floor: '2',
                capacity: '67',
                roomType: 'Classroom',
                searchAliases: ['MAGR 208'],
            },
            {
                id: 'magr-208-251',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '143',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 208/251'],
            },
            {
                id: 'magr-251',
                images: [
                    firebaseImage('room-images/magr-251.jpeg')
                ],
                floor: '2',
                capacity: '76',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 251'],
            },
            {
                id: 'magr-298',
                images: [
                    firebaseImage('room-images/magr-298.jpeg')
                ],
                floor: '2',
                capacity: '62',
                roomType: 'Classroom',
                searchAliases: ['MAGR 298'],
            },
        ]
    },
    {
        id: 'mlh',
        name: 'Magruder - Lecture Hall',
        images: [firebaseImage('building-images/mlh.jpeg')],
        rooms: [
            {
                id: 'mlh-1152',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '98',
                roomType: 'Lecture Hall',
                searchAliases: ['MLH 1152'],
            },
        ]
    },
    {
        id: 'mcaf',
        name: 'McAlexander Fieldhouse',
        images: [firebaseImage('building-images/mcaf.jpeg')],
        rooms: [
            {
                id: 'mcaf-114',
                images: [
                    firebaseImage('room-images/mcaf-114.jpeg')
                ],
                floor: '1',
                capacity: '1650',
                roomType: 'Large Gymnasium',
                searchAliases: ['MCAF 114', 'Large Gymnasium'],
            },
            {
                id: 'mcaf-124',
                images: [
                    firebaseImage('room-images/mcaf-124.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['MCAF 124'],
            },
            {
                id: 'mcaf-209',
                images: [
                    firebaseImage('room-images/mcaf-209.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['MCAF 209'],
            },
            {
                id: 'mcaf-210',
                images: [
                    firebaseImage('room-images/mcaf-210.jpeg')
                ],
                floor: '2',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['MCAF 210'],
            },
            {
                id: 'mcaf-306',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['MCAF 306'],
            },
            {
                id: 'mcaf-307',
                images: [
                    firebaseImage('room-images/mcaf-307.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['MCAF 307'],
            },
        ]
    },
    {
        id: 'mfd',
        name: 'Merryfield Hall',
        images: [firebaseImage('building-images/mfd.jpeg')],
        rooms: [
            {
                id: 'mfd-108',
                images: [
                    firebaseImage('room-images/mfd-108.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Lab Room',
                searchAliases: ['MFD 108'],
            },
            {
                id: 'mfd-112',
                images: [
                    firebaseImage('room-images/mfd-112.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['MFD 112'],
            },
        ]
    },
    {
        id: 'more',
        name: 'Moreland Hall',
        images: [firebaseImage('building-images/more.jpeg')],
        rooms: [
            {
                id: 'more-126',
                images: [
                    firebaseImage('room-images/more-126.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['MORE 126'],
            },
            {
                id: 'more-130B',
                images: [
                    firebaseImage('room-images/more-130B.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['MORE 130B'],
            },
            {
                id: 'more-204C',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['MORE 204C'],
            },
            {
                id: 'more-206',
                images: [
                    firebaseImage('room-images/more-206.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MORE 206'],
            },
            {
                id: 'more-214',
                images: [
                    firebaseImage('room-images/more-214.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['MORE 214'],
            },
            {
                id: 'more-330',
                images: [
                    firebaseImage('room-images/more-330.jpeg')
                ],
                floor: '3',
                capacity: '55',
                roomType: 'Classroom',
                searchAliases: ['MORE 330'],
            },
            {
                id: 'more-332',
                images: [
                    firebaseImage('room-images/more-332.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['MORE 332'],
            },
            {
                id: 'more-334',
                images: [
                    firebaseImage('room-images/more-334.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['MORE 334'],
            },
            {
                id: 'more-362',
                images: [
                    firebaseImage('room-images/more-362.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MORE 362'],
            },
        ]
    },
    {
        id: 'mu',
        name: 'Memorial Union',
        images: [firebaseImage('building-images/mu.jpeg')],
        rooms: [
            {
                id: 'mu-lanes',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Memorial Union Lanes',
                searchAliases: ['MU 0043', 'MU Lanes'],
            },
        ]
    },
    {
        id: 'nash',
        name: 'Nash Hall',
        images: [firebaseImage('building-images/nash.jpeg')],
        rooms: [
            {
                id: 'nash-032',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '42',
                roomType: 'Classroom',
                searchAliases: ['NASH 032'],
            },
            {
                id: 'nash-033',
                images: [
                    firebaseImage('room-images/nash-033.jpeg')
                ],
                floor: '0',
                capacity: '42',
                roomType: 'Classroom',
                searchAliases: ['NASH 033'],
            },
            {
                id: 'nash-104J',
                images: [
                    firebaseImage('room-images/nash-104J.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['NASH 104J'],
            },
            {
                id: 'nash-164',
                images: [
                    firebaseImage('room-images/nash-164.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['NASH 164'],
            },
            {
                id: 'nash-204',
                images: [
                    firebaseImage('room-images/nash-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['NASH 204'],
            },
            {
                id: 'nash-206',
                images: [
                    firebaseImage('room-images/nash-206.jpeg')
                ],
                floor: '2',
                capacity: '82',
                roomType: 'Classroom',
                searchAliases: ['NASH 206'],
            },
            {
                id: 'nash-214',
                images: [
                    firebaseImage('room-images/nash-214.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['NASH 214'],
            },
            {
                id: 'nash-218',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['NASH 218'],
            },
            {
                id: 'nash-234',
                images: [
                    firebaseImage('room-images/nash-234.jpeg')
                ],
                floor: '2',
                capacity: '13',
                roomType: 'Conference Room',
                searchAliases: ['NASH 234'],
            },
            {
                id: 'nash-304',
                images: [
                    firebaseImage('room-images/nash-304.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Lab Room',
                searchAliases: ['NASH 304'],
            },
            {
                id: 'nash-316',
                images: [
                    firebaseImage('room-images/nash-316.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Lab Room',
                searchAliases: ['NASH 316'],
            },
            {
                id: 'nash-318',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['NASH 318'],
            },
            {
                id: 'nash-404',
                images: [
                    firebaseImage('room-images/nash-404.jpeg')
                ],
                floor: '4',
                capacity: '35',
                roomType: 'Conference Room',
                searchAliases: ['NASH 404'],
            },
        ]
    },
    {
        id: 'oao',
        name: 'Oceanography Administration Building',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'oao-106',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['OAO 106'],
            },
        ]
    },
    {
        id: 'oatf',
        name: 'James E. Oldfield Animal Teaching Facility',
        images: [firebaseImage('building-images/oatf.jpeg')],
        rooms: [
            {
                id: 'oatf-106',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['OATF 106'],
            },
            {
                id: 'oatf-108',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['OATF 108'],
            },
            {
                id: 'oatf-109',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['OATF 109'],
            },
            {
                id: 'oatf-112',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '65',
                roomType: 'Classroom',
                searchAliases: ['OATF 112'],
            },
        ]
    },
    {
        id: 'pfsc',
        name: 'George W. Peavy Forest Science Center',
        images: [firebaseImage('building-images/pfsc.jpeg')],
        rooms: [
            {
                id: 'pfsc-104',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['PFSC 104'],
            },
            {
                id: 'pfsc-117',
                images: [
                    firebaseImage('room-images/pfsc-117.jpeg')
                ],
                floor: '1',
                capacity: '118',
                roomType: 'Lecture Hall',
                searchAliases: ['PFSC 117'],
            },
            {
                id: 'pfsc-125',
                images: [
                    firebaseImage('room-images/pfsc-125.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['PFSC 125'],
            },
            {
                id: 'pfsc-129',
                images: [
                    firebaseImage('room-images/pfsc-129.jpeg')
                ],
                floor: '1',
                capacity: '70',
                roomType: 'Classroom',
                searchAliases: ['PFSC 129'],
            },
            {
                id: 'pfsc-177',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['PFSC 177'],
            },
            {
                id: 'pfsc-215',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Computer Lab',
                searchAliases: ['PFSC 215'],
            },
            {
                id: 'pfsc-217',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Computer Lab',
                searchAliases: ['PFSC 217'],
            },
            {
                id: 'pfsc-301',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['PFSC 301'],
            },
            {
                id: 'pfsc-302',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['PFSC 302'],
            },
            {
                id: 'pfsc-315',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['PFSC 315'],
            },
        ]
    },
    {
        id: 'pole',
        name: 'Pole Building',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'pole-Vet-Horse-Barn',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '58',
                roomType: 'Vet Horse Barn',
                searchAliases: ['Pole Vet Horse Barn', 'POLE 0001'],
            },
        ]
    },
    {
        id: 'poling',
        name: 'Poling Hall',
        images: [firebaseImage('building-images/poling.jpeg')],
        rooms: [
            {
                id: 'poling-133',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['POLING 133'],
            },
        ]
    },
    {
        id: 'prax',
        name: 'Patricia Valian Reser Center for the Performing Arts',
        images: [firebaseImage('building-images/prax.jpeg')],
        rooms: [
            {
                id: 'prax-107',
                images: [
                    firebaseImage('room-images/prax-107.jpeg')
                ],
                floor: '1',
                capacity: '22',
                roomType: 'Dressing Room',
                searchAliases: ['PRAX 107', 'Dressing Room'],
            },
            {
                id: 'prax-120',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '351 (150)',
                roomType: 'Unknown (high chance to be a auditorium)',
                searchAliases: ['PRAX 120', 'Auditorium'],
            },
            {
                id: 'prax-143',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '38 (24)',
                roomType: 'Unknown',
                searchAliases: ['PRAX 143'],
            },
            {
                id: 'prax-150',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '596 (433)',
                roomType: 'Unknown (high chance to be a auditorium)',
                searchAliases: ['PRAX 150', 'Auditorium'],
            },
            {
                id: 'prax-234',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '24 (12)',
                roomType: 'Unknown',
                searchAliases: ['PRAX 234'],
            },
        ]
    },
    {
        id: 'rc',
        name: 'Radiation Center',
        images: [firebaseImage('building-images/rc.jpeg')],
        rooms: [
            {
                id: 'rc-104C',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['RC 104C'],
            },
            {
                id: 'rc-104D',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['RC 104D'],
            },
            {
                id: 'rc-118C',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '42',
                roomType: 'Lab Room',
                searchAliases: ['RC 118C'],
            },
            {
                id: 'rc-120C',
                images: [
                    firebaseImage('room-images/rc-120C.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['RC 120C'],
            },
            {
                id: 'rc-124C',
                images: [
                    firebaseImage('room-images/rc-124C.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['RC 124C'],
            },
            {
                id: 'rc-136A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['RC 136A'],
            },
            {
                id: 'rc-300D',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Conference Room',
                searchAliases: ['RC 300D'],
            },
        ]
    },
    {
        id: 'rcb',
        name: 'Rehearsal Classroom Building',
        images: [firebaseImage('building-images/rcb.jpeg')],
        rooms: [
            {
                id: 'rcb-105',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['RCB 105'],
            },
        ]
    },
    {
        id: 'reed',
        name: 'Reed Lodge',
        images: [firebaseImage('building-images/reed.jpeg')],
        rooms: [
            {
                id: 'reed-111',
                images: [
                    firebaseImage('room-images/reed-111.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Computer Lab',
                searchAliases: ['REED 111'],
            },
            {
                id: 'reed-219',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['REED 219'],
            },
            {
                id: 'reed-321',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '11',
                roomType: 'Classroom',
                searchAliases: ['REED 321'],
            },
        ]
    },
    {
        id: 'resr',
        name: 'Reser Stadium',
        images: [firebaseImage('building-images/resr.jpeg')],
        rooms: [
            {
                id: 'resr-100',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '1000',
                roomType: 'Football Field',
                searchAliases: ['RESR 100', 'Football Field'],
            },
            {
                id: 'resr-club',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: 'Club Floor',
                capacity: '250',
                roomType: 'Club Level',
                searchAliases: ['RESR CLUB', 'Reser Club Level'],
            },
            {
                id: 'resr-loge',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: 'Loge Floor',
                capacity: '120',
                roomType: 'Loge Level',
                searchAliases: ['RESR LOGE', 'Reser Loge Level'],
            },
        ]
    },
    {
        id: 'rich',
        name: 'Richardson Hall',
        images: [firebaseImage('building-images/rich.jpeg')],
        rooms: [
            {
                id: 'rich-107',
                images: [
                    firebaseImage('room-images/rich-107.jpeg')
                ],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['RICH 107'],
            },
            {
                id: 'rich-115',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '47',
                roomType: 'Conference Room',
                searchAliases: ['RICH 115'],
            },
            {
                id: 'rich-123',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['RICH 123'],
            },
            {
                id: 'rich-203',
                images: [
                    firebaseImage('room-images/rich-203.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Computer Lab',
                searchAliases: ['RICH 203'],
            },
            {
                id: 'rich-243',
                images: [
                    firebaseImage('room-images/rich-243.jpeg')
                ],
                floor: '2',
                capacity: '51',
                roomType: 'Classroom',
                searchAliases: ['RICH 243'],
            },
            {
                id: 'rich-289',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['RICH 289'],
            },
            {
                id: 'rich-313',
                images: [
                    firebaseImage('room-images/rich-313.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['RICH 313'],
            },
        ]
    },
    {
        id: 'rog',
        name: 'Rogers Hall',
        images: [firebaseImage('building-images/rog.jpeg')],
        rooms: [
            {
                id: 'rog-104',
                images: [
                    firebaseImage('room-images/rog-104.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Lab Room',
                searchAliases: ['ROG 104'],
            },
            {
                id: 'rog-118',
                images: [
                    firebaseImage('room-images/rog-118.jpeg')
                ],
                floor: '1',
                capacity: '73',
                roomType: 'Workshop',
                searchAliases: ['ROG 118'],
            },
            {
                id: 'rog-126',
                images: [
                    firebaseImage('room-images/rog-126.jpeg')
                ],
                floor: '1',
                capacity: '42',
                roomType: 'Lab Room',
                searchAliases: ['ROG 126'],
            },
            {
                id: 'rog-222',
                images: [
                    firebaseImage('room-images/rog-222.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['ROG 222'],
            },
            {
                id: 'rog-226',
                images: [
                    firebaseImage('room-images/rog-226.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['ROG 226'],
            },
            {
                id: 'rog-228',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['ROG 228'],
            },
            {
                id: 'rog-230',
                images: [
                    firebaseImage('room-images/rog-230.jpeg')
                ],
                floor: '2',
                capacity: '74',
                roomType: 'Classroom',
                searchAliases: ['ROG 230'],
            },
            {
                id: 'rog-304',
                images: [
                    firebaseImage('room-images/rog-304.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['ROG 304'],
            },
            {
                id: 'rog-330',
                images: [
                    firebaseImage('room-images/rog-330.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['ROG 330'],
            },
            {
                id: 'rog-332',
                images: [
                    firebaseImage('room-images/rog-332.jpeg')
                ],
                floor: '3',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['ROG 332'],
            },
            {
                id: 'rog-334',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '14',
                roomType: 'Lab Room',
                searchAliases: ['ROG 334'],
            },
            {
                id: 'rog-342',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '31',
                roomType: 'Lab Room',
                searchAliases: ['ROG 342'],
            },
            {
                id: 'rog-440',
                images: [
                    firebaseImage('room-images/rog-440.jpeg')
                ],
                floor: '3',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['ROG 440'],
            },
        ]
    },
    {
        id: 'sec',
        name: 'Student Experience Center',
        images: [firebaseImage('building-images/sec.jpeg')],
        rooms: [
            {
                id: 'sec-354',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['SEC 354'],
            },
            {
                id: 'sec-421',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Media Room',
                searchAliases: ['SEC 421'],
            },
            {
                id: 'sec-plaza',
                images: [
                    firebaseImage('room-images/sec-plaza.jpeg')
                ],
                floor: '1',
                capacity: '1000',
                roomType: 'Plaza',
                searchAliases: ['SEC Plaza'],
            },
        ]
    },
    {
        id: 'shep',
        name: 'Shepherd Hall',
        images: [firebaseImage('building-images/shep.jpeg')],
        rooms: [
            {
                id: 'shep-101',
                images: [
                    firebaseImage('room-images/shep-101.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['SHEP 101'],
            },
            {
                id: 'shep-105',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['SHEP 105'],
            },
            {
                id: 'shep-106',
                images: [
                    firebaseImage('room-images/shep-106.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['SHEP 106'],
            },
            {
                id: 'shep-202',
                images: [
                    firebaseImage('room-images/shep-202.jpeg')
                ],
                floor: '2',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['SHEP 106'],
            },
        ]
    },
    {
        id: 'slp',
        name: 'Student Legacy Park',
        images: [firebaseImage('building-images/slp.jpeg')],
        rooms: [
            {
                id: 'slp-east-fields',
                images: [
                    firebaseImage('room-images/slp-east-fields.jpeg'),
                    firebaseImage('room-images/slp-east-fields2.jpeg'),
                ],
                floor: 'N/A',
                capacity: '100',
                roomType: 'East Fields',
                searchAliases: ['SLP East Fields'],
            },
            {
                id: 'slp-west-fields',
                images: [
                    firebaseImage('room-images/slp-west-fields.jpeg'),
                ],
                floor: 'N/A',
                capacity: '50',
                roomType: 'West Fields',
                searchAliases: ['SLP West Fields'],
            },
        ]
    },
    {
        id: 'snell',
        name: 'Snell Hall',
        images: [firebaseImage('building-images/snell.jpeg')],
        rooms: [
            {
                id: 'snel-0003',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0003'],
            },
            {
                id: 'snel-003',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 003'],
            },
            {
                id: 'snel-0054',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0054'],
            },
            {
                id: 'snel-0056',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0056'],
            },
            {
                id: 'snel-0066',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0066'],
            },
            {
                id: 'snel-0071',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0071'],
            },
            {
                id: 'snel-0073',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0073'],
            },
            {
                id: 'snel-0074',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0074'],
            },
            {
                id: 'snel-0085',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '0',
                capacity: '55',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0085'],
            },
            {
                id: 'snel-100A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['SNEL 100A'],
            },
            {
                id: 'snel-100G',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 100G'],
            },
            {
                id: 'snel-200B',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Computer Lab',
                searchAliases: ['SNEL 200B'],
            },
            {
                id: 'snel-204',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Office Room',
                searchAliases: ['SNEL 204'],
            },
            {
                id: 'snel-448',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '15',
                roomType: 'Classroom',
                searchAliases: ['SNEL 448'],
            },
        ]
    },
    {
        id: 'spav',
        name: 'Stock Judging Pavilion',
        images: [firebaseImage('placeholder.png')],
        rooms: [
            {
                id: 'spav-101',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Unknown',
                searchAliases: ['SPAV 101'],
            },
        ]
    },
    {
        id: 'tens',
        name: 'Tennis Courts (Indoor)',
        images: [firebaseImage('building-images/tens.jpeg')],
        rooms: [
            {
                id: 'tens-101',
                images: [
                    firebaseImage('room-images/tens-101.jpeg')
                ],
                floor: '1',
                capacity: '100',
                roomType: 'Tennis Courts',
                searchAliases: ['TENS 101', 'Tennis Courts'],
            },
        ]
    },
    {
        id: 'tens-crts',
        name: 'Tennis Courts (Outdoor)',
        images: [firebaseImage('building-images/tens-crts.jpeg')],
        rooms: [
            {
                id: 'tens-crts-1',
                images: [
                    firebaseImage('room-images/tens-crts.jpeg')
                ],
                floor: 'N/A',
                capacity: '35',
                roomType: 'Tennis Courts',
                searchAliases: ['Tennis Courts'],
            },
        ]
    },
    {
        id: 'vlib',
        name: 'Valley Library',
        images: [firebaseImage('building-images/vlib.jpeg')],
        rooms: [
            {
                id: 'vlib-2024',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Computer Lab',
                searchAliases: ['VLIB 2024'],
            },
            {
                id: 'vlib-2082',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '80',
                roomType: 'Autzen Room',
                searchAliases: ['VLIB 2082', 'Autzen Room'],
            },
            {
                id: 'vlib-3622',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Willamette East/West Seminar Rooms',
                searchAliases: ['VLIB 3622', 'Willamette East/West Seminar Rooms'],
            },
            {
                id: 'vlib-5420',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '5',
                capacity: '15',
                roomType: 'Unknown',
                searchAliases: ['VLIB 5420'],
            },
        ]
    },
    {
        id: 'wald',
        name: 'Waldo Hall',
        images: [firebaseImage('building-images/wald.jpeg')],
        rooms: [
            {
                id: 'wald-120',
                images: [
                    firebaseImage('room-images/wald-120.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['WALD 120'],
            },
            {
                id: 'wald-132',
                images: [
                    firebaseImage('room-images/wald-132.jpeg')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['WALD 132'],
            },
            {
                id: 'wald-200',
                images: [
                    firebaseImage('room-images/wald-200.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WALD 200'],
            },
            {
                id: 'wald-201',
                images: [
                    firebaseImage('room-images/wald-201.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['WALD 201'],
            },
            {
                id: 'wald-201A',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '37',
                roomType: 'Classroom',
                searchAliases: ['WALD 201A'],
            },
            {
                id: 'wald-240',
                images: [
                    firebaseImage('room-images/wald-240.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WALD 240'],
            },
            {

                id: 'wald-244',
                images: [
                    firebaseImage('room-images/wald-244.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WALD 244'],
            },
            {
                id: 'wald-252',
                images: [
                    firebaseImage('room-images/wald-252.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['WALD 252'],
            },
            {

                id: 'wald-329',
                images: [
                    firebaseImage('room-images/wald-329.jpeg')
                ],
                floor: '3',
                capacity: '21',
                roomType: 'Classroom',
                searchAliases: ['WALD 329'],
            },
            {

                id: 'wald-421',
                images: [
                    firebaseImage('room-images/wald-421.jpeg')
                ],
                floor: '4',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['WALD 421'],
            },
            {

                id: 'wald-432',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['WALD 432'],
            },
            {

                id: 'wald-456',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '33',
                roomType: 'Classroom',
                searchAliases: ['WALD 456'],
            },
        ]
    },
    {
        id: 'wfd',
        name: 'Weatherford Hall',
        images: [firebaseImage('building-images/wfd.jpeg')],
        rooms: [
            {
                id: 'wfd-EG01',
                images: [
                    firebaseImage('room-images/wfd-eg01.jpeg')
                ],
                floor: '1',
                capacity: '41',
                roomType: 'Classroom',
                searchAliases: ['WFD EG01'],
            },
        ]
    },
    {
        id: 'with',
        name: 'Withycombe Hall',
        images: [firebaseImage('building-images/with.jpeg')],
        rooms: [
            {
                id: 'with-062',
                images: [
                    firebaseImage('room-images/with-062.jpeg')
                ],
                floor: '0',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['WITH 062'],
            },
            {
                id: 'with-064',
                images: [
                    firebaseImage('room-images/with-064.jpeg')
                ],
                floor: '0',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['WITH 064'],
            },
            {
                id: 'with-074',
                images: [
                    firebaseImage('room-images/with-074.jpeg')
                ],
                floor: '0',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['WITH 074'],
            },
            {
                id: 'with-153',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '362',
                roomType: 'Auditorium',
                searchAliases: ['WITH 153'],
            },
            {
                id: 'with-155',
                images: [
                    firebaseImage('room-images/with-155.jpeg')
                ],
                floor: '1',
                capacity: '217',
                roomType: 'Lecture Hall',
                searchAliases: ['WITH 155'],
            },
            {
                id: 'with-159',
                images: [
                    firebaseImage('room-images/with-159.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WITH 159'],
            },
            {
                id: 'with-159C',
                images: [
                    firebaseImage('room-images/with-159C.jpeg')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['WITH 159C'],
            },
            {
                id: 'with-161C',
                images: [
                    firebaseImage('room-images/with-161C.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Makeup Room',
                searchAliases: ['WITH 161C', 'Makeup Room'],
            },
            {
                id: 'with-165',
                images: [
                    firebaseImage('room-images/with-165.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WITH 165'],
            },
            {
                id: 'with-167',
                images: [
                    firebaseImage('room-images/with-167.jpeg')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Dressing Room',
                searchAliases: ['WITH 167', 'Dressing Room'],
            },
            {
                id: 'with-199',
                images: [
                    firebaseImage('room-images/with-199.jpeg')
                ],
                floor: '1',
                capacity: '120',
                roomType: 'Small Performance Theater',
                searchAliases: ['WITH 199', 'Small Performance Theater'],
            },
            {
                id: 'with-201',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '23',
                roomType: 'Conference Room',
                searchAliases: ['WITH 201'],
            },
            {
                id: 'with-203',
                images: [
                    firebaseImage('room-images/with-203.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['WITH 203'],
            },
        ]
    },
    {
        id: 'wlkn',
        name: 'Wilkinson Hall',
        images: [firebaseImage('building-images/wlkn.jpeg')],
        rooms: [
            {
                id: 'wlkn-004',
                images: [
                    firebaseImage('room-images/wlkn-004.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 004'],
            },
            {
                id: 'wlkn-010',
                images: [
                    firebaseImage('room-images/wlkn-010.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 010'],
            },
            {
                id: 'wlkn-106',
                images: [
                    firebaseImage('room-images/wlkn-106.jpeg')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 106'],
            },
            {
                id: 'wlkn-108',
                images: [
                    firebaseImage('room-images/wlkn-108.jpeg')
                ],
                floor: '1',
                capacity: '65',
                roomType: 'Classroom',
                searchAliases: ['WLKN 108'],
            },
            {
                id: 'wlkn-110',
                images: [
                    firebaseImage('room-images/wlkn-110.jpeg')
                ],
                floor: '1',
                capacity: '299',
                roomType: 'Lecture Hall',
                searchAliases: ['WLKN 110', 'Gilfillan Auditorium'],
            },
            {
                id: 'wlkn-127',
                images: [
                    firebaseImage('room-images/wlkn-127.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['WLKN 127'],
            },
            {
                id: 'wlkn-129',
                images: [
                    firebaseImage('room-images/wlkn-129.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 129'],
            },
            {
                id: 'wlkn-203',
                images: [
                    firebaseImage('room-images/wlkn-203.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Conference Room',
                searchAliases: ['WLKN 203'],
            },
            {
                id: 'wlkn-207',
                images: [
                    firebaseImage('room-images/wlkn-207.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['WLKN 207'],
            },
            {
                id: 'wlkn-210',
                images: [
                    firebaseImage('room-images/wlkn-210.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Computer Lab',
                searchAliases: ['WLKN 210'],
            },
            {
                id: 'wlkn-235',
                images: [
                    firebaseImage('room-images/wlkn-235.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['WLKN 235'],
            },
        ]
    },
    {
        id: 'wngr',
        name: 'Weniger Hall',
        images: [firebaseImage('building-images/wngr.jpeg')],
        rooms: [
            {
                id: 'wngr-112',
                images: [
                    firebaseImage('room-images/wngr-112.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 112'],
            },
            {
                id: 'wngr-116',
                images: [
                    firebaseImage('room-images/wngr-116.jpeg')
                ],
                floor: '1',
                capacity: '100',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 116'],
            },
            {
                id: 'wngr-127',
                images: [
                    firebaseImage('room-images/wngr-127.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 127'],
            },
            {
                id: 'wngr-129',
                images: [
                    firebaseImage('room-images/wngr-129.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 129'],
            },
            {
                id: 'wngr-145',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 145'],
            },
            {
                id: 'wngr-149',
                images: [
                    firebaseImage('room-images/wngr-149.jpeg')
                ],
                floor: '1',
                capacity: '78',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 149'],
            },
            {
                id: 'wngr-151',
                images: [
                    firebaseImage('room-images/wngr-151.jpeg')
                ],
                floor: '1',
                capacity: '201',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 151'],
            },
            {
                id: 'wngr-153',
                images: [
                    firebaseImage('room-images/wngr-153.jpeg')
                ],
                floor: '1',
                capacity: '128',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 153'],
            },
            {
                id: 'wngr-200',
                images: [
                    firebaseImage('room-images/wngr-200.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 200'],
            },
            {
                id: 'wngr-201',
                images: [
                    firebaseImage('room-images/wngr-201.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['WNGR 201'],
            },
            {
                id: 'wngr-204',
                images: [
                    firebaseImage('room-images/wngr-204.jpeg')
                ],
                floor: '2',
                capacity: '35 (30)',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 204'],
            },
            {
                id: 'wngr-206',
                images: [
                    firebaseImage('room-images/wngr-206.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Computer Lab',
                searchAliases: ['WNGR 206'],
            },
            {
                id: 'wngr-212',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '94',
                roomType: 'Classroom',
                searchAliases: ['WNGR 212'],
            },
            {
                id: 'wngr-222',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['WNGR 222'],
            },
            {
                id: 'wngr-226',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 226'],
            },
            {
                id: 'wngr-228',
                images: [
                    firebaseImage('room-images/wngr-228.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['WNGR 228'],
            },
            {
                id: 'wngr-232',
                images: [
                    firebaseImage('room-images/wngr-232.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 232'],
            },
            {
                id: 'wngr-234',
                images: [
                    firebaseImage('room-images/wngr-234.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 234'],
            },
            {
                id: 'wngr-238',
                images: [
                    firebaseImage('room-images/wngr-238.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 238'],
            },
            {
                id: 'wngr-245',
                images: [
                    firebaseImage('room-images/wngr-245.jpeg')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 245'],
            },
            {
                id: 'wngr-247',
                images: [
                    firebaseImage('room-images/wngr-247.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['WNGR 247'],
            },
            {
                id: 'wngr-275',
                images: [
                    firebaseImage('room-images/wngr-275.jpeg')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['WNGR 275'],
            },
            {
                id: 'wngr-285',
                images: [
                    firebaseImage('room-images/wngr-285.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['WNGR 285'],
            },
            {
                id: 'wngr-287',
                images: [
                    firebaseImage('room-images/wngr-287.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['WNGR 287'],
            },
            {
                id: 'wngr-300',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 300'],
            },
            {
                id: 'wngr-302',
                images: [
                    firebaseImage('room-images/wngr-302.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 302'],
            },
            {
                id: 'wngr-304',
                images: [
                    firebaseImage('room-images/wngr-304.jpeg')
                ],
                floor: '3',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['WNGR 304'],
            },
            {
                id: 'wngr-304F',
                images: [
                    firebaseImage('room-images/wngr-304F.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Computer Lab',
                searchAliases: ['WNGR 304F'],
            },
            {
                id: 'wngr-305',
                images: [
                    firebaseImage('room-images/wngr-305.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 305'],
            },
            {
                id: 'wngr-328',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['WNGR 328'],
            },
            {
                id: 'wngr-334',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '3',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 334'],
            },
            {
                id: 'wngr-345',
                images: [
                    firebaseImage('room-images/wngr-345.jpeg')
                ],
                floor: '3',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['WNGR 345'],
            },
            {
                id: 'wngr-377',
                images: [
                    firebaseImage('room-images/wngr-377.jpeg')
                ],
                floor: '3',
                capacity: '21',
                roomType: 'Classroom',
                searchAliases: ['WNGR 377'],
            },
            {
                id: 'wngr-412',
                images: [
                    firebaseImage('placeholder.png')
                ],
                floor: '4',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 412'],
            },
            {
                id: 'wngr-426',
                images: [
                    firebaseImage('room-images/wngr-426.jpeg')
                ],
                floor: '4',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 426'],
            },
        ]
    },
    {
        id: 'backrooms',
        name: 'The Backrooms',
        images: [firebaseImage('building-images/backrooms.jpeg')],
        rooms: [
            {
                id: 'the-backrooms',
                images: [
                    firebaseImage('room-images/the-backrooms-1.jpeg'),
                    firebaseImage('room-images/the-backrooms-2.jpeg'),
                    firebaseImage('room-images/the-backrooms-3.jpeg'),
                    firebaseImage('room-images/the-backrooms-4.jpeg'),
                    firebaseImage('room-images/the-backrooms-5.jpeg'),
                    firebaseImage('room-images/the-backrooms-6.jpeg'),
                    firebaseImage('room-images/the-backrooms-7.jpeg'),
                    firebaseImage('room-images/the-backrooms-8.jpeg'),
                    firebaseImage('room-images/the-backrooms-9.jpeg'),
                    firebaseImage('room-images/the-backrooms-10.jpeg'),
                    firebaseImage('room-images/the-backrooms-11.jpeg'),
                    firebaseImage('room-images/the-backrooms-12.jpeg'),
                    firebaseImage('room-images/the-backrooms-13.jpeg'),
                    firebaseImage('room-images/the-backrooms-14.jpeg'),
                    firebaseImage('room-images/the-backrooms-15.jpeg'),
                    firebaseImage('room-images/the-backrooms-16.jpeg'),
                    firebaseImage('room-images/the-backrooms-17.jpeg'),
                    firebaseImage('room-images/the-backrooms-18.jpeg'),
                    firebaseImage('room-images/the-backrooms-19.jpeg'),
                ],
                floor: '-1',
                capacity: 'Infinite',
                roomType: 'Alternate dimension',
                searchAliases: ['THE BACKROOMS', 'Yellow place', 'no clip'],
            },
        ]
    }
];

export function getRoomById(roomId: string): (Room & { building: string, name: string }) | null {
    for (const building of BUILDINGS_DATA) {
        const room = building.rooms.find(r => r.id === roomId);
        if (room) {
            const name = room.id.split('-').pop() || '???';
            return { ...room, building: building.name, name };
        }
    }
    return null;
}
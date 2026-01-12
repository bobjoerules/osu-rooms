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
    rooms: Room[];
}

export const BUILDINGS_DATA: Building[] = [
    {
        id: 'owen',
        name: 'Owen Hall',
        rooms: [
            {
                id: 'owen-hall-101',
                images: [
                    require('../assets/images/rooms/owen-hall-101.jpeg'),
                ],
                floor: '1',
                capacity: '84',
                roomType: 'Classroom',
                searchAliases: ['Owen 101'],
            },
            {
                id: 'owen-hall-102',
                images: [
                    require('../assets/images/rooms/owen-hall-102.jpeg'),
                ],
                floor: '1',
                capacity: '94',
                roomType: 'Lecture Hall',
                searchAliases: ['Owen 102'],
            },
            {
                id: 'owen-hall-106',
                images: [
                    require('../assets/images/rooms/owen-hall-106.jpeg'),
                ],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['Owen 106'],
            },
            {
                id: 'owen-hall-109',
                images: [
                    require('../assets/images/rooms/owen-hall-109.jpeg')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Lab Classroom',
                searchAliases: ['Owen 109'],
            },
            {
                id: 'owen-hall-110',
                images: [
                    require('../assets/images/rooms/owen-hall-110.jpeg')
                ],
                floor: '1',
                capacity: '41',
                roomType: 'Classroom',
                searchAliases: ['Owen 110', 'Survey Lab'],
            },
            {
                id: 'owen-hall-217',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '13',
                roomType: 'Lab Room',
                searchAliases: ['Owen 217', 'Photogrammetry Lab'],
            },
            {
                id: 'owen-hall-224',
                images: [
                    require('../assets/images/rooms/owen-hall-224.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Meeting Room',
                searchAliases: ['Owen 224'],
            },
            {
                id: 'owen-hall-237',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '41',
                roomType: 'Unknown',
                searchAliases: ['Owen 237'],
            },
            {
                id: 'owen-hall-241',
                images: [
                    require('../assets/images/rooms/owen-hall-241.jpeg')
                ],
                floor: '2',
                capacity: '63',
                roomType: 'Computer Room',
                searchAliases: ['Owen 241'],
            },
            {
                id: 'owen-hall-424',
                images: [
                    require('../assets/images/rooms/owen-hall-424.jpeg')
                ],
                floor: '4',
                capacity: '12',
                roomType: 'Meeting Room',
                searchAliases: ['Owen 424'],
            },
            {
                id: 'owen-hall-433',
                images: [
                    require('../assets/images/rooms/owen-hall-433.jpeg')
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
        rooms: [
            {
                id: 'linc-100',
                images: [
                    require('../assets/images/rooms/linc-100.jpeg')
                ],
                floor: '1',
                capacity: '588',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 100'],
            },
            {
                id: 'linc-128',
                images: [
                    require('../assets/images/rooms/linc-128.jpeg')
                ],
                floor: '1',
                capacity: '395',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 128'],
            },
            {
                id: 'linc-200',
                images: [
                    require('../assets/images/rooms/linc-200.jpeg')
                ],
                floor: '2',
                capacity: '174',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 200'],
            },
            {
                id: 'linc-210',
                images: [
                    require('../assets/images/rooms/linc-210.jpeg')
                ],
                floor: '2',
                capacity: '225',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 210'],
            },
            {
                id: 'linc-228',
                images: [
                    require('../assets/images/rooms/linc-228.jpeg')
                ],
                floor: '2',
                capacity: '277',
                roomType: 'Round Lecture Hall',
                searchAliases: ['LINC 228'],
            },
            {
                id: 'linc-268',
                images: [
                    require('../assets/images/rooms/linc-268.jpeg')
                ],
                floor: '2',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['LINC 268'],
            },
            {
                id: 'linc-302',
                images: [
                    require('../assets/images/rooms/linc-302.jpeg')
                ],
                floor: '3',
                capacity: '96',
                roomType: 'Lecture Hall',
                searchAliases: ['LINC 302'],
            },
            {
                id: 'linc-303',
                images: [
                    require('../assets/images/rooms/linc-303.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Collaborative Pods',
                searchAliases: ['LINC 303'],
            },
            {
                id: 'linc-307',
                images: [
                    require('../assets/images/rooms/linc-307.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Collaborative Pods',
                searchAliases: ['LINC 307'],
            },
            {
                id: 'linc-314',
                images: [
                    require('../assets/images/rooms/linc-314.jpeg')
                ],
                floor: '3',
                capacity: '60',
                roomType: 'U-Shaped Lecture Hall',
                searchAliases: ['LINC 314'],
            },
            {
                id: 'linc-343',
                images: [
                    require('../assets/images/rooms/linc-343.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LINC 343'],
            },
            {
                id: 'linc-345',
                images: [
                    require('../assets/images/rooms/linc-345.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LINC 345'],
            },
            {
                id: 'linc-350',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['LINC 350'],
            },
            {
                id: 'linc-360',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['LINC 360'],
            },
            {
                id: 'linc-368',
                images: [
                    require('../assets/images/rooms/linc-368.jpeg')
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
        rooms: [
            {
                id: 'wgnd-106',
                images: [
                    require('../assets/images/rooms/wgnd-106.jpeg')
                ],
                floor: '1',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['WGND 106'],
            },
            {
                id: 'wgnd-115',
                images: [
                    require('../assets/images/rooms/wgnd-115.jpeg')
                ],
                floor: '1',
                capacity: '217',
                roomType: 'Lecture Hall',
                searchAliases: ['WGND 115'],
            },
            {
                id: 'wgnd-118',
                images: [
                    require('../assets/images/rooms/wgnd-118.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Lab Classroom',
                searchAliases: ['WGND 118'],
            },
            {
                id: 'wgnd-120',
                images: [
                    require('../assets/images/rooms/wgnd-120.jpeg')
                ],
                floor: '1',
                capacity: '10',
                roomType: 'Food Lab',
                searchAliases: ['WGND 120'],
            },
            {
                id: 'wgnd-126',
                images: [
                    require('../assets/images/rooms/wgnd-126.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Lab Room',
                searchAliases: ['WGND 126'],
            },
            {
                id: 'wgnd-130',
                images: [
                    require('../assets/images/rooms/wgnd-130.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WGND 130'],
            },
            {
                id: 'wgnd-132',
                images: [
                    require('../assets/images/rooms/wgnd-132.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['WGND 132'],
            },
            {
                id: 'wgnd-206',
                images: [
                    require('../assets/images/rooms/wgnd-206.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['WGND 206'],
            },
            {
                id: 'wgnd-238',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'phar-107',
                images: [
                    require('../assets/images/rooms/phar-107.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['PHAR 107'],
            },
            {
                id: 'phar-213',
                images: [
                    require('../assets/images/rooms/phar-213.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Meeting Room',
                searchAliases: ['PHAR 213'],
            },
            {
                id: 'phar-219',
                images: [
                    require('../assets/images/rooms/phar-219.jpeg')
                ],
                floor: '2',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['PHAR 219'],
            },
            {
                id: 'phar-227',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Lab Room',
                searchAliases: ['PHAR 227'],
            },
            {
                id: 'phar-237',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['PHAR 237'],
            },
            {
                id: 'phar-305',
                images: [
                    require('../assets/images/rooms/phar-305.jpeg')
                ],
                floor: '3',
                capacity: '149',
                roomType: 'Lecture Hall',
                searchAliases: ['PHAR 305'],
            },
            {
                id: 'phar-329',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'cord-1100',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Unknown',
                searchAliases: ['CORD 1100'],
            },
            {
                id: 'cord-1112',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1112'],
            },
            {
                id: 'cord-1200',
                images: [
                    require('../assets/images/rooms/cord-1200.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1200'],
            },
            {
                id: 'cord-1210',
                images: [
                    require('../assets/images/rooms/cord-1210.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1210'],
            },
            {
                id: 'cord-1302',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1302'],
            },
            {
                id: 'cord-1316',
                images: [
                    require('../assets/images/rooms/cord-1316.jpeg')
                ],
                floor: '1',
                capacity: '211',
                roomType: 'Lecture Hall',
                searchAliases: ['CORD 1316'],
            },
            {
                id: 'cord-1424',
                images: [
                    require('../assets/images/rooms/cord-1424.jpeg')
                ],
                floor: '1',
                capacity: '45',
                roomType: 'Classroom',
                searchAliases: ['CORD 1424'],
            },
            {
                id: 'cord-1506',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1506'],
            },
            {
                id: 'cord-1518',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1518'],
            },
            {
                id: 'cord-1604',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '37',
                roomType: 'Lab Room',
                searchAliases: ['CORD 1604'],
            },
            {
                id: 'cord-1616',
                images: [
                    require('../assets/images/rooms/cord-1616.jpeg')
                ],
                floor: '1',
                capacity: '60',
                roomType: 'Classroom',
                searchAliases: ['CORD 1616'],
            },
            {
                id: 'cord-2200',
                images: [
                    require('../assets/images/rooms/cord-2200.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Classroom',
                searchAliases: ['CORD 2200'],
            },
            {
                id: 'cord-2212',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2212'],
            },
            {
                id: 'cord-2306',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2306'],
            },
            {
                id: 'cord-2316',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2316'],
            },
            {
                id: 'cord-2406',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['CORD 2406'],
            },
            {
                id: 'cord-2414',
                images: [
                    require('../assets/images/rooms/cord-2414.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Conference Room',
                searchAliases: ['CORD 2414'],
            },
            {
                id: 'cord-2602',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['CORD 2602'],
            },
            {
                id: 'cord-4629',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'mlm-006',
                images: [
                    require('../assets/images/rooms/mlm-006.jpeg')
                ],
                floor: '0',
                capacity: '16',
                roomType: 'Lab Room',
                searchAliases: ['MLM 006'],
            },
            {
                id: 'mlm-019',
                images: [
                    require('../assets/images/rooms/mlm-019.jpeg')
                ],
                floor: '0',
                capacity: '69',
                roomType: 'Classroom',
                searchAliases: ['MLM 019'],
            },
            {
                id: 'mlm-026',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: 'Unknown',
                roomType: 'Lecture Hall',
                searchAliases: ['MLM 026'],
            },
            {
                id: 'mlm-031A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '14',
                roomType: 'Lab Room',
                searchAliases: ['MLM 031A'],
            },
            {
                id: 'mlm-033',
                images: [
                    require('../assets/images/rooms/mlm-033.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 033'],
            },
            {
                id: 'mlm-119',
                images: [
                    require('../assets/images/rooms/mlm-119.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Conference Room',
                searchAliases: ['MLM 119'],
            },
            {
                id: 'mlm-123',
                images: [
                    require('../assets/images/rooms/mlm-123.jpeg')
                ],
                floor: '1',
                capacity: '62',
                roomType: 'Classroom',
                searchAliases: ['MLM 123'],
            },
            {
                id: 'mlm-159',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['MLM 159'],
            },
            {
                id: 'mlm-202',
                images: [
                    require('../assets/images/rooms/mlm-202.jpeg')
                ],
                floor: '2',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['MLM 202'],
            },
            {
                id: 'mlm-203',
                images: [
                    require('../assets/images/rooms/mlm-203.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['MLM 203'],
            },
            {
                id: 'mlm-205',
                images: [
                    require('../assets/images/rooms/mlm-205.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Lab Room',
                searchAliases: ['MLM 205'],
            },
            {
                id: 'mlm-206',
                images: [
                    require('../assets/images/rooms/mlm-206.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['MLM 206'],
            },
            {
                id: 'mlm-213',
                images: [
                    require('../assets/images/rooms/mlm-213.jpeg')
                ],
                floor: '2',
                capacity: '61',
                roomType: 'Classroom',
                searchAliases: ['MLM 213'],
            },
            {
                id: 'mlm-215',
                images: [
                    require('../assets/images/rooms/mlm-215.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 215'],
            },
            {
                id: 'mlm-218',
                images: [
                    require('../assets/images/rooms/mlm-218.jpeg')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['MLM 218'],
            },
            {
                id: 'mlm-233',
                images: [
                    require('../assets/images/rooms/mlm-233.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Lab Room',
                searchAliases: ['MLM 233'],
            },
            {
                id: 'mlm-234',
                images: [
                    require('../assets/images/rooms/mlm-234.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 234'],
            },
            {
                id: 'mlm-236',
                images: [
                    require('../assets/images/rooms/mlm-236.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['MLM 236'],
            },
            {
                id: 'mlm-301',
                images: [
                    require('../assets/images/rooms/mlm-301.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Meeting Room',
                searchAliases: ['MLM 301'],
            },
            {
                id: 'mlm-318',
                images: [
                    require('../assets/images/rooms/mlm-318.jpeg')
                ],
                floor: '3',
                capacity: '64',
                roomType: 'Classroom',
                searchAliases: ['MLM 318'],
            },
            {
                id: 'mlm-319',
                images: [
                    require('../assets/images/rooms/mlm-319.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 319'],
            },
            {
                id: 'mlm-319A',
                images: [
                    require('../assets/images/rooms/mlm-319a.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['MLM 319A'],
            },
            {
                id: 'mlm-332',
                images: [
                    require('../assets/images/rooms/mlm-332.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 332'],
            },
            {
                id: 'mlm-335',
                images: [
                    require('../assets/images/rooms/mlm-335.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MLM 335'],
            },
            {
                id: 'mlm-336',
                images: [
                    require('../assets/images/rooms/mlm-336.jpeg')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['MLM 336'],
            },
            {
                id: 'mlm-337',
                images: [
                    require('../assets/images/rooms/mlm-337.jpeg')
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
        rooms: [
            {
                id: 'casc-118',
                images: [
                    require('../assets/images/rooms/casc-118.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['CASC 118'],
            },
            {
                id: 'casc-120',
                images: [
                    require('../assets/images/rooms/casc-120.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['CASC 120'],
            },
            {
                id: 'casc-134',
                images: [
                    require('../assets/images/rooms/casc-134.jpeg')
                ],
                floor: '1',
                capacity: '31',
                roomType: 'Classroom',
                searchAliases: ['CASC 134'],
            },
            {
                id: 'casc-135',
                images: [
                    require('../assets/images/rooms/casc-135.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['CASC 135'],
            },
            {
                id: 'casc-137',
                images: [
                    require('../assets/images/rooms/casc-137.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['CASC 137'],
            },
            {
                id: 'casc-139',
                images: [
                    require('../assets/images/rooms/casc-139.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['CASC 139'],
            },
            {
                id: 'casc-141',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '31',
                roomType: 'Classroom',
                searchAliases: ['CASC 141'],
            },
            {
                id: 'casc-143',
                images: [
                    require('../assets/images/rooms/casc-143.jpeg')
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
        rooms: [
            {
                id: 'stag-110',
                images: [
                    require('../assets/images/rooms/stag-110.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 110'],
            },
            {
                id: 'stag-111',
                images: [
                    require('../assets/images/rooms/stag-111.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 111'],
            },
            {
                id: 'stag-112',
                images: [
                    require('../assets/images/rooms/stag-112.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['STAG 112'],
            },
            {
                id: 'stag-113',
                images: [
                    require('../assets/images/rooms/stag-113.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 113'],
            },
            {
                id: 'stag-118',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '13',
                roomType: 'Unknown',
                searchAliases: ['STAG 118'],
            },
            {
                id: 'stag-131',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['STAG 131'],
            },
            {
                id: 'stag-160',
                images: [
                    require('../assets/images/rooms/stag-160.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 160'],
            },
            {
                id: 'stag-161',
                images: [
                    require('../assets/images/rooms/stag-161.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 161'],
            },
            {
                id: 'stag-162',
                images: [
                    require('../assets/images/rooms/stag-162.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 162'],
            },
            {
                id: 'stag-163',
                images: [
                    require('../assets/images/rooms/stag-163.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 163'],
            },
            {
                id: 'stag-210',
                images: [
                    require('../assets/images/rooms/stag-210.jpeg')
                ],
                floor: '2',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 210'],
            },
            {
                id: 'stag-211',
                images: [
                    require('../assets/images/rooms/stag-211.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 211'],
            },
            {
                id: 'stag-212',
                images: [
                    require('../assets/images/rooms/stag-212.jpeg')
                ],
                floor: '2',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['STAG 212'],
            },
            {
                id: 'stag-213',
                images: [
                    require('../assets/images/rooms/stag-213.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 213'],
            },
            {
                id: 'stag-240',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['STAG 240'],
            },
            {
                id: 'stag-260',
                images: [
                    require('../assets/images/rooms/stag-260.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['STAG 260'],
            },
            {
                id: 'stag-261',
                images: [
                    require('../assets/images/rooms/stag-261.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 261'],
            },
            {
                id: 'stag-262',
                images: [
                    require('../assets/images/rooms/stag-262.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['STAG 262'],
            },
            {
                id: 'stag-263',
                images: [
                    require('../assets/images/rooms/stag-263.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['STAG 263'],
            },
            {
                id: 'stag-311',
                images: [
                    require('../assets/images/rooms/stag-311.jpeg')
                ],
                floor: '3',
                capacity: '39',
                roomType: 'Classroom',
                searchAliases: ['STAG 311'],
            },
            {
                id: 'stag-313',
                images: [
                    require('../assets/images/rooms/stag-313.jpeg')
                ],
                floor: '3',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['STAG 313'],
            },
            {
                id: 'stag-340',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['STAG 340'],
            },
            {
                id: 'stag-361',
                images: [
                    require('../assets/images/rooms/stag-361.jpeg')
                ],
                floor: '3',
                capacity: '31',
                roomType: 'Computer Lab/Classroom',
                searchAliases: ['STAG 361'],
            },
            {
                id: 'stag-363',
                images: [
                    require('../assets/images/rooms/stag-363.jpeg')
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
        rooms: [
            {
                id: 'als-0006',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '43',
                roomType: 'Classroom',
                searchAliases: ['ALS 0006'],
            },
            {
                id: 'als-0007',
                images: [
                    require('../assets/images/rooms/als-0007.jpeg')
                ],
                floor: '0',
                capacity: '31',
                roomType: 'Lab Room',
                searchAliases: ['ALS 0007'],
            },
            {
                id: 'als-0012',
                images: [
                    require('../assets/images/rooms/als-0012.jpeg')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Classroom',
                searchAliases: ['ALS 0012'],
            },
            {
                id: 'als-0018',
                images: [
                    require('../assets/images/rooms/als-0018.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['ALS 0018'],
            },
            {
                id: 'als-0023',
                images: [
                    require('../assets/images/rooms/als-0023.jpeg')
                ],
                floor: '0',
                capacity: '63',
                roomType: 'Lab Room',
                searchAliases: ['ALS 0023'],
            },
            {
                id: 'als-1019A',
                images: [
                    require('../assets/images/rooms/als-1019A.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019A'],
            },
            {
                id: 'als-1019B',
                images: [
                    require('../assets/images/rooms/als-1019B.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019B'],
            },
            {
                id: 'als-1019C',
                images: [
                    require('../assets/images/rooms/als-1019C.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['ALS 1019C'],
            },
            {
                id: 'als-2009A',
                images: [
                    require('../assets/images/rooms/als-2009A.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2009A'],
            },
            {
                id: 'als-2018',
                images: [
                    require('../assets/images/rooms/als-2018.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['ALS 2018'],
            },
            {
                id: 'als-2034',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2034'],
            },
            {
                id: 'als-2040',
                images: [
                    require('../assets/images/rooms/als-2040.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['ALS 2040'],
            },
            {
                id: 'als-2114',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Unknown',
                searchAliases: ['ALS 2114'],
            },
            {
                id: 'als-2116',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Unknown',
                searchAliases: ['ALS 2116'],
            },
            {
                id: 'als-3005',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '47',
                roomType: 'Classroom',
                searchAliases: ['ALS 3005'],
            },
            {
                id: 'als-3006A',
                images: [
                    require('../assets/images/rooms/als-3006A.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['ALS 3006A'],
            },
            {
                id: 'als-3096',
                images: [
                    require('../assets/images/rooms/als-3096.jpeg')
                ],
                floor: '3',
                capacity: '18',
                roomType: 'Conference Room',
                searchAliases: ['ALS 3096'],
            },
            {
                id: 'als-4000',
                images: [
                    require('../assets/images/rooms/als-4000.jpeg')
                ],
                floor: '4',
                capacity: '65',
                roomType: 'Classroom',
                searchAliases: ['ALS 4000'],
            },
            {
                id: 'als-4001',
                images: [
                    require('../assets/images/rooms/als-4001.jpeg')
                ],
                floor: '4',
                capacity: '96',
                roomType: 'Lecture Hall',
                searchAliases: ['ALS 4001'],
            },
            {
                id: 'als-4009',
                images: [
                    require('../assets/images/rooms/als-4009.jpeg')
                ],
                floor: '4',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['ALS 4009'],
            },
            {
                id: 'als-4103',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['ALS 4103'],
            },
            {
                id: 'als-4120B',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'bexl-100M',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Computer Lab',
                searchAliases: ['BEXL 100M'],
            },
            {
                id: 'bexl-103',
                images: [
                    require('../assets/images/rooms/bexl-103.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Colab Classroom',
                searchAliases: ['BEXL 103'],
            },
            {
                id: 'bexl-120',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['BEXL 120'],
            },
            {
                id: 'bexl-207',
                images: [
                    require('../assets/images/rooms/bexl-207.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['BEXL 207'],
            },
            {
                id: 'bexl-211',
                images: [
                    require('../assets/images/rooms/bexl-211.jpeg')
                ],
                floor: '2',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 211'],
            },
            {
                id: 'bexl-320',
                images: [
                    require('../assets/images/rooms/bexl-320.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['BEXL 320'],
            },
            {
                id: 'bexl-321',
                images: [
                    require('../assets/images/rooms/bexl-321.jpeg')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 321'],
            },
            {
                id: 'bexl-322',
                images: [
                    require('../assets/images/rooms/bexl-322.jpeg')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['BEXL 322'],
            },
            {
                id: 'bexl-323',
                images: [
                    require('../assets/images/rooms/bexl-323.jpeg')
                ],
                floor: '3',
                capacity: '36',
                roomType: 'Collab Classroom',
                searchAliases: ['BEXL 323'],
            },
            {
                id: 'bexl-324',
                images: [
                    require('../assets/images/rooms/bexl-324.jpeg')
                ],
                floor: '3',
                capacity: '45',
                roomType: 'Computer Classroom',
                searchAliases: ['BEXL 324'],
            },
            {
                id: 'bexl-326',
                images: [
                    require('../assets/images/rooms/bexl-326.jpeg')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 326'],
            },
            {
                id: 'bexl-328',
                images: [
                    require('../assets/images/rooms/bexl-328.jpeg')
                ],
                floor: '3',
                capacity: '37',
                roomType: 'U-Shaped Classroom',
                searchAliases: ['BEXL 328'],
            },
            {
                id: 'bexl-412',
                images: [
                    require('../assets/images/rooms/bexl-412.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 412'],
            },
            {
                id: 'bexl-414',
                images: [
                    require('../assets/images/rooms/bexl-414.jpeg')
                ],
                floor: '4',
                capacity: '26',
                roomType: 'Conference Room',
                searchAliases: ['BEXL 414'],
            },
            {
                id: 'bexl-415',
                images: [
                    require('../assets/images/rooms/bexl-415.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 415'],
            },
            {
                id: 'bexl-416',
                images: [
                    require('../assets/images/rooms/bexl-416.jpeg')
                ],
                floor: '4',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['BEXL 416'],
            },
            {
                id: 'bexl-417',
                images: [
                    require('../assets/images/rooms/bexl-417.jpeg')
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
        rooms: [
            {
                id: 'gbad-009',
                images: [
                    require('../assets/images/rooms/gbad-009.jpeg')
                ],
                floor: '0',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 009'],
            },
            {
                id: 'gbad-101',
                images: [
                    require('../assets/images/rooms/gbad-101.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 101'],
            },
            {
                id: 'gbad-103',
                images: [
                    require('../assets/images/rooms/gbad-103.jpeg')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['GBAD 103'],
            },
            {
                id: 'gbad-209',
                images: [
                    require('../assets/images/rooms/gbad-209.jpeg')
                ],
                floor: '2',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 209'],
            },
            {
                id: 'gbad-209F',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 209F'],
            },
            {
                id: 'gbad-211',
                images: [
                    require('../assets/images/rooms/gbad-211.jpeg')
                ],
                floor: '2',
                capacity: '26',
                roomType: 'Classroom',
                searchAliases: ['GBAD 211'],
            },
            {
                id: 'gbad-220',
                images: [
                    require('../assets/images/rooms/gbad-220.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 220'],
            },
            {
                id: 'gbad-309',
                images: [
                    require('../assets/images/rooms/gbad-309.jpeg')
                ],
                floor: '3',
                capacity: '90',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 309'],
            },
            {
                id: 'gbad-311',
                images: [
                    require('../assets/images/rooms/gbad-311.jpeg')
                ],
                floor: '3',
                capacity: '19',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 311'],
            },
            {
                id: 'gbad-409',
                images: [
                    require('../assets/images/rooms/gbad-409.jpeg')
                ],
                floor: '4',
                capacity: '120',
                roomType: 'Lab Room',
                searchAliases: ['GBAD 409'],
            },
            {
                id: 'gbad-411',
                images: [
                    require('../assets/images/rooms/gbad-411.jpeg')
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
        rooms: [
            {
                id: 'gilb-109',
                images: [
                    require('../assets/images/rooms/gilb-109.jpeg')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Meeting Room',
                searchAliases: ['GILB 109'],
            },
            {
                id: 'gilb-124',
                images: [
                    require('../assets/images/rooms/gilb-124.jpeg')
                ],
                floor: '1',
                capacity: '192',
                roomType: 'Lecture Hall',
                searchAliases: ['GILB 124'],
            },
            {
                id: 'gilb-224',
                images: [
                    require('../assets/images/rooms/gilb-224.jpeg')
                ],
                floor: '2',
                capacity: '197',
                roomType: 'Lecture Hall',
                searchAliases: ['GILB 224'],
            },
            {
                id: 'gilb-228',
                images: [
                    require('../assets/images/rooms/gilb-228.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['GILB 228'],
            },
            {
                id: 'gilb-324',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'wb-0005',
                images: [
                    require('../assets/images/rooms/wb-0005.jpeg')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Pool',
                searchAliases: ['WB 0005, POOL'],
            },
            {
                id: 'wb-003',
                images: [
                    require('../assets/images/rooms/wb-003.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['WB 003'],
            },
            {
                id: 'wb-008',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['WB 008'],
            },
            {
                id: 'wb-009',
                images: [
                    require('../assets/images/rooms/wb-009.jpeg')
                ],
                floor: '0',
                capacity: '45',
                roomType: 'Gym',
                searchAliases: ['WB 009, Gym'],
            },
            {
                id: 'wb-015',
                images: [
                    require('../assets/images/rooms/wb-015.jpeg')
                ],
                floor: '0',
                capacity: '2',
                roomType: 'Studio Room',
                searchAliases: ['WB 015'],
            },
            {
                id: 'wb-112',
                images: [
                    require('../assets/images/rooms/wb-112.jpeg')
                ],
                floor: '1',
                capacity: '160',
                roomType: 'Gymnasium',
                searchAliases: ['WB 112', 'Gymnasium', 'WB Gymnasium', 'Women\'s Building Gymnasium', 'Basketball Court', 'Women\'s Building Basketball Court'],
            },
            {
                id: 'wb-116',
                images: [
                    require('../assets/images/rooms/wb-116.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Ballroom',
                searchAliases: ['WB 116', 'Ballroom', 'Women\'s Building Ballroom'],
            },
            {
                id: 'wb-118',
                images: [
                    require('../assets/images/rooms/wb-118.jpeg')
                ],
                floor: '1',
                capacity: '52',
                roomType: 'Ballet Studio',
                searchAliases: ['WB 118', 'Ballet Studio', 'Women\'s Building Ballet Studio'],
            },
            {
                id: 'wb-204',
                images: [
                    require('../assets/images/rooms/wb-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Yoga Studio',
                searchAliases: ['WB 204', 'Yoga Studio', 'Women\'s Building Yoga Studio'],
            },
            {
                id: 'wb-205',
                images: [
                    require('../assets/images/rooms/wb-205.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['WB 205'],
            },
            {
                id: 'wb-210',
                images: [
                    require('../assets/images/rooms/wb-210.jpeg')
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
        rooms: [
            {
                id: 'gilm-206',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Classroom',
                searchAliases: ['GILM 206'],
            },
            {
                id: 'gilm-234',
                images: [
                    require('../assets/images/rooms/gilm-234.jpeg')
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
        rooms: [
            {
                id: 'gman-101',
                images: [
                    require('../assets/images/rooms/gman-101.jpeg')
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
        rooms: [
            {
                id: 'aust-100',
                images: [
                    require('../assets/images/rooms/aust-100.jpeg')
                ],
                floor: '1',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['AUST 100'],
            },
            {
                id: 'aust-126',
                images: [
                    require('../assets/images/rooms/aust-126.jpeg')
                ],
                floor: '1',
                capacity: '38',
                roomType: 'Classroom',
                searchAliases: ['AUST 126'],
            },
            {
                id: 'aust-183',
                images: [
                    require('../assets/images/rooms/aust-183.jpeg')
                ],
                floor: '1',
                capacity: '250',
                roomType: 'Lecture Hall',
                searchAliases: ['AUST 183'],
            },
            {
                id: 'aust-200',
                images: [
                    require('../assets/images/rooms/aust-200.jpeg')
                ],
                floor: '2',
                capacity: '55',
                roomType: 'Computer Lab',
                searchAliases: ['AUST 200'],
            },
            {
                id: 'aust-216',
                images: [
                    require('../assets/images/rooms/aust-216.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 216'],
            },
            {
                id: 'aust-222',
                images: [
                    require('../assets/images/rooms/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 222'],
            },
            {
                id: 'aust-226',
                images: [
                    require('../assets/images/rooms/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 226'],
            },
            {
                id: 'aust-260',
                images: [
                    require('../assets/images/rooms/aust-260.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 260'],
            },
            {
                id: 'aust-270',
                images: [
                    require('../assets/images/rooms/aust-222.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 270'],
            },
            {
                id: 'aust-274',
                images: [
                    require('../assets/images/rooms/aust-274.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 274'],
            },
            {
                id: 'aust-388',
                images: [
                    require('../assets/images/rooms/aust-388.jpeg')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 388'],
            },
            {
                id: 'aust-390',
                images: [
                    require('../assets/images/rooms/aust-388.jpeg')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['AUST 390'],
            },
            {
                id: 'aust-440',
                images: [
                    require('../assets/images/rooms/aust-440.jpeg')
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
        rooms: [
            {
                id: 'bale-200C',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Conference Room',
                searchAliases: ['BALE 200C'],
            },
            {
                id: 'bale-219',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Conference Room',
                searchAliases: ['BALE 219'],
            },
            {
                id: 'bale-310',
                images: [
                    require('../assets/images/rooms/bale-310.jpeg')
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
        rooms: [
            {
                id: 'bat-045',
                images: [
                    require('../assets/images/rooms/bat-045.jpeg')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Computer Lab',
                searchAliases: ['BAT 045'],
            },
            {
                id: 'bat-050',
                images: [
                    require('../assets/images/rooms/bat-050.jpeg')
                ],
                floor: '0',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['BAT 050'],
            },
            {
                id: 'bat-144',
                images: [
                    require('../assets/images/rooms/bat-144.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['BAT 144'],
            },
            {
                id: 'bat-150',
                images: [
                    require('../assets/images/rooms/bat-150.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['BAT 150'],
            },
            {
                id: 'bat-244',
                images: [
                    require('../assets/images/rooms/bat-244.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Computer Lab',
                searchAliases: ['BAT 244'],
            },
            {
                id: 'bat-250',
                images: [
                    require('../assets/images/rooms/bat-250.jpeg')
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
        rooms: [
            {
                id: 'brc-133',
                images: [
                    require('../assets/images/rooms/brc-133.jpeg')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['BRC 133'],
            },
            {
                id: 'brc-136',
                images: [
                    require('../assets/images/rooms/brc-136.jpeg')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['BRC 136'],
            },
            {
                id: 'brc-138',
                images: [
                    require('../assets/images/rooms/brc-138.jpeg')
                ],
                floor: '1',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['BRC 138'],
            },
            {
                id: 'brc-161',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'burt-128',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '35',
                roomType: 'Classroom',
                searchAliases: ['BURT 128'],
            },
            {
                id: 'burt-166',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['BURT 166'],
            },
            {
                id: 'burt-193',
                images: [
                    require('../assets/images/rooms/burt-193.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['BURT 193'],
            },
            {
                id: 'burt-326A',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'bates-129',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'buxton-169',
                images: [
                    require('../assets/images/rooms/buxton-169.jpeg')
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
        rooms: [
            {
                id: 'call-125',
                images: [
                    require('../assets/images/rooms/call-125.jpeg')
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
        rooms: [
            {
                id: 'clkl-104',
                images: [
                    require('../assets/images/rooms/clkl-104.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Lab Room',
                searchAliases: ['CLKL 104'],
            },
            {
                id: 'clkl-104B',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '29',
                roomType: 'Unknown',
                searchAliases: ['CLKL 104B'],
            },
            {
                id: 'clkl-106',
                images: [
                    require('../assets/images/rooms/clkl-106.jpeg')
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
        rooms: [
            {
                id: 'coar-2123',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Unknown',
                searchAliases: ['COAR 2123'],
            },
            {
                id: 'coar-2196',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'comh-102',
                images: [
                    require('../assets/images/rooms/comh-102.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Piano Room',
                searchAliases: ['COMH 102', 'Piano Room'],
            },
            {
                id: 'comh-104',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COMH 104'],
            },
            {
                id: 'comh-106',
                images: [
                    require('../assets/images/rooms/comh-106.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Classroom',
                searchAliases: ['COMH 106'],
            },
            {
                id: 'comh-202',
                images: [
                    require('../assets/images/rooms/comh-202.jpeg')
                ],
                floor: '2',
                capacity: '100',
                roomType: 'Band Room',
                searchAliases: ['COMH 202', 'Band Room'],
            },
            {
                id: 'comh-203',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Unknown',
                searchAliases: ['COMH 203'],
            },
            {
                id: 'comh-204',
                images: [
                    require('../assets/images/rooms/comh-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Choir Rehearsal Room',
                searchAliases: ['COMH 204', 'Choir Rehearsal Room'],
            },
            {
                id: 'comh-300',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '5',
                roomType: 'Office',
                searchAliases: ['COMH 300'],
            },
            {
                id: 'comh-300A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '7',
                roomType: 'Classroom',
                searchAliases: ['COMH 300A'],
            },
            {
                id: 'comh-303',
                images: [
                    require('../assets/images/rooms/comh-303.jpeg')
                ],
                floor: '3',
                capacity: '80',
                roomType: 'Recital Hall',
                searchAliases: ['COMH 303'],
            },
            {
                id: 'comh-305A',
                images: [
                    require('../assets/images/rooms/comh-305A.jpeg')
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
        rooms: [
            {
                id: 'covl-001',
                images: [
                    require('../assets/images/rooms/covl-001.jpeg')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COVL 001'],
            },
            {
                id: 'covl-006',
                images: [
                    require('../assets/images/rooms/covl-006.jpeg')
                ],
                floor: '0',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['COVL 006'],
            },
            {
                id: 'covl-017',
                images: [
                    require('../assets/images/rooms/covl-017.jpeg')
                ],
                floor: '0',
                capacity: '3',
                roomType: 'Lab Room',
                searchAliases: ['COVL 017'],
            },
            {
                id: 'covl-020',
                images: [
                    require('../assets/images/rooms/covl-020.jpeg')
                ],
                floor: '0',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['COVL 020'],
            },
            {
                id: 'covl-021',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Classroom',
                searchAliases: ['COVL 021'],
            },
            {
                id: 'covl-022',
                images: [
                    require('../assets/images/rooms/covl-022.jpeg')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['COVL 022'],
            },
            {
                id: 'covl-216',
                images: [
                    require('../assets/images/rooms/covl-216.jpeg')
                ],
                floor: '2',
                capacity: '151',
                roomType: 'Lecture Hall',
                searchAliases: ['COVL 216'],
            },
            {
                id: 'covl-218',
                images: [
                    require('../assets/images/rooms/covl-218.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['COVL 218'],
            },
            {
                id: 'covl-221',
                images: [
                    require('../assets/images/rooms/covl-221.jpeg')
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
        rooms: [
            {
                id: 'crps-119',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Conference Room',
                searchAliases: ['CRPS 119'],
            },
            {
                id: 'crps-122',
                images: [
                    require('../assets/images/rooms/crps-122.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['CRPS 122'],
            },
            {
                id: 'crps-138',
                images: [
                    require('../assets/images/rooms/crps-138.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['CRPS 138'],
            },
            {
                id: 'crps-150',
                images: [
                    require('../assets/images/rooms/crps-150.jpeg')
                ],
                floor: '1',
                capacity: '26',
                roomType: 'Computer Lab',
                searchAliases: ['CRPS 150'],
            },
            {
                id: 'crps-232',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'dear-001E',
                images: [
                    require('../assets/images/rooms/dear-001E.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 001E'],
            },
            {
                id: 'dear-001G',
                images: [
                    require('../assets/images/rooms/dear-001G.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 001G'],
            },
            {
                id: 'dear-002',
                images: [
                    require('../assets/images/rooms/dear-002.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 002'],
            },
            {
                id: 'dear-004',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: 'Unknown',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 004'],
            },
            {
                id: 'dear-005',
                images: [
                    require('../assets/images/rooms/dear-005.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 005'],
            },
            {
                id: 'dear-009',
                images: [
                    require('../assets/images/rooms/dear-009.jpeg')
                ],
                floor: '0',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 009'],
            },
            {
                id: 'dear-115',
                images: [
                    require('../assets/images/rooms/dear-115.jpeg')
                ],
                floor: '1',
                capacity: '61',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 115'],
            },
            {
                id: 'dear-118',
                images: [
                    require('../assets/images/rooms/dear-118.jpeg')
                ],
                floor: '1',
                capacity: '168',
                roomType: 'Lecture Hall',
                searchAliases: ['DEAR 118'],
            },
            {
                id: 'dear-120',
                images: [
                    require('../assets/images/rooms/dear-120.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['DEAR 120'],
            },
            {
                id: 'dear-201',
                images: [
                    require('../assets/images/rooms/dear-201.jpeg')
                ],
                floor: '2',
                capacity: '90',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 201'],
            },
            {
                id: 'dear-203',
                images: [
                    require('../assets/images/rooms/dear-203.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 203'],
            },
            {
                id: 'dear-206',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 206'],
            },
            {
                id: 'dear-208',
                images: [
                    require('../assets/images/rooms/dear-208.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 208'],
            },
            {
                id: 'dear-211',
                images: [
                    require('../assets/images/rooms/dear-211.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 211'],
            },
            {
                id: 'dear-222',
                images: [
                    require('../assets/images/rooms/dear-222.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 222'],
            },
            {
                id: 'dear-300',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 300'],
            },
            {
                id: 'dear-302A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Lab Room',
                searchAliases: ['DEAR 302A'],
            },
            {
                id: 'dear-303',
                images: [
                    require('../assets/images/rooms/dear-303.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['DEAR 303'],
            },
            {
                id: 'dear-312',
                images: [
                    require('../assets/images/rooms/dear-312.jpeg')
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
        rooms: [
            {
                id: 'dryd-104',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '35',
                roomType: 'Classroom',
                searchAliases: ['DRYD 104'],
            },
            {
                id: 'dryd-212B',
                images: [
                    require('../assets/images/rooms/dryd-212B.jpeg')
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
        rooms: [
            {
                id: 'dxrc-126',
                images: [
                    require('../assets/images/rooms/dxrc-126.jpeg')
                ],
                floor: '1',
                capacity: '60',
                roomType: 'Racquet Ball Court',
                searchAliases: ['DXRC 126', 'Racquet Ball Court'],
            },
            {
                id: 'dxrc-140J',
                images: [
                    require('../assets/images/rooms/dxrc-140J.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['DXRC 140J'],
            },
            {
                id: 'dxrc-201',
                images: [
                    require('../assets/images/rooms/dxrc-201.jpeg')
                ],
                floor: '2',
                capacity: '46',
                roomType: 'Fitness Studio',
                searchAliases: ['DXRC 201'],
            },
            {
                id: 'dxrc-207',
                images: [
                    require('../assets/images/rooms/dxrc-207.jpeg')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['DXRC 207'],
            },
            {
                id: 'dxrc-209',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['DXRC 209'],
            },
            {
                id: 'dxrc-260',
                images: [
                    require('../assets/images/rooms/dxrc-260.jpeg')
                ],
                floor: '2',
                capacity: '100',
                roomType: 'Gym',
                searchAliases: ['DXRC 260', 'Gym', 'Basketball Court'],
            },
            {
                id: 'dxrc-Indoor-Climbing-Center',
                images: [
                    require('../assets/images/rooms/dxrc-ICC.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Indoor Climbing Center',
                searchAliases: ['DXRC 134', 'Indoor Climbing Center', 'DXRC ICC'],
            },
            {
                id: 'dxrc-Pool',
                images: [
                    require('../assets/images/rooms/dxrc-Pool.jpeg')
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
        rooms: [
            {
                id: 'dybn-101',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'egrn-16',
                images: [
                    require('../assets/images/rooms/egrn-16.jpeg')
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
        rooms: [
            {
                id: 'emac-130',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'fair-104',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 104'],
            },
            {
                id: 'fair-127',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '26',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 127'],
            },
            {
                id: 'fair-204',
                images: [
                    require('../assets/images/rooms/fair-204.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['FAIR 204'],
            },
            {
                id: 'fair-207',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 207'],
            },
            {
                id: 'fair-215',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 215'],
            },
            {
                id: 'fair-227',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 227'],
            },
            {
                id: 'fair-304',
                images: [
                    require('../assets/images/rooms/fair-304.jpeg')
                ],
                floor: '3',
                capacity: '22',
                roomType: 'Classroom',
                searchAliases: ['FAIR 304'],
            },
            {
                id: 'fair-327',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['FAIR 327'],
            },
            {
                id: 'fair-404',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['FAIR 404'],
            },
            {
                id: 'fair-415',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '19',
                roomType: 'Classroom',
                searchAliases: ['FAIR 415'],
            },
            {
                id: 'fair-427',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'furm-100',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['FURM 100'],
            },
            {
                id: 'furm-101',
                images: [
                    require('../assets/images/rooms/furm-101.jpeg')
                ],
                floor: '1',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['FURM 101'],
            },
            {
                id: 'furm-102',
                images: [
                    require('../assets/images/rooms/furm-102.jpeg')
                ],
                floor: '1',
                capacity: '96',
                roomType: 'Classroom',
                searchAliases: ['FURM 102'],
            },
            {
                id: 'furm-105',
                images: [
                    require('../assets/images/rooms/furm-105.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['FURM 105'],
            },
            {
                id: 'furm-200',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['FURM 200'],
            },
            {
                id: 'furm-201G',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '6',
                roomType: 'Conference Room',
                searchAliases: ['FURM 201G'],
            },
            {
                id: 'furm-202',
                images: [
                    require('../assets/images/rooms/furm-202.jpeg')
                ],
                floor: '2',
                capacity: '68',
                roomType: 'Classroom',
                searchAliases: ['FURM 202'],
            },
            {
                id: 'furm-300',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['FURM 300'],
            },
            {
                id: 'furm-303',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['FURM 303'],
            },
            {
                id: 'furm-404',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '49',
                roomType: 'Lab Room',
                searchAliases: ['FURM 404'],
            },
            {
                id: 'furm-405',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['FURM 405'],
            },
            {
                id: 'furm-411',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'gilk-100',
                images: [
                    require('../assets/images/rooms/gilk-100.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['GILK 100'],
            },
            {
                id: 'gilk-104',
                images: [
                    require('../assets/images/rooms/gilk-104.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['GILK 104'],
            },
            {
                id: 'gilk-108',
                images: [
                    require('../assets/images/rooms/gilk-108.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['GILK 108'],
            },
            {
                id: 'gilk-113',
                images: [
                    require('../assets/images/rooms/gilk-113.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['GILK 113'],
            },
            {
                id: 'gilk-115',
                images: [
                    require('../assets/images/rooms/gilk-115.jpeg')
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
        rooms: [
            {
                id: 'glsn-003',
                images: [
                    require('../assets/images/rooms/glsn-003.jpeg')
                ],
                floor: '0',
                capacity: '28',
                roomType: 'Lab Room',
                searchAliases: ['GLSN 003'],
            },
            {
                id: 'glsn-009',
                images: [
                    require('../assets/images/rooms/glsn-009.jpeg')
                ],
                floor: '0',
                capacity: '63',
                roomType: 'Lab Room',
                searchAliases: ['GLSN 009'],
            },
            {
                id: 'glsn-100',
                images: [
                    require('../assets/images/rooms/glsn-100.jpeg')
                ],
                floor: '1',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['GLSN 100'],
            },
            {
                id: 'glsn-200',
                images: [
                    require('../assets/images/rooms/glsn-200.jpeg')
                ],
                floor: '2',
                capacity: '88',
                roomType: 'Classroom',
                searchAliases: ['GLSN 200'],
            },
            {
                id: 'glsn-306',
                images: [
                    require('../assets/images/rooms/glsn-306.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['GLSN 306'],
            },
            {
                id: 'glsn-308',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'graf-106',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '39',
                roomType: 'Lab Room',
                searchAliases: ['GRAF 106'],
            },
            {
                id: 'graf-107',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'gvgc-106',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Lab Room',
                searchAliases: ['GVGC 106'],
            },
            {
                id: 'gvgc-107',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Lab Room',
                searchAliases: ['GVGC 107'],
            },
            {
                id: 'gvgc-109',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'indp-101',
                images: [
                    require('../assets/images/rooms/indp-101.jpeg')
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
        rooms: [
            {
                id: 'haml-0100',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'hfc-115',
                images: [
                    require('../assets/images/rooms/hfc-115.jpeg')
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
        rooms: [
            {
                id: 'hkrt-110',
                images: [
                    require('../assets/images/rooms/hkrt-110.jpeg')
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
        name: 'Hovland Hall ',
        rooms: [
            {
                id: 'hov-100',
                images: [
                    require('../assets/images/rooms/hov-100.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['HOV 100'],
            },
            {
                id: 'hov-104',
                images: [
                    require('../assets/images/rooms/hov-104.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['HOV 104'],
            },
            {
                id: 'hov-202',
                images: [
                    require('../assets/images/rooms/hov-202.jpeg')
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
        rooms: [
            {
                id: 'hsbn-100',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'hwrl-M0201',
                images: [
                    require('../assets/images/placeholder.png')
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
        rooms: [
            {
                id: 'illc-134',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '22',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 134'],
            },
            {
                id: 'illc-136',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 136'],
            },
            {
                id: 'illc-144',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 144'],
            },
            {
                id: 'illc-155',
                images: [
                    require('../assets/images/rooms/illc-155.jpeg')
                ],
                floor: '1',
                capacity: '105',
                roomType: 'Lecture Hall',
                searchAliases: ['ILLC 155'],
            },
            {
                id: 'illc-242',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 242'],
            },
            {
                id: 'illc-244',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['ILLC 244'],
            },
            {
                id: 'illc-250',
                images: [
                    require('../assets/images/rooms/illc-250.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 250'],
            },
            {
                id: 'illc-252',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Computer Lab',
                searchAliases: ['ILLC 252'],
            },
            {
                id: 'illc-253',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 253'],
            },
            {
                id: 'illc-255',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 255'],
            },
            {
                id: 'illc-342',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 342'],
            },
            {
                id: 'illc-344',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 344'],
            },
            {
                id: 'illc-345',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 345'],
            },
            {
                id: 'illc-345-347',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['ILLC 345/347'],
            },
            {
                id: 'illc-347',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 347'],
            },
            {
                id: 'illc-350',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 350'],
            },
            {
                id: 'illc-350-352',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['ILLC 350/352'],
            },
            {
                id: 'illc-352',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 352'],
            },
            {
                id: 'illc-353',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 353'],
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

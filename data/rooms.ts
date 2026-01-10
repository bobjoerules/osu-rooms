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

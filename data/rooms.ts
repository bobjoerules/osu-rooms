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
        images: [require('../assets/images/buildings/owenhall.jpg')],
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
        images: [require('../assets/images/buildings/linc.jpeg')],
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
        images: [require('../assets/images/buildings/wgnd.jpeg')],
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
        images: [require('../assets/images/buildings/phar.jpeg')],
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
        images: [require('../assets/images/buildings/cord.jpeg')],
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
        images: [require('../assets/images/buildings/mlm.jpeg')],
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
        images: [require('../assets/images/buildings/casc.jpeg')],
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
        images: [require('../assets/images/buildings/stag.jpeg')],
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
        images: [require('../assets/images/buildings/als.jpeg')],
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
        images: [require('../assets/images/buildings/bexl.jpeg')],
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
        images: [require('../assets/images/buildings/gbad.jpeg')],
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
        images: [require('../assets/images/buildings/gilb.jpeg')],
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
        images: [require('../assets/images/buildings/wb.jpeg')],
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
        images: [require('../assets/images/buildings/gilm.jpeg')],
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
        images: [require('../assets/images/buildings/gman.jpeg')],
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
        images: [require('../assets/images/buildings/aust.jpeg')],
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
        images: [require('../assets/images/buildings/bale.jpeg')],
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
        images: [require('../assets/images/buildings/bat.jpeg')],
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
        images: [require('../assets/images/buildings/brc.jpeg')],
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
        images: [require('../assets/images/buildings/burt.jpeg')],
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
        images: [require('../assets/images/buildings/bates.jpeg')],
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
        images: [require('../assets/images/buildings/buxton.jpeg')],
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
        images: [require('../assets/images/buildings/call.jpeg')],
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
        images: [require('../assets/images/buildings/clkl.jpeg')],
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
        images: [require('../assets/images/placeholder.png')],
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
        images: [require('../assets/images/buildings/comh.jpeg')],
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
        images: [require('../assets/images/buildings/covl.jpeg')],
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
        images: [require('../assets/images/buildings/crps.jpeg')],
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
        images: [require('../assets/images/buildings/dear.jpeg')],
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
        images: [require('../assets/images/buildings/dryd.jpeg')],
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
        images: [require('../assets/images/buildings/dxrc.jpeg')],
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
        images: [require('../assets/images/buildings/dybn.jpeg')],
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
        images: [require('../assets/images/buildings/egrn.jpeg')],
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
        images: [require('../assets/images/placeholder.png')],
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
        images: [require('../assets/images/buildings/fair.jpeg')],
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
        images: [require('../assets/images/buildings/furm.jpeg')],
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
        images: [require('../assets/images/buildings/gilk.jpeg')],
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
        images: [require('../assets/images/buildings/glsn.jpeg')],
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
        images: [require('../assets/images/buildings/graf.jpeg')],
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
        images: [require('../assets/images/placeholder.png')],
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
        images: [require('../assets/images/buildings/indp.jpeg')],
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
        images: [require('../assets/images/placeholder.png')],
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
        images: [require('../assets/images/buildings/hfc.jpeg')],
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
        images: [require('../assets/images/buildings/hkrt.jpeg')],
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
        name: 'Hovland Hall',
        images: [require('../assets/images/buildings/hov.jpeg')],
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
        images: [require('../assets/images/buildings/hsbn.jpeg')],
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
        images: [require('../assets/images/buildings/hwrl.jpeg')],
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
        images: [require('../assets/images/buildings/illc.jpeg')],
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
            {
                id: 'illc-355',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 355'],
            },
            {
                id: 'illc-442',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['ILLC 442'],
            },
            {
                id: 'illc-444',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['ILLC 444'],
            },
            {
                id: 'illc-450',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 450'],
            },
            {
                id: 'illc-450-452',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 450-452'],
            },
            {
                id: 'illc-452',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 452'],
            },
            {
                id: 'illc-453',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 453'],
            },
            {
                id: 'illc-455',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 455'],
            },
            {
                id: 'illc-542',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 542'],
            },
            {
                id: 'illc-544',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 544'],
            },
            {
                id: 'illc-545',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 545'],
            },
            {
                id: 'illc-545-547',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 545-547'],
            },
            {
                id: 'illc-547',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 547'],
            },
            {
                id: 'illc-550',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 550'],
            },
            {
                id: 'illc-550-552',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '46',
                roomType: 'Classroom',
                searchAliases: ['ILLC 550-552'],
            },
            {
                id: 'illc-552',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 552'],
            },
            {
                id: 'illc-553',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '5',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['ILLC 553'],
            },
            {
                id: 'illc-555',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/john.jpeg')],
        rooms: [
            {
                id: 'john-102',
                images: [
                    require('../assets/images/rooms/john-102.jpeg')
                ],
                floor: '1',
                capacity: '118',
                roomType: 'Lecture Hall',
                searchAliases: ['JOHN 102'],
            },
            {
                id: 'john-214',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 214'],
            },
            {
                id: 'john-214B',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 214'],
            },
            {
                id: 'john-221',
                images: [
                    require('../assets/images/rooms/john-221.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['JOHN 221'],
            },
            {
                id: 'john-300',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '26',
                roomType: 'Lab Room',
                searchAliases: ['JOHN 300'],
            },
            {
                id: 'john-316A',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/kear.jpeg')],
        rooms: [
            {
                id: 'kear-112',
                images: [
                    require('../assets/images/rooms/kear-112.jpeg')
                ],
                floor: '1',
                capacity: '106',
                roomType: 'Lecture Hall',
                searchAliases: ['KEAR 112'],
            },
            {
                id: 'kear-124',
                images: [
                    require('../assets/images/rooms/kear-124.jpeg')
                ],
                floor: '1',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['KEAR 124'],
            },
            {
                id: 'kear-202',
                images: [
                    require('../assets/images/rooms/kear-202.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['KEAR 202'],
            },
            {
                id: 'kear-205',
                images: [
                    require('../assets/images/rooms/kear-205.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['KEAR 205'],
            },
            {
                id: 'kear-212',
                images: [
                    require('../assets/images/rooms/kear-212.jpeg')
                ],
                floor: '2',
                capacity: '83',
                roomType: 'Classroom',
                searchAliases: ['KEAR 212'],
            },
            {
                id: 'kear-302',
                images: [
                    require('../assets/images/rooms/kear-302.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Computer Lab',
                searchAliases: ['KEAR 302'],
            },
            {
                id: 'kear-305',
                images: [
                    require('../assets/images/rooms/kear-305.jpeg')
                ],
                floor: '3',
                capacity: '63',
                roomType: 'Classroom',
                searchAliases: ['KEAR 305'],
            },
            {
                id: 'kear-312',
                images: [
                    require('../assets/images/rooms/kear-312.jpeg')
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
        images: [require('../assets/images/buildings/kec.jpeg')],
        rooms: [
            {
                id: 'kec-1001',
                images: [
                    require('../assets/images/rooms/kec-1001.jpeg')
                ],
                floor: '1',
                capacity: '70',
                roomType: 'Classroom',
                searchAliases: ['KEC 1001'],
            },
            {
                id: 'kec-1003',
                images: [
                    require('../assets/images/rooms/kec-1003.jpeg')
                ],
                floor: '1',
                capacity: '66',
                roomType: 'Classroom',
                searchAliases: ['KEC 1003'],
            },
            {
                id: 'kec-1005',
                images: [
                    require('../assets/images/rooms/kec-1005.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['KEC 1005'],
            },
            {
                id: 'kec-1007',
                images: [
                    require('../assets/images/rooms/kec-1007.jpeg')
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
        images: [require('../assets/images/buildings/kidd.jpeg')],
        rooms: [
            {
                id: 'kidd-022',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '0 (No one can be in it as if you enter you will disappear for ever)',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 022'],
            },
            {
                id: 'kidd-028',
                images: [
                    require('../assets/images/rooms/kidd-028.jpeg')
                ],
                floor: '0',
                capacity: '34',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 028'],
            },
            {
                id: 'kidd-033',
                images: [
                    require('../assets/images/rooms/kidd-033.jpeg')
                ],
                floor: '0',
                capacity: '26',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 033'],
            },
            {
                id: 'kidd-070',
                images: [
                    require('../assets/images/rooms/kidd-070.jpeg')
                ],
                floor: '0',
                capacity: '21',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 070'],
            },
            {
                id: 'kidd-108',
                images: [
                    require('../assets/images/rooms/kidd-108.jpeg')
                ],
                floor: '1',
                capacity: '50',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['KIDD 108'],
            },
            {
                id: 'kidd-108G',
                images: [
                    require('../assets/images/rooms/kidd-108G.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 108G'],
            },
            {
                id: 'kidd-108H',
                images: [
                    require('../assets/images/rooms/kidd-108H.jpeg')
                ],
                floor: '1',
                capacity: '62',
                roomType: 'Classroom',
                searchAliases: ['KIDD 108H'],
            },
            {
                id: 'kidd-108J',
                images: [
                    require('../assets/images/rooms/kidd-108J.jpeg')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['KIDD 108J'],
            },
            {
                id: 'kidd-128',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Dean\'s Office and Reception',
                searchAliases: ['KIDD 128', 'Dean\'s Office and Reception'],
            },
            {
                id: 'kidd-128B',
                images: [
                    require('../assets/images/rooms/kidd-128B.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Dean\'s Office Conference Room',
                searchAliases: ['KIDD 128B', 'Dean\'s Office Conference Room'],
            },
            {
                id: 'kidd-200',
                images: [
                    require('../assets/images/rooms/kidd-200.jpeg')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 200'],
            },
            {
                id: 'kidd-202',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['KIDD 202'],
            },
            {
                id: 'kidd-228',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '3 (A very small class I guess)',
                roomType: 'Classroom',
                searchAliases: ['KIDD 228'],
            },
            {
                id: 'kidd-236',
                images: [
                    require('../assets/images/rooms/kidd-236.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['KIDD 236'],
            },
            {
                id: 'kidd-237',
                images: [
                    require('../assets/images/rooms/kidd-237.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['KIDD 237'],
            },
            {
                id: 'kidd-238',
                images: [
                    require('../assets/images/rooms/kidd-238.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['KIDD 238'],
            },
            {
                id: 'kidd-274',
                images: [
                    require('../assets/images/rooms/kidd-274.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['KIDD 274'],
            },
            {
                id: 'kidd-278',
                images: [
                    require('../assets/images/rooms/kidd-278.jpeg')
                ],
                floor: '2',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['KIDD 278'],
            },
            {
                id: 'kidd-280',
                images: [
                    require('../assets/images/rooms/kidd-280.jpeg')
                ],
                floor: '2',
                capacity: '37',
                roomType: 'Classroom',
                searchAliases: ['KIDD 280'],
            },
            {
                id: 'kidd-350',
                images: [
                    require('../assets/images/rooms/kidd-350.jpeg')
                ],
                floor: '3',
                capacity: '109',
                roomType: 'Lecture Hall',
                searchAliases: ['KIDD 350'],
            },
            {
                id: 'kidd-356',
                images: [
                    require('../assets/images/rooms/kidd-356.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['KIDD 356'],
            },
            {
                id: 'kidd-358',
                images: [
                    require('../assets/images/rooms/kidd-358.jpeg')
                ],
                floor: '3',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['KIDD 358'],
            },
            {
                id: 'kidd-364',
                images: [
                    require('../assets/images/rooms/kidd-364.jpeg')
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
        images: [require('../assets/images/buildings/lang.jpeg')],
        rooms: [
            {
                id: 'lang-006',
                images: [
                    require('../assets/images/rooms/lang-006.jpeg')
                ],
                floor: '0',
                capacity: '49',
                roomType: 'Weight Room',
                searchAliases: ['LANG 006', 'Weight Room'],
            },
            {
                id: 'lang-013',
                images: [
                    require('../assets/images/rooms/lang-013.jpeg')
                ],
                floor: '0',
                capacity: '40',
                roomType: 'Therapeutic Exercise Room',
                searchAliases: ['LANG 013', 'Therapeutic Exercise Room'],
            },
            {
                id: 'lang-124',
                images: [
                    require('../assets/images/rooms/lang-124.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['LANG 124'],
            },
            {
                id: 'lang-126',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['LANG 126'],
            },
            {
                id: 'lang-127',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['LANG 127'],
            },
            {
                id: 'lang-129',
                images: [
                    require('../assets/images/rooms/lang-129.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['LANG 129'],
            },
            {
                id: 'lang-130',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['LANG 130'],
            },
            {
                id: 'lang-134',
                images: [
                    require('../assets/images/rooms/lang-134.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Exercise Room',
                searchAliases: ['LANG 134', 'Exercise Room'],
            },
            {
                id: 'lang-200',
                images: [
                    require('../assets/images/rooms/lang-200.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Aerobics Room',
                searchAliases: ['LANG 200', 'Aerobics Room'],
            },
            {
                id: 'lang-300',
                images: [
                    require('../assets/images/rooms/lang-300.jpeg')
                ],
                floor: '3',
                capacity: '307',
                roomType: 'Large Gym',
                searchAliases: ['LANG 300', 'Large Gym'],
            },
            {
                id: 'lang-301',
                images: [
                    require('../assets/images/rooms/lang-301.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Wrestling Room',
                searchAliases: ['LANG 301', 'Wrestling Room'],
            },
            {
                id: 'lang-310',
                images: [
                    require('../assets/images/rooms/lang-310.jpeg')
                ],
                floor: '3',
                capacity: '114',
                roomType: 'Gymnastics Room',
                searchAliases: ['LANG 310', 'Gymnastics Room'],
            },
            {
                id: 'lang-arch',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: 'Nan',
                capacity: '35',
                roomType: 'Outdoors Archery Range',
                searchAliases: ['LANG ARCH', 'Outdoors Archery Range'],
            },
            {
                id: 'lang-0018',
                images: [
                    require('../assets/images/rooms/lang-0018.jpeg')
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
        images: [require('../assets/images/buildings/lpsc.jpeg')],
        rooms: [
            {
                id: 'lpsc-125',
                images: [
                    require('../assets/images/rooms/lpsc-125.jpeg')
                ],
                floor: '1',
                capacity: '180',
                roomType: 'Lecture Hall',
                searchAliases: ['LPSC 125'],
            },
            {
                id: 'lpsc-160',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 160'],
            },
            {
                id: 'lpsc-176',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 176'],
            },
            {
                id: 'lpsc-178',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '67',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 178'],
            },
            {
                id: 'lpsc-219',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '69',
                roomType: 'Lab Room',
                searchAliases: ['LPSC 219'],
            },
            {
                id: 'lpsc-239',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['LPSC 239'],
            },
            {
                id: 'lpsc-259',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '17',
                roomType: 'Conference Room',
                searchAliases: ['LPSC 259'],
            },
            {
                id: 'lpsc-402',
                images: [
                    require('../assets/images/rooms/lpsc-402.jpeg')
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
        images: [require('../assets/images/buildings/magr.jpeg')],
        rooms: [
            {
                id: 'magr-102',
                images: [
                    require('../assets/images/rooms/magr-102.jpeg')
                ],
                floor: '1',
                capacity: '100',
                roomType: 'Classroom',
                searchAliases: ['MAGR 102'],
            },
            {
                id: 'magr-113',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['MAGR 113'],
            },
            {
                id: 'magr-1152',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '98',
                roomType: 'Classroom',
                searchAliases: ['MAGR 1152'],
            },
            {
                id: 'magr-118A',
                images: [
                    require('../assets/images/rooms/magr-118A.jpeg')
                ],
                floor: '1',
                capacity: '58',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 118A'],
            },
            {
                id: 'magr-202',
                images: [
                    require('../assets/images/rooms/magr-202.jpeg')
                ],
                floor: '2',
                capacity: '75',
                roomType: 'Classroom',
                searchAliases: ['MAGR 202'],
            },
            {
                id: 'magr-202-205',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '143',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['MAGR 202/205'],
            },
            {
                id: 'magr-205',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '82',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 205'],
            },
            {
                id: 'magr-208',
                images: [
                    require('../assets/images/rooms/magr-208.jpeg')
                ],
                floor: '2',
                capacity: '67',
                roomType: 'Classroom',
                searchAliases: ['MAGR 208'],
            },
            {
                id: 'magr-208-251',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '143',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 208/251'],
            },
            {
                id: 'magr-251',
                images: [
                    require('../assets/images/rooms/magr-251.jpeg')
                ],
                floor: '2',
                capacity: '76',
                roomType: 'Lab Room',
                searchAliases: ['MAGR 251'],
            },
            {
                id: 'magr-298',
                images: [
                    require('../assets/images/rooms/magr-298.jpeg')
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
        images: [require('../assets/images/buildings/mlh.jpeg')],
        rooms: [
            {
                id: 'mlh-1152',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/mcaf.jpeg')],
        rooms: [
            {
                id: 'mcaf-114',
                images: [
                    require('../assets/images/rooms/mcaf-114.jpeg')
                ],
                floor: '1',
                capacity: '1650',
                roomType: 'Large Gymnasium',
                searchAliases: ['MCAF 114', 'Large Gymnasium'],
            },
            {
                id: 'mcaf-124',
                images: [
                    require('../assets/images/rooms/mcaf-124.jpeg')
                ],
                floor: '1',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['MCAF 124'],
            },
            {
                id: 'mcaf-209',
                images: [
                    require('../assets/images/rooms/mcaf-209.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['MCAF 209'],
            },
            {
                id: 'mcaf-210',
                images: [
                    require('../assets/images/rooms/mcaf-210.jpeg')
                ],
                floor: '2',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['MCAF 210'],
            },
            {
                id: 'mcaf-306',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Classroom',
                searchAliases: ['MCAF 306'],
            },
            {
                id: 'mcaf-307',
                images: [
                    require('../assets/images/rooms/mcaf-307.jpeg')
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
        images: [require('../assets/images/buildings/mfd.jpeg')],
        rooms: [
            {
                id: 'mfd-108',
                images: [
                    require('../assets/images/rooms/mfd-108.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Lab Room',
                searchAliases: ['MFD 108'],
            },
            {
                id: 'mfd-112',
                images: [
                    require('../assets/images/rooms/mfd-112.jpeg')
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
        images: [require('../assets/images/buildings/more.jpeg')],
        rooms: [
            {
                id: 'more-126',
                images: [
                    require('../assets/images/rooms/more-126.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['MORE 126'],
            },
            {
                id: 'more-130B',
                images: [
                    require('../assets/images/rooms/more-130B.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['MORE 130B'],
            },
            {
                id: 'more-204C',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['MORE 204C'],
            },
            {
                id: 'more-206',
                images: [
                    require('../assets/images/rooms/more-206.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['MORE 206'],
            },
            {
                id: 'more-214',
                images: [
                    require('../assets/images/rooms/more-214.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['MORE 214'],
            },
            {
                id: 'more-330',
                images: [
                    require('../assets/images/rooms/more-330.jpeg')
                ],
                floor: '3',
                capacity: '55',
                roomType: 'Classroom',
                searchAliases: ['MORE 330'],
            },
            {
                id: 'more-332',
                images: [
                    require('../assets/images/rooms/more-332.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['MORE 332'],
            },
            {
                id: 'more-334',
                images: [
                    require('../assets/images/rooms/more-334.jpeg')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['MORE 334'],
            },
            {
                id: 'more-362',
                images: [
                    require('../assets/images/rooms/more-362.jpeg')
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
        images: [require('../assets/images/buildings/mu.jpeg')],
        rooms: [
            {
                id: 'mu-lanes',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/nash.jpeg')],
        rooms: [
            {
                id: 'nash-032',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '42',
                roomType: 'Classroom',
                searchAliases: ['NASH 032'],
            },
            {
                id: 'nash-033',
                images: [
                    require('../assets/images/rooms/nash-033.jpeg')
                ],
                floor: '0',
                capacity: '42',
                roomType: 'Classroom',
                searchAliases: ['NASH 033'],
            },
            {
                id: 'nash-104J',
                images: [
                    require('../assets/images/rooms/nash-104J.jpeg')
                ],
                floor: '1',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['NASH 104J'],
            },
            {
                id: 'nash-164',
                images: [
                    require('../assets/images/rooms/nash-164.jpeg')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['NASH 164'],
            },
            {
                id: 'nash-204',
                images: [
                    require('../assets/images/rooms/nash-204.jpeg')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Classroom',
                searchAliases: ['NASH 204'],
            },
            {
                id: 'nash-206',
                images: [
                    require('../assets/images/rooms/nash-206.jpeg')
                ],
                floor: '2',
                capacity: '82',
                roomType: 'Classroom',
                searchAliases: ['NASH 206'],
            },
            {
                id: 'nash-214',
                images: [
                    require('../assets/images/rooms/nash-214.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['NASH 214'],
            },
            {
                id: 'nash-218',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '22',
                roomType: 'Conference Room',
                searchAliases: ['NASH 218'],
            },
            {
                id: 'nash-234',
                images: [
                    require('../assets/images/rooms/nash-234.jpeg')
                ],
                floor: '2',
                capacity: '13',
                roomType: 'Conference Room',
                searchAliases: ['NASH 234'],
            },
            {
                id: 'nash-304',
                images: [
                    require('../assets/images/rooms/nash-304.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Lab Room',
                searchAliases: ['NASH 304'],
            },
            {
                id: 'nash-316',
                images: [
                    require('../assets/images/rooms/nash-316.jpeg')
                ],
                floor: '3',
                capacity: '72',
                roomType: 'Lab Room',
                searchAliases: ['NASH 316'],
            },
            {
                id: 'nash-318',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '10',
                roomType: 'Lab Room',
                searchAliases: ['NASH 318'],
            },
            {
                id: 'nash-404',
                images: [
                    require('../assets/images/rooms/nash-404.jpeg')
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
        images: [require('../assets/images/placeholder.png')],
        rooms: [
            {
                id: 'oao-106',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/oatf.jpeg')],
        rooms: [
            {
                id: 'oatf-106',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['OATF 106'],
            },
            {
                id: 'oatf-108',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['OATF 108'],
            },
            {
                id: 'oatf-109',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['OATF 109'],
            },
            {
                id: 'oatf-112',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/pfsc.jpeg')],
        rooms: [
            {
                id: 'pfsc-104',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['PFSC 104'],
            },
            {
                id: 'pfsc-117',
                images: [
                    require('../assets/images/rooms/pfsc-117.jpeg')
                ],
                floor: '1',
                capacity: '118',
                roomType: 'Lecture Hall',
                searchAliases: ['PFSC 117'],
            },
            {
                id: 'pfsc-125',
                images: [
                    require('../assets/images/rooms/pfsc-125.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['PFSC 125'],
            },
            {
                id: 'pfsc-129',
                images: [
                    require('../assets/images/rooms/pfsc-129.jpeg')
                ],
                floor: '1',
                capacity: '70',
                roomType: 'Classroom',
                searchAliases: ['PFSC 129'],
            },
            {
                id: 'pfsc-177',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['PFSC 177'],
            },
            {
                id: 'pfsc-215',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Computer Lab',
                searchAliases: ['PFSC 215'],
            },
            {
                id: 'pfsc-217',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Computer Lab',
                searchAliases: ['PFSC 217'],
            },
            {
                id: 'pfsc-301',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '18',
                roomType: 'Classroom',
                searchAliases: ['PFSC 301'],
            },
            {
                id: 'pfsc-302',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '48',
                roomType: 'Classroom',
                searchAliases: ['PFSC 302'],
            },
            {
                id: 'pfsc-315',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/placeholder.png')],
        rooms: [
            {
                id: 'pole-Vet-Horse-Barn',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/poling.jpeg')],
        rooms: [
            {
                id: 'poling-133',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/prax.jpeg')],
        rooms: [
            {
                id: 'prax-107',
                images: [
                    require('../assets/images/rooms/prax-107.jpeg')
                ],
                floor: '1',
                capacity: '22',
                roomType: 'Dressing Room',
                searchAliases: ['PRAX 107', 'Dressing Room'],
            },
            {
                id: 'prax-120',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '351 (150)',
                roomType: 'Unknown (high chance to be a auditorium)',
                searchAliases: ['PRAX 120', 'Auditorium'],
            },
            {
                id: 'prax-143',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '38 (24)',
                roomType: 'Unknown',
                searchAliases: ['PRAX 143'],
            },
            {
                id: 'prax-150',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '596 (433)',
                roomType: 'Unknown (high chance to be a auditorium)',
                searchAliases: ['PRAX 150', 'Auditorium'],
            },
            {
                id: 'prax-234',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/rc.jpeg')],
        rooms: [
            {
                id: 'rc-104C',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '44',
                roomType: 'Classroom',
                searchAliases: ['RC 104C'],
            },
            {
                id: 'rc-104D',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['RC 104D'],
            },
            {
                id: 'rc-118C',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '42',
                roomType: 'Lab Room',
                searchAliases: ['RC 118C'],
            },
            {
                id: 'rc-120C',
                images: [
                    require('../assets/images/rooms/rc-120C.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['RC 120C'],
            },
            {
                id: 'rc-124C',
                images: [
                    require('../assets/images/rooms/rc-124C.jpeg')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['RC 124C'],
            },
            {
                id: 'rc-136A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['RC 136A'],
            },
            {
                id: 'rc-300D',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/rcb.jpeg')],
        rooms: [
            {
                id: 'rcb-105',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/reed.jpeg')],
        rooms: [
            {
                id: 'reed-111',
                images: [
                    require('../assets/images/rooms/reed-111.jpeg')
                ],
                floor: '1',
                capacity: '25',
                roomType: 'Computer Lab',
                searchAliases: ['REED 111'],
            },
            {
                id: 'reed-219',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['REED 219'],
            },
            {
                id: 'reed-321',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/resr.jpeg')],
        rooms: [
            {
                id: 'resr-100',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '1000',
                roomType: 'Football Field',
                searchAliases: ['RESR 100', 'Football Field'],
            },
            {
                id: 'resr-club',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: 'Club Floor',
                capacity: '250',
                roomType: 'Club Level',
                searchAliases: ['RESR CLUB', 'Reser Club Level'],
            },
            {
                id: 'resr-loge',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/rich.jpeg')],
        rooms: [
            {
                id: 'rich-107',
                images: [
                    require('../assets/images/rooms/rich-107.jpeg')
                ],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['RICH 107'],
            },
            {
                id: 'rich-115',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '47',
                roomType: 'Conference Room',
                searchAliases: ['RICH 115'],
            },
            {
                id: 'rich-123',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['RICH 123'],
            },
            {
                id: 'rich-203',
                images: [
                    require('../assets/images/rooms/rich-203.jpeg')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Computer Lab',
                searchAliases: ['RICH 203'],
            },
            {
                id: 'rich-243',
                images: [
                    require('../assets/images/rooms/rich-243.jpeg')
                ],
                floor: '2',
                capacity: '51',
                roomType: 'Classroom',
                searchAliases: ['RICH 243'],
            },
            {
                id: 'rich-289',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['RICH 289'],
            },
            {
                id: 'rich-313',
                images: [
                    require('../assets/images/rooms/rich-313.jpeg')
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
        images: [require('../assets/images/buildings/rog.jpeg')],
        rooms: [
            {
                id: 'rog-104',
                images: [
                    require('../assets/images/rooms/rog-104.jpeg')
                ],
                floor: '1',
                capacity: '17',
                roomType: 'Lab Room',
                searchAliases: ['ROG 104'],
            },
            {
                id: 'rog-118',
                images: [
                    require('../assets/images/rooms/rog-118.jpeg')
                ],
                floor: '1',
                capacity: '73',
                roomType: 'Workshop',
                searchAliases: ['ROG 118'],
            },
            {
                id: 'rog-126',
                images: [
                    require('../assets/images/rooms/rog-126.jpeg')
                ],
                floor: '1',
                capacity: '42',
                roomType: 'Lab Room',
                searchAliases: ['ROG 126'],
            },
            {
                id: 'rog-222',
                images: [
                    require('../assets/images/rooms/rog-222.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['ROG 222'],
            },
            {
                id: 'rog-226',
                images: [
                    require('../assets/images/rooms/rog-226.jpeg')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['ROG 226'],
            },
            {
                id: 'rog-228',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Lab Room',
                searchAliases: ['ROG 228'],
            },
            {
                id: 'rog-230',
                images: [
                    require('../assets/images/rooms/rog-230.jpeg')
                ],
                floor: '2',
                capacity: '74',
                roomType: 'Classroom',
                searchAliases: ['ROG 230'],
            },
            {
                id: 'rog-304',
                images: [
                    require('../assets/images/rooms/rog-304.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['ROG 304'],
            },
            {
                id: 'rog-330',
                images: [
                    require('../assets/images/rooms/rog-330.jpeg')
                ],
                floor: '3',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['ROG 330'],
            },
            {
                id: 'rog-332',
                images: [
                    require('../assets/images/rooms/rog-332.jpeg')
                ],
                floor: '3',
                capacity: '28',
                roomType: 'Classroom',
                searchAliases: ['ROG 332'],
            },
            {
                id: 'rog-334',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '14',
                roomType: 'Lab Room',
                searchAliases: ['ROG 334'],
            },
            {
                id: 'rog-342',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '31',
                roomType: 'Lab Room',
                searchAliases: ['ROG 342'],
            },
            {
                id: 'rog-440',
                images: [
                    require('../assets/images/rooms/rog-440.jpeg')
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
        images: [require('../assets/images/buildings/sec.jpeg')],
        rooms: [
            {
                id: 'sec-354',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '40',
                roomType: 'Conference Room',
                searchAliases: ['SEC 354'],
            },
            {
                id: 'sec-421',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '25',
                roomType: 'Media Room',
                searchAliases: ['SEC 421'],
            },
            {
                id: 'sec-plaza',
                images: [
                    require('../assets/images/rooms/sec-plaza.jpeg')
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
        images: [require('../assets/images/buildings/shep.jpeg')],
        rooms: [
            {
                id: 'shep-101',
                images: [
                    require('../assets/images/rooms/shep-101.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['SHEP 101'],
            },
            {
                id: 'shep-105',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Conference Room',
                searchAliases: ['SHEP 105'],
            },
            {
                id: 'shep-106',
                images: [
                    require('../assets/images/rooms/shep-106.jpeg')
                ],
                floor: '1',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['SHEP 106'],
            },
            {
                id: 'shep-202',
                images: [
                    require('../assets/images/rooms/shep-202.jpeg')
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
        images: [require('../assets/images/buildings/slp.jpeg')],
        rooms: [
            {
                id: 'slp-east-fields',
                images: [
                    require('../assets/images/rooms/slp-east-fields.jpeg'),
                    require('../assets/images/rooms/slp-east-fields2.jpeg'),
                ],
                floor: 'N/A',
                capacity: '100',
                roomType: 'East Fields',
                searchAliases: ['SLP East Fields'],
            },
            {
                id: 'slp-east-fields',
                images: [
                    require('../assets/images/rooms/slp-west-fields.jpeg'),
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
        images: [require('../assets/images/buildings/snell.jpeg')],
        rooms: [
            {
                id: 'snel-0003',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0003'],
            },
            {
                id: 'snel-003',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 003'],
            },
            {
                id: 'snel-0054',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0054'],
            },
            {
                id: 'snel-0056',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0056'],
            },
            {
                id: 'snel-0066',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0066'],
            },
            {
                id: 'snel-0071',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0071'],
            },
            {
                id: 'snel-0073',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0073'],
            },
            {
                id: 'snel-0074',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0074'],
            },
            {
                id: 'snel-0085',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '0',
                capacity: '55',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 0085'],
            },
            {
                id: 'snel-100A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['SNEL 100A'],
            },
            {
                id: 'snel-100G',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['SNEL 100G'],
            },
            {
                id: 'snel-200B',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '18',
                roomType: 'Computer Lab',
                searchAliases: ['SNEL 200B'],
            },
            {
                id: 'snel-204',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Office Room',
                searchAliases: ['SNEL 204'],
            },
            {
                id: 'snel-448',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/placeholder.png')],
        rooms: [
            {
                id: 'spav-101',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/tens.jpeg')],
        rooms: [
            {
                id: 'tens-101',
                images: [
                    require('../assets/images/rooms/tens-101.jpeg')
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
        images: [require('../assets/images/buildings/tens-crts.jpeg')],
        rooms: [
            {
                id: 'tens-crts-1',
                images: [
                    require('../assets/images/rooms/tens-crts.jpeg')
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
        images: [require('../assets/images/buildings/vlib.jpeg')],
        rooms: [
            {
                id: 'vlib-2024',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '49',
                roomType: 'Computer Lab',
                searchAliases: ['VLIB 2024'],
            },
            {
                id: 'vlib-2082',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '80',
                roomType: 'Autzen Room',
                searchAliases: ['VLIB 2082', 'Autzen Room'],
            },
            {
                id: 'vlib-3622',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '25',
                roomType: 'Willamette East/West Seminar Rooms',
                searchAliases: ['VLIB 3622', 'Willamette East/West Seminar Rooms'],
            },
            {
                id: 'vlib-5420',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/wald.jpeg')],
        rooms: [
            {
                id: 'wald-120',
                images: [
                    require('../assets/images/rooms/wald-120.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['WALD 120'],
            },
            {
                id: 'wald-132',
                images: [
                    require('../assets/images/rooms/wald-132.jpeg')
                ],
                floor: '1',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['WALD 132'],
            },
            {
                id: 'wald-200',
                images: [
                    require('../assets/images/rooms/wald-200.jpeg')
                ],
                floor: '2',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WALD 200'],
            },
            {
                id: 'wald-201',
                images: [
                    require('../assets/images/rooms/wald-201.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['WALD 201'],
            },
            {
                id: 'wald-201A',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '37',
                roomType: 'Classroom',
                searchAliases: ['WALD 201A'],
            },
            {
                id: 'wald-240',
                images: [
                    require('../assets/images/rooms/wald-240.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WALD 240'],
            },
            {

                id: 'wald-244',
                images: [
                    require('../assets/images/rooms/wald-244.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WALD 244'],
            },
            {
                id: 'wald-252',
                images: [
                    require('../assets/images/rooms/wald-252.jpeg')
                ],
                floor: '2',
                capacity: '10',
                roomType: 'Conference Room',
                searchAliases: ['WALD 252'],
            },
            {

                id: 'wald-329',
                images: [
                    require('../assets/images/rooms/wald-329.jpeg')
                ],
                floor: '3',
                capacity: '21',
                roomType: 'Classroom',
                searchAliases: ['WALD 329'],
            },
            {

                id: 'wald-421',
                images: [
                    require('../assets/images/rooms/wald-421.jpeg')
                ],
                floor: '4',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['WALD 421'],
            },
            {

                id: 'wald-432',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '14',
                roomType: 'Conference Room',
                searchAliases: ['WALD 432'],
            },
            {

                id: 'wald-456',
                images: [
                    require('../assets/images/placeholder.png')
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
        images: [require('../assets/images/buildings/wfd.jpeg')],
        rooms: [
            {
                id: 'wfd-EG01',
                images: [
                    require('../assets/images/rooms/wfd-eg01.jpeg')
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
        images: [require('../assets/images/buildings/with.jpeg')],
        rooms: [
            {
                id: 'with-062',
                images: [
                    require('../assets/images/rooms/with-062.jpeg')
                ],
                floor: '0',
                capacity: '16',
                roomType: 'Classroom',
                searchAliases: ['WITH 062'],
            },
            {
                id: 'with-064',
                images: [
                    require('../assets/images/rooms/with-064.jpeg')
                ],
                floor: '0',
                capacity: '50',
                roomType: 'Classroom',
                searchAliases: ['WITH 064'],
            },
            {
                id: 'with-074',
                images: [
                    require('../assets/images/rooms/with-074.jpeg')
                ],
                floor: '0',
                capacity: '24',
                roomType: 'Computer Lab',
                searchAliases: ['WITH 074'],
            },
            {
                id: 'with-153',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '362',
                roomType: 'Auditorium',
                searchAliases: ['WITH 153'],
            },
            {
                id: 'with-155',
                images: [
                    require('../assets/images/rooms/with-155.jpeg')
                ],
                floor: '1',
                capacity: '217',
                roomType: 'Lecture Hall',
                searchAliases: ['WITH 155'],
            },
            {
                id: 'with-159',
                images: [
                    require('../assets/images/rooms/with-159.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WITH 159'],
            },
            {
                id: 'with-159C',
                images: [
                    require('../assets/images/rooms/with-159C.jpeg')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Lab Room',
                searchAliases: ['WITH 159C'],
            },
            {
                id: 'with-161C',
                images: [
                    require('../assets/images/rooms/with-161C.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Makeup Room',
                searchAliases: ['WITH 161C', 'Makeup Room'],
            },
            {
                id: 'with-165',
                images: [
                    require('../assets/images/rooms/with-165.jpeg')
                ],
                floor: '1',
                capacity: '27',
                roomType: 'Classroom',
                searchAliases: ['WITH 165'],
            },
            {
                id: 'with-167',
                images: [
                    require('../assets/images/rooms/with-167.jpeg')
                ],
                floor: '1',
                capacity: '15',
                roomType: 'Dressing Room',
                searchAliases: ['WITH 167', 'Dressing Room'],
            },
            {
                id: 'with-199',
                images: [
                    require('../assets/images/rooms/with-199.jpeg')
                ],
                floor: '1',
                capacity: '120',
                roomType: 'Small Performance Theater',
                searchAliases: ['WITH 199', 'Small Performance Theater'],
            },
            {
                id: 'with-201',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '23',
                roomType: 'Conference Room',
                searchAliases: ['WITH 201'],
            },
            {
                id: 'with-203',
                images: [
                    require('../assets/images/rooms/with-203.jpeg')
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
        images: [require('../assets/images/buildings/wlkn.jpeg')],
        rooms: [
            {
                id: 'wlkn-004',
                images: [
                    require('../assets/images/rooms/wlkn-004.jpeg')
                ],
                floor: '0',
                capacity: '25',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 004'],
            },
            {
                id: 'wlkn-010',
                images: [
                    require('../assets/images/rooms/wlkn-010.jpeg')
                ],
                floor: '0',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 010'],
            },
            {
                id: 'wlkn-106',
                images: [
                    require('../assets/images/rooms/wlkn-106.jpeg')
                ],
                floor: '1',
                capacity: '18',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 106'],
            },
            {
                id: 'wlkn-108',
                images: [
                    require('../assets/images/rooms/wlkn-108.jpeg')
                ],
                floor: '1',
                capacity: '65',
                roomType: 'Classroom',
                searchAliases: ['WLKN 108'],
            },
            {
                id: 'wlkn-110',
                images: [
                    require('../assets/images/rooms/wlkn-110.jpeg')
                ],
                floor: '1',
                capacity: '299',
                roomType: 'Lecture Hall',
                searchAliases: ['WLKN 110', 'Gilfillan Auditorium'],
            },
            {
                id: 'wlkn-127',
                images: [
                    require('../assets/images/rooms/wlkn-127.jpeg')
                ],
                floor: '1',
                capacity: '20',
                roomType: 'Conference Room',
                searchAliases: ['WLKN 127'],
            },
            {
                id: 'wlkn-129',
                images: [
                    require('../assets/images/rooms/wlkn-129.jpeg')
                ],
                floor: '1',
                capacity: '32',
                roomType: 'Lab Room',
                searchAliases: ['WLKN 129'],
            },
            {
                id: 'wlkn-203',
                images: [
                    require('../assets/images/rooms/wlkn-203.jpeg')
                ],
                floor: '2',
                capacity: '25',
                roomType: 'Conference Room',
                searchAliases: ['WLKN 203'],
            },
            {
                id: 'wlkn-207',
                images: [
                    require('../assets/images/rooms/wlkn-207.jpeg')
                ],
                floor: '2',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['WLKN 207'],
            },
            {
                id: 'wlkn-210',
                images: [
                    require('../assets/images/rooms/wlkn-210.jpeg')
                ],
                floor: '2',
                capacity: '27',
                roomType: 'Computer Lab',
                searchAliases: ['WLKN 210'],
            },
            {
                id: 'wlkn-235',
                images: [
                    require('../assets/images/rooms/wlkn-235.jpeg')
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
        images: [require('../assets/images/buildings/wngr.jpeg')],
        rooms: [
            {
                id: 'wngr-112',
                images: [
                    require('../assets/images/rooms/wngr-112.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 112'],
            },
            {
                id: 'wngr-116',
                images: [
                    require('../assets/images/rooms/wngr-116.jpeg')
                ],
                floor: '1',
                capacity: '100',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 116'],
            },
            {
                id: 'wngr-127',
                images: [
                    require('../assets/images/rooms/wngr-127.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 127'],
            },
            {
                id: 'wngr-129',
                images: [
                    require('../assets/images/rooms/wngr-129.jpeg')
                ],
                floor: '1',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 129'],
            },
            {
                id: 'wngr-145',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '1',
                capacity: '12',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 145'],
            },
            {
                id: 'wngr-149',
                images: [
                    require('../assets/images/rooms/wngr-149.jpeg')
                ],
                floor: '1',
                capacity: '78',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 149'],
            },
            {
                id: 'wngr-151',
                images: [
                    require('../assets/images/rooms/wngr-151.jpeg')
                ],
                floor: '1',
                capacity: '201',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 151'],
            },
            {
                id: 'wngr-153',
                images: [
                    require('../assets/images/rooms/wngr-153.jpeg')
                ],
                floor: '1',
                capacity: '128',
                roomType: 'Lecture Hall',
                searchAliases: ['WNGR 153'],
            },
            {
                id: 'wngr-200',
                images: [
                    require('../assets/images/rooms/wngr-200.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 200'],
            },
            {
                id: 'wngr-201',
                images: [
                    require('../assets/images/rooms/wngr-201.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['WNGR 201'],
            },
            {
                id: 'wngr-204',
                images: [
                    require('../assets/images/rooms/wngr-204.jpeg')
                ],
                floor: '2',
                capacity: '35 (30)',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 204'],
            },
            {
                id: 'wngr-206',
                images: [
                    require('../assets/images/rooms/wngr-206.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Computer Lab',
                searchAliases: ['WNGR 206'],
            },
            {
                id: 'wngr-212',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '94',
                roomType: 'Classroom',
                searchAliases: ['WNGR 212'],
            },
            {
                id: 'wngr-222',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Classroom',
                searchAliases: ['WNGR 222'],
            },
            {
                id: 'wngr-226',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '2',
                capacity: '40',
                roomType: 'Classroom',
                searchAliases: ['WNGR 226'],
            },
            {
                id: 'wngr-228',
                images: [
                    require('../assets/images/rooms/wngr-228.jpeg')
                ],
                floor: '2',
                capacity: '48',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['WNGR 228'],
            },
            {
                id: 'wngr-232',
                images: [
                    require('../assets/images/rooms/wngr-232.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 232'],
            },
            {
                id: 'wngr-234',
                images: [
                    require('../assets/images/rooms/wngr-234.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 234'],
            },
            {
                id: 'wngr-238',
                images: [
                    require('../assets/images/rooms/wngr-238.jpeg')
                ],
                floor: '2',
                capacity: '35',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 238'],
            },
            {
                id: 'wngr-245',
                images: [
                    require('../assets/images/rooms/wngr-245.jpeg')
                ],
                floor: '2',
                capacity: '34',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 245'],
            },
            {
                id: 'wngr-247',
                images: [
                    require('../assets/images/rooms/wngr-247.jpeg')
                ],
                floor: '2',
                capacity: '45',
                roomType: 'Classroom/Lab Room',
                searchAliases: ['WNGR 247'],
            },
            {
                id: 'wngr-275',
                images: [
                    require('../assets/images/rooms/wngr-275.jpeg')
                ],
                floor: '2',
                capacity: '32',
                roomType: 'Classroom',
                searchAliases: ['WNGR 275'],
            },
            {
                id: 'wngr-285',
                images: [
                    require('../assets/images/rooms/wngr-285.jpeg')
                ],
                floor: '2',
                capacity: '24',
                roomType: 'Classroom',
                searchAliases: ['WNGR 285'],
            },
            {
                id: 'wngr-287',
                images: [
                    require('../assets/images/rooms/wngr-287.jpeg')
                ],
                floor: '2',
                capacity: '30',
                roomType: 'Classroom',
                searchAliases: ['WNGR 287'],
            },
            {
                id: 'wngr-300',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 300'],
            },
            {
                id: 'wngr-302',
                images: [
                    require('../assets/images/rooms/wngr-302.jpeg')
                ],
                floor: '3',
                capacity: '24',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 302'],
            },
            {
                id: 'wngr-304',
                images: [
                    require('../assets/images/rooms/wngr-304.jpeg')
                ],
                floor: '3',
                capacity: '36',
                roomType: 'Classroom',
                searchAliases: ['WNGR 304'],
            },
            {
                id: 'wngr-304F',
                images: [
                    require('../assets/images/rooms/wngr-304F.jpeg')
                ],
                floor: '3',
                capacity: '49',
                roomType: 'Computer Lab',
                searchAliases: ['WNGR 304F'],
            },
            {
                id: 'wngr-305',
                images: [
                    require('../assets/images/rooms/wngr-305.jpeg')
                ],
                floor: '3',
                capacity: '16',
                roomType: 'Conference Room',
                searchAliases: ['WNGR 305'],
            },
            {
                id: 'wngr-328',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '80',
                roomType: 'Classroom',
                searchAliases: ['WNGR 328'],
            },
            {
                id: 'wngr-334',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '3',
                capacity: '20',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 334'],
            },
            {
                id: 'wngr-345',
                images: [
                    require('../assets/images/rooms/wngr-345.jpeg')
                ],
                floor: '3',
                capacity: '23',
                roomType: 'Classroom',
                searchAliases: ['WNGR 345'],
            },
            {
                id: 'wngr-377',
                images: [
                    require('../assets/images/rooms/wngr-377.jpeg')
                ],
                floor: '3',
                capacity: '21',
                roomType: 'Classroom',
                searchAliases: ['WNGR 377'],
            },
            {
                id: 'wngr-412',
                images: [
                    require('../assets/images/placeholder.png')
                ],
                floor: '4',
                capacity: '30',
                roomType: 'Lab Room',
                searchAliases: ['WNGR 412'],
            },
            {
                id: 'wngr-426',
                images: [
                    require('../assets/images/rooms/wngr-426.jpeg')
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
        images: [require('../assets/images/buildings/backrooms.jpeg')],
        rooms: [
            {
                id: 'the-backrooms',
                images: [
                    require('../assets/images/rooms/the-backrooms-1.jpeg'),
                    require('../assets/images/rooms/the-backrooms-2.jpeg'),
                    require('../assets/images/rooms/the-backrooms-3.jpeg'),
                    require('../assets/images/rooms/the-backrooms-4.jpeg'),
                    require('../assets/images/rooms/the-backrooms-5.jpeg'),
                    require('../assets/images/rooms/the-backrooms-6.jpeg'),
                    require('../assets/images/rooms/the-backrooms-7.jpeg'),
                    require('../assets/images/rooms/the-backrooms-8.jpeg'),
                    require('../assets/images/rooms/the-backrooms-9.jpeg'),
                    require('../assets/images/rooms/the-backrooms-10.jpeg'),
                    require('../assets/images/rooms/the-backrooms-11.jpeg'),
                    require('../assets/images/rooms/the-backrooms-12.jpeg'),
                    require('../assets/images/rooms/the-backrooms-13.jpeg'),
                    require('../assets/images/rooms/the-backrooms-14.jpeg'),
                    require('../assets/images/rooms/the-backrooms-15.jpeg'),
                    require('../assets/images/rooms/the-backrooms-16.jpeg'),
                    require('../assets/images/rooms/the-backrooms-17.jpeg'),
                    require('../assets/images/rooms/the-backrooms-18.jpeg'),
                    require('../assets/images/rooms/the-backrooms-19.jpeg'),
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
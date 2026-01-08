export interface Room {
    id: string;
    name: string;
    building: string;
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
                name: 'Room 101',
                building: 'Owen Hall',
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
                name: 'Room 102',
                building: 'Owen Hall',
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
                name: 'Room 106',
                building: 'Owen Hall',
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
                name: 'Room 109',
                building: 'Owen Hall',
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
                name: 'Room 110',
                building: 'Owen Hall',
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
                name: 'Room 217',
                building: 'Owen Hall',
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
                name: 'Room 224',
                building: 'Owen Hall',
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
                name: 'Room 237',
                building: 'Owen Hall',
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
                name: 'Room 241',
                building: 'Owen Hall',
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
                name: 'Room 424',
                building: 'Owen Hall',
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
                name: 'Room 433',
                building: 'Owen Hall',
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
                name: 'Room 100',
                building: 'LINC',
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
                name: 'Room 128',
                building: 'LINC',
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
                name: 'Room 200',
                building: 'LINC',
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
                name: 'Room 210',
                building: 'LINC',
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
                name: 'Room 228',
                building: 'LINC',
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
                name: 'Room 268',
                building: 'LINC',
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
                name: 'Room 302',
                building: 'LINC',
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
                name: 'Room 303',
                building: 'LINC',
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
                name: 'Room 307',
                building: 'LINC',
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
                name: 'Room 314',
                building: 'LINC',
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
                name: 'Room 343',
                building: 'LINC',
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
                name: 'Room 345',
                building: 'LINC',
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
                name: 'Room 350',
                building: 'LINC',
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
                name: 'Room 360',
                building: 'LINC',
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
                name: 'Room 368',
                building: 'LINC',
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
];

export function getRoomById(roomId: string): Room | null {
    for (const building of BUILDINGS_DATA) {
        const room = building.rooms.find(r => r.id === roomId);
        if (room) return room;
    }
    return null;
}

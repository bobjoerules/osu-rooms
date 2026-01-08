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
                    require('../assets/images/placeholder.png'),
                    require('../assets/images/rooms/owen-hall-102.jpeg'),
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
                images: [require('../assets/images/rooms/owen-hall-102.jpeg')],
                floor: '1',
                capacity: '94',
                roomType: 'Lecture Hall',
                searchAliases: ['Owen 102'],
            },
            {
                id: 'owen-hall-106',
                name: 'Room 106',
                building: 'Owen Hall',
                images: [require('../assets/images/rooms/owen-hall-106.jpeg')],
                floor: '1',
                capacity: '56',
                roomType: 'Classroom',
                searchAliases: ['Owen 106'],
            },
            {
                id: 'owen-hall-109',
                name: 'Room 109',
                building: 'Owen Hall',
                images: [require('../assets/images/rooms/owen-hall-109.jpeg')],
                floor: '1',
                capacity: '29',
                roomType: 'Lab Room',
                searchAliases: ['Owen 109'],
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

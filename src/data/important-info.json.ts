type parkingInfo = {
    title: string
    ceremony: {
        title: string
        info: string
        additionalInfo: string
    }
    reception: {
        title: string
        info: string
        additionalInfo?: string
    }
}

type GentleRequest = {
    title: string
    info: string
}

type accommodationInfo = {
    title: string
    hotel: string
}

type childrenInfo = {
    title: string
    info: string
}

type FoodOnTheDay = {
    title: string
    info: string
}

type giftsInfo = {
    title: string
    info: string
}

type taxiInfo = {
    name: string
    phone: string
}

type transportInfo = {
    title: string
    taxis: taxiInfo[]
}

export type ImportantInfo = [
    parkingInfo,
    giftsInfo,
    FoodOnTheDay,
    accommodationInfo,
    GentleRequest,
    childrenInfo,
    transportInfo
]

export const importantInfo: ImportantInfo = [
    {
        title: 'Travel & Parking',
        ceremony: {
            title: 'Church Parking',
            info: 'There is limited parking available at the church for ceremony guests. Additional parking is available at the Swanmore Primary School staff car park opposite the church.',
            additionalInfo:
                'Please note: a classic car show will be taking place nearby on the day, so parking will be limited. We recommend arriving early to secure a space, but street parking is also available.',
        },

        reception: {
            title: 'Reception Parking',
            info: 'There is ample parking at The Bell for all guests.',
        },
    },
    {
        title: 'Gifts',
        info: `Your presence at our wedding is more than enough. However, if you would like to give something, a small contribution towards our house deposit would be greatly appreciated as we begin this next chapter together.`,
    },
    {
        title: 'Food on the Day',
        info: `We recommend having something to eat before the ceremony. Light snacks will be available beforehand, but the wedding breakfast won't be served until around 4pm.`,
    },
    {
        title: 'Accommodation Options',
        hotel: 'The Bell Inn has plenty of rooms available for guests. Please contact Vicki on 07931 241621 for booking details. Rooms are limited, so please book early to avoid disappointment - Rooms range from £100-£170 and include breakfast.',
    },
    {
        title: 'A Gentle Request',
        info: 'Please note that some guests are sensitive to strong fragrances. If wearing perfume or aftershave, we kindly ask that you keep it light.',
    },
    {
        title: 'Children at the Wedding',
        info: `While we love your little ones, we have decided to make our wedding an adults-only event (Besides Jamie's little sister!). We hope you understand and look forward to celebrating with you!`,
    },
    {
        title: 'Taxi Services',
        taxis: [
            {
                name: 'New Forest Taxis',
                phone: '01425 600222',
            },
            {
                name: 'Radio Taxis',
                phone: '02380 666666',
            },
        ],
    },
]

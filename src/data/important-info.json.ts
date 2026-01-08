type parkingInfo = {
    title: string
    ceremony: string
    reception: string
}

type accommodationInfo = {
    title: string
    hotel: string
}

type childrenInfo = {
    title: string
    info: string
}

type giftsInfo = {
    title: string
    info: string
}

type travelInfo = {
    title: string
    info: string
    advisories: string
}

type taxiInfo = {
    name: string
    phone: string
}

type transportInfo = {
    title: string
    info: string
    taxis: taxiInfo[]
}

export type ImportantInfo = [
    parkingInfo,
    accommodationInfo,
    childrenInfo,
    giftsInfo,
    travelInfo,
    transportInfo
]

export const importantInfo: ImportantInfo = [
    {
        title: 'Parking Information',
        ceremony:
            'There is limited parking available at the Church for ceremony guests. Additional parking is available in the primary School car park opposite the Church. You can also park in the village car park located opposite the Church, but tends to fill up quickly. Please arrive early to secure a spot.',
        reception:
            'At the Reception venue, there is ample parking available for all guests. Please follow the signs upon arrival to the designated parking areas. If you require assistance or have any special parking needs, do not hesitate to contact the venue staff.',
    },
    {
        title: 'Accommodation Options',
        hotel: 'The Bell Inn has plenty of rooms available for guests. Please contact Vicki for booking details. Rooms are limited, so please book early to avoid disappointment - Rooms range from £100-£170 and include breakfast.',
    },
    {
        title: 'Children at the Wedding',
        info: `While we love your little ones, we have decided to make our wedding an adults-only event (Besides Jamie's little sister!). We hope you understand and look forward to celebrating with you!`,
    },
    {
        title: 'Gifts',
        info: `Your presence at our wedding is the greatest gift we could ask for. However, if you wish to honour us with a gift, a contribution towards our house deposit would be greatly appreciated as we embark on this new chapter together.`,
    },
    {
        title: 'Travel Information',
        info: `The Church is located in the heart of the village, easily accessible by car and public transport. For those driving, there is limited parking available at the Church, with additional parking in nearby areas. If you're using public transport, the nearest train station is just a short taxi ride away.`,
        advisories:
            'Please be advised of potential blockages on the motorway when traveling to the Bell Inn. We recommend checking traffic updates prior to your journey to ensure a smooth arrival for around 2:30 PM.',
    },
    {
        title: 'Transport Information',
        info: `For guests requiring transport, we recommend arranging taxis in advance. Local taxi services include:`,
        taxis: [
            {
                name: 'City Cabs',
                phone: '01234 567890',
            },
            {
                name: 'Town Taxis',
                phone: '09876 543210',
            },
        ],
    },
]

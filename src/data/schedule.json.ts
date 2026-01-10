export type ScheduleItem = {
    title: string
    time: string
    info?: string
    text: string[]
    image: {
        src: string
        alt: string
    }
    link?: {
        href: string
        text: string
    }
}

export const schedule: ScheduleItem[] = [
    {
        title: 'Ceremony',
        time: '11:40 AM',
        info: 'We recommend arriving by 11:30 AM to allow plenty of time for parking.',
        text: ['St. Barnabas Church', 'Swanmore,', 'Southampton, ', 'SO32 2PA'],

        link: {
            href: 'https://www.google.com/maps/place/St.+Barnabas+Church/@50.905123,-1.362456,15z/data=!4m5!3m4!1s0x0:0x1234567890abcdef!8m2!3d50.905123!4d-1.362456',
            text: 'Map',
        },

        image: {
            src: '/images/st_barnabas_church.webp',
            alt: 'St. Barnabas Church',
        },
    },
    {
        title: 'Reception',
        time: 'Arrive after ceremony',
        info: 'We recommend checking live updates on your sat nav when travelling to The Bell. If there are delays, alternative routes may be quicker - we suggest to only use the motorway if traffic is clear.',
        text: ['The Bell Inn', 'Lyndhurst', 'New Forest', 'SO43 7HE'],
        image: {
            src: '/images/bell-inn.jpg',
            alt: 'The Bell Inn, Lyndhurst',
        },
        link: {
            href: 'https://www.google.com/maps/place/The+Bell+Inn,+New+Forest/@50.9258658,-1.6161379,17z/data=!4m9!3m8!1s0x48747db4ce382af1:0xb8101bfbc15b0cd3!5m2!4m1!1i2!8m2!3d50.9258658!4d-1.613563!16s%2Fg%2F1td2yyd1?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D',
            text: 'Map',
        },
    },

    {
        title: 'Welcome Drinks',
        time: '2:30 PM',
        text: [
            'Join us for a glass',
            'of bubbly as we celebrate',
            'the newlyweds',
            'with a live Saxophonist',
        ],
        image: {
            src: '/images/bell-inn-reception.jpg',
            alt: 'Welcome Drinks',
        },
    },
    {
        title: 'Wedding Breakfast',
        time: '4:00 PM',
        text: ['Enjoy a 3-course', 'meal with wine', 'and wedding speeches.'],
        image: {
            src: '/images/bell-inn-wedding-breakfast.jpg',
            alt: 'Wedding Breakfast',
        },
        link: {
            href: '/menu',
            text: 'View Menu',
        },
    },
    {
        title: 'Evening Reception',
        time: '7:00 - Late',
        text: ['Enjoy a DJ', 'and dancing', 'with a late-night', 'buffet!'],
        image: {
            src: '/images/bell-inn-evening.jpg',
            alt: 'Evening Reception',
        },
    },
]

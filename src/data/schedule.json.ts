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
        time: '11:30 AM',
        info: 'Bride to arrive at 12:00 PM',
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
        info: "We advise taking the motorway only if your SatNav doesn't show delays.",
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
        text: ['Enjoy a glass', 'of bubbly and', 'live saxophonist'],
        image: {
            src: '/images/bell-inn-reception.jpg',
            alt: 'Welcome Drinks',
        },
    },
    {
        title: 'Wedding Breakfast',
        time: '4:00 PM',
        text: ['A delicious', '3-course', 'meal with wine', 'and speeches.'],
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

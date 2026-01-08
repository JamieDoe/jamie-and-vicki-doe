import { Schedule } from '@/components/Schedule'
import { RsvpCta } from '@/components/RsvpCta'
import { MapContainer } from '@/components/MapContainer'

export type TravelInfo = {
    location: string
    address: string
    parkingInfo: string
    lat: number
    lng: number
}

const travelData: TravelInfo[] = [
    {
        location: 'St Barnabas Church, Swanmore',
        address: 'Church Rd, Swanmore, Southampton, SO32 2PA',
        parkingInfo:
            'Limited parking is available on-site. Additional parking can be found opposite the church on Church Road.',
        lat: 50.9443853712796,
        lng: -1.180267570921239,
    },
    {
        location: 'The Bell Inn, Lyndhurst',
        address: 'Lyndhurst, New Forest, SO43 7HE',
        parkingInfo:
            'Ample parking is available at The Bell Inn for all guests.',
        lat: 50.92601454992001,
        lng: -1.6132196801641259,
    },
]

export default function SchedulePage() {
    return (
        <main className="min-h-screen pb-20 max-w-screen-2xl mx-auto text-center">
            <section className="relative flex flex-col items-center pt-56 gap-4 pb-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-7xl md:text-8xl font-orpheus-pro duration-300">
                    Locations & Directions
                </h1>
                <p className="font-lora text-xl font-medium duration-300">
                    Details for our ceremony and reception venues.
                </p>
            </section>

            <section className="flex min-h-screen flex-col items-center justify-center gap-24 py-24 w-full max-w-[1400px] mx-auto">
                {travelData.map((info, index) => (
                    <MapContainer
                        key={info.location}
                        lat={info.lat}
                        lng={info.lng}
                        location={info.location}
                        address={info.address}
                        parkingInfo={info.parkingInfo}
                        className={
                            index % 2 === 1
                                ? 'md:flex-row-reverse sm:pr-6 lg:pr-8'
                                : 'pl-4 sm:pl-6 lg:pl-8'
                        }
                    />
                ))}
            </section>
            <RsvpCta />
        </main>
    )
}

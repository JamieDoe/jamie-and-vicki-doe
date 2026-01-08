'use client'

import { cn } from '@/lib/utils'
import { Loader } from '@googlemaps/js-api-loader'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { buttonVariants } from './ui/button'

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

export function MapContainer({
    lat,
    lng,
    location,
    address,
    parkingInfo,
    className,
}: {
    lat: number
    lng: number
    location: string
    address: string
    parkingInfo: string
    className?: string
}) {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function initMap() {
            const loader = new Loader({
                apiKey,
                version: 'weekly',
            })

            const { Map } = await loader.importLibrary('maps')
            const { Marker } = await loader.importLibrary('marker')

            const position = {
                lat,
                lng,
            }

            const options: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: generateMapId(lat, lng),
            }

            if (mapRef.current) {
                const map = new Map(mapRef.current, options)

                const marker = new Marker({
                    position,
                    map,
                })
            }
        }

        initMap()
    }, [])

    return (
        <div
            className={cn(
                'w-full mt-8 flex justify-center items-center flex-col gap-24 md:flex-row',
                className
            )}
        >
            <div className="flex-1 text-center space-y-8 max-w-sm mx-auto">
                <h2 className="text-4xl font-orpheus-pro">{location}</h2>
                <div className="text-3xl leading-relaxed space-y-1 font-lora">
                    <p className="text-2xl pb-8 max-w-sm">{address}</p>
                    <p className="text-xl">{parkingInfo}</p>
                </div>
                <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        buttonVariants({
                            size: 'lg',
                            variant: 'outline',
                            className:
                                'border-2 border-primary text-lg font-semibold bg-primary hover:bg-transparent hover:text-primary text-background font-orpheus-pro',
                        })
                    )}
                >
                    View on Google Maps
                </Link>
            </div>
            <div
                ref={mapRef}
                className="flex-1 w-full max-w-[800px] min-h-[600px] rounded-lg overflow-hidden shadow-lg grayscale-25"
            ></div>
        </div>
    )
}

function generateMapId(lat: number, lng: number): string {
    const str = `${lat},${lng}`
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash |= 0
    }
    return `map-${Math.abs(hash)}`
}

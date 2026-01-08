import { Schedule } from '@/components/Schedule'
import { RsvpCta } from '@/components/RsvpCta'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Order of the Day',
}

export default function SchedulePage() {
    return (
        <main className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto text-center">
            <section className="relative flex flex-col items-center pt-56 gap-4 pb-16">
                <h1 className="text-7xl md:text-8xl font-orpheus-pro duration-300">
                    Order of the Day
                </h1>
                <p className="font-lora text-xl font-medium duration-300">
                    A full breakdown of our wedding day events.
                </p>

                <Schedule />
            </section>
            <RsvpCta />
        </main>
    )
}

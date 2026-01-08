import RsvpForm from '@/components/RsvpForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'RSVP',
}

export default function RSVP() {
    return (
        <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto text-center">
            <section className="relative flex flex-col items-center pt-56 gap-4 font-orpheus-pro">
                <RsvpForm />
            </section>
        </div>
    )
}

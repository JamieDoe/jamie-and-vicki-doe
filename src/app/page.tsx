import Image from 'next/image'

import { RsvpCta } from '@/components/RsvpCta'
import { Schedule } from '@/components/Schedule'
import { Metadata } from 'next'

const metadata: Metadata = {
    title: {
        default: 'Jamie & Victoria 2026',
        template: '%s | Jamie & Victoria 2026',
    },
    description: 'Join us for our wedding celebration on April 25, 2026!',
}

export default function Home() {
    return (
        <main className="min-h-screen pb-20">
            <section className="min-h-screen relative flex flex-col items-center pt-56 gap-4">
                <h1 className="text-7xl md:text-8xl font-orpheus-pro text-white duration-300">
                    Victoria & Jamie
                </h1>
                <p className="font-lora text-2xl md:text-3xl text-white font-semibold duration-300">
                    25.04.2026
                </p>

                <Image
                    src="/images/hero.png"
                    alt="Hero Image"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 w-full h-full object-cover -z-10 filter brightness-80"
                />
            </section>
            <Schedule />
            <RsvpCta />
        </main>
    )
}

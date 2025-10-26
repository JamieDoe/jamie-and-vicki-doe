import { RsvpCta } from '@/components/RsvpCta'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen">
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
            <section className="flex min-h-screen flex-col items-center justify-center gap-24 py-24">
                <InfoCard
                    src="/images/st_barnabas_church.webp"
                    title="Ceremony"
                    time="12:00 PM"
                    link={{
                        href: 'https://www.google.com/maps/place/St+Barnabas+Church/@50.9442524,-1.1820995,18.62z/data=!4m10!1m2!2m1!1sst+barnabas!3m6!1s0x48746bb8acd1274b:0x54d4c3df2587b600!8m2!3d50.944284!4d-1.1809864!15sCgtzdCBiYXJuYWJhc1oNIgtzdCBiYXJuYWJhc5IBBmNodXJjaJoBJENoZERTVWhOTUc5blMwVkpUR2R0VEhJMU5FMHljSEJCUlJBQqoBRBABKg8iC3N0IGJhcm5hYmFzKAAyHhABIhrKTCtLWMOJ86KKHBAKdD_EvxNh4Kjv8j8DEjIPEAIiC3N0IGJhcm5hYmFz4AEA-gEECGoQIA!16s%2Fm%2F053tfd7?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D',
                        text: 'Map',
                    }}
                >
                    <p>St. Barnabas Church</p>
                    <p>Church Rd, Swanmore,</p>
                    <p>Southampton</p>
                    <p>SO32 2PA</p>
                </InfoCard>
                <InfoCard
                    src="/images/bell-inn.jpg"
                    title="Reception"
                    time="2:30 PM"
                    link={{
                        href: 'https://www.google.com/maps/place/The+Bell+Inn,+New+Forest/@50.9258658,-1.6161379,17z/data=!4m9!3m8!1s0x48747db4ce382af1:0xb8101bfbc15b0cd3!5m2!4m1!1i2!8m2!3d50.9258658!4d-1.613563!16s%2Fg%2F1td2yyd1?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D',
                        text: 'Map',
                    }}
                    className="md:flex-row-reverse"
                >
                    <p>The Bell Inn</p>
                    <p>Lyndhurst,</p>
                    <p>New Forest,</p>
                    <p>SO43 7HE</p>
                </InfoCard>
                <InfoCard
                    src="/images/bell-inn-reception.jpg"
                    title="Welcome Drinks"
                    time="2:30 - 4:00 PM"
                >
                    <p>Enjoy a glass</p>
                    <p>of champagne</p>
                    <p>with canapés and</p>
                    <p>live saxophonist</p>
                </InfoCard>
                <InfoCard
                    src="/images/bell-inn.jpg"
                    title="Wedding Breakfast"
                    time="4:00-7:00 PM"
                    className="md:flex-row-reverse"
                    link={{
                        href: '/menu',
                        text: 'View Menu',
                    }}
                >
                    <p>A delicious</p>
                    <p>three-course</p>
                    <p>meal with wine</p>
                    <p>and speeches</p>
                </InfoCard>
                <InfoCard
                    src="/images/bell-inn-reception.jpg"
                    title="Evening Reception"
                    time="7:00 - Late"
                >
                    <p>Enjoy a DJ</p>
                    <p>and dancing</p>
                    <p>with a late-night</p>
                    <p>buffet!</p>
                </InfoCard>
            </section>
            <RsvpCta />
        </main>
    )
}

function InfoCard({
    title,
    time,
    src,
    link,
    className,
    children,
}: {
    title: string
    time: string
    src: string
    link?: { href: string; text: string }
    className?: string
    children?: React.ReactNode
}) {
    return (
        <div
            className={cn(
                'w-full flex flex-col md:flex-row gap-12 overflow-hidden max-w-[1400px] items-center',
                className
            )}
        >
            {/* Image Section */}
            <h1 className="md:hidden block font-orpheus-pro text-7xl">
                {title}
            </h1>
            <div className="relative w-full max-w-screen-md h-[500px] lg:h-[700px] duration-300">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </div>

            {/* Content Section */}
            <div className="w-full flex items-center justify-center p-8 md:p-12">
                <div className="text-center space-y-6 font-orpheus-pro">
                    <h1 className="hidden md:block font-orpheus-pro text-7xl">
                        {title}
                    </h1>

                    <div className="space-y-10">
                        <p className="text-4xl">{time}</p>

                        <div className="text-3xl leading-relaxed space-y-1">
                            {children}
                        </div>
                        {link && (
                            <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    buttonVariants({
                                        size: 'lg',
                                        variant: 'outline',
                                        className:
                                            'border-2 border-primary text-base bg-transparent hover:bg-primary hover:text-white',
                                    })
                                )}
                            >
                                {link.text}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

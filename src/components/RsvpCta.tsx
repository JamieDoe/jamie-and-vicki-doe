import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function RsvpCta() {
    return (
        <section className="mx-auto relative min-h-[600px] h-full">
            <div className="max-w-screen-2xl flex flex-col items-center justify-center text-center mx-auto h-full py-32 px-4 sm:px-6 lg:px-8 font-orpheus-pro">
                <div className="z-10 flex flex-col items-center gap-8 h-full">
                    <h2 className="text-6xl md:text-7xl mb-6 text-white">
                        We hope you can join us!
                    </h2>
                    <Link
                        href="/rsvp"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' })
                        )}
                    >
                        RSVP
                    </Link>
                </div>
                <Image
                    src="/images/hero.png"
                    alt="Rsvp Background"
                    fill
                    className="object-cover w-full h-full absolute top-0 left-0 -z-10 brightness-75 px-8 md:px-16 lg:px-24 duration-300"
                    priority
                />
            </div>
        </section>
    )
}

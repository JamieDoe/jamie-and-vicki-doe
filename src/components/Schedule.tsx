import { schedule, type ScheduleItem } from '@/data/schedule.json'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export function Schedule() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-24 py-24 w-full">
            {schedule.map((item, index) => (
                <ScheduleCard
                    key={index}
                    item={item}
                    className={index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                />
            ))}
        </section>
    )
}

function ScheduleCard({
    item,
    className,
}: {
    item: ScheduleItem
    className?: string
}) {
    return (
        <div
            className={cn(
                'w-full flex flex-col md:flex-row gap-12 overflow-hidden max-w-[1400px] items-center text-center',
                className
            )}
        >
            {/* Image Section */}
            <h1 className="md:hidden block font-orpheus-pro text-7xl">
                {item.title}
            </h1>
            <div className="relative w-full max-w-screen-md h-[500px] lg:h-[700px] duration-300">
                <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </div>

            {/* Content Section */}
            <div className="w-full flex items-center justify-center p-8 md:p-12">
                <div className="space-y-6 font-orpheus-pro">
                    <h1 className="hidden md:block text-7xl">{item.title}</h1>

                    <div className="space-y-10">
                        <p className="text-4xl">{item.time}</p>
                        <div className="text-3xl leading-relaxed space-y-1">
                            {item.info && (
                                <p className="text-2xl pb-4 max-w-sm">
                                    {item.info}
                                </p>
                            )}
                            {item.text.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        {item.link && (
                            <Link
                                href={item.link.href}
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
                                {item.link.text}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

import { RsvpCta } from '@/components/RsvpCta'

import { menus, type MenuItem } from '@/data/menus.json'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Menu',
}

export default function MenuPage() {
    const { weddingBreakfast } = menus

    return (
        <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto text-center">
            <section className="relative flex flex-col items-center pt-56 gap-4 pb-16">
                <h1 className="text-7xl md:text-8xl font-orpheus-pro duration-300">
                    Wedding Breakfast Menu
                </h1>
                <p className="font-lora text-xl font-medium duration-300">
                    A delicious selection - choose one option from each course.
                </p>

                <div className="flex flex-col gap-20 pt-24">
                    <MenuItem
                        item={weddingBreakfast.starters}
                        title="Starters"
                    />
                    <hr className="border-t border-dashed border-gray-400 max-w-2xl w-full mx-auto" />
                    <MenuItem item={weddingBreakfast.mains} title="Mains" />
                    <hr className="border-t border-dashed border-gray-400 max-w-2xl w-full mx-auto" />
                    <MenuItem
                        item={weddingBreakfast.desserts}
                        title="Desserts"
                    />
                </div>
            </section>
            <RsvpCta />
        </div>
    )
}

function MenuItem({ item, title }: { item: MenuItem[]; title: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <h2 className="text-5xl font-orpheus-pro font-medium">{title}</h2>
            {item.map((item) => (
                <div
                    className="flex flex-col gap-4 max-w-3xl items-center"
                    key={item.name}
                >
                    <h3 className="text-2xl font-lora">{item.name}</h3>
                    <p className="font-lora">{item.description}</p>
                    {item.dietaryInfo && (
                        <p className="italic text-sm">({item.dietaryInfo})</p>
                    )}
                </div>
            ))}
        </div>
    )
}

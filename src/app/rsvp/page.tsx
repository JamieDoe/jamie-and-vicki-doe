import { HeroWrapper } from '@/components/HeroWrapper'

export default function RSVP() {
    return (
        <HeroWrapper
            image={{
                src: '/images/hero.png',
                alt: 'Hero Image',
                width: 1920,
                height: 1080,
            }}
            title="RSVP"
            subtitle="Please let us know if you can join us by March 1st, 2026"
        />
    )
}

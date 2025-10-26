import Image from 'next/image'

export default function MenuPage() {
    return (
        <section className="min-h-[600px] relative flex flex-col items-center pt-56 gap-4">
            <h1 className="text-7xl md:text-8xl font-orpheus-pro text-white duration-300">
                Wedding Breakfast Menu
            </h1>
            <p className="font-lora text-base text-white font-semibold duration-300"></p>

            <Image
                src="/images/hero.png"
                alt="Hero Image"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover -z-10 filter brightness-80"
            />
        </section>
    )
}

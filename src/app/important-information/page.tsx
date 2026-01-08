import { importantInfo } from '@/data/important-info.json'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Important Information',
}

export default function ImportantInformation() {
    return (
        <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto text-center">
            <section className="relative flex flex-col items-center pt-56 gap-4 pb-16">
                <h1 className="text-7xl md:text-8xl font-orpheus-pro duration-300">
                    Important Information
                </h1>
                <p className="font-lora text-xl font-medium duration-300">
                    Please read the important information regarding our wedding
                    day below.
                </p>

                <div className="flex flex-col gap-8 pt-24 max-w-xl w-full text-center">
                    {importantInfo.map((info) => (
                        <div key={info.title}>
                            <h2 className="text-4xl font-orpheus-pro font-medium mb-4">
                                {info.title}
                            </h2>
                            {'ceremony' in info && (
                                <div className="mb-6">
                                    <h3 className="text-2xl font-lora font-semibold mb-2">
                                        Ceremony
                                    </h3>
                                    <p className="font-lora leading-relaxed">
                                        {info.ceremony}
                                    </p>
                                </div>
                            )}
                            {'reception' in info && (
                                <div className="mb-6">
                                    <h3 className="text-2xl font-lora font-semibold mb-2">
                                        Reception
                                    </h3>
                                    <p className="font-lora leading-relaxed">
                                        {info.reception}
                                    </p>
                                </div>
                            )}
                            {'hotel' in info && (
                                <p className="font-lora leading-relaxed">
                                    {info.hotel}
                                </p>
                            )}
                            {'info' in info && (
                                <div className="mb-6">
                                    <p className="font-lora leading-relaxed">
                                        {info.info}
                                    </p>
                                </div>
                            )}
                            {'advisories' in info && (
                                <div className="mb-6">
                                    <h3 className="text-2xl font-lora font-semibold mb-2">
                                        Travel Advisories
                                    </h3>
                                    <p className="font-lora leading-relaxed">
                                        {info.advisories}
                                    </p>
                                </div>
                            )}
                            {'taxis' in info && (
                                <div>
                                    <h3 className="text-2xl font-lora font-semibold mb-2">
                                        Taxi Services
                                    </h3>
                                    <ul className="list-disc list-inside font-lora leading-relaxed">
                                        {info.taxis.map((taxi) => (
                                            <li key={taxi.name}>
                                                {taxi.name} - {taxi.phone}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

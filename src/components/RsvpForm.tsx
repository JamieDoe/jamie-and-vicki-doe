'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

import {
    searchGuestByName,
    getGuestWithRelated,
    updateGuestRsvp,
    GuestWithRelated,
    MenuChoices,
} from '@/app/actions/rsvp'
import { WeddingGuest } from '@/lib/supabase'
import { menus } from '@/data/menus.json'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

// Stage types
type Stage =
    | 'name-lookup'
    | 'completed-rsvp'
    | 'guest-selection'
    | 'primary-attending'
    | 'primary-menu'
    | 'primary-details'
    | 'related-attending'
    | 'related-menu'
    | 'related-details'
    | 'submit'
    | 'completed'

type GuestRsvp = {
    attending: boolean
    menuChoices?: MenuChoices
    dietaryRequirements?: string
    hotelInfoRequested?: boolean
}

// Mock menu options - replace with your actual data
const mealOptions = {
    starters: menus.weddingBreakfast.starters,
    mains: menus.weddingBreakfast.mains,
    desserts: menus.weddingBreakfast.desserts,
}

// Schema for name lookup
const nameLookupSchema = z.object({
    firstName: z.string().min(1, 'Please provide your first name.'),
    lastName: z.string().min(1, 'Please provide your last name.'),
})

export default function RsvpForm() {
    const [stage, setStage] = useState<Stage>('name-lookup')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [foundGuests, setFoundGuests] = useState<WeddingGuest[]>([])
    const [selectedGuest, setSelectedGuest] = useState<GuestWithRelated | null>(
        null
    )

    const [alreadyCompleted, setAlreadyCompleted] = useState(false)

    const [primaryRsvp, setPrimaryRsvp] = useState<GuestRsvp>({
        attending: false,
    })
    const [relatedRsvp, setRelatedRsvp] = useState<GuestRsvp>({
        attending: false,
    })

    const nameLookupForm = useForm({
        resolver: zodResolver(nameLookupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    })

    function handleError(errorMessage: string) {
        setError(errorMessage)
        toast.error(errorMessage)
    }

    // Handle name lookup
    async function handleNameLookup(data: z.infer<typeof nameLookupSchema>) {
        setLoading(true)
        setError(null)

        const { firstName, lastName } = data

        const guests = await searchGuestByName(firstName, lastName)

        if (!guests || guests.length === 0) {
            handleError(
                'No invitation found. Please check your name and try again.'
            )
            setLoading(false)
            return
        }

        if (guests[0].completed) {
            const guestWithRelated = await getGuestWithRelated(guests[0].id)
            if (guestWithRelated) {
                setSelectedGuest(guestWithRelated)
                setStage('completed-rsvp')
                setLoading(false)
                setAlreadyCompleted(true)
                setFoundGuests(guests)
                return
            }
        }

        setFoundGuests(guests)

        if (guests.length === 1) {
            const guestWithRelated = await getGuestWithRelated(guests[0].id)
            if (guestWithRelated) {
                setSelectedGuest(guestWithRelated)
                setStage('primary-attending')
            }
        } else {
            setStage('guest-selection')
        }

        setLoading(false)
    }

    // Handle going back to previous stage
    function handleGoBack() {
        setError(null)
        switch (stage) {
            case 'guest-selection':
                setStage('name-lookup')

                break
            case 'primary-attending':
                if (foundGuests.length > 1) {
                    setStage('guest-selection')
                } else {
                    setStage('name-lookup')
                }
                break
            case 'primary-menu':
                setStage('primary-attending')
                break
            case 'primary-details':
                setStage('primary-menu')
                break
            case 'related-attending':
                if (primaryRsvp.attending) {
                    setStage('primary-details')
                } else {
                    setStage('primary-attending')
                }
                break
            case 'related-menu':
                setStage('related-attending')
                break
            case 'related-details':
                setStage('related-menu')
                break
            case 'submit':
                if (selectedGuest?.related_guest_info) {
                    if (relatedRsvp.attending) {
                        setStage('related-details')
                    } else {
                        setStage('related-attending')
                    }
                } else {
                    if (primaryRsvp.attending) {
                        setStage('primary-details')
                    } else {
                        setStage('primary-attending')
                    }
                }
                break
        }
    }

    // Handle primary guest attending
    function handlePrimaryAttending(attending: boolean) {
        setPrimaryRsvp({ ...primaryRsvp, attending })
        if (attending) {
            setStage('primary-menu')
        } else {
            if (selectedGuest?.related_guest_info) {
                setStage('related-attending')
            } else {
                setStage('submit')
            }
        }
    }

    // Handle primary menu selection
    function handlePrimaryMenu(menuChoices: MenuChoices) {
        setPrimaryRsvp({ ...primaryRsvp, menuChoices })
        setError(null)
        setStage('primary-details')
    }

    // Handle primary details
    function handlePrimaryDetails(dietary: string, hotelInfo: boolean) {
        setPrimaryRsvp({
            ...primaryRsvp,
            dietaryRequirements: dietary,
            hotelInfoRequested: hotelInfo,
        })
        setError(null)

        if (selectedGuest?.related_guest_info) {
            setStage('related-attending')
        } else {
            setStage('submit')
        }
    }

    // Handle related guest attending
    function handleRelatedAttending(attending: boolean) {
        setRelatedRsvp({ ...relatedRsvp, attending })
        if (attending) {
            setStage('related-menu')
        } else {
            setStage('submit')
        }
    }

    // Handle related menu selection
    function handleRelatedMenu(menuChoices: MenuChoices) {
        setRelatedRsvp({ ...relatedRsvp, menuChoices })
        setStage('related-details')
    }

    // Handle related details
    function handleRelatedDetails(dietary: string, hotelInfo: boolean) {
        setRelatedRsvp({
            ...relatedRsvp,
            dietaryRequirements: dietary,
            hotelInfoRequested: hotelInfo,
        })
        setStage('submit')
    }

    // Submit final RSVP
    async function handleSubmit() {
        setLoading(true)
        setError(null)

        try {
            // Update primary guest
            if (selectedGuest) {
                await updateGuestRsvp(
                    selectedGuest.id,
                    primaryRsvp.attending,
                    primaryRsvp.menuChoices,
                    primaryRsvp.dietaryRequirements,
                    primaryRsvp.hotelInfoRequested
                )
            }

            // Update related guest if exists
            if (selectedGuest?.related_guest_info) {
                await updateGuestRsvp(
                    selectedGuest.related_guest_info.id,
                    relatedRsvp.attending,
                    relatedRsvp.menuChoices,
                    relatedRsvp.dietaryRequirements,
                    relatedRsvp.hotelInfoRequested
                )
            }

            // Reset form
            setStage('completed')
            setSelectedGuest(null)
            setPrimaryRsvp({ attending: false })
            setRelatedRsvp({ attending: false })
            nameLookupForm.reset()
            toast.success('RSVP submitted successfully!')
        } catch (err) {
            handleError(
                'There was an error submitting your RSVP. Please try again.'
            )
            console.error(err)
        }

        setLoading(false)
    }

    return (
        <>
            <h1 className="text-7xl md:text-8xl duration-300">RSVP</h1>
            <p className="text-2xl md:text-3xl text-gray-600">
                {stage === 'name-lookup' &&
                    'Please enter your name to find your invitation.'}
                {stage === 'guest-selection' &&
                    'Multiple invitations found. Please select your name.'}
                {stage === 'completed-rsvp' &&
                    'You have already submitted your RSVP.'}
                {(stage === 'primary-attending' ||
                    stage === 'related-attending') &&
                    'Please let us know if you will be attending.'}
                {(stage === 'primary-menu' || stage === 'related-menu') &&
                    'Please select your menu choices.'}
                {(stage === 'primary-details' || stage === 'related-details') &&
                    'Please provide additional details.'}
                {stage === 'submit' && 'Review your RSVP before submitting.'}

                {stage === 'completed' && ''}
            </p>
            <div className="w-full max-w-2xl mx-auto p-6 md:p-12">
                {stage !== 'completed' ? (
                    <div className="space-y-10">
                        {error && (
                            <div className="text-red-600 p-6 bg-red-50 border-2 border-red-200 rounded font-orpheus-pro text-xl">
                                {error}
                            </div>
                        )}

                        {/* Stage 1: Name Lookup */}
                        {stage === 'name-lookup' && (
                            <Form {...nameLookupForm}>
                                <form
                                    className="space-y-10"
                                    onSubmit={nameLookupForm.handleSubmit(
                                        handleNameLookup
                                    )}
                                >
                                    <div className="flex flex-col md:flex-row gap-4 items-start">
                                        <FormField
                                            control={nameLookupForm.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel className="text-2xl font-orpheus-pro">
                                                        First Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="First Name"
                                                            className="bg-white border-1 border-black focus:border-gray-400 transition-colors placeholder-text-2xl p-6 font-orpheus-pro"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="font-orpheus-pro" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={nameLookupForm.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel className="text-2xl font-orpheus-pro ">
                                                        Last Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Last Name"
                                                            className="bg-white border-1 border-black focus:border-gray-400 transition-colors placeholder-text-2xl p-6 font-orpheus-pro"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="font-orpheus-pro" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full border-2 border-black bg-primary hover:bg-transparent hover:text-primary text-background text-xl py-6 font-orpheus-pro transition-colors cursor-pointer"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? 'Searching...'
                                            : 'Find My Invitation'}
                                    </Button>
                                </form>
                            </Form>
                        )}

                        {/* Stage 2: Completed RSVP */}
                        {alreadyCompleted && (
                            <div className="space-y-10 text-center font-orpheus-pro">
                                <h2 className="text-5xl">
                                    Hi {selectedGuest?.guest_first_name} You
                                    have already submitted your RSVP.
                                </h2>
                                <p className="text-2xl md:text-3xl">
                                    If you need to make changes, please contact
                                    us directly on
                                    <Link
                                        href="tel:+447931241621"
                                        className="underline mx-2"
                                    >
                                        07931 241621
                                    </Link>
                                </p>
                                <p className="text-2xl md:text-3xl">
                                    We advise all guests to read the important
                                    information regarding our wedding day.
                                </p>
                                <Link
                                    href="/important-information"
                                    className="inline-block border-2 border-black bg-black hover:bg-transparent hover:text-black text-background text-xl py-4 px-8 transition-colors"
                                >
                                    View Important Information
                                </Link>
                            </div>
                        )}

                        {/* Stage 3: Primary Guest Attending */}
                        {stage === 'primary-attending' && selectedGuest && (
                            <div className="space-y-10 text-center font-orpheus-pro">
                                <Button
                                    variant="outline"
                                    onClick={handleGoBack}
                                    className="self-start border-2 border-black bg-transparent hover:bg-gray-100 text-black text-lg py-3 px-6 font-orpheus-pro transition-colors"
                                >
                                    ← Back
                                </Button>
                                <h2 className="text-5xl md:text-7xl">
                                    {selectedGuest.guest_first_name}{' '}
                                    {selectedGuest.guest_last_name}
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-3xl md:text-4xl">
                                        Will you be attending?
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <Button
                                            size="lg"
                                            className="flex-1 border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-xl py-6 transition-colors"
                                            onClick={() =>
                                                handlePrimaryAttending(true)
                                            }
                                        >
                                            Yes, I'll be there!
                                        </Button>
                                        <Button
                                            size="lg"
                                            className="flex-1 border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-xl py-6 transition-colors"
                                            onClick={() =>
                                                handlePrimaryAttending(false)
                                            }
                                        >
                                            Sorry, can't make it
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stage 4: Primary Guest Menu Selection */}
                        {stage === 'primary-menu' && (
                            <MenuSelectionStage
                                guestName={`${selectedGuest?.guest_first_name} ${selectedGuest?.guest_last_name}`}
                                onComplete={handlePrimaryMenu}
                                onError={handleError}
                                onBack={handleGoBack}
                            />
                        )}

                        {/* Stage 5: Primary Guest Details */}
                        {stage === 'primary-details' && (
                            <DetailsStage
                                guestName={`${selectedGuest?.guest_first_name} ${selectedGuest?.guest_last_name}`}
                                onComplete={handlePrimaryDetails}
                                onBack={handleGoBack}
                            />
                        )}

                        {/* Stage 6: Related Guest Attending */}
                        {stage === 'related-attending' &&
                            selectedGuest?.related_guest_info && (
                                <div className="space-y-10 text-center font-orpheus-pro">
                                    <Button
                                        variant="outline"
                                        onClick={handleGoBack}
                                        className="self-start border-2 border-black bg-transparent hover:bg-gray-100 text-black text-lg py-3 px-6 font-orpheus-pro transition-colors"
                                    >
                                        ← Back
                                    </Button>
                                    <h2 className="text-5xl md:text-7xl">
                                        {
                                            selectedGuest.related_guest_info
                                                .guest_first_name
                                        }{' '}
                                        {
                                            selectedGuest.related_guest_info
                                                .guest_last_name
                                        }
                                    </h2>
                                    <div className="space-y-6">
                                        <p className="text-3xl md:text-4xl">
                                            Will you be attending?
                                        </p>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <Button
                                                size="lg"
                                                className="flex-1 border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-xl py-6 transition-colors"
                                                onClick={() =>
                                                    handleRelatedAttending(true)
                                                }
                                            >
                                                Yes, I'll be there!
                                            </Button>
                                            <Button
                                                size="lg"
                                                className="flex-1 border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-xl py-6 transition-colors"
                                                onClick={() =>
                                                    handleRelatedAttending(
                                                        false
                                                    )
                                                }
                                            >
                                                Sorry, can't make it
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Stage 7: Related Guest Menu Selection */}
                        {stage === 'related-menu' && (
                            <MenuSelectionStage
                                guestName={`${selectedGuest?.related_guest_info?.guest_first_name} ${selectedGuest?.related_guest_info?.guest_last_name}`}
                                onComplete={handleRelatedMenu}
                                onError={setError}
                                onBack={handleGoBack}
                            />
                        )}

                        {/* Stage 8: Related Guest Details */}
                        {stage === 'related-details' && (
                            <DetailsStage
                                guestName={`${selectedGuest?.related_guest_info?.guest_first_name} ${selectedGuest?.related_guest_info?.guest_last_name}`}
                                onComplete={handleRelatedDetails}
                                onBack={handleGoBack}
                            />
                        )}

                        {/* Stage 9: Submit */}
                        {stage === 'submit' && (
                            <div className="space-y-10 font-orpheus-pro">
                                <Button
                                    variant="outline"
                                    onClick={handleGoBack}
                                    className="self-start border-2 border-black bg-transparent hover:bg-gray-100 text-black text-lg py-3 px-6 font-orpheus-pro transition-colors"
                                >
                                    ← Back
                                </Button>
                                <h2 className="text-5xl md:text-7xl text-center">
                                    Review Your RSVP
                                </h2>

                                <div className="space-y-6 p-8 bg-white border-2 border-black rounded">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-semibold">
                                            {selectedGuest?.guest_first_name}{' '}
                                            {selectedGuest?.guest_last_name}
                                        </h3>
                                        <p className="text-2xl text-gray-600">
                                            {primaryRsvp.attending ? (
                                                <span>
                                                    <Check className="inline-block mr-2 text-green-700" />
                                                    Attending
                                                </span>
                                            ) : (
                                                <span>
                                                    <X className="inline-block mr-2 text-red-700" />{' '}
                                                    Not Attending
                                                </span>
                                            )}
                                        </p>
                                        {primaryRsvp.attending &&
                                            primaryRsvp.menuChoices && (
                                                <div className="mt-4 space-y-2 text-xl">
                                                    <p>
                                                        <span className="font-semibold">
                                                            Starter:
                                                        </span>{' '}
                                                        {
                                                            primaryRsvp
                                                                .menuChoices
                                                                .starter
                                                        }
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Main:
                                                        </span>{' '}
                                                        {
                                                            primaryRsvp
                                                                .menuChoices
                                                                .main
                                                        }
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">
                                                            Dessert:
                                                        </span>{' '}
                                                        {
                                                            primaryRsvp
                                                                .menuChoices
                                                                .dessert
                                                        }
                                                    </p>
                                                    {primaryRsvp.dietaryRequirements && (
                                                        <p>
                                                            <span className="font-semibold">
                                                                Dietary
                                                                Requirements:
                                                            </span>{' '}
                                                            {
                                                                primaryRsvp.dietaryRequirements
                                                            }
                                                        </p>
                                                    )}
                                                    {primaryRsvp.hotelInfoRequested && (
                                                        <p className="text-lg">
                                                            <Check className="inline-block mr-2 text-green-700" />
                                                            Requested hotel
                                                            information
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                    </div>

                                    {selectedGuest?.related_guest_info && (
                                        <div className="pt-6 border-t-2 border-gray-200 space-y-4">
                                            <h3 className="text-3xl font-semibold">
                                                {
                                                    selectedGuest
                                                        .related_guest_info
                                                        .guest_first_name
                                                }{' '}
                                                {
                                                    selectedGuest
                                                        .related_guest_info
                                                        .guest_last_name
                                                }
                                            </h3>
                                            <p className="text-2xl text-gray-600">
                                                {relatedRsvp.attending ? (
                                                    <span>
                                                        <Check className="inline-block mr-2 text-green-700" />
                                                        Attending
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <X className="inline-block mr-2 text-red-700" />{' '}
                                                        Not Attending
                                                    </span>
                                                )}
                                            </p>
                                            {relatedRsvp.attending &&
                                                relatedRsvp.menuChoices && (
                                                    <div className="mt-4 space-y-2 text-xl">
                                                        <p>
                                                            <span className="font-semibold">
                                                                Starter:
                                                            </span>{' '}
                                                            {
                                                                relatedRsvp
                                                                    .menuChoices
                                                                    .starter
                                                            }
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                Main:
                                                            </span>{' '}
                                                            {
                                                                relatedRsvp
                                                                    .menuChoices
                                                                    .main
                                                            }
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                Dessert:
                                                            </span>{' '}
                                                            {
                                                                relatedRsvp
                                                                    .menuChoices
                                                                    .dessert
                                                            }
                                                        </p>
                                                        {relatedRsvp.dietaryRequirements && (
                                                            <p>
                                                                <span className="font-semibold">
                                                                    Dietary
                                                                    Requirements:
                                                                </span>{' '}
                                                                {
                                                                    relatedRsvp.dietaryRequirements
                                                                }
                                                            </p>
                                                        )}
                                                        {relatedRsvp.hotelInfoRequested && (
                                                            <p className="text-lg">
                                                                <Check className="inline-block mr-2 text-green-700" />
                                                                Requested hotel
                                                                information
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full border-2 border-black bg-transparent hover:bg-black hover:text-white text-black text-xl py-6 transition-colors"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Confirm RSVP'}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-10 text-center font-orpheus-pro">
                        <h2 className="text-5xl md:text-7xl">
                            Thank you for your RSVP!
                        </h2>
                        <p className="text-2xl md:text-3xl">
                            We look forward to celebrating with you.
                        </p>
                        <p>
                            We advise all guests to read the important
                            information regarding our wedding day.
                        </p>
                        <Link
                            href="/important-information"
                            className="inline-block border-2 border-green-900 bg-green-900 hover:bg-green-700 text-white text-xl py-4 px-8 transition-colors font-lora"
                        >
                            View Important Information
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

// Menu Selection Component
function MenuSelectionStage({
    guestName,
    onComplete,
    onError,
    onBack,
}: {
    guestName: string
    onComplete: (menuChoices: MenuChoices) => void
    onError: (errorMessage: string) => void
    onBack: () => void
}) {
    const [starter, setStarter] = useState('')
    const [main, setMain] = useState('')
    const [dessert, setDessert] = useState('')

    const handleSubmit = () => {
        if (!starter || !main || !dessert) {
            onError('Please select a choice for each course.')
            return
        }
        onComplete({ starter, main, dessert })
    }

    return (
        <div className="space-y-10 font-orpheus-pro">
            <Button
                variant="outline"
                onClick={onBack}
                className="self-start border-2 border-black bg-transparent hover:bg-gray-100 text-black text-lg py-3 px-6 font-orpheus-pro transition-colors"
            >
                ← Back
            </Button>
            <h2 className="text-4xl md:text-5xl text-center">
                {guestName}'s Menu Choices
            </h2>

            <div className="space-y-12">
                <div className="space-y-6">
                    <Label className="text-3xl md:text-4xl block">
                        Starter
                    </Label>
                    <RadioGroup
                        value={starter}
                        onValueChange={setStarter}
                        className="space-y-3"
                    >
                        {mealOptions.starters.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center gap-4 p-4 bg-white border-1 border-primary hover:border-primary/30 transition-colors cursor-pointer"
                                onClick={() => setStarter(item.name)}
                            >
                                <RadioGroupItem
                                    value={item.name}
                                    id={`starter-${item.name}`}
                                    className="border-1 border-black"
                                />
                                <Label
                                    htmlFor={`starter-${item.name}`}
                                    className="text-2xl cursor-pointer flex-1 flex flex-col max-w-sm mx-auto"
                                >
                                    {item.name}
                                    {item.description && (
                                        <span className="text-xl">
                                            {item.description}
                                        </span>
                                    )}
                                    {item.dietaryInfo && (
                                        <span className="text-base text-primary/50 mt-1 font-semibold">
                                            ({item.dietaryInfo})
                                        </span>
                                    )}
                                </Label>
                                <div className="w-[16px]" />
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <hr className="border-t border-dashed border-gray-400 max-w-sm w-full mx-auto" />

                <div className="space-y-6">
                    <Label className="text-3xl md:text-4xl block">
                        Main Course
                    </Label>
                    <RadioGroup
                        value={main}
                        onValueChange={setMain}
                        className="space-y-3"
                    >
                        {mealOptions.mains.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center gap-4 p-4 bg-white border-1 border-primary hover:border-primary/30 transition-colors cursor-pointer"
                                onClick={() => setMain(item.name)}
                            >
                                <RadioGroupItem
                                    value={item.name}
                                    id={`main-${item.name}`}
                                    className="border-1 border-black"
                                />
                                <Label
                                    htmlFor={`main-${item.name}`}
                                    className="text-2xl cursor-pointer flex-1 flex flex-col max-w-sm mx-auto"
                                >
                                    {item.name}
                                    {item.description && (
                                        <span className="text-xl">
                                            {item.description}
                                        </span>
                                    )}
                                    {item.dietaryInfo && (
                                        <span className="text-base text-primary/50 mt-1 font-semibold">
                                            ({item.dietaryInfo})
                                        </span>
                                    )}
                                </Label>
                                <div className="w-[16px]" />
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <hr className="border-t border-dashed border-gray-400 max-w-sm w-full mx-auto" />

                <div className="space-y-6">
                    <Label className="text-3xl md:text-4xl block">
                        Dessert
                    </Label>
                    <RadioGroup
                        value={dessert}
                        onValueChange={setDessert}
                        className="space-y-3"
                    >
                        {mealOptions.desserts.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center gap-4 p-4 bg-white border-1 border-primary hover:border-primary/30 transition-colors cursor-pointer"
                                onClick={() => setDessert(item.name)}
                            >
                                <RadioGroupItem
                                    value={item.name}
                                    id={`dessert-${item.name}`}
                                    className="border-1 border-black"
                                />
                                <Label
                                    htmlFor={`dessert-${item.name}`}
                                    className="text-2xl cursor-pointer flex-1 flex flex-col max-w-sm mx-auto"
                                >
                                    {item.name}
                                    {item.description && (
                                        <span className="text-xl">
                                            {item.description}
                                        </span>
                                    )}
                                    {item.dietaryInfo && (
                                        <span className="text-base text-primary/50 mt-1 font-semibold">
                                            ({item.dietaryInfo})
                                        </span>
                                    )}
                                </Label>
                                <div className="w-[16px]" />
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>

            <Button
                size="lg"
                className="w-full border-2 border-black bg-primary hover:bg-transparent hover:text-primary text-background text-xl py-6 transition-colors cursor-pointer"
                onClick={handleSubmit}
            >
                Continue
            </Button>
        </div>
    )
}

// Details Stage Component
function DetailsStage({
    guestName,
    onComplete,
    onBack,
}: {
    guestName: string
    onComplete: (dietary: string, hotelInfo: boolean) => void
    onBack: () => void
}) {
    const [dietary, setDietary] = useState('')
    const [hotelInfo, setHotelInfo] = useState(false)

    const handleSubmit = () => {
        onComplete(dietary, hotelInfo)
    }

    return (
        <div className="space-y-10 font-orpheus-pro">
            <Button
                variant="outline"
                onClick={onBack}
                className="self-start border-2 border-black bg-transparent hover:bg-gray-100 text-black text-lg py-3 px-6 font-orpheus-pro transition-colors"
            >
                ← Back
            </Button>
            <h2 className="text-4xl md:text-5xl text-center">
                {guestName}'s Additional Information
            </h2>

            <div className="space-y-8">
                <div className="space-y-4">
                    <Label className="text-3xl md:text-4xl block">
                        Dietary Requirements or Allergies
                    </Label>
                    <Textarea
                        placeholder="Please let us know of any dietary requirements or allergies..."
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="bg-white border-1 border-black focus:border-gray-400 transition-colors text-lg p-4 min-h-[120px] resize-none"
                    />
                </div>

                <div
                    className="flex items-center space-x-4 p-6 bg-white border-1 border-black cursor-pointer"
                    onClick={() => setHotelInfo(!hotelInfo)}
                >
                    <Checkbox
                        id="hotel-info"
                        checked={hotelInfo}
                        onCheckedChange={(checked) =>
                            setHotelInfo(checked === true)
                        }
                        className="mt-1 border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <Label className="text-lg md:text-xl leading-relaxed">
                        Would you like Vicki to send you hotel room booking
                        information to stay at The Bell?
                    </Label>
                </div>
            </div>

            <Button
                size="lg"
                className="w-full border-2 border-black bg-primary hover:bg-transparent hover:text-primary text-background text-xl py-6 transition-colors cursor-pointer"
                onClick={handleSubmit}
            >
                Continue
            </Button>
        </div>
    )
}

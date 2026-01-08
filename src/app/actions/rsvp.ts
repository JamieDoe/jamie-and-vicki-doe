'use server'

import { supabase, WeddingGuest } from '@/lib/supabase'
import { Database } from '../../../types/database.types'

// Type for menu choices
export type MenuChoices = {
    starter: string
    main: string
    dessert: string
}

// Type for guest with related guest info
export type GuestWithRelated = WeddingGuest & {
    related_guest_info?: WeddingGuest | null
}

export async function searchGuestByName(
    firstName: string,
    lastName: string
): Promise<WeddingGuest[] | null> {
    try {
        const { data, error } = await supabase
            .from('wedding_guest')
            .select('*')
            .ilike('guest_first_name', firstName)
            .ilike('guest_last_name', lastName)

        if (error) {
            console.error('Search error:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('Search failed:', error)
        return null
    }
}

export async function getGuestWithRelated(
    guestId: string
): Promise<GuestWithRelated | null> {
    try {
        const { data: guest, error: guestError } = await supabase
            .from('wedding_guest')
            .select('*')
            .eq('id', guestId)
            .single()

        if (guestError || !guest) {
            console.error('Guest fetch error:', guestError)
            return null
        }

        // If guest has a related guest, fetch that too
        if (guest.related_guest) {
            const { data: relatedGuest, error: relatedError } = await supabase
                .from('wedding_guest')
                .select('*')
                .eq('id', guest.related_guest)
                .single()

            if (!relatedError && relatedGuest) {
                return {
                    ...guest,
                    related_guest_info: relatedGuest,
                }
            }
        }

        return guest
    } catch (error) {
        console.error('Fetch failed:', error)
        return null
    }
}

export async function updateGuestRsvp(
    guestId: string,
    attending: boolean,
    menuChoices?: MenuChoices,
    dietaryRequirements?: string,
    hotelInfoRequested?: boolean
): Promise<WeddingGuest | null> {
    try {
        const updateData: Database['public']['Tables']['wedding_guest']['Update'] =
            {
                is_attending: attending,
                guest_menu_choice: menuChoices || {},
                requires_hotel_info: hotelInfoRequested || false,
                dietary_requirements: dietaryRequirements || '',
                completed: true,
            }

        const { data, error } = await supabase
            .from('wedding_guest')
            .update(updateData)
            .eq('id', guestId)
            .select()
            .single()

        if (error) {
            console.error('Update error:', error)
            throw error
        }

        return data
    } catch (error) {
        console.error('Update failed:', error)
        throw error
    }
}

export async function getAllGuests(): Promise<WeddingGuest[] | null> {
    try {
        const { data, error } = await supabase
            .from('wedding_guest')
            .select('*')
            .order('guest_last_name', { ascending: true })

        if (error) {
            console.error('Fetch all error:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('Fetch all failed:', error)
        return null
    }
}

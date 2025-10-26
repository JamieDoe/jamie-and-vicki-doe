'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerClose,
} from '@/components/ui/drawer'

const navLinks = [
    { name: 'Schedule', href: '/schedule' },
    { name: 'Travel', href: '/travel' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Gallery', href: '/gallery' },
]

export function Nav() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                `fixed top-0 left-0 right-0 z-50 transition-all font-lora duration-300 py-6 lg:py-8 px-6 lg:px-14`,
                isScrolled
                    ? 'bg-background/90 backdrop-blur-sm '
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Desktop Navigation Links - Left */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-lg hover:underline"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <Link
                        href="/"
                        className="absolute left-1/2 -translate-x-1/2 font-orpheus-pro text-3xl md:text-4xl tracking-wide"
                    >
                        V&J 2026
                    </Link>

                    <MobileNav />
                    <Link
                        href="/rsvp"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' }),
                            'hover:bg-transparent border-2 border-primary text-base bg-primary text-white hover:text-primary'
                        )}
                    >
                        RSVP
                    </Link>
                </div>

                {/* Mobile Menu */}
            </div>
        </nav>
    )
}

function MobileNav() {
    return (
        <div className="flex lg:hidden">
            <Drawer direction="left">
                <DrawerTrigger>
                    <Menu />
                </DrawerTrigger>

                <DrawerContent className="block lg:hidden ">
                    <DrawerClose className="absolute top-0 right-0 p-4 cursor-pointer">
                        <X />
                    </DrawerClose>
                    <ul className="flex flex-col h-full text-5xl items-center justify-center gap-12 font-orpheus-pro">
                        {navLinks.map(({ name, href }) => (
                            <li key={href}>
                                <Link href={href} className="block w-full p-4 ">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

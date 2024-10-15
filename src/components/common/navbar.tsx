'use client'

import {
  Link as NextUILink,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarNextUI
} from '@nextui-org/react'
import { Bot } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { navbarLinks } from '@/constants'

export default function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const getIsActive = (href: string) => pathname === href

  return (
    <NavbarNextUI onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <Link href='/'>
          <NavbarBrand>
            <Bot className='size-7 pr-2' />
            <p className='font-bold text-inherit'>AI ADVENTURES</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        {navbarLinks.map(({ name, href }) => {
          const isActive = getIsActive(href)

          return (
            <NavbarItem key={href} isActive={isActive}>
              <NextUILink
                color={isActive ? 'primary' : 'foreground'}
                href={href}
              >
                {name}
              </NextUILink>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <NextUILink href='#'>Iniciar Sesión</NextUILink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='bg-white/80 backdrop-blur-sm'>
        {navbarLinks.map(({ name, href }) => {
          const isActive = getIsActive(href)
          return (
            <NavbarMenuItem key={href} isActive={isActive}>
              <NextUILink
                color={isActive ? 'primary' : 'foreground'}
                className='w-full'
                href={href}
                size='lg'
              >
                {name}
              </NextUILink>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </NavbarNextUI>
  )
}

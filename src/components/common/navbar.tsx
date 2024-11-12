'use client'

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarNextUI,
  Link as NextUILink
} from '@nextui-org/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import BrandLogo from '@/components/icons/brand-logo'
import BrandText from '@/components/icons/brand-text'
import { SettingsButtonFallback } from '@/components/loaders/settings-fallback'
import { navbarLinks } from '@/constants'

const SettingsButton = dynamic(
  async () => await import('@/components/common/settings-button'),
  { ssr: false, loading: () => <SettingsButtonFallback /> }
)

export default function Navbar () {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getIsActive = (href: string) => pathname === href

  return (
    <NavbarNextUI isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle className='sm:hidden' />
        <Link href='/'>
          <NavbarBrand>
            <BrandLogo className='size-8 pt-1' />
            <BrandText className='' />
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
                as={Link}
              >
                {name}
              </NextUILink>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <SettingsButton />
        </NavbarItem>

        <NavbarItem className='hidden sm:flex'>
          <NextUILink href='#'>Iniciar Sesión</NextUILink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='bg-white/80 backdrop-blur-sm'>
        {navbarLinks.map(({ name, href }) => {
          const isActive = getIsActive(href)
          return (
            <NavbarMenuItem key={href} isActive={isActive}>
              <NextUILink
                onClick={() => { setIsMenuOpen(false) }}
                color={isActive ? 'primary' : 'foreground'}
                className='w-full'
                href={href}
                size='lg'
                as={Link}
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

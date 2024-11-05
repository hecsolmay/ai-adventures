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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import SettingsButton from '@/components/common/settings-button'
import BrandLogo from '@/components/icons/brand-logo'
import BrandText from '@/components/icons/brand-text'
import { navbarLinks } from '@/constants'

export default function Navbar () {
  const pathname = usePathname()

  const getIsActive = (href: string) => pathname === href

  return (
    <NavbarNextUI>
      <NavbarContent>
        <NavbarMenuToggle
          className='sm:hidden'
        />
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

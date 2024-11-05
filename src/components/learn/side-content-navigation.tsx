'use client'

import { useEffect, useState } from 'react'

import { learnSections } from '@/constants/learn'

interface SideContentNavigationProps {
  title?: string
}

export default function SideContentNavigation ({
  title = 'Navegación rápida'
}: SideContentNavigationProps) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    learnSections.forEach(item => {
      const element = document.getElementById(item.id)
      if (element !== null) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <nav className='rounded-lg bg-gray-100 p-4'>
      <h2 className='mb-4 text-xl font-bold text-secondary'>{title}</h2>
      <ul className='space-y-2'>
        {learnSections.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex items-center rounded-md p-2 transition-colors ${
                activeSection === item.id
                  ? 'bg-purple-100 text-secondary'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              {item.icon !== undefined && <item.icon className='mr-2 size-4' />}
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

import { Card, CardBody, CardFooter, Button } from '@nextui-org/react'
import Link from 'next/link'

import { TOOLS } from '@/constants/tools'
import { type DivProps } from '@/types/props'
import { cn } from '@/utils/cn'

export default function ListOfTools ({ className, ...props }: DivProps) {
  return (
    <section
      {...props}
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {TOOLS.map(tool => (
        <Card
          key={tool.slug}
          className='border-none bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 backdrop-blur-lg'
          style={{
            boxShadow: '0 4px 14px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <CardBody className='p-4'>
            <div className='mb-4 flex items-center'>
              <div className='mr-4 rounded-full bg-white/20 p-2'>
                <tool.icon className='text-2xl text-white' />
              </div>
              <h2 className='text-2xl font-bold text-white'>{tool.title}</h2>
            </div>
            <p className='text-gray-100'>{tool.description}</p>
          </CardBody>
          <CardFooter className='justify-end'>
            <Button
              className='bg-white font-semibold text-purple-600 transition-all duration-200 hover:bg-white/90'
              radius='full'
              size='sm'
              as={Link}
              href={`/tools/${tool.slug}`}
            >
              Pruébalo ahora
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

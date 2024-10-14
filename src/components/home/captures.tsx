import { Button } from '@nextui-org/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Captures () {
  return (
    <div className='container px-4 md:px-6'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <div className='space-y-2'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
            Capture the Magic
          </h2>
          <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
            Create your own AI-powered stories and embark on incredible
            adventures.
          </p>
        </div>
        <div className='w-full max-w-full space-y-4'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <div className='overflow-hidden rounded-lg shadow-lg'>
              <Image
                src='https://g-1x6hvq5bd3t.vusercontent.net/placeholder.svg'
                width={600}
                height={400}
                alt='AI-generated story scene'
                className='h-auto w-full'
              />
            </div>
            <div className='overflow-hidden rounded-lg shadow-lg'>
              <Image
                src='https://g-1x6hvq5bd3t.vusercontent.net/placeholder.svg'
                width={600}
                height={400}
                alt='Child interacting with AI story'
                className='h-auto w-full'
              />
            </div>
            <div className='overflow-hidden rounded-lg shadow-lg'>
              <Image
                src='https://g-1x6hvq5bd3t.vusercontent.net/placeholder.svg'
                width={600}
                height={400}
                alt='Educational AI adventure'
                className='h-auto w-full'
              />
            </div>
          </div>
        </div>
        <Button className='bg-purple-600 text-white hover:bg-purple-700'>
          Create Your Story
          <ArrowRight className='ml-2 size-4' />
        </Button>
      </div>
    </div>
  )
}

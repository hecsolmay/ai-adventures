import { Button } from '@nextui-org/react'

export default function Hero () {
  return (
    <div className='container px-4 md:px-6'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none'>
            AI Adventures
          </h1>
          <p className='mx-auto max-w-[700px] text-white md:text-xl'>
            Embark on a journey of imagination and learning with AI-powered
            storytelling and education.
          </p>
        </div>
        <div className='space-x-4'>
          <Button className='bg-white text-purple-600 hover:bg-gray-100'>
            Get Started
          </Button>
          <Button
            variant='bordered'
            className='border-white bg-transparent text-white hover:bg-white hover:text-purple-600'
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

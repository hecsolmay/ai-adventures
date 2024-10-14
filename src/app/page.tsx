import FadeInContainer from '@/components/fadein-container'
import { Button } from '@nextui-org/react'
import { ArrowRight, BookOpen, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage () {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <FadeInContainer
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 md:py-24 lg:py-32 xl:py-48'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  AI Adventures
                </h1>
                <p className='mx-auto max-w-[700px] text-white md:text-xl'>
                  Embark on a journey of imagination and learning with
                  AI-powered storytelling and education.
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
        </FadeInContainer>
        <FadeInContainer
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='w-full bg-gray-100 py-12 md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Discover AI Adventures
                </h2>
                <p className='mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  AI Adventures is revolutionizing the way children learn and
                  explore their creativity. Our platform combines cutting-edge
                  AI technology with engaging storytelling to create a unique
                  educational experience. Through interactive narratives and
                  personalized learning paths, we inspire curiosity, foster
                  imagination, and enhance cognitive skills.
                </p>
                <p className='mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our AI-powered system adapts to each child&apos;s learning style,
                  ensuring that every adventure is tailored to their individual
                  needs and interests. From magical quests to scientific
                  explorations, AI Adventures opens up a world of possibilities
                  for young minds to grow and thrive.
                </p>
              </div>
            </div>
          </div>
        </FadeInContainer>
        <FadeInContainer
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='w-full py-12 md:py-24 lg:py-32'
        >
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
        </FadeInContainer>
        <FadeInContainer
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='w-full bg-gray-100 py-12 md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                    Learn Through Adventure
                  </h2>
                  <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                    Our educational platform combines storytelling with
                    interactive lessons, making learning fun and engaging for
                    children of all ages.
                  </p>
                </div>
                <ul className='mt-6 grid gap-6'>
                  <li className='flex items-center space-x-2'>
                    <BookOpen className='size-6 text-purple-600' />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <Zap className='size-6 text-purple-600' />
                    <span>Interactive AI-powered lessons</span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <Sparkles className='size-6 text-purple-600' />
                    <span>Engaging storytelling experiences</span>
                  </li>
                </ul>
              </div>
              <div className='flex items-center justify-center'>
                <Image
                  src='https://g-1x6hvq5bd3t.vusercontent.net/placeholder.svg'
                  width={550}
                  height={550}
                  alt='AI Adventures educational interface'
                  className='h-auto w-full rounded-xl shadow-lg'
                />
              </div>
            </div>
          </div>
        </FadeInContainer>
        <FadeInContainer
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className='w-full bg-purple-600 py-12 text-white md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Coming Soon
                </h2>
                <p className='mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  We&apos;re constantly innovating to bring you more exciting
                  features and tools. Stay tuned for our upcoming releases!
                </p>
              </div>
              <p className='text-2xl font-bold'>
                Próximamente más herramientas
              </p>
            </div>
          </div>
        </FadeInContainer>
      </main>
      <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
        <p className='text-xs text-gray-500'>
          © 2024 AI Adventures. All rights reserved.
        </p>
        <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

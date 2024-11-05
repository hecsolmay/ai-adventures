import FadeInContainer from '@/components/fadein-container'
import Captures from '@/components/home/captures'
import ComingSoon from '@/components/home/coming-soon'
import Hero from '@/components/home/hero'
import Info from '@/components/home/info'
import Introduction from '@/components/home/introduction'

export default function LandingPage () {
  return (
    <main className='mx-auto max-w-8xl flex-1'>
      <FadeInContainer
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 md:py-24 lg:py-32 xl:py-48'
      >
        <Hero />
      </FadeInContainer>
      <FadeInContainer
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className='w-full bg-gray-100 py-12 md:py-24 lg:py-32'
      >
        <Info />
      </FadeInContainer>
      <FadeInContainer
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className='w-full py-12 md:py-24 lg:py-32'
      >
        <Introduction />
      </FadeInContainer>
      <FadeInContainer
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className='w-full bg-gray-100 py-12 md:py-24 lg:py-32'
      >
        <Captures />
      </FadeInContainer>
      <FadeInContainer
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className='w-full bg-purple-600 py-12 text-white md:py-24 lg:py-32'
      >
        <ComingSoon />
      </FadeInContainer>
    </main>
  )
}

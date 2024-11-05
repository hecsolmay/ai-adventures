import LearnSections from '@/components/learn/sections'
import SideContentNavigation from '@/components/learn/side-content-navigation'

export default function LearnPage () {
  return (
    <main className='container mx-auto flex grow scroll-smooth px-4 py-8'>
      <div className='w-full pr-8 lg:w-3/4'>
        <h1 className='mb-12 text-center text-4xl font-bold text-primary'>
          Aprende mas con AI Adventures
        </h1>

        <LearnSections />
      </div>

      <div className='sticky top-24 hidden w-1/4 self-start lg:block'>
        <SideContentNavigation />
      </div>
    </main>
  )
}

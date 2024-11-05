import SideContentNavigation from '@/components/learn/side-content-navigation'
import { learnSections } from '@/constants/learn'

export default function LearnPage () {
  return (
    <main className='container mx-auto flex grow scroll-smooth px-4 py-8'>
      <div className='w-full pr-8 lg:w-3/4'>
        <h1 className='mb-12 text-center text-4xl font-bold text-primary'>
          Aprende mas con AI Adventures
        </h1>

        <div className='space-y-16'>
          {learnSections.map((section) => (
            <section key={section.id} id={section.id} className='scroll-mt-20'>
              <div className='flex flex-col items-center gap-8'>
                <div className='w-full space-y-4'>
                  <h2 className='flex items-center text-3xl font-bold text-secondary'>
                    <section.icon className='mr-2' />
                    {section.title}
                  </h2>
                  <p className='prose max-w-[67ch] text-lg'>{section.content}</p>
                </div>
                <div className='w-full'>
                  <img
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={400}
                    className='w-full rounded-lg shadow-lg'
                  />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className='sticky top-24 hidden w-1/4 self-start lg:block'>
        <SideContentNavigation />
      </div>
    </main>
  )
}

import { learnSections } from '@/constants/learn'

export default function LearnSections () {
  return (
    <div className='space-y-16'>
      {learnSections.map(section => (
        <section key={section.id} id={section.id} className='scroll-mt-20'>
          <div className='flex flex-col items-center gap-8'>
            <div className='w-full space-y-4'>
              <h2 className='flex items-center text-3xl font-bold text-secondary'>
                <section.icon className='mr-2' />
                {section.title}
              </h2>
              <p className='prose text-balance text-lg md:max-w-none'>{section.content}</p>
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
  )
}

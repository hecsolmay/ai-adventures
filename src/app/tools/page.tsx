
import ComingSoon from '@/components/home/coming-soon'
import ListOfTools from '@/components/tools/list-of-tools'

export default function ToolsPage () {
  return (
    <div className='container mx-auto min-h-screen space-y-10 px-4 py-12'>
      <h1 className='text-center text-3xl font-bold'>
        Herramientas de AI Adventures
      </h1>

      <ListOfTools className='pb-16' />

      <section
        className='mt-4 w-full bg-purple-600 py-16 text-white'
      >
        <ComingSoon />
      </section>
    </div>
  )
}

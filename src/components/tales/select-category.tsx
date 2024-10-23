import {
  NextStepGenreButton,
  SelectCategoryButton
} from '@/components/tales/actions'
import { genres as GENRES } from '@/constants/ai'

export default function TalesSelectCategory () {
  return (
    <div className='min-h-[70dvh] space-y-8'>
      <h1 className='text-center text-3xl font-bold opacity-85 lg:text-4xl'>
        Selecciona tu categoría
      </h1>

      <div className='inline-flex w-full items-center justify-center'>
        <p className='max-w-[35ch] text-center lg:max-w-[50ch]'>
          Estás a punto de vivir una experiencia única! ¿Estás preparado?
          Selecciona el género que más te apasione y tu historia empezará...
        </p>
      </div>

      <div className='flex flex-row flex-wrap gap-4'>
        {GENRES.map(genre => (
          <SelectCategoryButton key={genre} genre={genre} />
        ))}
      </div>

      <NextStepGenreButton />
    </div>
  )
}

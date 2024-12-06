import { Input } from '@nextui-org/react'
import { SendHorizonal } from 'lucide-react'

import useStepsTales from '@/hooks/useStepsTales'
import { scrollToTop } from '@/utils/scroll'

export default function WriteStart () {
  const { goNextStep } = useStepsTales()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    goNextStep()
    scrollToTop()
  }

  return (
    <div className='min-h-[70dvh] space-y-8'>
      <h1 className='pt-6 text-center text-3xl font-bold opacity-85 md:pt-0 lg:text-4xl'>
        Escribe tu inicio
      </h1>

      <div className='inline-flex w-full items-center justify-center'>
        <p className='max-w-[35ch] text-center lg:max-w-[50ch]'>
          A continuación, escribe como quieres que se inicie tu historia.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          variant='bordered'
          className='m-0 border-secondary text-medium md:whitespace-nowrap'
          color='secondary'
          classNames={{
            input: 'min-w-20 md:min-w-64 px-4 py-2',
            inputWrapper:
              'border-secondary data-[hover=true]:border-secondary/85 h-auto min-h-11 '
          }}
          placeholder='Había una vez un niño ...'
          endContent={
            <button
              className='text-secondary focus:outline-none'
              type='submit'
              aria-label='Click to send the tale continuation'
            >
              <SendHorizonal />
            </button>
          }
          type='text'
        />
      </form>
    </div>
  )
}

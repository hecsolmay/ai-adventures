import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
      <p className='text-xs text-gray-500'>
        © 2024 AI Adventures. Todos los derechos reservados.
      </p>
      <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
        <Link className='text-xs underline-offset-4 hover:underline' href='#'>
          Términos de uso
        </Link>
        <Link className='text-xs underline-offset-4 hover:underline' href='#'>
          Privacidad
        </Link>
      </nav>
    </footer>
  )
}

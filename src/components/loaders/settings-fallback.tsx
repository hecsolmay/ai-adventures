import { Button } from '@nextui-org/react'
import { Settings } from 'lucide-react'

export function SettingsButtonFallback () {
  return (
    <Button disabled className='text-foreground' isIconOnly variant='light'>
      <Settings size={20} />
    </Button>
  )
}
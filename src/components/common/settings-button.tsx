'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure
} from '@nextui-org/react'
import { Play, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { useSettings } from '@/hooks/useSettings'

const DEFAULT_VOICE_INDEX = 0

export default function SettingsButton () {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const { selectedVoiceIndex, setSelectedVoiceIndex } = useSettings()
  const [isServerRender, setIsServerRender] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsServerRender(false)
  }, [])

  if (isServerRender) return null

  const voices = speechSynthesis.getVoices()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const parse = Number(value)
    if (value === '' || isNaN(parse)) {
      setSelectedVoiceIndex(DEFAULT_VOICE_INDEX)
      return
    }

    setSelectedVoiceIndex(parse)
  }

  const handleListenVoice = () => {
    const voice = voices[selectedVoiceIndex]
    const utterance = new SpeechSynthesisUtterance(
      'Hola, esta voz es la que esta actualmente seleccionada '
    )
    utterance.voice = voice
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className='text-foreground'
        isIconOnly
        variant='light'
      >
        <Settings size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Configuraciones
              </ModalHeader>
              <ModalBody>
                <div className='flex items-center justify-between gap-2'>
                  <Select
                    label='Selecciona una voz'
                    className='max-w-64'
                    defaultSelectedKeys={[selectedVoiceIndex.toString()]}
                    onChange={handleChange}
                  >
                    {voices.map((voice, index) => (
                      <SelectItem key={index} value={index}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Button
                    className='text-white'
                    startContent={<Play size={20} />}
                    color='primary'
                    onClick={handleListenVoice}
                  >
                    Escuchar
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button color='warning' onPress={onClose}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

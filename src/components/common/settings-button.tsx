'use client'

import {
  Button,
  Input,
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

import { SettingsButtonFallback } from '@/components/loaders/settings-fallback'
import { DEFAULT_VOICE_INDEX } from '@/constants'
import { useSettings } from '@/hooks/useSettings'

export default function SettingsButton () {
  const { onOpen, isOpen, onOpenChange } = useDisclosure()
  const {
    selectedVoiceIndex,
    setSelectedVoiceIndex,
    handleRestoreSettings,
    handleSaveSettings,
    openAiApiKey
  } = useSettings()
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [inputValue, setInputValue] = useState(openAiApiKey ?? '')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const newVoices = speechSynthesis.getVoices()
    setVoices(newVoices)

    return () => {
      speechSynthesis.cancel()
    }
  }, [isClient])

  if (!isClient) return <SettingsButtonFallback />

  const changeVoice = (voiceIndex: number) => {
    setSelectedVoiceIndex(voiceIndex)
    onOpen()
    setIsOpenSelect(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const parse = Number(value)
    const voiceSelected =
      value === '' || isNaN(parse) ? DEFAULT_VOICE_INDEX : parse

    changeVoice(voiceSelected)
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

  const handleClickSelect = () => {
    setIsOpenSelect(!isOpenSelect)
  }

  const handleClickItem = (voice: SpeechSynthesisVoice) => () => {
    changeVoice(voices.indexOf(voice))
  }

  const getSelectedKey = () => {
    if (voices.length === 0 || selectedVoiceIndex >= voices.length) return []
    return [selectedVoiceIndex.toString()]
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          handleRestoreSettings()
        }}
        onOpenChange={onOpenChange}
      >
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
                    isOpen={isOpenSelect}
                    onClick={handleClickSelect}
                    selectedKeys={getSelectedKey()}
                    onChange={handleChange}
                  >
                    {voices.map((voice, index) => (
                      <SelectItem
                        onClick={handleClickItem(voice)}
                        key={index}
                        value={index}
                      >
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

                <Input
                  type='text'
                  label='OpenAI API Key'
                  value={inputValue}
                  isClearable
                  onClear={() => {
                    setInputValue('')
                  }}
                  onChange={event => {
                    setInputValue(event.target.value)
                  }}
                  description='No guardaremos tu clave, solo la utilizaremos para generar imágenes, y solo tu tendrás acceso a ellas.'
                  className='w-full'
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    setInputValue(openAiApiKey ?? '')
                    onClose()
                  }}
                >
                  Cerrar
                </Button>
                <Button
                  color='warning'
                  onPress={() => {
                    handleSaveSettings(inputValue)
                    onClose()
                  }}
                >
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

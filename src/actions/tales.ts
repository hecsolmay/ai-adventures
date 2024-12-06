'use server'

import { type ContinueTale } from '@/schemas/tales'
import { TalesServices } from '@/services/tales'
import { type FragmentType } from '@/types'

const MOCK_STORY: FragmentType[] = [
  {
    message:
      'En una isla perdida en el vasto océano, donde los árboles parecían susurrar secretos antiguos y las olas se estrellaban con melodías misteriosas, un joven llamada Héctor descubrió un mapa en una botella. El mapa, dibujado con trazos torpes pero llenos de intención, marcaba un lugar en el corazón de la selva con una gran \'X\'. Sin dudarlo, Héctor recogió sus pocas pertenencias y se adentró en la espesura, donde la luz del sol apenas alcanzaba a filtrarse.',
    choices: [
      'Seguir el mapa hacia el interior de la isla',
      'Buscar a alguien en la aldea cercana para pedir ayuda',
      'Explorar los alrededores de la playa para prepararse mejor'
    ],
    backgroundDescription:
      'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/h00nwhe68lkhz9ehbixn',
    isError: false
  },
  {
    message:
      'Héctor siguió la estrecha senda de arena hasta que llegó a una pequeña aldea escondida entre palmeras y flores exóticas. Las cabañas, hechas de madera y hojas de palma, parecían formar parte del paisaje. En el centro de la aldea, un anciano de mirada sabia y una barba blanca como la espuma del mar tallaba una figura en madera. Al acercarse, Héctor le mostró el mapa. El anciano levantó la vista con interés y dijo: \'Ese lugar… es real, pero nadie que ha ido ha regresado igual. Si decides ir, necesitarás más que valor.\'',
    choices: [
      'Preguntar al anciano qué sabe sobre el lugar del mapa',
      'Buscar provisiones en la aldea antes de partir',
      'Pedir a alguien que la acompañe en la expedición'
    ],
    backgroundDescription:
      'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/r6bzt3sl2iq51je1enla',
    isError: false
  },
  {
    message:
      'Héctor decidió recorrer la aldea, observando cada detalle en busca de algo que pudiera arrojar más luz sobre el enigma del mapa. Pasó junto a una hoguera donde los aldeanos compartían historias, y luego se detuvo frente a un mural pintado en una pared de roca. El mural mostraba figuras humanas enfrentándose a lo que parecía una criatura inmensa, envuelta en niebla. Entre las figuras destacaba un símbolo idéntico a la \'X\' del mapa, rodeado de un brillo dorado. \'¿Podría ser este lugar más antiguo de lo que parece?\', pensó Héctor mientras los aldeanos murmuraban entre ellos, lanzando miradas furtivas hacia el.',
    choices: [
      'Preguntar a los aldeanos sobre el mural',
      'Buscar en las cabañas algo relacionado con el símbolo',
      'Dirigirse de inmediato hacia el lugar señalado en el mapa'
    ],
    backgroundDescription:
      'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/eo7fqoo6gzquxjw0aul2',
    isError: false
  },
  {
    message:
      'Con el mapa firmemente en sus manos y el corazón latiendo con emoción, Héctor dejó atrás la aldea y se adentró en la espesura de la selva siguiendo las marcas del sendero. Cada paso parecía llevarla más profundo a un mundo olvidado, donde los árboles se alzaban como guardianes y los sonidos de criaturas desconocidas llenaban el aire. Después de horas de caminata, llegó a un claro donde una antigua estructura de piedra sobresalía entre la vegetación. Cubierta de musgo y decorada con grabados similares a los del mural de la aldea, la entrada a la estructura parecía invitarlo... o advertirle.',
    choices: [
      'Entrar sin dudar para explorar la estructura',
      'Examinar los grabados antes de entrar',
      'Esperar fuera para observar si algo ocurre'
    ],
    backgroundDescription:
      'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/unng9rmdecoj5fvinkwq',
    isError: false
  },
  {
    message:
      'Héctor respiró profundamente y cruzó el umbral de la antigua estructura. La oscuridad la envolvió de inmediato, pero un leve resplandor azul emanaba de las paredes, iluminando grabados que parecían contar historias de un pueblo antiguo y su conexión con una energía misteriosa. El aire era fresco y tenía un ligero aroma a hierbas desconocidas. Más adelante, el pasillo se bifurcaba en dos: uno descendía hacia lo que parecía una caverna, y el otro ascendía hacia una cámara iluminada por un brillo más intenso. Una leve brisa, acompañada de un extraño murmullo, provenía del camino descendente.',
    choices: [
      'Descender hacia la caverna misteriosa',
      'Subir hacia la cámara iluminada',
      'Detenerse para examinar los grabados más de cerca'
    ],
    backgroundDescription:
      'https://res.cloudinary.com/dd5xvjvgk/image/upload/f_auto,q_auto/ifd5zd6m5epuyx1nehak',
    isError: false
  }
]

export async function beginTaleStory (genre: string) {
  const result = await TalesServices.start({ genre })
  return result
}

export async function beginTaleStoryMock (genre: string) {
  await randomDelay()

  return MOCK_STORY[0]
}

export async function continueTaleStory (continueTale: ContinueTale) {
  const result = await TalesServices.continueTale(continueTale)
  return result
}

export async function continueTaleStoryMock (currentCount: number) {
  await randomDelay()
  const index =
    MOCK_STORY.length < currentCount ? MOCK_STORY.length - 1 : currentCount
  const fragment = MOCK_STORY[index]
  return fragment
}

const randomDelay = async () => {
  // random delay between 1000 and 3000 milliseconds
  const delay = Math.random() * 2000 + 1000
  return await new Promise(resolve => setTimeout(resolve, delay))
}

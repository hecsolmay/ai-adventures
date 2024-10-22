export type DivProps = React.HTMLAttributes<HTMLDivElement>
export interface WithChildren {
  children?: React.ReactNode
}
export type SVGProps = React.SVGAttributes<SVGElement>

export interface ServerParams {
  id: string
  slug: string
}

export interface ServerPageProps {
  params: ServerParams
}

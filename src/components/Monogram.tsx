import type { InstituteType } from '../data'

export default function Monogram({
  initials,
  type,
  className,
}: {
  initials: string
  type?: InstituteType
  className?: string
}) {
  return (
    <span
      className={`monogram monogram--${type === 'Artístico' ? 'art' : 'tec'}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

import RevealOnScroll from './ui/RevealOnScroll'

interface Props {
  num: string
  title: string
}

export default function SectionHeader({ num, title }: Props) {
  return (
    <RevealOnScroll className="flex items-center gap-4 mb-12">
      <span className="font-mono text-xl text-green">{num}.</span>
      <h2 className="font-display text-[clamp(26px,4vw,32px)] font-bold text-lightest-slate whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-green/10" />
    </RevealOnScroll>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import ComingSoonCard from '../../components/ComingSoonCard'

export const Route = createFileRoute('/coming-soon/')({
  component: ComingSoonPage,
})

function ComingSoonPage() {
  return (
    <ComingSoonCard
      targetDate="2026-01-28T20:34:00"
      eventTitle="PRAGATI '26"
      subtitle="COMING SOON"
    />
  )
}

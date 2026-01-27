import { createFileRoute } from '@tanstack/react-router'
import RetroMarquee from '../../components/RetroMarquee'

export const Route = createFileRoute('/events/')({
  component: EventsPage,
})

function EventsPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Events</h1>
      <RetroMarquee
        text="Pragati 2026 - The Annual Tech Fest of Amrita School of Buisiness, Coimbatore"
        color="cyan"
        size="lg"
        speed={16}
      />
    </div>
  )
}

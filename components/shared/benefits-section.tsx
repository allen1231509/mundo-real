import { Award, MapPin, MessageCircle, Sparkles } from "lucide-react";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Amplia variedad",
    description:
      "Arte, manualidades, telas, papeles y material escolar en un solo lugar.",
  },
  {
    icon: Award,
    title: "Calidad garantizada",
    description: "Materiales seleccionados pensando en cada proyecto.",
  },
  {
    icon: MapPin,
    title: "En el corazón de Tarapoto",
    description: "Fácil de encontrar y visitar.",
  },
  {
    icon: MessageCircle,
    title: "Atención cercana",
    description: "Te ayudamos a elegir por WhatsApp antes de tu visita.",
  },
];

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="space-y-3 text-center sm:text-left">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-0">
              <Icon className="size-6" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

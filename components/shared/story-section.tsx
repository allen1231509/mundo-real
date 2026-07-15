import type { BusinessSettings } from "@/types";

export function StorySection({ settings }: { settings: BusinessSettings }) {
  const story =
    settings.story ??
    `${settings.name} nació en Tarapoto con el propósito de acompañar la creatividad de cada cliente: estudiantes, docentes, artistas y familias que buscan los materiales adecuados para sus proyectos. Con el tiempo, hemos crecido para ofrecer una selección cada vez más amplia, siempre con la misma atención cercana del primer día.`;

  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Nuestra historia
        </h2>
        <p className="mt-4 whitespace-pre-line text-muted-foreground">
          {story}
        </p>
      </div>
    </section>
  );
}

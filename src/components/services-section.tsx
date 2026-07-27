import { services } from "@/content/site";
import { Section } from "./section";

export function ServicesSection() {
  return (
    <Section id="services" label="What I take on">
      <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title}>
            <dt className="font-semibold tracking-tight">{s.title}</dt>
            <dd className="text-muted mt-2 leading-relaxed">{s.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

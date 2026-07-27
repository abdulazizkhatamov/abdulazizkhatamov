import { Section } from "./section";

export function BackgroundSection() {
  return (
    <Section id="background" label="Background">
      <div className="max-w-2xl space-y-5 leading-relaxed">
        <p>
          Five years building software, self-employed since 2023. Before that, two years
          at RTM on an education management platform used daily by hundreds of staff —
          student records, grades, financial operations.
        </p>
        <p className="text-muted">
          The work there was mostly the unglamorous kind: migrating a legacy jQuery
          interface to React module by module, so the platform stayed shippable the whole
          way through rather than freezing for a rewrite. And moving record tables holding
          tens of thousands of rows to server-side pagination, filtering and sorting,
          which is what removed the multi-second loads people had stopped complaining
          about because they assumed that was normal.
        </p>
        <p className="text-muted">
          Since then: ecommerce, SaaS and mobile, owned end to end — schema and API through
          to deployment and the on-call afterwards.
        </p>
      </div>
    </Section>
  );
}

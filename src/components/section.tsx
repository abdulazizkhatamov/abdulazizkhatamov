export function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-16 sm:py-24">
      <h2
        id={`${id}-heading`}
        className="text-faint font-mono text-xs tracking-[0.18em] uppercase"
      >
        {label}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

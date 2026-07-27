import { howIWork } from "@/content/site";
import { Section } from "./section";

export function HowIWorkSection() {
  return (
    <Section id="how" label="How I work">
      <ol className="space-y-8">
        {howIWork.map((item, i) => (
          <li key={item.title} className="flex gap-5">
            <span
              className="text-faint mt-0.5 font-mono text-xs tabular-nums"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-semibold tracking-tight">{item.title}</h3>
              <p className="text-muted mt-2 leading-relaxed">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

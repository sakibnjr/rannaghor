import { aboutValues } from "../_data/about-content";

export function AboutValues() {
  return (
    <section className="bg-clay py-14 sm:py-16" aria-labelledby="values-heading">
      <div className="site-shell">
        <div className="max-w-2xl"><h2 id="values-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">The values behind every plate.</h2></div>
        <ol className="mt-9 grid gap-x-8 gap-y-9 border-t border-dark/15 pt-8 md:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value) => (
            <li key={value.number}>
              <span className="text-sm font-black text-primary">{value.number}</span>
              <h3 className="mt-3 text-xl font-bold text-dark">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

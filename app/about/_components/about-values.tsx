import { aboutValues } from "../_data/about-content";

export function AboutValues() {
  return (
    <section className="bg-clay py-10 sm:py-12" aria-labelledby="values-heading">
      <div className="site-shell">
        <div className="max-w-2xl"><h2 id="values-heading" className="text-2xl font-extrabold tracking-tight sm:text-3xl">The values behind every plate.</h2></div>
        <ol className="mt-6 grid gap-x-7 gap-y-6 border-t border-dark/15 pt-6 md:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value) => (
            <li key={value.number}>
              <span className="text-sm font-black text-primary">{value.number}</span>
              <h3 className="mt-2 text-lg font-bold text-dark">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{value.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

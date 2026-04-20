import { Link } from "react-router-dom";

const About = () => (
  <>
    <section className="sea-bg text-primary-foreground">
      <div className="container-page py-24 md:py-32">
        <div className="eyebrow-light mb-6">About · Founder</div>
        <h1 className="display max-w-4xl text-primary-foreground">
          Building at the intersection of <span className="italic text-sea-aqua">policy, operations, and data</span>.
        </h1>
      </div>
      <div className="aqua-rule" />
    </section>

    <section className="py-20 md:py-28">
      <div className="container-page grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="aspect-[4/5] bg-gradient-to-br from-sea-2 to-sea-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, hsl(var(--sea-aqua) / 0.6), transparent 50%)"
            }} />
            <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
              <div className="font-display text-2xl">Neeraj Srivastava</div>
              <div className="text-sm text-primary-foreground/70 mt-1">Founder</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="eyebrow mb-4">Founder</div>
          <h2 className="display-sm mb-6">Neeraj Srivastava</h2>
          <p className="text-foreground/80 leading-relaxed text-lg">
            AquaResilience is founded by Neeraj, an envirotech entrepreneur with a deep curiosity
            for water and a background that bridges technical, policy, and human-centered
            perspectives.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-8">
            <div>
              <div className="eyebrow mb-3">Background</div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Master's in Environmental Policy &amp; Management</li>
                <li>BA (Hons.) in Justice and Public Policy</li>
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">Focus</div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Deep customer discovery &amp; industry engagement</li>
                <li>Translating complex problems into clear solutions</li>
                <li>Building trust with operators &amp; engineers</li>
                <li>Shaping product strategy around real pain points</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 p-6 border-l-2 border-sea-aqua bg-secondary/40 italic text-foreground/80">
            Currently speaking with food &amp; beverage operators, environmental professionals, and
            technical collaborators to validate this problem and shape the first product.
          </div>

          <div className="mt-10 flex gap-3">
            <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-sea-2 transition-colors">
              Get in touch
            </Link>
            <Link to="/join" className="px-6 py-3 border border-border hover:border-foreground transition-colors">
              Join us
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;

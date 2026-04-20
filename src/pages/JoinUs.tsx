import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  linkedinUrl: z.string().trim().url("Must be a valid URL").max(255),
  currentLocation: z.string().trim().min(1, "Required").max(120),
  currentRole: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  portfolioUrl: z.string().trim().max(255).optional().or(z.literal("")),
  yearsExperience: z.string().trim().max(20).optional().or(z.literal("")),
  areaOfInterest: z.string().min(1, "Required"),
  involvement: z.string().min(1, "Required"),
  availability: z.string().optional().or(z.literal("")),
  domains: z.array(z.string()).default([]),
  shortBio: z.string().trim().min(10, "Tell us a bit more").max(2000),
  whyInterested: z.string().trim().min(10, "Tell us a bit more").max(2000),
  contribution: z.string().trim().min(10, "Tell us a bit more").max(2000),
  mostInterestingProblem: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});

type FormData = z.infer<typeof schema>;

const interestOptions = ["Engineer", "Domain expert", "Designer", "Advisor", "Operator / industry professional", "Other"];
const involvementOptions = ["Exploratory conversation", "Advisor", "Collaborator", "Early team member", "Contractor", "Potential co-founder"];
const availabilityOptions = ["Part-time", "Full-time", "Advisor", "Volunteer", "Exploratory"];
const domainOptions = [
  "Full-stack engineering", "Frontend", "Backend", "Product design", "UX/UI",
  "Data engineering", "AI/ML", "Water / wastewater", "Environmental compliance",
  "Plant operations", "Food & beverage manufacturing", "Sustainability",
  "Business / strategy", "Partnerships", "Other",
];

const initial: FormData = {
  fullName: "", email: "", linkedinUrl: "", currentLocation: "",
  currentRole: "", company: "", portfolioUrl: "", yearsExperience: "",
  areaOfInterest: "", involvement: "", availability: "", domains: [],
  shortBio: "", whyInterested: "", contribution: "", mostInterestingProblem: "",
  consent: false as unknown as true,
};

const fieldBase = "w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-sea-aqua focus:outline-none transition-colors";

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="text-sm mb-2 text-foreground/80">{label}{required && <span className="text-sea-aqua ml-1">*</span>}</div>
    {children}
    {error && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error}</div>}
  </label>
);

const JoinUs = () => {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));
  const toggleDomain = (d: string) =>
    setData((prev) => ({ ...prev, domains: prev.domains.includes(d) ? prev.domains.filter((x) => x !== d) : [...prev.domains, d] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path.join(".")] = i.message; });
      setErrors(errs);
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const { error } = await supabase.functions.invoke("send-join-submission", {
        body: { kind: "join", payload: result.data },
      });
      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error(err);
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="py-32">
        <div className="container-page max-w-2xl text-center">
          <CheckCircle2 className="h-12 w-12 text-sea-aqua mx-auto mb-6" />
          <h1 className="display-sm mb-4">Thank you.</h1>
          <p className="lede">
            We've received your submission and will be in touch. We read every one carefully.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="sea-bg text-primary-foreground">
        <div className="container-page py-24 md:py-32">
          <div className="eyebrow-light mb-6">Join us</div>
          <h1 className="display max-w-4xl text-primary-foreground">
            Help build <span className="italic text-sea-aqua">AquaResilience</span>.
          </h1>
          <p className="lede mt-6 text-primary-foreground/75 max-w-2xl">
            We're early. We're looking for thoughtful, capable people who want to help solve a real
            industrial problem — software, data, water, compliance, design, or startup building.
          </p>
        </div>
        <div className="aqua-rule" />
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {[
            { t: "Engineers", d: "Full-stack, frontend, backend, data, AI/ML." },
            { t: "Domain experts", d: "Industrial water, wastewater, EHS, plant ops." },
            { t: "Designers", d: "Simplify complex workflows for non-technical users." },
            { t: "Advisors", d: "Senior voices in compliance, sustainability, ops." },
            { t: "Operators", d: "Food & beverage, utilities, plant management." },
            { t: "Builders", d: "People who like working in early ambiguity." },
          ].map((x) => (
            <div key={x.t} className="border-t border-border pt-5">
              <div className="font-medium mb-1">{x.t}</div>
              <div className="text-sm text-muted-foreground">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container-page max-w-3xl">
          <div className="eyebrow mb-3">Why join early</div>
          <ul className="space-y-3 text-foreground/85 leading-relaxed">
            {[
              "Help shape the product from day zero.",
              "Solve a real, under-addressed industrial problem.",
              "Work at the intersection of operations, data, compliance, and sustainability.",
              "Collaborate directly with the founder.",
              "Bring your expertise into something high-conviction and practical.",
            ].map((x) => (<li key={x} className="flex gap-3"><span className="text-sea-aqua">+</span>{x}</li>))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page max-w-3xl">
          <div className="eyebrow mb-3">Tell us about yourself</div>
          <h2 className="display-sm mb-3">If you'd like to collaborate, advise, build, or explore joining early — fill this out.</h2>
          <p className="text-muted-foreground mb-12">Required fields are marked with an aqua asterisk.</p>

          <form onSubmit={submit} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div data-error={!!errors.fullName}>
                <Field label="Full name" required error={errors.fullName}>
                  <input className={fieldBase} value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />
                </Field>
              </div>
              <div data-error={!!errors.email}>
                <Field label="Email" required error={errors.email}>
                  <input type="email" className={fieldBase} value={data.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
              </div>
              <div data-error={!!errors.linkedinUrl}>
                <Field label="LinkedIn URL" required error={errors.linkedinUrl}>
                  <input className={fieldBase} placeholder="https://linkedin.com/in/..." value={data.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
                </Field>
              </div>
              <div data-error={!!errors.currentLocation}>
                <Field label="Current location" required error={errors.currentLocation}>
                  <input className={fieldBase} placeholder="City, Country" value={data.currentLocation} onChange={(e) => set("currentLocation", e.target.value)} />
                </Field>
              </div>
              <Field label="Current role / title">
                <input className={fieldBase} value={data.currentRole} onChange={(e) => set("currentRole", e.target.value)} />
              </Field>
              <Field label="Company / organization">
                <input className={fieldBase} value={data.company} onChange={(e) => set("company", e.target.value)} />
              </Field>
              <Field label="Portfolio / website URL">
                <input className={fieldBase} value={data.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)} />
              </Field>
              <Field label="Years of experience">
                <input className={fieldBase} value={data.yearsExperience} onChange={(e) => set("yearsExperience", e.target.value)} />
              </Field>
            </div>

            <div data-error={!!errors.areaOfInterest}>
              <Field label="Area of interest" required error={errors.areaOfInterest}>
                <select className={fieldBase} value={data.areaOfInterest} onChange={(e) => set("areaOfInterest", e.target.value)}>
                  <option value="">Select…</option>
                  {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <div data-error={!!errors.involvement}>
              <Field label="How would you like to be involved?" required error={errors.involvement}>
                <select className={fieldBase} value={data.involvement} onChange={(e) => set("involvement", e.target.value)}>
                  <option value="">Select…</option>
                  {involvementOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Availability">
              <select className={fieldBase} value={data.availability} onChange={(e) => set("availability", e.target.value)}>
                <option value="">Select…</option>
                {availabilityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <div>
              <div className="text-sm mb-3 text-foreground/80">Relevant domains</div>
              <div className="flex flex-wrap gap-2">
                {domainOptions.map((d) => {
                  const active = data.domains.includes(d);
                  return (
                    <button type="button" key={d} onClick={() => toggleDomain(d)}
                      className={`px-3 py-1.5 text-xs border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"}`}>
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <div data-error={!!errors.shortBio}>
              <Field label="Short bio / background" required error={errors.shortBio}>
                <textarea rows={4} className={fieldBase} value={data.shortBio} onChange={(e) => set("shortBio", e.target.value)} />
              </Field>
            </div>
            <div data-error={!!errors.whyInterested}>
              <Field label="Why are you interested in AquaResilience?" required error={errors.whyInterested}>
                <textarea rows={4} className={fieldBase} value={data.whyInterested} onChange={(e) => set("whyInterested", e.target.value)} />
              </Field>
            </div>
            <div data-error={!!errors.contribution}>
              <Field label="What do you think you could contribute?" required error={errors.contribution}>
                <textarea rows={4} className={fieldBase} value={data.contribution} onChange={(e) => set("contribution", e.target.value)} />
              </Field>
            </div>
            <Field label="What problem in this space do you find most interesting or most broken?">
              <textarea rows={4} className={fieldBase} value={data.mostInterestingProblem} onChange={(e) => set("mostInterestingProblem", e.target.value)} />
            </Field>

            <div data-error={!!errors.consent}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={!!data.consent}
                  onChange={(e) => set("consent", e.target.checked as unknown as true)}
                  className="mt-1 h-4 w-4 accent-sea-3" />
                <span className="text-sm text-foreground/80">
                  I agree to be contacted regarding AquaResilience opportunities and collaboration.
                </span>
              </label>
              {errors.consent && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.consent}</div>}
            </div>

            {serverError && (
              <div className="border border-destructive/40 bg-destructive/5 text-destructive text-sm p-4">{serverError}</div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button type="submit" disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground hover:bg-sea-2 transition-colors disabled:opacity-60">
                {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Submit <ArrowRight className="h-4 w-4" /></>}
              </button>
              <span className="text-xs text-muted-foreground italic">We read every submission carefully.</span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default JoinUs;

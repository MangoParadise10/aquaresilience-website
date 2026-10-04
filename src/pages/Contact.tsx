import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { contactPage } from "@/content/site";
import { EmergingNote, PageHero, Section } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

// Submissions go to Netlify Forms (form name "contact"). A matching static form in
// index.html lets Netlify detect the fields at build time. Email notifications are
// configured in the Netlify dashboard under Forms > Form notifications.
const FORM_NAME = "contact";

const reasons = ["Bring a water challenge", "Partner with Dignoria"];
const orgTypes = [
  "Utility or municipality", "Industrial facility", "Major development", "Community or community organization",
  "Research or academic institution", "Technology company", "Engineering or operating firm",
  "Investor, foundation or public agency", "Other",
];
const timelines = ["Exploring for now", "Within 6 months", "6 to 12 months", "More than 12 months", "Not sure yet"];

const schema = z.object({
  reason: z.string().min(1),
  name: z.string().trim().min(1, "Required").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  organizationType: z.string().min(1, "Required"),
  challenge: z.string().trim().min(10, "Tell us a little more").max(4000),
  affected: z.string().trim().max(2000).optional().or(z.literal("")),
  attempted: z.string().trim().max(2000).optional().or(z.literal("")),
  outcome: z.string().trim().max(2000).optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  heardAbout: z.string().trim().max(300).optional().or(z.literal("")),
});
type FormData = z.infer<typeof schema>;

const field = "w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-sea-aqua focus:ring-2 focus:ring-sea-aqua/20 focus:outline-none transition";

const Field = ({ label, required, error, children, className = "" }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string;
}) => (
  <label className={`block ${className}`}>
    <span className="block text-sm font-medium mb-2 text-foreground/85">{label}{required && <span className="text-clay ml-1">*</span>}</span>
    {children}
    {error && <span className="mt-1.5 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3 w-3" />{error}</span>}
  </label>
);

const encode = (data: Record<string, string>) =>
  Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");

const Contact = () => {
  const [params] = useSearchParams();
  const [data, setData] = useState<FormData>({
    reason: params.get("topic") === "partner" ? reasons[1] : reasons[0],
    name: "", organization: "", email: "", location: "", organizationType: "", challenge: "",
    affected: "", attempted: "", outcome: "", timeline: "", heardAbout: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path.join(".")] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, ...(result.data as Record<string, string>) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title={contactPage.title}
        lead={<>{contactPage.intro.map((p) => <p key={p} className="mt-3 first:mt-0">{p}</p>)}</>} />

      <Section>
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="eyebrow mb-5">{contactPage.whoLead}</div>
              <ul className="space-y-3">
                {contactPage.who.map((w) => (
                  <li key={w} className="flex gap-3 text-foreground/80 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea-aqua" />{w}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
              {status === "success" ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto mb-5 h-12 w-12 text-sea-aqua" />
                  <h2 className="display-sm">Thank you.</h2>
                  <p className="lede mt-4">We have received your message and will be in touch.</p>
                </div>
              ) : (
                <form name={FORM_NAME} onSubmit={submit} noValidate className="space-y-6">
                  <h2 className="display-sm">{contactPage.formHeading}</h2>

                  <fieldset className="flex flex-wrap gap-2">
                    <legend className="sr-only">Reason for contact</legend>
                    {reasons.map((r) => (
                      <label key={r} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${data.reason === r ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/40"}`}>
                        <input type="radio" name="reason" value={r} checked={data.reason === r} onChange={set("reason")} className="sr-only" />{r}
                      </label>
                    ))}
                  </fieldset>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name" required error={errors.name}><input className={field} value={data.name} onChange={set("name")} autoComplete="name" /></Field>
                    <Field label="Organization"><input className={field} value={data.organization} onChange={set("organization")} autoComplete="organization" /></Field>
                    <Field label="Email" required error={errors.email}><input type="email" className={field} value={data.email} onChange={set("email")} autoComplete="email" /></Field>
                    <Field label="Location"><input className={field} value={data.location} onChange={set("location")} placeholder="City, region or country" /></Field>
                    <Field label="Type of organization" required error={errors.organizationType} className="sm:col-span-2">
                      <select className={field} value={data.organizationType} onChange={set("organizationType")}>
                        <option value="">Select…</option>
                        {orgTypes.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Nature of the water challenge" required error={errors.challenge}>
                    <textarea rows={5} className={field} value={data.challenge} onChange={set("challenge")} />
                  </Field>
                  <Field label="Who is affected?"><textarea rows={3} className={field} value={data.affected} onChange={set("affected")} /></Field>
                  <Field label="What has already been attempted?"><textarea rows={3} className={field} value={data.attempted} onChange={set("attempted")} /></Field>
                  <Field label="What outcome are you seeking?"><textarea rows={3} className={field} value={data.outcome} onChange={set("outcome")} /></Field>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Desired project timeline">
                      <select className={field} value={data.timeline} onChange={set("timeline")}>
                        <option value="">Select…</option>
                        {timelines.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="How did you hear about Dignoria?"><input className={field} value={data.heardAbout} onChange={set("heardAbout")} /></Field>
                  </div>

                  {status === "error" && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                      Something went wrong sending your message. Please try again.
                    </div>
                  )}

                  <EmergingNote>{contactPage.disclaimer}</EmergingNote>

                  <button type="submit" disabled={status === "submitting"} className="btn-dark !px-8 !py-3.5 disabled:opacity-60">
                    {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>{contactPage.submit} <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default Contact;

import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.string().min(1, "Required"),
  message: z.string().trim().min(10, "Tell us a bit more").max(3000),
});
type FormData = z.infer<typeof schema>;

const initial: FormData = { name: "", email: "", organization: "", topic: "", message: "" };
const topics = ["Pilot partner", "Industry conversation", "Advisor / collaborator", "Press or other"];
const fieldBase = "w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-sea-aqua focus:outline-none transition-colors";

const Contact = () => {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
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
      const { error } = await supabase.functions.invoke("send-join-submission", {
        body: { kind: "contact", payload: result.data },
      });
      if (error) throw error;
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <>
      <section className="sea-bg text-primary-foreground">
        <div className="container-page py-24 md:py-32">
          <div className="eyebrow-light mb-6">Contact</div>
          <h1 className="display max-w-3xl text-primary-foreground">
            Let's talk.
          </h1>
          <p className="lede mt-6 text-primary-foreground/75 max-w-2xl">
            We're actively talking to operators, environmental professionals, potential pilot
            partners, and collaborators. If anything here resonates — get in touch.
          </p>
        </div>
        <div className="aqua-rule" />
      </section>

      <section className="py-20 md:py-28">
        <div className="container-page grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-8">
            <div>
              <div className="eyebrow mb-3">For pilot partners</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If you run or work in a facility with water or wastewater reporting needs and want to
                shape the first version with us — let's talk.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">For collaborators</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Engineers, designers, domain experts and advisors — see the{" "}
                <a href="/join" className="text-sea-3 hover:text-sea-aqua">Join Us</a> page or use the form.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="h-4 w-4 text-sea-aqua" />
                <span className="text-sm">We respond personally.</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {status === "success" ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-sea-aqua mx-auto mb-4" />
                <h2 className="display-sm mb-3">Thank you.</h2>
                <p className="lede">We've received your message and will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate>
                <label className="block">
                  <div className="text-sm mb-2 text-foreground/80">Name <span className="text-sea-aqua">*</span></div>
                  <input className={fieldBase} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                  {errors.name && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</div>}
                </label>
                <label className="block">
                  <div className="text-sm mb-2 text-foreground/80">Email <span className="text-sea-aqua">*</span></div>
                  <input type="email" className={fieldBase} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                  {errors.email && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</div>}
                </label>
                <label className="block">
                  <div className="text-sm mb-2 text-foreground/80">Organization</div>
                  <input className={fieldBase} value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} />
                </label>
                <label className="block">
                  <div className="text-sm mb-2 text-foreground/80">Topic <span className="text-sea-aqua">*</span></div>
                  <select className={fieldBase} value={data.topic} onChange={(e) => setData({ ...data, topic: e.target.value })}>
                    <option value="">Select…</option>
                    {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.topic && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.topic}</div>}
                </label>
                <label className="block">
                  <div className="text-sm mb-2 text-foreground/80">Message <span className="text-sea-aqua">*</span></div>
                  <textarea rows={6} className={fieldBase} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
                  {errors.message && <div className="text-xs text-destructive mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</div>}
                </label>

                {serverError && (
                  <div className="border border-destructive/40 bg-destructive/5 text-destructive text-sm p-4">{serverError}</div>
                )}

                <div className="pt-2">
                  <button type="submit" disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground hover:bg-sea-2 transition-colors disabled:opacity-60">
                    {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

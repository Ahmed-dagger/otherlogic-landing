import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/lib/contact.functions";

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const sendEmail = useServerFn(submitContact);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setError("");
    const t = setTimeout(() => nameRef.current?.focus(), 300);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await sendEmail({ data: { name, phone, message } });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(
          res.error === "EMAIL_NOT_CONFIGURED"
            ? "Email isn't connected yet — we're finishing setup on our side. Please try again shortly."
            : "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setError("Please fill in all fields and try again.");
    }
  }

  const field =
    "mt-2 w-full border-b border-border/40 bg-transparent pb-3 text-base text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/85 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact OtherLogic"
            className="relative w-full max-w-lg border border-border/25 bg-ink-soft p-7 text-foreground shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 min-h-10 min-w-10 text-foreground/60 hover:text-foreground"
              aria-label="Close contact form"
              onClick={onClose}
            >
              <X />
            </Button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/50">
                  <Check className="h-7 w-7 text-primary" />
                </span>
                <h2 className="mt-8 text-3xl font-extrabold uppercase leading-none">Message sent.</h2>
                <p className="mt-5 text-sm leading-6 text-foreground/60">
                  Thank you — we've received your message and will get back to you.
                </p>
                <Button variant="brand" size="lg" className="mt-9 w-full" onClick={onClose}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <p className="eyebrow text-primary">Start a conversation</p>
                <h2 className="mt-5 text-4xl font-extrabold uppercase leading-[.95]">
                  LET'S<br />TALK.
                </h2>
                <p className="mt-4 text-sm leading-6 text-foreground/55">
                  Tell us what you're building, improving or connecting.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-7" noValidate={false}>
                  <div>
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/50">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      ref={nameRef}
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/50">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/50">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you building, improving or connecting?"
                      className={`${field} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-xs font-bold text-primary">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="brand" size="xl" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <ArrowRight />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

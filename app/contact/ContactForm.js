"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { submitContactMessage } from "./actions";

const initialState = {
  status: "idle",
  message: "",
  errors: {},
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-[#0D1630]/10 bg-[#F8FAF7] px-4 py-3.5 text-[#0D1630] outline-none transition placeholder:text-gray-400 focus:border-[#6F925C] focus:bg-white focus:ring-4 focus:ring-[#6F925C]/10";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6F925C] px-7 py-4 font-bold text-white transition-colors hover:bg-[#5F7D4F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending..." : "Send Message"}
      {pending ? (
        <Send size={18} className="animate-pulse" />
      ) : (
        <ArrowRight
          size={19}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactMessage,
    initialState
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="rounded-[36px] border border-[#0D1630]/8 bg-white p-6 shadow-[0_24px_70px_rgba(13,22,48,0.08)] sm:p-8 md:p-10">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6F925C]">
          Send A Message
        </p>
        <h2 className="mt-3 text-3xl font-black text-[#0D1630]">
          What can we help you with?
        </h2>
      </div>

      <form ref={formRef} action={formAction} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-bold text-[#0D1630]"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="Your name"
              className={inputClassName}
              aria-describedby={
                state.errors?.fullName ? "fullName-error" : undefined
              }
            />
            {state.errors?.fullName && (
              <p id="fullName-error" className="mt-2 text-sm text-red-600">
                {state.errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-[#0D1630]"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={120}
              placeholder="you@example.com"
              className={inputClassName}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600">
                {state.errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-bold text-[#0D1630]"
            >
              Phone number <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              placeholder="+91 98765 43210"
              className={inputClassName}
              aria-describedby={state.errors?.phone ? "phone-error" : undefined}
            />
            {state.errors?.phone && (
              <p id="phone-error" className="mt-2 text-sm text-red-600">
                {state.errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="topic"
              className="text-sm font-bold text-[#0D1630]"
            >
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              required
              defaultValue=""
              className={inputClassName}
              aria-describedby={state.errors?.topic ? "topic-error" : undefined}
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option value="Profile support">Profile support</option>
              <option value="Jobs and applications">
                Jobs and applications
              </option>
              <option value="Account and access">Account and access</option>
              <option value="Billing question">Billing question</option>
              <option value="General question">General question</option>
            </select>
            {state.errors?.topic && (
              <p id="topic-error" className="mt-2 text-sm text-red-600">
                {state.errors.topic}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-bold text-[#0D1630]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={20}
            maxLength={2000}
            rows={6}
            placeholder="Describe your question or issue with any useful context..."
            className={`${inputClassName} resize-y`}
            aria-describedby={
              state.errors?.message ? "message-error" : undefined
            }
          />
          {state.errors?.message && (
            <p id="message-error" className="mt-2 text-sm text-red-600">
              {state.errors.message}
            </p>
          )}
        </div>

        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.message && (
          <div
            role={state.status === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 text-sm ${
              state.status === "success"
                ? "bg-[#6F925C]/10 text-[#4F6D40]"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.status === "success" && (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            )}
            <p>{state.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-[#0D1630]/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-5 text-gray-500">
            Do not include passwords, payment credentials, or sensitive
            identity documents in your message.
          </p>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

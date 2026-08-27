import EmailCapture from "./EmailCapture";

/**
 * Renders the signup form only once a provider is actually configured.
 *
 * Without this the form ships in a state where every submission answers
 * "signups are not open yet", which is a broken promise in the best placement
 * on the site — and it would be spent on the first readers rather than on
 * nobody. Better to show nothing until the list exists.
 *
 * This is a server component, so the check happens at build time. Adding
 * MAILERLITE_API_KEY (or KIT_API_KEY) in Vercel therefore needs a redeploy
 * before the form appears; setting the variable alone will not do it.
 */
export const SIGNUP_CONFIGURED = Boolean(
  process.env.MAILERLITE_API_KEY || process.env.KIT_API_KEY,
);

export default function EmailCaptureSlot(props) {
  if (!SIGNUP_CONFIGURED) return null;
  return <EmailCapture {...props} />;
}

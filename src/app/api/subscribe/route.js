/**
 * Email signup endpoint.
 *
 * Provider-agnostic on purpose. The list itself is the asset; the company
 * holding it is an implementation detail, and picking one should not mean
 * rewriting the form. Whichever key is present in the environment wins:
 *
 *   MAILERLITE_API_KEY  (+ optional MAILERLITE_GROUP_ID)
 *   KIT_API_KEY         (+ optional KIT_FORM_ID)
 *
 * With neither set the endpoint returns 503 and the form says the signup is
 * not open yet, which is the honest failure. A form that silently swallows
 * addresses is worse than no form at all — the reader believes they subscribed
 * and we have nothing.
 *
 * Route Handlers are not cached for POST, so no cache opt-out is needed here.
 */

// Deliberately loose. Strict address regexes reject valid addresses, and the
// provider validates properly anyway; this only catches obvious typos before
// we spend a network call on them.
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body, status) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

async function subscribeMailerLite(email) {
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      ...(process.env.MAILERLITE_GROUP_ID
        ? { groups: [process.env.MAILERLITE_GROUP_ID] }
        : {}),
    }),
  });
  // MailerLite answers 200 for an address already on the list, so a repeat
  // signup is a success from the reader's point of view, as it should be.
  return res.ok || res.status === 422;
}

async function subscribeKit(email) {
  const base = process.env.KIT_FORM_ID
    ? `https://api.kit.com/v4/forms/${process.env.KIT_FORM_ID}/subscribers`
    : "https://api.kit.com/v4/subscribers";
  const res = await fetch(base, {
    method: "POST",
    headers: {
      "X-Kit-Api-Key": process.env.KIT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  });
  return res.ok;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Malformed request." }, 400);
  }

  // Honeypot. A field positioned off-screen and hidden from assistive tech,
  // which a person never sees and a naive bot fills in every time. Answer 200
  // so the bot has no signal that it was caught.
  if (payload?.website) return json({ ok: true }, 200);

  const email = String(payload?.email ?? "")
    .trim()
    .toLowerCase();

  if (email.length > 254 || !LOOKS_LIKE_EMAIL.test(email)) {
    return json({ error: "That does not look like an email address." }, 400);
  }

  try {
    if (process.env.MAILERLITE_API_KEY) {
      return (await subscribeMailerLite(email))
        ? json({ ok: true }, 200)
        : json({ error: "The signup service rejected that address." }, 502);
    }
    if (process.env.KIT_API_KEY) {
      return (await subscribeKit(email))
        ? json({ ok: true }, 200)
        : json({ error: "The signup service rejected that address." }, 502);
    }
  } catch {
    return json({ error: "Could not reach the signup service." }, 502);
  }

  return json({ error: "Signups are not open yet." }, 503);
}

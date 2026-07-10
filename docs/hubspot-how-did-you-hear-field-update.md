# HubSpot Update — "How did you hear about us?" → Free Text (Required)

**Date:** 2026-07-10
**Context:** The contact/discovery form field *"How did you hear about us?"* was changed on the website from a fixed dropdown to a **required free-text input**. HubSpot must be updated to match, or those submissions will not store correctly.

> **STATUS (2026-07-10): DONE.** New text property created and verified — internal name `how_did_you_hear_about_us_text`, label *"How did you hear about Kairos Performance?"*, type single-line text. Website input cap = **500 characters** (HubSpot text properties hold up to 65,536, so 500 is the effective limit). Steps below are retained as the record of what was done.

---

## Why a HubSpot change is required (grounded facts)

Verified via the HubSpot CRM on 2026-07-10:

| Item | Value |
|---|---|
| Contact property internal name | `how_did_you_hear_about_us_` |
| Label | "How did you hear about us?" |
| **Property type** | **`enumeration` (dropdown)** |
| Current options | LinkedIn · Referral · Google · Podcast · Conference / Event · Other |

An **enumeration** property only accepts its predefined options. The website submits through the **HubSpot Forms API** (`/submissions/v3/integration/submit/{portalId}/{formId}`), which validates enumeration values against that option list — so a free-text answer like *"saw you speak at a webinar"* will be **rejected or dropped**, not saved.

**Two HubSpot constraints shape the fix:**
1. You **cannot convert** an existing enumeration property to a text property in place (data-type changes aren't allowed in the property editor).
2. When a custom property is deleted, HubSpot **reserves its internal name for ~90 days**, so you can't immediately recreate `how_did_you_hear_about_us_` as text.

➡️ **Reliable solution: create a NEW single-line text property and point the form + website at it.** The old dropdown property is kept (retains historical answers).

---

## What already changed on the website (done)

- `components/ContactForm.tsx` — the field is now a required single-line text `<input>` (was a `<select>`). Client-side validation blocks empty submissions.
- `app/api/contact/route.ts` — server-side validation now requires it, and it submits to the new property name **`how_did_you_hear_about_us_text`** (line 78).

> ⚠️ **Deploy ordering:** the website now sends to `how_did_you_hear_about_us_text`. Create the HubSpot property **and** add it to the form **before** deploying the site, or live submissions will error.

---

## HubSpot steps

### Step 1 — Create the new text property

1. **Settings** (gear icon, top nav) → **Data Management → Properties**.
2. Object dropdown: **Contact properties**. Click **Create property** (top right).
3. **Basic info:**
   - Object type: **Contact**
   - Group: **Contact information**
   - Label: `How did you hear about us?`
   - Click the **pencil/edit icon** next to the auto-generated *Internal name* and set it **exactly** to:
     ```
     how_did_you_hear_about_us_text
     ```
     (HubSpot will otherwise auto-append a number because `how_did_you_hear_about_us_` is taken — this exact name must match the website code.)
4. Click **Next**. **Field type:** select **Single-line text**.
5. Click **Create**.

*(Optional API alternative, if you have a private-app token with `crm.schemas.contacts.write`):*
```bash
curl -X POST https://api.hubapi.com/crm/v3/properties/contacts \
  -H "Authorization: Bearer $HUBSPOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "how_did_you_hear_about_us_text",
    "label": "How did you hear about us?",
    "type": "string",
    "fieldType": "text",
    "groupName": "contactinformation"
  }'
```

### Step 2 — Update the form

1. **Marketing → Forms** (or **Marketing → Lead Capture → Forms**).
2. Open the form the website submits to. It's the form whose ID matches the site's **`HUBSPOT_FORM_ID`** env var (in `.env.local` locally, and in the Vercel project's Environment Variables). Each form's ID also appears in its URL/share code.
3. In the form editor:
   - Find the existing **"How did you hear about us?"** *dropdown* field and **remove** it from the form.
   - In the left field panel, search for the **new** property (label "How did you hear about us?", internal name `how_did_you_hear_about_us_text`) and **drag it into the same spot**.
   - Open the field's options and toggle **Required = on**.
4. **Update / Publish** the form.

### Step 3 — Deploy the website

Deploy the site (Vercel) **after** Steps 1–2 are live. The code already targets `how_did_you_hear_about_us_text`; no further code change is needed.

### Step 4 — Verify end-to-end

1. On the live site `/contact`, submit a test with a free-text answer (e.g. "webinar test — please delete").
2. In HubSpot, open the newest contact/form submission and confirm the value landed on **How did you hear about us?** (`how_did_you_hear_about_us_text`).
3. Delete the test contact.

---

## Cleanup / housekeeping (optional)

- **Historical data:** past answers remain on the old `how_did_you_hear_about_us_` (dropdown) property. To consolidate, export contacts with that property set and import the values into `how_did_you_hear_about_us_text`.
- **Old property:** once migrated (or if you don't need the history), you can **archive** `how_did_you_hear_about_us_` (Properties → find it → *Archive*) so it's out of the way. Don't hard-delete if you might still want the history.
- **Reporting/lists/workflows:** update any saved lists, reports, or workflows that filter on the old dropdown property to use the new text property.

---

## Rollback

If needed, revert the website by pointing `app/api/contact/route.ts` back to `how_did_you_hear_about_us_` and restoring the `<select>` in `ContactForm.tsx` (git history), and re-add the dropdown field to the form. No HubSpot property deletion required.

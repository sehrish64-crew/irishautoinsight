Email setup and local testing
================================

1. Create a local env file

   - Copy `.env.local.example` to `.env.local` in the project root.
   - Fill `EMAIL_PASS` and `SMTP_PASS` with the same Gmail App Password.
   - For production/live deployments, use the hosting provider's env settings or copy `.env.production.example` to `.env.production` (do NOT commit secrets).

2. Generate a Gmail app password (recommended)

   - Use an account with 2FA enabled and create an App Password for "Mail" → "Other (Custom name)".
   - Paste the generated string into both `EMAIL_PASS` and `SMTP_PASS` in `.env.local`.
   - If Gmail continues to reject login, switch to a dedicated SMTP provider such as SendGrid or Mailgun and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` accordingly.

3. Run the app locally

```bash
npm install
npm run dev
```

4. Test the flow

   - Open `http://localhost:3000/pricing`, open the report form, fill details and submit.
   - Check server console logs for "Notification email sent" and check the `EMAIL_TO` inbox.

   For production testing:

   - Ensure your production env has `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_TO` set.
   - Deploy and perform an order flow on the live site, then check the inbox specified in `EMAIL_TO`.

5. Notes

   - The API route already sends an email after creating an order using the SMTP env vars.
   - If you host on a cloud provider, set the same env vars in their dashboard (do not commit secrets).
      - Use `SMTP_PASS` or `EMAIL_PASS` for your mail password, and never store the real password in the repository.

6. Troubleshooting

   - If emails are not sending, check server logs for email errors. Common issues:
      - Invalid app password or `EMAIL_PASS`/`SMTP_PASS` missing.
      - Gmail blocking sign-in from the server IP — prefer App Passwords, or move to a dedicated SMTP provider.
      - If Gmail keeps failing, set up SendGrid/Mailgun instead and use their SMTP credentials.


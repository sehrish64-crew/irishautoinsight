#!/usr/bin/env node
// send-test-email.js
// Sends a single SMTP test email using env vars. Prefer .env.local, then .env.
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

// Load .env.local if present, otherwise fall back to .env, otherwise default dotenv behavior
try {
  const localPath = path.join(process.cwd(), '.env.local')
  const defPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(localPath)) {
    dotenv.config({ path: localPath })
    console.log('Loaded environment from .env.local')
  } else if (fs.existsSync(defPath)) {
    dotenv.config({ path: defPath })
    console.log('Loaded environment from .env')
  } else {
    dotenv.config()
    console.log('No .env.local or .env found — dotenv loaded defaults (if any)')
  }
} catch (e) {
  console.warn('Warning loading env files:', e && e.message)
}

async function main() {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (smtpHost.includes('gmail.com') ? 587 : 465)
  const smtpSecure = process.env.SMTP_SECURE !== undefined
    ? (process.env.SMTP_SECURE || 'true') === 'true'
    : !smtpHost.includes('gmail.com')
  const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || '').trim()
  let smtpPass = (process.env.SMTP_PASS || '').trim().replace(/\s+/g, '')
  const emailPass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '')
  const to = (process.env.EMAIL_TO || process.env.EMAIL_USER || '').trim()

  const passSource = smtpPass && !smtpPass.toUpperCase().includes('YOUR_APP_PASSWORD') ? 'SMTP_PASS' : 'EMAIL_PASS'
  if (!smtpPass || smtpPass.toUpperCase().includes('YOUR_APP_PASSWORD')) {
    smtpPass = emailPass
  }

  if (!smtpPass) {
    console.error('ERROR: SMTP_PASS or EMAIL_PASS is not set. Create .env.local with credentials.')
    process.exit(1)
  }

  console.log(`Using password from ${passSource}, length=${smtpPass.length}`)

  const transporterOptions = smtpHost.includes('gmail.com')
    ? {
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    }
    : {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    }

  console.log(`Attempting SMTP auth for ${smtpUser} via ${smtpHost}:${smtpPort} (secure=${smtpSecure})`)
  const transporter = nodemailer.createTransport(transporterOptions)

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || smtpUser,
    to,
    subject: 'AutoFactsCheck: Test Email',
    text: 'This is a test email sent from your AutoFactsCheck project to verify SMTP settings.',
    html: '<p>This is a <strong>test email</strong> sent from your AutoFactsCheck project to verify SMTP settings.</p>',
  })

  console.log('Message sent:', info.messageId)
  console.log('Response:', info.response)
}

main().catch((err) => {
  if (err && err.code === 'EAUTH') {
    console.error('Gmail authentication failed. Check that you used a Google App Password, not your normal Gmail password, and that 2-Step Verification is enabled for the account.')
    console.error('If Gmail continues to reject the login, switch to a dedicated SMTP provider such as SendGrid or Mailgun and set SMTP_HOST, SMTP_USER, SMTP_PASS accordingly.')
  }
  console.error('Failed to send test email:', err)
  process.exit(1)
})
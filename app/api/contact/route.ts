import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    let body: any
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    let persisted = false
    let persistenceError: string | null = null

    try {
      const conn = await pool.getConnection()
      try {
        await conn.execute(
          'INSERT INTO contact_submissions (name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [name, email, subject, message, 'new']
        )
        persisted = true
      } finally {
        conn.release()
      }
    } catch (error) {
      persistenceError = error instanceof Error ? error.message : 'Unknown database error'
      console.error('Failed to store contact form submission:', persistenceError)
    }

    // Send notification to admin
    try {
      const resp = await fetch(new URL('/api/send-email', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact_form', name, email, subject, message }),
      })

      try {
        const json = await resp.json()
        if (!resp.ok || json?.success === false) {
          console.error('Contact form email failed:', resp.status, json)
          return NextResponse.json(
            {
              success: false,
              error: persisted
                ? 'Your message was saved, but the notification email could not be sent. Please try again later or email us directly.'
                : 'The notification email could not be sent. Please try again later or email us directly.',
              persisted,
            },
            { status: 502 }
          )
        }
      } catch (e) {
        console.error('Failed to parse send-email response for contact_form:', resp.status, e)
        return NextResponse.json(
          {
            success: false,
            error: persisted
              ? 'Your message was saved, but email delivery could not be confirmed. Please try again later or email us directly.'
              : 'Email delivery could not be confirmed. Please try again later or email us directly.',
            persisted,
          },
          { status: 502 }
        )
      }
    } catch (err) {
      console.error('Failed to send contact notification:', err)
      return NextResponse.json(
        {
          success: false,
          error: persisted
            ? 'Your message was saved, but the notification email could not be sent. Please try again later or email us directly.'
            : 'The notification email could not be sent. Please try again later or email us directly.',
          persisted,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: persisted
        ? 'Contact form submitted successfully'
        : 'Contact form received and will be reviewed shortly',
      persisted,
      warning: persistenceError ? 'Your message was accepted, but storage was unavailable.' : undefined,
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

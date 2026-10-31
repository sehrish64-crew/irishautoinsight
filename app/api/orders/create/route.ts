import { NextRequest, NextResponse } from 'next/server'
import { insertOrder } from '@/lib/database'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer_name,
      customer_email,
      vehicle_type,
      identification_type,
      identification_value,
      vin_number,
      package_type,
      country_code,
      currency,
      amount,
      paymentProvider,
    } = body
    const customerName = typeof customer_name === 'string' ? customer_name.trim() : ''

    console.log('\n📝 Creating order with data:', { 
      customer_email, 
      vehicle_type, 
      package_type,
      amount,
      currency,
      paymentProvider
    })

    if (!customer_email || !vehicle_type || !identification_type || !identification_value || !package_type || !amount) {
      console.error('❌ Missing required fields:', { 
        customer_email: !!customer_email,
        vehicle_type: !!vehicle_type,
        identification_type: !!identification_type,
        identification_value: !!identification_value,
        package_type: !!package_type,
        amount: !!amount,
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('✓ All required fields present, inserting order with package_type:', package_type)
    const order = await insertOrder({
      customer_email,
      vehicle_type,
      identification_type,
      identification_value,
      vin_number: vin_number || null,
      package_type,
      country_code: country_code || 'IE',
      currency: currency || 'EUR',
      amount,
      payment_provider: paymentProvider || undefined,
    })

    console.log('✅ Order created successfully:', { 
      orderId: order.id, 
      orderNumber: order.order_number,
      packageType: order.package_type,
      amount: order.amount
    })

    let notificationEmailStatus: 'sent' | 'failed' | 'skipped' = 'skipped'

    // Send notification email to site owner with order details
    try {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
      const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : false
      const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || 'autofactschecks@gmail.com').trim()
      const smtpPass = [process.env.SMTP_PASS, process.env.SMTP_PASSWORD, process.env.EMAIL_PASS]
        .map((password) => (password || '').trim().replace(/\s+/g, ''))
        .find((password) => password && !password.toUpperCase().includes('YOUR_')) || ''
      const notifyTo = process.env.EMAIL_TO || process.env.ADMIN_EMAIL || smtpUser

      if (!smtpPass) {
        console.warn('⚠️ No valid SMTP_PASS, SMTP_PASSWORD, or EMAIL_PASS found — skipping email send')
      } else {
        const transporterOptions = smtpHost.includes('gmail.com')
          ? {
              service: 'gmail',
              auth: { user: smtpUser, pass: smtpPass },
            }
          : {
              host: smtpHost,
              port: smtpPort,
              secure: smtpSecure,
              requireTLS: true,
              auth: { user: smtpUser, pass: smtpPass },
            }

        const transporter = nodemailer.createTransport(transporterOptions)

        const mailHtml = `
          <p>New order received:</p>
          <ul>
            <li><strong>Order ID:</strong> ${order.id}</li>
            <li><strong>Order Number:</strong> ${order.order_number}</li>
            <li><strong>Client Name:</strong> ${customerName ? escapeHtml(customerName) : 'Not provided'}</li>
            <li><strong>Customer Email:</strong> ${customer_email}</li>
            <li><strong>Vehicle Type:</strong> ${vehicle_type}</li>
            <li><strong>Identification Type:</strong> ${identification_type}</li>
            <li><strong>Identification Value:</strong> ${identification_value}</li>
            <li><strong>Package:</strong> ${package_type}</li>
            <li><strong>Amount:</strong> ${amount} ${currency}</li>
          </ul>
        `

        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.SMTP_FROM || smtpUser,
          to: notifyTo,
          subject: `New order: ${order.order_number} (${package_type})`,
          html: mailHtml,
        })

        notificationEmailStatus = 'sent'
        console.log('✉️ Order notification accepted by SMTP:', {
          to: notifyTo,
          messageId: info.messageId,
        })
      }
    } catch (emailErr) {
      notificationEmailStatus = 'failed'
      console.error('❌ Failed to send order notification email:', {
        code: emailErr instanceof Error && 'code' in emailErr ? emailErr.code : undefined,
        message: emailErr instanceof Error ? emailErr.message : String(emailErr),
      })
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      notificationEmailStatus,
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('❌ Error creating order:', errorMsg)
    console.error('Full error:', error)
    return NextResponse.json(
      { error: 'Failed to create order: ' + errorMsg },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

import { NextRequest, NextResponse } from 'next/server'
import { insertOrder } from '@/lib/database'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
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

    // Send notification email to site owner with order details
    try {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
      const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : false
      const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || 'autofactschecks@gmail.com').trim()
      let smtpPass = (process.env.SMTP_PASS || '').trim().replace(/\s+/g, '')
      const emailPass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '')
      const notifyTo = process.env.EMAIL_TO || 'autofactschecks@gmail.com'

      if (!smtpPass || smtpPass.toUpperCase().includes('YOUR_APP_PASSWORD')) {
        smtpPass = emailPass
      }

      if (!smtpPass) {
        console.warn('⚠️ No SMTP_PASS or EMAIL_PASS found — skipping email send')
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
            <li><strong>Customer Email:</strong> ${customer_email}</li>
            <li><strong>Vehicle Type:</strong> ${vehicle_type}</li>
            <li><strong>Identification Type:</strong> ${identification_type}</li>
            <li><strong>Identification Value:</strong> ${identification_value}</li>
            <li><strong>Package:</strong> ${package_type}</li>
            <li><strong>Amount:</strong> ${amount} ${currency}</li>
          </ul>
        `

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || smtpUser,
          to: notifyTo,
          subject: `New order: ${order.order_number} (${package_type})`,
          html: mailHtml,
        })

        console.log('✉️ Notification email sent to', notifyTo)
      }
    } catch (emailErr) {
      console.error('❌ Failed to send notification email:', emailErr)
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
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

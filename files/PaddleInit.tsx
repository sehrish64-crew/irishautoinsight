"use client"

import { useEffect } from 'react'

export default function PaddleInit() {
  useEffect(() => {
    // Poll until the Paddle script is available, then initialize once.
    const interval = setInterval(() => {
      const w = window as any
      if (w && w.Paddle && typeof w.Paddle.Initialize === 'function') {
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
        
        if (!token) {
          console.error('❌ [Paddle] Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN in environment')
          clearInterval(interval)
          return
        }
        
        try {
          // Initialize Paddle with client-side token (required for Paddle.js v2)
          // This replaces the deprecated Paddle.Setup() method
          w.Paddle.Initialize({
            token,
            // eventCallback will receive Paddle checkout lifecycle events
            eventCallback: (ev: any) => {
              try {
                console.log('[Paddle.eventCallback]', ev?.event || ev?.name || ev)
              } catch (ee) {
                console.log('[Paddle.eventCallback] (error logging event)', ee)
              }
            }
          })
          console.log('✅ [Paddle] Initialized successfully with client token')
          console.log(`✅ [Paddle] Token: ${token.substring(0, 20)}...`)
          
          // Verify Paddle Checkout is available
          if (w.Paddle.Checkout && typeof w.Paddle.Checkout.open === 'function') {
            console.log('✅ [Paddle] Checkout.open is ready')
          }
          
          // Log Retain status (only available for live accounts)
          if (token.startsWith('live_')) {
            console.log('✅ [Paddle] Retain loaded for live account')
          }
          
          // Set up event listener for checkout errors
          if (w.Paddle.Events && typeof w.Paddle.Events.on === 'function') {
            w.Paddle.Events.on('*', function(event: any) {
              console.log('[Paddle Event]', event.name, event);
            });
            console.log('✅ [Paddle] Event listener registered');
          }
        } catch (e) {
          console.error('❌ [Paddle] Initialize error:', e)
        }
        clearInterval(interval)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return null
}

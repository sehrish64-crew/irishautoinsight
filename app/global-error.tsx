'use client'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h1>Something went wrong</h1>
          <p>We could not load this page. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              justifySelf: 'center',
              border: 0,
              borderRadius: '0.5rem',
              background: '#1d4ed8',
              color: '#fff',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}

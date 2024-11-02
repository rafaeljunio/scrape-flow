import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

      <p className="text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for might have been removed, had its name
        changed, or is temporarily unavailable. Please try again later.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/"
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg:primary/80 transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Website Name. All rights
        reserved.
      </footer>
    </div>
  )
}

export default NotFoundPage

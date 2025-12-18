'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Timzon 🛒
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            {user && (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-primary-600">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-gray-700 hover:text-primary-600">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


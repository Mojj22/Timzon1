'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      addToCart(product.id, 1)
    } else {
      alert('Please login to add items to cart')
    }
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}


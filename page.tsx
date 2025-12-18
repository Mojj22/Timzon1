'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import axios from 'axios'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating: number
  reviews: any[]
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${params.id}`)
      setProduct(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 text-lg">Product not found</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-primary-600 hover:text-primary-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="ml-2 text-gray-600">{product.rating} rating</span>
                <span className="ml-4 text-gray-600">•</span>
                <span className="ml-4 text-gray-600">{product.stock} in stock</span>
              </div>
              <p className="text-3xl font-bold text-primary-600 mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Add to Cart
                </button>
                <button
                  className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-2">Category</h3>
                <span className="text-gray-600">{product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


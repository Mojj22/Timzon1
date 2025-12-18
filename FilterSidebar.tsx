'use client'

interface FilterSidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: { min: string; max: string }
  onPriceRangeChange: (range: { min: string; max: string }) => void
  onClose: () => void
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClose
}: FilterSidebarProps) {
  return (
    <div className="fixed md:sticky top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg p-6 overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={onClose}
          className="md:hidden text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mr-2"
            />
            All Categories
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  )
}


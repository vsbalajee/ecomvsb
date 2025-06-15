import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import { Product } from '@/hooks/useProducts';

const ProductGrid = () => {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
        default:
          // Handle case where created_at might not exist
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
      }
    });

    return sorted;
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      <ProductSearch
        onSearch={handleSearch}
        onCategoryFilter={setSelectedCategory}
        onSortChange={setSortBy}
        categories={categories || []}
        currentCategory={selectedCategory}
        currentSort={sortBy}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-2xl font-bold">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               selectedCategory !== 'all' && categories ? 
               `${categories.find(c => c.id === selectedCategory)?.name || 'Products'}` : 
               'Featured Products'}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;

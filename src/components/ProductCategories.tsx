
const ProductCategories = () => {
  const categories = [
    {
      title: "Shop by Category",
      items: [
        { name: "Electronics", image: "/api/placeholder/150/150" },
        { name: "Fashion", image: "/api/placeholder/150/150" },
        { name: "Home & Kitchen", image: "/api/placeholder/150/150" },
        { name: "Beauty", image: "/api/placeholder/150/150" },
      ]
    },
    {
      title: "Top picks for your home",
      items: [
        { name: "Kitchen", image: "/api/placeholder/150/150" },
        { name: "Home Decor", image: "/api/placeholder/150/150" },
        { name: "Dining", image: "/api/placeholder/150/150" },
        { name: "Bedding", image: "/api/placeholder/150/150" },
      ]
    },
    {
      title: "Gaming accessories",
      items: [
        { name: "Headsets", image: "/api/placeholder/150/150" },
        { name: "Keyboards", image: "/api/placeholder/150/150" },
        { name: "Computer mice", image: "/api/placeholder/150/150" },
        { name: "Chairs", image: "/api/placeholder/150/150" },
      ]
    },
    {
      title: "Refresh your space",
      items: [
        { name: "Dining", image: "/api/placeholder/150/150" },
        { name: "Home", image: "/api/placeholder/150/150" },
        { name: "Kitchen", image: "/api/placeholder/150/150" },
        { name: "Health and Beauty", image: "/api/placeholder/150/150" },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">{category.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="text-center cursor-pointer hover:opacity-75">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
          <a href="#" className="text-blue-600 text-sm mt-3 block hover:underline hover:text-orange-600">
            See more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;

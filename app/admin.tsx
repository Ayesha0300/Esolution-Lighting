import { useState } from 'react';

const initialProducts = [
  {
    id: 1,
    name: "Dolphin Fountain",
    collection: "Nature's Wonders",
    price: 1999,
    image: "https://images.pexels.com/photos/441379/pexels-photo-441379.jpeg",
    description: "A beautiful dolphin fountain that adds elegance to any garden.",
  },
  {
    id: 2,
    name: "Celestial Orb Chandelier",
    collection: "Cosmic Illumination",
    price: 2999,
    image: "https://pixabay.com/get/gf76dc1e749ed8271af98aa2ad8f8a5c04dd5b875f4cd75f53607335bd18f30ff60126bea3504142e6e88f5d2ab6a567be8bd3479fda6491dc192813a19335cbe_1280.jpg",
    description: "An exquisite chandelier that illuminates your space with a celestial glow.",
  },
  // Add more products as needed
];

const Admin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    collection: '',
    price: 0,
    image: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' ? Number(value) : value
    });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
    setNewProduct({ name: '', collection: '', price: 0, image: '', description: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Admin Page</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-4">
        <h2 className="text-lg">Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          required
        />
        <input
          type="text"
          name="collection"
          placeholder="Collection"
          value={newProduct.collection}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="border p-2 mb-2"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Add Product</button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin; 
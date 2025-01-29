const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Dolphin Fountain', price: 1999 },
    { id: 2, name: 'Celestial Orb Chandelier', price: 2999 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Shopping Cart</h1>
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h2 className="text-xl">Total: ${totalPrice}</h2>
      <button className="mt-4 p-2 bg-green-500 text-white">Checkout</button>
    </div>
  );
};

export default Cart; 
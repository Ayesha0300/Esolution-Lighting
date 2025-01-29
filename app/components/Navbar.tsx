import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/">Home</Link>
      <div>
        <Link href="/login" className="mr-4">Login</Link>
        <Link href="/cart" className="mr-4">Cart</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar; 
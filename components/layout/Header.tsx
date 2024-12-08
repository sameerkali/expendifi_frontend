export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expendifi</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

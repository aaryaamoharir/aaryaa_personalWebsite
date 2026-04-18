export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-4">
      <ul className="flex space-x-8 justify-center font-medium items-center">
        <li><a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a></li>
        <li><a href="#projects" className="text-gray-700 hover:text-purple-600 transition">Projects</a></li>
        <li><a href="#contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a></li>
        
        {/* Direct link to your PDF in the public folder */}
        <li>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
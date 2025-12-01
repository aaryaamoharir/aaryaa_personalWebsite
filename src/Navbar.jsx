export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-4">
        <ul className="flex space-x-6 justify-center font-medium">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Resume/Contact</a></li>
        </ul>
      </nav>
    );
  }
  
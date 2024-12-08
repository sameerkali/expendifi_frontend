export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Expendifi. All rights reserved.
        </p>
        <p className="text-sm">Made with ❤️ by Sameer</p>
      </div>
    </footer>
  );
}

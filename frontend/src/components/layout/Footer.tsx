const APP_VERSION = "1.1.0";

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
        <p>FANGReady - Built for Big Tech Interview Preparation</p>
        <p className="mt-1 text-gray-700">v{APP_VERSION}</p>
      </div>
    </footer>
  );
}

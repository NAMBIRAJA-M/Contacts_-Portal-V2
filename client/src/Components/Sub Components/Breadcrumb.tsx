export default function Breadcrumb() {
  return (
    <nav className="bg-white rounded-md p-3 text-gray-600 text-md" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="/" className="text-gray-600 hover:underline">Home</a>
        </li>
        <li>
          <span className="mx-2 text-md text-gray-600 font-semibold">›</span>
        </li>
        <li>
          <span className="text-gray-600">Dashboard</span>
        </li>
      </ol>
    </nav>
  );
}

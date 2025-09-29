




export default function SearchBar() {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search..."
        className="w-[min(420px,90%)] h-10 rounded-lg border border-gray-500 bg-white text-black px-3 outline-none"
      />
    </div>
  );
}

import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function SearchBar({ initialQuery, onSearch }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-[100%]">
        <div className="input flex items-center gap-2 bg-white border border-gray-300 rounded-full p-1 w-full mx-auto">
          <input
            type="text"
            className="flex-grow bg-white p-2 text-black rounded-full border-none outline-none"
            placeholder="Search Books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full text-[#172554]"
            style={{ backgroundColor: "#dbb891" }}
          >
            <IoMdSearch />
          </button>
        </div>
      </div>
    </form>
  );
}

import React from "react";
import SearchBar from "../components/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchHome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("search") || "";

  const handleSearch = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div
      className="p-6 container mx-auto px-9 overflow-hidden flex flex-col lg:flex-row items-center bg-[#172554] text-[#fcf6e6] justify-between rounded-lg"
      // style={{ backgroundColor: "#545c72 " }}
    >
      <div className="lg:w-1/2 mb-4 lg:mb-0 flex flex-col items-center gap-4 lg:items-start">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-center text-[#dbb891] lg:text-left">
          Find Books Fast.
        </h2>
        <div className="lg:w-full">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
        </div>
      </div>
      <div className="lg:w-3/4 flex justify-center lg:justify-end">
        <img
          src="https://assets.static-upwork.com/helpcenter/air3/hero.svg"
          alt="Hero"
          className="w-3/4 lg:w-1/2 max-w-xs lg:max-w-md"
        />
      </div>
    </div>
  );
};

export default SearchHome;

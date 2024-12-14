import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/authorDetailsbtn.css";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/author"
        );
        setAuthors(response.data);
        setFilteredAuthors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const filtered = authors.filter((author) =>
      author.name.toLowerCase().startsWith(letter.toLowerCase())
    );
    setFilteredAuthors(filtered);
  };

  const handleResetClick = () => {
    setSelectedLetter("");
    setFilteredAuthors(authors);
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="authors-page container mx-auto my-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-6 flex-wrap">
        <button
          onClick={handleResetClick}
          className={`px-3 py-2 mx-1 mb-2 rounded-md w-11 ${
            selectedLetter === ""
              ? "bg-[#545c72] text-[#dbb891]"
              : "bg-gray-200"
          } hover:bg-[#545c72] hover:text-white transition`}
        >
          All
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`px-3 py-2 mx-1 mb-2 rounded-md w-11 ${
              selectedLetter === letter
                ? "bg-[#545c72] text-[#dbb891]"
                : "bg-gray-200"
            } hover:text-white hover:bg-[#545c72] transition`}
          >
            {letter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-11">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="text-center animate-pulse">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <div className="h-6 bg-gray-300 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-14 mb-11">
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
              <div key={author._id} className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold line-clamp-1 overflow-hidden">
                  {author.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  {author.books.length > 0
                    ? `${author.books.length} Published Books`
                    : "No Published Books Yet"}
                </p>
                <Link to={`/authors/${author._id}`} className="">
                  <button
                    className="btn bg-blue-950 hover:bg-blue-950 px-8 rounded-full text-white hover:text-[#dbb891]"
                    data-text=""
                  >
                    <span className="">&nbsp;ViewBooks&nbsp;</span>
                    {/* <span aria-hidden="true" className="hover-text ">
                      &nbsp;ViewBooks&nbsp;
                    </span> */}
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No authors found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;

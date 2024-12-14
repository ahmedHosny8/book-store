// HomePage.js
import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  HomeCardSkeleton,
  HomeHeaderSkeleton,
  SearchHomeSkeleton,
  SliderSkeleton,
} from "./Skeleton";
import { useOrder } from "../context/OrderContext";
import LogosSection from "../components/LogosSection";

function HomePage() {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
  const { getOrderData } = useOrder();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [saleBooks, setSaleBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book/home"
        );

        const saleBooks = data.filter((book) => book.discountPercentage > 25);
        const latestBooks = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setBooks(latestBooks);
        setSaleBooks(saleBooks);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    if (token) {
      getOrderData();
    }
  }, []);

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    }
  };

  const calculateSlidesToShow = (booksLength) => {
    if (booksLength >= 4) {
      return 4;
    } else if (booksLength === 3) {
      return 3;
    } else if (booksLength === 2) {
      return 2;
    } else {
      return 1;
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: calculateSlidesToShow(saleBooks.length),
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, saleBooks.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, saleBooks.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    const maxSlideIndex =
      saleBooks.length -
      Math.min(calculateSlidesToShow(saleBooks.length), saleBooks.length);

    if (currentSlide < maxSlideIndex) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <main className="container mx-auto relative px-4 md:px-8">
      {loading ? (
        <div className="container overflow-hidden">
          <HomeHeaderSkeleton />
          <SearchHomeSkeleton />
          <SliderSkeleton />
          <div className="mt-10 mx-auto space-y-20">
            <HomeCardSkeleton />
            <HomeCardSkeleton />
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 md:mt-10">
            <HomeHeader />
          </div>
          <div className="mt-4 md:mt-8">
            <SearchHome initialQuery={query} onSearch={handleSearchSubmit} />
          </div>

          {saleBooks.length > 0 && (
            <div className="mt-16 overflow-hidden">
              <div className="flex justify-center items-center bg-[#172554] text-[#dbb891] py-3 md:py-5 rounded-lg shadow-lg">
                <h2 className="text-lg md:text-2xl font-bold uppercase text-center px-4">
                  Special Sale! Books with 25% or More Discount
                </h2>
              </div>

              <div className="relative">
                <button
                  onClick={handlePrevClick}
                  disabled={currentSlide === 0}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 duration-300
                    ${
                      currentSlide === 0
                        ? "bg-[#a68c75] cursor-not-allowed"
                        : "bg-[#dbb891] hover:bg-[#ac8e6d]"
                    }
                    hidden lg:block`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <Slider ref={sliderRef} {...sliderSettings}>
                  {saleBooks.map((book) => (
                    <div key={book._id}>
                      <HomeCard
                        books={[book]}
                        favoriteBooks={favoriteBooks}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                      />
                    </div>
                  ))}
                </Slider>

                <button
                  onClick={handleNextClick}
                  disabled={
                    currentSlide >=
                    saleBooks.length - calculateSlidesToShow(saleBooks.length)
                  }
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 duration-300
                    ${
                      currentSlide >=
                      saleBooks.length - calculateSlidesToShow(saleBooks.length)
                        ? "bg-[#a68c75] cursor-not-allowed"
                        : "bg-[#dbb891] hover:bg-[#ac8e6d]"
                    }
                    hidden lg:block`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="flex w-full justify-between items-center px-4">
              <h2 className="text-xl md:text-2xl font-bold mb-5">
                Latest Books
              </h2>
              <Link to={"/books"} className="text-[#3f4f78] text-lg">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              {books.map((book) => (
                <HomeCard
                  key={book._id}
                  books={[book]}
                  favoriteBooks={favoriteBooks}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default HomePage;

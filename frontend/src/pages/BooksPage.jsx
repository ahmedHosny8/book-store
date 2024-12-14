/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import useCartContext from "../hooks/use-cart-context";
import { useOrder } from "../context/OrderContext";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

function BooksPage() {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
  const { orderBookId, isDownloadLoading, getOrderData } = useOrder();
  const { cartItems, addToCart, isloading } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  // const [allBooks, setAllBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterCatigory, setFilterCatigory] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/book/filters",
          {
            params: {
              search: query,
              author,
              category,
              minPrice,
              maxPrice,
              sortBy: sortOption,
              page,
              limit: 12,
            },
          }
        );
        //console.log(res.data.booksDataWithoutSourcePath);
        window.scrollTo(0, 0);
        setBooks(res.data.booksDataWithoutSourcePath);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCatigories = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/category"
        );
        setFilterCatigory(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAuthor = async () => {
      try {
        const { data } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/author"
        );
        setFilterAuthor(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCatigories();
    fetchAuthor();
    fetchBooks();
  }, [query, author, category, minPrice, maxPrice, sortOption, page]);

  useEffect(() => {
    if (token) {
      getOrderData();
    }
  }, []);
  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim()) {
      setLoading(true);
      setPage(1);
      navigate(`/books?search=${encodeURIComponent(inputValue)}`);
    } else {
      navigate(`/books`);
    }
  };

  const SkeletonCard = () => (
    <div
      className="card rounded-none animate-pulse bg-gray-200 relative"
      style={{
        width: "280px",
      }}
    >
      <div className="w-full h-96 mx-auto"></div>
      <div className="card-body flex-grow-0 px-0 mx-0 bg-white bodyCard">
        <div className="w-24 h-4 bg-slate-300 mb-2 rounded-md"></div>
        <div className="w-40 h-6 bg-slate-300 mb-2 rounded-md"></div>
        <div className="w-32 h-4 bg-slate-300 mb-2 rounded-md"></div>
        <div className="w-48 h-6 bg-slate-300 mb-2 rounded-md"></div>
        <div className="flex justify-between">
          <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
          <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonFilters = () => (
    <div className="w-full lg:w-[20%] hidden lg:block bg-white animate-pulse py-4 space-y-6 rounded-md">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="space-y-3">
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, optionIdx) => (
              <div key={optionIdx} className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const SkeletonHeader = () => (
    <div className="flex justify-between animate-pulse items-center mt-24 border-b-2 pb-6 ">
      <div className="w-1/6 h-8 bg-gray-200 rounded-md"></div>
      <div className="flex items-center space-x-4">
        <div className="h-8 w-52 bg-gray-200 rounded-full p-5"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );

  const filters = [
    {
      id: "author",
      name: "Author",
      options: [
        {
          id: "All",
          value: "",
          label: "All",
          checked: true,
        },
        ...filterAuthor.map((auth) => {
          return {
            id: auth._id,
            value: auth.name,
            label: auth.name,
            checked: false,
          };
        }),
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { id: "all", value: "", label: "All", checked: true },
        ...filterCatigory.map((cat) => {
          return {
            id: cat._id,
            value: cat.title,
            label: cat.title,
            checked: false,
          };
        }),
      ],
    },
    {
      id: "price",
      name: "Price",
      options: [{ id: "priceFilter", value: "priceFilter" }],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const sortOptions = [
    { name: "Default", value: "default" },
    { name: "Oldest", value: "oldest" },
    { name: "Newest", value: "newest" },
    { name: "On Sale", value: "on-sale" },
    { name: "Price: Low to High", value: "price-low-to-high" },
    { name: "Price: High to Low", value: "price-high-to-low" },
  ];

  return (
    <main className="container mx-auto mh-[60vh]">
      {loading ? (
        <div className="container px-5 lg:px-[10%] pt-4 pb-28">
          <SkeletonHeader />
          <div className="flex justify-between mt-14">
            <SkeletonFilters />
            <div className="flex flex-wrap gap-6 justify-evenly w-full lg:w-[75%]">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white">
            <div>
              <Dialog
                open={mobileFiltersOpen}
                onClose={setMobileFiltersOpen}
                className="relative z-40 lg:hidden"
              >
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                  <DialogPanel
                    transition
                    className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                  >
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900 flex gap-2 items-center">
                        <FunnelIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400 hover:text-gray-500"
                        />
                        Filter by
                      </h2>
                      <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="mt-4 border-t border-gray-200">
                      <div className="min-w-[40%] py-3 px-3 md:hidden">
                        <SearchBar
                          initialQuery={query}
                          onSearch={handleSearchSubmit}
                        />
                      </div>
                      <form className="mt-4 border-t border-gray-200">
                        {filters.map((section, index) => (
                          <Disclosure
                            key={section.id}
                            defaultOpen={index == 0 ? true : false}
                            as="div"
                            className="border-t border-gray-200 px-4 py-6 max-h-[250px] overflow-auto"
                          >
                            <h3 className="-mx-2 -my-3 flow-root  sticky top-[-25px]">
                              <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  <PlusIcon
                                    aria-hidden="true"
                                    className="h-5 w-5 group-data-[open]:hidden"
                                  />
                                  <MinusIcon
                                    aria-hidden="true"
                                    className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                  />
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    {index != 2 ? (
                                      <>
                                        <input
                                          value={option.value}
                                          checked={
                                            (index === 0 &&
                                              author === option.value) ||
                                            (index === 1 &&
                                              category === option.value)
                                          }
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          type="radio"
                                          onChange={
                                            index === 0
                                              ? () => {
                                                  setLoading(true);
                                                  setAuthor(option.value);
                                                  setPage(1);
                                                }
                                              : () => {
                                                  setLoading(true);
                                                  setCategory(option.value);
                                                  setPage(1);
                                                }
                                          }
                                          className="size-5 radio checked:bg-[#172554] "
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 min-w-0 flex-1 text-[#172554]"
                                        >
                                          {option.label}
                                        </label>
                                      </>
                                    ) : (
                                      <div
                                        key={option.id}
                                        className="flex flex-wrap md:flex-nowrap w-[100%] gap-4"
                                      >
                                        <input
                                          key={option.id}
                                          value={minPrice}
                                          id={`filter-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          type="number"
                                          placeholder="Min Price"
                                          onChange={(e) => {
                                            setLoading(true);
                                            setMinPrice(e.target.value);
                                            setPage(1);
                                          }}
                                          className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                                        />
                                        <input
                                          key={option.id}
                                          value={maxPrice}
                                          id={`filter-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          type="number"
                                          placeholder="Max Price"
                                          onChange={(e) => {
                                            setLoading(true);
                                            setMaxPrice(e.target.value);
                                            setPage(1);
                                          }}
                                          className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        ))}
                      </form>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>

              <main className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Books List
                  </h1>

                  <div className="flex items-center">
                    <div className="min-w-[40%] me-5 hidden md:block">
                      <SearchBar
                        initialQuery={query}
                        onSearch={handleSearchSubmit}
                      />
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-3 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <MenuItem key={option.value}>
                              <button
                                onClick={() => {
                                  setLoading(true);
                                  setSortOption(option.value);
                                  setPage(1);
                                }}
                                className={classNames(
                                  sortOption === option.value
                                    ? "font-medium bg-[#172554] text-white"
                                    : "text-gray-500 data-[focus]:bg-[#172554] data-[focus]:text-white",
                                  "w-full text-start block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </button>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>

                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6 "
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block ps-10 lg:col-span-1">
                      {filters.map((section, index) => (
                        <Disclosure
                          defaultOpen={index === 0 ? true : false}
                          key={section.id}
                          as="div"
                          className="border-b border-gray-200 py-6 max-h-[250px] overflow-auto"
                        >
                          <h3 className="-my-3 flow-root sticky top-[-25px]">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 group-data-[open]:hidden"
                                />
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  {index !== 2 ? (
                                    <>
                                      <input
                                        value={option.value}
                                        checked={
                                          (index === 0 &&
                                            author === option.value) ||
                                          (index === 1 &&
                                            category === option.value)
                                        }
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="radio"
                                        onChange={
                                          index === 0
                                            ? () => {
                                                setLoading(true);
                                                setAuthor(option.value);
                                                setPage(1);
                                              }
                                            : () => {
                                                setLoading(true);
                                                setCategory(option.value);
                                                setPage(1);
                                              }
                                        }
                                        className="size-5 radio checked:bg-[#172554]"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-[#172554] font-bold"
                                      >
                                        {option.label}
                                      </label>
                                    </>
                                  ) : (
                                    <div className="flex flex-wrap md:flex-nowrap w-[100%] gap-4">
                                      <input
                                        value={minPrice}
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="number"
                                        placeholder="Min Price"
                                        onChange={(e) => {
                                          setLoading(true);
                                          setMinPrice(e.target.value);
                                          setPage(1);
                                        }}
                                        className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                                      />
                                      <input
                                        value={maxPrice}
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="number"
                                        placeholder="Max Price"
                                        onChange={(e) => {
                                          setLoading(true);
                                          setMaxPrice(e.target.value);
                                          setPage(1);
                                        }}
                                        className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[100%]"
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </form>

                    {/* Product grid */}
                    <div className="lg:col-span-3 mb-12">
                      {books.length > 0 ? (
                        <div className="flex flex-wrap px-8 md:gap-8 justify-center md:justify-evenly lg:justify-evenly">
                          {books.map((book, index) => (
                            <BookCard
                              _id={book._id}
                              key={index}
                              title={book.title}
                              author={book.author}
                              category={book.category}
                              price={book.originalPrice}
                              imageUrl={book.coverImage}
                              discountedPrice={book.discountedPrice}
                              discountPercentage={book.discountPercentage}
                              addToFavorites={() => addToFavorites(book)}
                              removeFromFavorites={() =>
                                removeFromFavorites(book._id)
                              }
                              isFavorite={Boolean(
                                favoriteBooks.find(
                                  (fav) => fav.bookId._id === book._id
                                )
                              )}
                              addToCart={() => addToCart(book)}
                              InCart={Boolean(
                                cartItems.find(
                                  (cart) => cart.bookId._id === book._id
                                )
                              )}
                              isloading={isloading}
                              isBookInOrder={Boolean(
                                orderBookId?.includes(book._id)
                              )}
                              isDownloadLoading={isDownloadLoading}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-xl text-center mt-10">
                          No books found. Please try another search term.
                        </p>
                      )}
                    </div>
                  </div>
                  {totalPages > 1 && (
                    <div className="pagination mt-3 flex justify-center items-center">
                      <div className="join">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => {
                              setLoading(true);
                              setPage(index + 1);
                            }}
                            className={`join-item btn  btn-lg ${
                              page === index + 1
                                ? "bg-blue-950 text-white hover:bg-blue-950"
                                : ""
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </main>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default BooksPage;

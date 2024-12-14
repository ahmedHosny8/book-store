/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreditCard, BadgeCheck, MessageCircleQuestion } from "lucide-react";
import { PiFileArrowDownDuotone } from "react-icons/pi";
import toast from "react-hot-toast";
import useCartContext from "../hooks/use-cart-context";
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import RatingOverview from "../components/RatingOverview";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { useFavorites } from "../context/FavoritesContext";
import StarIcon from "../components/StarIcon";
import PdfBookReader from "../components/PdfBookReader";

function DetailsPage() {
  const [book, setBook] = useState({});
  const [showPdfReader, setShowPdfReader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const [orderBookId, setOrderBookId] = useState([]);
  const [isInCartCheck, setIsInCartCheck] = useState(false);
  const [DetailsLoading, setDetailsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { cartItems, setCartItems, getUserCartItems, addToCart, isloading } =
    useCartContext();
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites(); // Use the context
  const [isFavorite, setIsFavourite] = useState(false);

  const [bookRate, setBookRate] = useState(0);

  useEffect(() => {
    fetchBook(id);
    getOrderData();
    getUserCartItems();
    fetchReviews();
    setIsFavourite(
      Boolean(favoriteBooks?.find((fav) => fav?.bookId?._id === book?._id))
    );
  }, [id]);
  const fetchBook = async (id) => {
    try {
      setDetailsLoading(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`,
        { headers }
      );
      setDetailsLoading(false);
      setBook(res.data);
      getUserCartItems();
    } catch (error) {
      setDetailsLoading(false);
      setDetailsLoading(false);
      console.log("There is an error loading data...", error);
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/review/${id}/reviews`
      );
      setReviews(response.data);
      const reviews = response.data;
      const totalRatings = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
        reviews.length > 0 ? totalRatings / reviews.length : 0;
      setBookRate(averageRating);
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching reviews");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (comment.length > 0 && rating > 0 && rating <= 5) {
        setIsDisabled(true);
        const response = editingReviewId
          ? (await axios.put(
              `https://book-store-backend-sigma-one.vercel.app/review/${editingReviewId}`,
              { comment, rating, bookId: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            toast.success("Review updated successfully", {
              style: { top: "80px", position: "relative" },
            }))
          : (await axios.post(
              "https://book-store-backend-sigma-one.vercel.app/review",
              { comment, rating, bookId: id },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            toast.success("Review created successfully"),
            { style: { top: "80px", position: "relative" } });
        fetchReviews();
        resetForm();
        setIsOpen(false);
      } else {
        toast.error("Rating and comment are required", {
          style: { top: "80px", position: "relative" },
        });
      }
    } catch (error) {
      setMessage("Sorry, You are blocked, please contact us");
      toast.error("Sorry, You are blocked, please contact us", {
        style: { top: "80px", position: "relative" },
      });
    } finally {
      setIsDisabled(false);
    }
  };
  const handleEdit = (review) => {
    setIsDisabled(false);
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
    setIsOpen(true);
  };
  const handleDelete = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      setIsDisabled(true);
      await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(reviews.filter((rev) => rev._id !== reviewId));
      toast.success("Review deleted successfully", {
        style: { top: "80px", position: "relative" },
      });
      fetchReviews();
    } catch (error) {
      toast.error("Failed to remove review.", {
        style: { top: "80px", position: "relative" },
      });
      console.log(error.response?.data?.message || "Error deleting review");
    } finally {
      setIsDisabled(false);
    }
  };
  const resetForm = () => {
    setComment("");
    setRating(0);
    setEditingReviewId(null);
    setMessage(null);
  };
  const getOrderData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      "https://book-store-backend-sigma-one.vercel.app/orders",
      config
    );
    if (res.status === 200) {
      const bookOrder = res.data.map((order) => {
        return order.books;
      });
      const flattenedBooks = bookOrder?.flat();
      const bookIds = flattenedBooks.map((book) => {
        return book.bookId._id;
      });
      setOrderBookId(bookIds);
    }
  };
  const isBookInOrder = orderBookId.includes(book._id);

  useEffect(() => {
    if (cartItems) {
      const flattenedCartBooks = cartItems.flat();
      const cartBookIds = flattenedCartBooks.map((book) => book?.bookId?._id);
      setIsInCartCheck(cartBookIds?.some((id) => id === book?._id));
    }
  }, [cartItems, book]);
  let isInCart;
  if (DetailsLoading) {
    return (
      <div className="my-[9vh] lg:mx-auto max-w-screen-xl md:px-0 px-5 mx-5">
        <div className="border-b-2 pb-8 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 lg:grid-cols-4">
          <div className="justify-self-center w-64 h-96 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-1/4 h-5 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-1/2 h-5 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-full h-24 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="flex gap-4">
                <div className="w-28 h-7 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-20 h-7 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <div className="w-48 h-12 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-48 h-12 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
          <div className="hidden lg:block space-y-3">
            <div className="border-l rounded-lg border-y border-r p-4">
              <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-[50%] h-4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="border-l mt-3 rounded-lg border-y border-r p-4">
              <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-[50%] h-4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className="border-l rounded-lg mt-3 border-y border-r p-4">
              <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-[50%] h-4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              <div className="w-full h-4 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8">
          <div className="flex justify-between items-center mb-2">
            <div className="w-48 h-6 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="w-36 h-10 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 lg:mt-7">
            <div className="md:w-[40%] w-full lg:me-10">
              <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md mb-4"></div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-10 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
              <div className="space-y-2">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-300 animate-pulse rounded-full"></div>
                      </div>
                      <div className="w-8 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="md:w-[55%] w-full mt-5 md:mt-0 lg:ps-10 lg:border-s-2 border-t-2 md:border-0 space-y-6">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md"></div>
                      <div className="w-24 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                    </div>
                    <div className="w-full h-8 mt-2 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                      <div className="w-12 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                      <div className="w-12 h-4 bg-gray-200 animate-pulse rounded-md"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    isInCart = cartItems.some((item) => item?.bookId === id);
  }

  return (
    <main className="my-[9vh] mx-auto max-w-screen-xl md:px-0 px-5">
      <section className="container mx-auto pb-6">
        <div className="border-b-2 pb-8 max-w-screen-2xl mx-auto grid gap-7 md:grid-cols-3 lg:grid-cols-4">
          <div className="justify-self-center">
            <div className="carousel w-64">
              <div id="item1" className="carousel-item w-full">
                <img
                  src={book?.coverImage}
                  className="w-full"
                  alt="Book Image"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 md:col-span-2">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-3xl max-w-xl">{book?.title}</h1>
                <div>
                  {localStorage?.getItem("token") ? (
                    favoriteBooks?.find(
                      (fav) => fav?.bookId?._id === book?._id
                    ) ? (
                      <FaHeart
                        size={25}
                        className="cursor-pointer me-5 text-red-600 iconBody"
                        onClick={() => {
                          removeFromFavorites(book?._id);
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        size={25}
                        className="cursor-pointer me-5 iconBody"
                        onClick={() => {
                          addToFavorites(book);
                        }}
                      />
                    )
                  ) : null}
                </div>
              </div>
              <p className="text-[#545c72] font-bold uppercase text-lg">
                {book?.author}
              </p>
              <span className="badge bg-[#545c72] text-[#dbb891] font-bold p-4 text-lg">
                {book?.category}
              </span>
              {bookRate > 0 ? (
                <StarIcon bookRate={bookRate} reviewsLength={reviews?.length} />
              ) : (
                <div className="">No reviews yet</div>
              )}
              <p className="text-md max-w-xl font-medium">
                {book?.description}
              </p>
              {book?.discountPercentage ? (
                <div className="">
                  <span className="text-xl font-sans font-bold line-through me-4">
                    {book?.originalPrice} EGP
                  </span>
                  <span className="text-xl font-sans font-bold text-green-600">
                    {" "}
                    {book?.discountedPrice} EGP
                  </span>
                </div>
              ) : (
                <p className="text-xl font-sans font-bold">
                  {book?.originalPrice} EGP
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-center">
              <button
                onClick={() => {
                  setPdfUrl(book?.sourcePath || book?.samplePdf);
                  setShowPdfReader(true);
                }}
                className="flex items-center justify-center gap-2 border-[#dbb891] hover:border-transparent border-2 text-blue-950 hover:bg-blue-950 hover:text-white font-bold rounded-md px-6 py-2 transition-all duration-300"
              >
                Preview {book?.sourcePath ? "Full Version" : "Demo"}
                <PiFileArrowDownDuotone size={28} />
              </button>
              {token ? (
                <button
                  onClick={() => {
                    addToCart(book);
                  }}
                  disabled={
                    isBookInOrder || isInCart || isInCartCheck || isloading
                  } // Disable button if book is in cart or loading
                  aria-disabled={
                    isBookInOrder || isInCart || isInCartCheck || isloading
                  }
                  className={`flex items-center justify-center gap-2 rounded-md px-10 py-3 transition-all duration-300 ${
                    isBookInOrder || isInCart || isInCartCheck || isloading
                      ? " text-gray cursor-not-allowed"
                      : "bg-blue-950 text-white hover:text-[#dbb891]"
                  }`}
                >
                  {isBookInOrder
                    ? "Book Already Bought"
                    : isInCart
                    ? "Already in Cart"
                    : isInCartCheck
                    ? "Already in Cart"
                    : isloading
                    ? "Adding to Cart..."
                    : "Add to Cart"}
                </button>
              ) : (
                <button
                  className="flex items-center justify-center gap-2 rounded-md px-10 py-[11px] transition-all duration-300 bg-[#545c72] text-[#fcf6e6] hover:text-[#dbb891] font-bold hover:bg-[#363b4a]"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden lg:block">
            <div className="border-l rounded-lg border-y border-r p-4">
              <CreditCard size={24} />
              <p className="text-md">Secure Payment</p>
              <p className="text-sm">Visa, Credit Card</p>
            </div>
            <div className="border-l mt-3 rounded-lg border-y border-r p-4">
              <MessageCircleQuestion size={24} />
              <p className="text-md">Write Your Opinion</p>
              <p className="text-sm ">Do You Have An Opinion? Write It Here</p>
            </div>
            <div className="border-l rounded-lg mt-3 border-y border-r p-4">
              <BadgeCheck size={24} />
              <p className="text-md">Authentic Books</p>
              <p className="text-sm ">We guarantee the quality of our books.</p>
            </div>
          </div>
        </div>
        {showPdfReader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 md:w-3/4 lg:w-3/4 rounded-lg p-10  relative">
              {/* <div className="bg-white w-full h-full rounded-lg p-10  relative"> */}
              <button
                onClick={() => setShowPdfReader(false)}
                className="absolute top-0 right-2 text-black  text-2xl font-bold"
              >
                &times;
              </button>
              <PdfBookReader pdfUrl={pdfUrl} />
            </div>
          </div>
        )}
      </section>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-2 px-5 md:px-0">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          {JSON.parse(localStorage?.getItem("user"))?.id && (
            <button
              onClick={() => {
                setIsOpen(true);
                resetForm();
              }}
              className="flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 mb-4 btn bg-blue-950 text-white hover:bg-blue-950 hover:text-[#dbb891]"
            >
              Leave a Review
            </button> 
          )}
        </div>
        <div className="flex justify-between flex-col md:flex-row">
          <div className="md:w-[40%] w-full px-5 md:px-0">
            <RatingOverview
              averageRating={bookRate}
              totalReviews={reviews.length}
              ratingsDistribution={{
                5: reviews.filter((rat) => rat.rating == 5).length,
                4: reviews.filter((rat) => rat.rating == 4).length,
                3: reviews.filter((rat) => rat.rating == 3).length,
                2: reviews.filter((rat) => rat.rating == 2).length,
                1: reviews.filter((rat) => rat.rating == 1).length,
              }}
            />
          </div>
          <div className="md:w-[55%] w-full mt-5 md:mt-0 lg:ps-10 lg:border-s-2 border-t-2 md:border-0">
            {reviews?.length === 0 ? (
              <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
              reviews?.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  isDisabled={isDisabled}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ReviewForm
          editingReviewId={editingReviewId}
          handleSubmit={handleSubmit}
          setComment={setComment}
          comment={comment}
          setRating={setRating}
          rating={rating}
          setIsOpen={setIsOpen}
          isDisabled={isDisabled}
        />
      )}
    </main>
  );
}

export default DetailsPage;

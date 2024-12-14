import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import useCartContext from "../hooks/use-cart-context";
import PdfBookReader from "../components/PdfBookReader"; // Import the PDF viewer
import Modal from "../components/Modal"; // Import a modal component

export default function LibraryComponent() {
  const [orderData, setOrderData] = useState([]);
  const { getUserCartItems } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [pdfUrl, setPdfUrl] = useState(""); // State for selected PDF URL
  const navigate = useNavigate();
  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/orders",
          config
        );

        setOrderData(response.data);
        getUserCartItems();
        setLoading(false);
      } catch (err) {
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openPdfModal = (pdfLink) => {
    setPdfUrl(pdfLink); // Set PDF URL
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfUrl("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const totalBooks = orderData?.reduce(
    (acc, order) => acc + order.books.length,
    0
  );
  const slidesPerView = totalBooks > 4 ? 3 : totalBooks;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-10">Library</h1>
      <div className="flex items-center md:items-center lg:items-center flex-col">
        {orderData.length > 0 ? (
          <Swiper
            breakpoints={{
              300: { slidesPerView: 1, spaceBetween: 10 },
              700: { slidesPerView: slidesPerView, spaceBetween: 10 },
            }}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="max-w-[90%] lg:max-w-[80%]"
          >
            <div>
              {orderData.map((order, orderIndex) => (
                <div key={orderIndex}>
                  {order.books.length > 0 ? (
                    <div>
                      {order.books.map((book, bookIndex) => {
                        const { bookId } = book;
                        return (
                          <SwiperSlide key={`${orderIndex}-${bookIndex}`}>
                            <div
                              className="w-[215px] mb-20 relative flex flex-col group shadow-lg text-white shadow-gray-500 h-[250px] lg:h-[400px] md:w-[250px] xl:w-[290px] cursor-pointer overflow-hidden"
                              onClick={() => openPdfModal(bookId.sourcePath)} // Open modal on click
                            >
                              <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${bookId.coverImage})`,
                                }}
                              ></div>
                              <div className="absolute w-full h-full top-0 opacity-100 transform lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-700">
                                <div className="absolute inset-0 bg-gray-950 opacity-50 w-full h-full top-0"></div>
                                <div className="flex flex-col gap-3 absolute top-0 w-full h-full justify-between">
                                  <div className="absolute bottom-5 right-5 group-hover:text-brown-200">
                                    <Link to={bookId.sourcePath || "#"} target="_blank">
                                      <LuDownload size={"30px"} color="white" />
                                    </Link>
                                  </div>
                                  <div>
                                    <h1 className="m-2 font-bold text-white text-xl lg:text-2xl">
                                      {bookId.title}
                                    </h1>
                                    <p className="m-2 font-bold text-white lg:text-[18px]">
                                      order at:{" "}
                                      {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <RxArrowTopRight
                                className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-brown-200 group-hover:rotate-45 duration-100"
                                onClick={() => navigate(`/books/${bookId?._id}`)}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500">No books in this order</p>
                  )}
                </div>
              ))}
            </div>
          </Swiper>
        ) : (
          <div className="flex justify-center items-center my-14 mx-auto">
            <img src="/order3.jpeg" alt="No Data Available" className="w-72 h-auto" />
          </div>
        )}
      </div>
      
      {/* Modal with PDF viewer */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <PdfBookReader pdfUrl={pdfUrl} />
        </Modal>
      )}
    </div>
  );
}

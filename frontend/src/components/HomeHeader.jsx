import React from "react";

export default function HomeHeader() {
  return (
    <div className="overflow-x-hidden mt-10">
      <div className="text-center mb-10">
        {" "}
        <h1 className="text-3xl font-semibold">
          Discover Read &{" "}
          <span className="text-[#545c72] inline-block">Download</span> Books{" "}
        </h1>
      </div>
      {
        //cover Div
      }
      <div
        className="parentDiv grid grid-cols-12 gap-4 mx-auto mt-20 pb-11 container"
        style={{ maxWidth: "100vw", margin: " auto" }}
      >
        <div className="lg:col-span-3 col-span-2 grid grid-cols-12 lg:me-10 me-20">
          <div className=" col-span-6 mt-12 transition-transform duration-1000 ease-in-out hover:-translate-y-4 hidden lg:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-10.jpg"
              alt="photo"
            />
          </div>
          <div className="lg:col-span-6 col-span-12 ms-11 md:ms-1 lg:ms-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-5.jpg"
              alt="photo"
            />
          </div>
          <div className="col-span-6 mt-20 transition-transform duration-1000 ease-in-out hover:-translate-y-4 hidden lg:block ">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-6.jpg"
              alt="photo"
            />
          </div>
          <div className="lg:col-span-6 col-span-12 ms-10 mt-7 md:ms-1 lg:ms-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-9.jpg"
              alt="photo"
            />
          </div>
        </div>
        {
          //second div
        }

        <div className="lg:col-span-6 md:col-span-9 col-span-12 grid grid-cols-12 relative me-10 mb-20 sm:mb-40 md:items-center lg:items-start">
          <div className="col-span-4 relative z-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4 h-28">
            <img
              className="relative ml-10 md:ml-5 lg:ml-12"
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-1.png"
            />
          </div>
          <div className="h-28 col-span-4 relative z-30 transform scale-110 translate-y-2 md:translate-y-1 translate-x-5 md:-translate-x-4 lg:translate-x-5 ease-in-out transition-transform duration-1000 hover:-translate-y-4">
            <img
              className="relative"
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-11.jpg"
            />
          </div>
          <div className="h-28 col-span-4 md:-translate-x-10 lg:-translate-x-0 relative z-10 transition-transform duration-1000 ease-in-out hover:-translate-y-4">
            <img
              className="relative "
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-2.png"
            />
          </div>
        </div>

        {
          ///third div
        }
        <div className="lg:col-span-3 col-span-1 grid grid-cols-12 lg:ms-20 ms-0">
          <div className=" lg:col-span-6 md:-translate-x-[72px] lg:-translate-x-[85px] xl:-translate-x-[72px] col-span-12 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-7.jpg"
              alt="photo"
            />
          </div>
          <div className="col-span-6 mt-10 ms-0 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-24 hidden lg:block lg:-translate-x-2 xl:translate-x-3">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/10/single-product-29.jpg"
              alt="photo"
            />
          </div>
          <div className="lg:col-span-6 col-span-12 mt-14 md:-translate-x-[72px] lg:-translate-x-[85px] xl:-translate-x-[72px] transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden md:block">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-3.jpg"
              alt="photo"
            />
          </div>
          <div className="col-span-6 mt-20 ms-0 transition-transform duration-1000 ease-in-out hover:-translate-y-4 w-28 hidden lg:block lg:-translate-x-3 xl:translate-x-3">
            <img
              src="https://authore.g5plus.net/wp-content/uploads/2023/07/slider-01-8.jpg"
              alt="photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

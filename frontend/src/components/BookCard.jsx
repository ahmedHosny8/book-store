/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/BookCard.model.css";
import { FaRegHeart, FaHeart, FaBook } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

const BookCard = ({
  _id,
  title,
  author,
  price,
  imageUrl,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  InCart,
  isloading,
  isBookInOrder,
  discountPercentage,
  discountedPrice,
  category,
  isDownloadLoading,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="card rounded-none relative overflow-hidden cursor-pointer"
      style={{
        width: "280px",
      }}
    >
      <div
        className="h-96 w-full mx-auto mt-8 flex justify-center overflow-hidden cursor-pointer"
        onClick={() => {
          navigate(`/books/${_id}`);
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ transition: "0.5s ease" }}
          className="h-full w-full hover:scale-110"
        />
      </div>
      <div className="card-body flex-grow-0 px-0 mx-0 bodyCard bg-white">
        <p
          onClick={() => {
            navigate(`/books/${_id}`);
          }}
          className="text-[#545c72] font-bold uppercase mb-0 pb-0 text-sm cursor-pointer"
        >
          {category}
        </p>
        <p
          onClick={() => {
            navigate(`/books/${_id}`);
          }}
          className="card-title text-xl mt-0 pt-0 overflow-hidden line-clamp-1 text-ellipsis cursor-pointer"
        >
          {title}
        </p>
        <p
          onClick={() => {
            navigate(`/books/${_id}`);
          }}
          className="opacity-70 cursor-pointer"
        >
          {author}
        </p>
        {discountPercentage > 0 ? (
          <div
            onClick={() => {
              navigate(`/books/${_id}`);
            }}
            className="flex cursor-pointer"
          >
            <p className="text-xl font-sans card-title">
              {discountedPrice} EGP
            </p>
            <p className="text-xl font-sans line-through">{price} EGP</p>
          </div>
        ) : (
          <p
            onClick={() => {
              navigate(`/books/${_id}`);
            }}
            className="text-xl font-sans card-title"
          >
            {price} EGP
          </p>
        )}
        <div className="card-title cartDev flex justify-between mt-2 cursor-default">
          {localStorage.getItem("token") ? (
            isFavorite ? (
              <FaHeart
                className="cursor-pointer text-red-600 iconBody"
                onClick={removeFromFavorites}
              />
            ) : (
              <FaRegHeart
                className="cursor-pointer iconBody"
                onClick={addToFavorites}
              />
            )
          ) : null}

          {localStorage.getItem("token") ? (
            isBookInOrder ? (
              <button onClick={() => navigate("/library")}>
                <FaBook />
              </button>
            ) : InCart ? (
              <BsFillCartCheckFill className="  iconBody" />
            ) : (
              <button onClick={addToCart} disabled={isloading}>
                <MdAddShoppingCart
                  className={` ${
                    isloading ? "cursor-not-allowed" : "cursor-pointer iconBody"
                  }`}
                />
              </button>
            )
          ) : (
            <MdAddShoppingCart
              className="cursor-pointer iconBody"
              onClick={() => {
                navigate("/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

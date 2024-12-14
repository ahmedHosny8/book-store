import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../hooks/UserContext";
import axios from "axios";
import "../css/checkout.css";

export default function Checkout() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [savedCards, setSavedCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");

  const [newCard, setNewCard] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    name: "",
    date: "",
    cvc: "",
  });

  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    number: false,
    name: false,
    date: false,
    cvc: false,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSavedCards = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `https://book-store-backend-sigma-one.vercel.app/card/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          setSavedCards(res.data.data.cards);
        } else {
          Swal.fire({ title: "Failed to fetch saved cards", icon: "error" });
        }
      } catch (error) {
        Swal.fire({
          title: "Error fetching saved cards",
          text: error.message,
          icon: "error",
        });
      }
    };

    fetchSavedCards();
  }, [token]);

  const handleNumberChange = (e, part) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setNewCard((prev) => ({ ...prev, [part]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (value) => {
    let formatted = value.replace(/\D/g, "");
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4);
    }
    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    }
    return formatted;
  };

  const validateInputs = () => {
    const cardNumberRegex = /^\d{4}$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvcRegex = /^\d{3}$/;

    const { part1, part2, part3, part4, name, date, cvc } = newCard;
    const newInputErrors = {
      number: ![part1, part2, part3, part4].every((part) =>
        cardNumberRegex.test(part)
      ),
      name: name.trim().length === 0 || name.trim().length > 30,
      date: !dateRegex.test(date),
      cvc: !cvcRegex.test(cvc),
    };

    setInputErrors(newInputErrors);

    if (Object.values(newInputErrors).some((error) => error)) {
      Swal.fire({ title: "Invalid input(s)", icon: "error" });
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!token) {
      Swal.fire({ title: "Authorization Error", icon: "error" });
      return;
    }

    if (selectedCardId) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          `https://book-store-backend-sigma-one.vercel.app/paymob/`,
          { userId: userInfo?.id, cardId: selectedCardId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 201) {
          Swal.fire({ title: "Payment Successful!", icon: "success" });
          navigate("/library");
        } else {
          Swal.fire({ title: "Payment Failed", icon: "error" });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || error.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!validateInputs()) return;

      try {
        setIsLoading(true);
        const paymentRes = await axios.post(
          `https://book-store-backend-sigma-one.vercel.app/paymob/`,
          {
            userId: userInfo?.id,
            cardDetails: {
              number: `${newCard.part1}${newCard.part2}${newCard.part3}${newCard.part4}`,
              name: newCard.name.trim(),
              expiryDate: newCard.date,
              cvc: newCard.cvc,
            },
            saveCard,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (paymentRes.status === 201) {
          Swal.fire({ title: "Payment Successful!", icon: "success" });
          navigate("/library");

          if (saveCard) {
            const cardData = {
              cardNumber: `${newCard.part1}${newCard.part2}${newCard.part3}${newCard.part4}`,
              cardholderName: newCard.name.trim(),
              expiryDate: newCard.date,
              saved: saveCard,
            };

            const saveCardRes = await axios.post(
              `https://book-store-backend-sigma-one.vercel.app/card/`,
              cardData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (saveCardRes.status === 201) {
              Swal.fire({ title: "Card Saved Successfully!", icon: "success" });
              setSavedCards((prev) => [...prev, saveCardRes.data.data.card]);
              setNewCard({
                part1: "",
                part2: "",
                part3: "",
                part4: "",
                name: "",
                date: "",
                cvc: "",
              });
              setSaveCard(false);
            } else {
              Swal.fire({ title: "Failed to Save Card", icon: "error" });
            }
          }
        } else {
          Swal.fire({ title: "Payment Failed", icon: "error" });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || error.message,
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-100 min-h-screen space-y-8 md:space-y-0 md:space-x-8">
      <div className="relative mb-6 md:mb-0">
        {selectedCardId ? (
          <SavedCardSVG
            card={savedCards.find((card) => card._id === selectedCardId)}
          />
        ) : (
          <VisaCardSVG
            number={`${newCard.part1} ${newCard.part2} ${newCard.part3} ${newCard.part4}`}
            name={newCard.name}
            date={newCard.date}
            isCvvFocused={isCvvFocused}
            cvc={newCard.cvc}
          />
        )}
      </div>

      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="form-control">
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Saved Cards
          </label>
          {savedCards.length === 0 ? (
            <p className="text-gray-500">No saved cards available.</p>
          ) : (
            <select
              className="select select-bordered w-full"
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
            >
              <option value="">Select a saved card</option>
              {savedCards.map((card) => (
                <option key={card._id} value={card._id}>
                  **** **** **** {card.cardNumber.slice(-4)} -{" "}
                  {card.cardholderName} - Expires {card.expiryDate}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add New Card
          </h2>
          <div className="form-control mb-4">
            <label className="block mb-2 text-gray-700">Card Number</label>
            <div className="flex space-x-2">
              {["part1", "part2", "part3", "part4"].map((part, index) => (
                <input
                  key={index}
                  type="text"
                  name={part}
                  maxLength="4"
                  className={`input input-bordered w-1/4 rounded-lg border-2 ${
                    inputErrors.number ? "border-red-500" : "border-gray-300"
                  }`}
                  value={newCard[part]}
                  onChange={(e) => handleNumberChange(e, part)}
                  placeholder="XXXX"
                  disabled={!!selectedCardId}
                  aria-invalid={inputErrors.number}
                  aria-describedby={
                    inputErrors.number ? "card-number-error" : undefined
                  }
                />
              ))}
            </div>
            {inputErrors.number && (
              <span id="card-number-error" className="text-red-500 text-sm">
                Invalid card number.
              </span>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="block mb-2 text-gray-700">Cardholder Name</label>
            <input
              type="text"
              name="name"
              maxLength="30"
              className={`input input-bordered w-full rounded-lg border-2 ${
                inputErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={newCard.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              disabled={!!selectedCardId}
              aria-invalid={inputErrors.name}
              aria-describedby={
                inputErrors.name ? "cardholder-name-error" : undefined
              }
            />
            {inputErrors.name && (
              <span id="cardholder-name-error" className="text-red-500 text-sm">
                Invalid name.
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="form-control mb-4 md:mb-0 md:w-1/2">
              <label className="block mb-2 text-gray-700">
                Expiration Date
              </label>
              <input
                type="text"
                name="date"
                maxLength="5"
                className={`input input-bordered w-full rounded-lg border-2 ${
                  inputErrors.date ? "border-red-500" : "border-gray-300"
                }`}
                value={formatDate(newCard.date)}
                onChange={(e) =>
                  setNewCard((prev) => ({
                    ...prev,
                    date: formatDate(e.target.value),
                  }))
                }
                placeholder="MM/YY"
                disabled={!!selectedCardId}
                aria-invalid={inputErrors.date}
                aria-describedby={
                  inputErrors.date ? "expiry-date-error" : undefined
                }
              />
              {inputErrors.date && (
                <span id="expiry-date-error" className="text-red-500 text-sm">
                  Invalid date.
                </span>
              )}
            </div>
            <div className="form-control md:w-1/2">
              <label className="block mb-2 text-gray-700">CVC</label>
              <input
                type="text"
                name="cvc"
                maxLength="3"
                className={`input input-bordered w-full rounded-lg border-2 ${
                  inputErrors.cvc ? "border-red-500" : "border-gray-300"
                }`}
                value={newCard.cvc}
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
                onChange={(e) =>
                  setNewCard((prev) => ({
                    ...prev,
                    cvc: e.target.value.replace(/\D/g, ""),
                  }))
                }
                placeholder="CVC"
                disabled={!!selectedCardId}
                aria-invalid={inputErrors.cvc}
                aria-describedby={inputErrors.cvc ? "cvc-error" : undefined}
              />
              {inputErrors.cvc && (
                <span id="cvc-error" className="text-red-500 text-sm">
                  Invalid CVC.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={() => setSaveCard((prev) => !prev)}
              className="checkbox checkbox-primary"
              disabled={!!selectedCardId}
            />
            <span className="text-gray-700">Save card for future payments</span>
          </label>
        </div>

        <button
          type="button"
          className={`btn w-full ${
            isLoading ? "loading" : ""
          } bg-blue-950 text-white font-semibold rounded-lg py-3 hover:bg-blue-950 hover:text-[#dbb891]`}
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

const VisaCardSVG = ({
  number = "**** **** **** ****",
  name = "CARD HOLDER",
  date = "MM/YY",
  isCvvFocused = false,
  cvc = "***",
}) => (
  <div className={`card-container ${isCvvFocused ? "flipped" : ""}`}>
    <div className="card">
      <div className="card-face front">
        <svg
          width="350"
          height="200"
          viewBox="0 0 350 200"
          style={{ borderRadius: "15px" }}
        >
          <defs>
            <linearGradient id="cardGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#121212" />
              <stop offset="100%" stopColor="#3b3b3b" />
            </linearGradient>
            <filter id="cardShadow" x="0" y="0">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" />
            </filter>
          </defs>
          <rect
            width="350"
            height="200"
            rx="15"
            ry="15"
            fill="url(#cardGradient)"
            filter="url(#cardShadow)"
          />
          <text
            x="20"
            y="40"
            fill="#FFD700"
            fontSize="24"
            fontWeight="bold"
            fontFamily="Arial"
          >
            VISA
          </text>
          <text
            x="20"
            y="100"
            fill="#FFF"
            fontSize="22"
            fontFamily="monospace"
            letterSpacing="4"
          >
            {number || "**** **** **** ****"}
          </text>
          <text
            x="20"
            y="150"
            fill="#FFF"
            fontSize="14"
            fontWeight="500"
            fontFamily="Arial"
          >
            {name || "CARD HOLDER"}
          </text>
          <text
            x="280"
            y="150"
            fill="#FFF"
            fontSize="14"
            fontWeight="500"
            fontFamily="Arial"
          >
            {date || "MM/YY"}
          </text>
        </svg>
      </div>
      <div className="card-face back">
        <svg
          width="350"
          height="200"
          viewBox="0 0 350 200"
          style={{ borderRadius: "15px" }}
        >
          <rect width="350" height="200" rx="15" ry="15" fill="#3b3b3b" />
          <rect x="0" y="40" width="350" height="40" fill="#000" />
          <text
            x="280"
            y="130"
            fill="#FFF"
            fontSize="18"
            fontFamily="monospace"
            letterSpacing="2"
          >
            {cvc || "***"}
          </text>
        </svg>
      </div>
    </div>
  </div>
);

// SavedCardSVG Component
const SavedCardSVG = ({ card }) => {
  if (!card) return null;

  const { cardNumber, cardholderName, expiryDate } = card;

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-face front">
          <svg
            width="350"
            height="200"
            viewBox="0 0 350 200"
            style={{ borderRadius: "15px" }}
          >
            <defs>
              <linearGradient id="cardGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#121212" />
                <stop offset="100%" stopColor="#3b3b3b" />
              </linearGradient>
              <filter id="cardShadow" x="0" y="0">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="#000"
                />
              </filter>
            </defs>
            <rect
              width="350"
              height="200"
              rx="15"
              ry="15"
              fill="url(#cardGradient)"
              filter="url(#cardShadow)"
            />
            <text
              x="20"
              y="40"
              fill="#FFD700"
              fontSize="24"
              fontWeight="bold"
              fontFamily="Arial"
            >
              VISA
            </text>
            <text
              x="20"
              y="100"
              fill="#FFF"
              fontSize="22"
              fontFamily="monospace"
              letterSpacing="4"
            >
              **** **** **** {cardNumber.slice(-4)}
            </text>
            <text
              x="20"
              y="150"
              fill="#FFF"
              fontSize="14"
              fontWeight="500"
              fontFamily="Arial"
            >
              {cardholderName || "CARD HOLDER"}
            </text>
            <text
              x="280"
              y="150"
              fill="#FFF"
              fontSize="14"
              fontWeight="500"
              fontFamily="Arial"
            >
              {expiryDate || "MM/YY"}
            </text>
          </svg>
        </div>
        <div className="card-face back">
          <svg
            width="350"
            height="200"
            viewBox="0 0 350 200"
            style={{ borderRadius: "15px" }}
          >
            <rect width="350" height="200" rx="15" ry="15" fill="#3b3b3b" />
            <rect x="0" y="40" width="350" height="40" fill="#000" />
            <text
              x="280"
              y="130"
              fill="#FFF"
              fontSize="18"
              fontFamily="monospace"
              letterSpacing="2"
            >
              ***
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

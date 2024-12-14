import { useState, useEffect } from "react";
import {
  useLoaderData,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
import { CirclePlus } from "lucide-react";
import UpdateUserData from "../../components/UpdateUserData";
import Cards from "../../components/Cards";
import { toast } from "react-hot-toast";
import {
  updateUserData,
  addCreditCard,
  deleteCard,
} from "../../services/apiProfile";
import AddCreditCard from "../../components/AddCreditCard";
import ReviewedBook from "../../components/ReviewedBook";
import { BsCreditCard2BackFill } from "react-icons/bs";

function ProfileSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-32 w-32 bg-gray-300 rounded-full"></div>
      <div className="h-6 w-40 bg-gray-300 rounded"></div>
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
    </div>
  );
}

function WalletSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="animate-pulse grid gap-6 md:grid-cols-2">
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
  );
}

function ProfilePage() {
  const {
    userData,
    creditCards: initialCreditCards,
    userReviews,
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [creditCards, setCreditCards] = useState(initialCreditCards);

  const [activeTab, setActiveTab] = useState("wallet");
  const [showEdit, setShowEdit] = useState(false);
  const [showAddCreditCard, setShowAddCreditCard] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setShowEdit(false);
      setShowAddCreditCard(false);
    }
  }, [actionData]);

  const handleDeleteCard = async (cardId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteCard(token, cardId);
      toast.success("Card deleted successfully", {
        style: { position: "relative", left: "40%", top: "65px" },
      });

      setCreditCards((prevCards) => ({
        ...prevCards,
        data: {
          ...prevCards.data,
          cards: prevCards.data.cards.filter((card) => card._id !== cardId),
        },
      }));
    } catch (error) {
      toast.error("Failed to delete card");
      console.log(error);
    }
  };

  const renderedCards = creditCards?.data?.cards?.map((card) => (
    <Cards key={card._id} card={card} onDelete={handleDeleteCard} />
  ));

  return (
    <main className="font-poppins text-brand-black">
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Left Column - Profile */}
            <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-8">
              <h1 className="font-poppins font-semibold text-brand-black text-3xl mb-8">
                Your Profile
              </h1>

              {!userData ? (
                <ProfileSkeleton />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center h-32 w-32 rounded-full border-4 border-brand-blue shadow-md">
                    <span className="font-poppins font-bold text-brand-black text-5xl">
                      {userData.data.user.username[0]}
                    </span>
                  </div>
                  <h1 className="font-poppins font-semibold text-brand-black text-2xl">
                    {userData.data.user.username}
                  </h1>
                </div>
              )}

              {showEdit ? (
                <UpdateUserData userData={userData} setShowEdit={setShowEdit} />
              ) : (
                <div className="flex flex-col justify-center p-4 mt-8">
                  {!userData ? (
                    <ProfileSkeleton />
                  ) : (
                    <>
                      <div className="flex items-center gap-3 border-b py-4">
                        <p className="font-semibold text-gray-700">Name:</p>
                        <p>{userData.data.user.username}</p>
                      </div>
                      <div className="flex items-center gap-3 border-b py-4">
                        <p className="font-semibold text-gray-700">Email:</p>
                        <p>{userData.data.user.email}</p>
                      </div>
                      <div className="flex items-center gap-3 py-4">
                        <p className="font-semibold text-gray-700">Status:</p>
                        {userData.data.user.status ? (
                          <p className="text-green-500 font-medium">
                            You are allowed to review
                          </p>
                        ) : (
                          <p className="text-red-500 font-medium">
                            You are not allowed to review
                          </p>
                        )}
                      </div>
                      <button
                        className="mt-6 bg-blue-950 text-white hover:text-[#dbb891] w-fit px-3 py-2 rounded-lg mx-auto transition-all"
                        onClick={() => setShowEdit(true)}
                      >
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Tabs */}
            <div className="md:col-span-3">
              <div className="flex justify-center md:justify-start border-b pb-4 mb-6 space-x-6">
                <button
                  className={`font-semibold py-2 px-6 rounded-full transition-all ${
                    activeTab === "wallet"
                      ? "bg-gradient-to-r bg-blue-950 text-[#dbb891] shadow-lg"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("wallet")}
                >
                  Wallet
                </button>
                <button
                  className={`font-semibold py-2 px-6 rounded-full transition-all ${
                    activeTab === "reviews"
                      ? "bg-gradient-to-r bg-blue-950 text-[#dbb891] shadow-lg"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-8">
                {activeTab === "wallet" && (
                  <div>
                    {console.log(creditCards.data.cards.length)}
                    <h2 className="font-poppins font-semibold text-brand-black text-3xl text-center mb-8">
                      Your Wallet
                    </h2>
                    <div className="bg-white max-w-screen-sm mx-auto px-6 py-6  rounded-lg shadow">
                      {creditCards.data.cards.length > 0 ? (
                        // console.log(creditCards),

                        <div>{renderedCards}</div>
                      ) : (
                        <div className="flex flex-col justify-center items-center h-60 py-15">
                          <BsCreditCard2BackFill className="text-blue-300 text-6xl mb-6" />
                          <p className="text-2xl text-gray-700 font-semibold mb-4">
                            Your wallet is empty.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="font-poppins font-semibold text-brand-black text-3xl text-center mb-8">
                      Your Reviews
                    </h2>
                    {!userReviews ? (
                      <ReviewsSkeleton />
                    ) : userReviews.length === 0 ? (
                      <p className="text-lg text-gray-500 text-center mb-4">
                        You have not reviewed any books yet.
                      </p>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2">
                        {userReviews.map((review) => (
                          <ReviewedBook key={review._id} review={review} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const contactData = {
      name,
      email,
      message: `${message}`,
    };

    try {
      const response = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/contact",
        contactData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire("Success", "Your message has been sent!", "success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire(
        "Error",error.response.data.errors[0] ||
        "Failed to send the message. Please try again.",
        "error"
      );
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-brand-grey-lighter py-16">
      <section className="mb-8 py-8 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="border rounded-lg bg-white overflow-hidden md:grid md:grid-cols-3">
            <div className="col-span-2 py-16 px-8">
              <p className="font-poppins text-brand-secondary">About Us</p>
              <p className="font-poppins font-semibold text-brand-black text-2xl mb-4">
                What we really do?
              </p>
              <p className="font-poppins">
                We are dedicated to connecting readers with their next great
                read. Whether you are looking for the latest bestseller, a
                timeless classic, or a hidden gem, our carefully curated
                selection offers something for every book lover. With a
                user-friendly platform, we make it easy to discover, purchase,
                and enjoy books from the comfort of your home.
              </p>
            </div>
            <img
              className="h-full w-full object-cover object-center"
              src="/about/reading-1.webp"
              alt="Reading"
            />
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="border rounded-lg bg-white overflow-hidden md:grid md:grid-cols-2">
            <img
              className="h-full w-full object-cover object-center"
              src="/about/reading-4.jpg"
              alt="Reading"
            />

            <div className="py-8 px-8">
              <p className="font-poppins font-semibold text-brand-black text-2xl mb-8">
                Contact Us
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-medium text-sm">
                    Message
                  </label>
                  <textarea
                    className="h-32 w-full border border-stone-200 px-4 py-2 font-poppins text-sm rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please Enter More Than 10 Characters"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex items-center justify-center gap-1 rounded px-4 py-2 bg-blue-950 text-white transition-all duration-300 hover:text-[#dbb891]"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;

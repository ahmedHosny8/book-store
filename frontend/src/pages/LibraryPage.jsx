import React, { useContext, useEffect, useState } from "react";
import LibraryComponent from "../components/LibraryComponent";
import { UserContext } from "../hooks/UserContext";
import axios from "axios";

export default function LibraryPage() {
  const { userInfo } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [booksDetails, setBooksDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main>
      {isLoading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto ">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <div>
         
          <LibraryComponent orderData={orderData} booksDetails={booksDetails} />
        </div>
      )}
    </main>
  );
}

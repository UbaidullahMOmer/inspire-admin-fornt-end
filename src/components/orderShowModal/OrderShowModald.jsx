import React, { useEffect, useState } from "react";
import { useGetSingleOrderQuery } from "../../redux/InspireApis";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
function OrderShowModald({ onClose, id }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { email, phoneNumber, totalPrice, userName, address, products } =
    selectedOrder || {};
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getSelectedOrder = async () => {
      if (!id) return;
      setIsLoading(true);
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedOrder(docSnap.data());
        console.log("Document data:", docSnap.data());
      }
      setIsLoading(false);
    };
    getSelectedOrder();
  }, []);
  console.log(products, "products");
  console.log(selectedOrder, "selectedOrder");
  return (
    <div className="fixed flex p-[20px] bg-[#FFF] w-[800px] h-[700px] overflow-y-scroll shadow-[0_4px_20px_1000px_rgba(0,0,0,0.6)] rounded-[10px] flex-col gap-[24px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="flex items-center justify-between">
        <span className="text-[#303031] font-[500] text-[28px]">
          View Order Detail
        </span>
        {isLoading ? (
          <img
            src="https://miro.medium.com/v2/resize:fit:1104/1*pN5YHNX03fem8HWxnInQ3g.gif"
            alt="loader"
            className="w-[24px] h-[28px] object-cover border-0"
          />
        ) : (
          <i
            onClick={onClose}
            className="text-[#303031] text-[24px] cursor-pointer ri-close-line"
          ></i>
        )}
      </div>
      <div className="grid grid-cols-2 gap-[32px]">
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">Date</span>
          <span className="text-[#737791] font-[500] w-full">12/24/2024</span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">User Name</span>
          <span className="text-[#737791] font-[500] w-full">{userName}</span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">Email</span>
          <span className="text-[#737791] font-[500] w-full">{email}</span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">Phone Number</span>
          <span className="text-[#737791] font-[500] w-full">
            {phoneNumber}
          </span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">Total Price</span>
          <span className="text-[#737791] font-[500] w-full">{totalPrice}</span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <span className="text-[#303031] font-[500] w-full">Address</span>
          <span className="text-[#737791] font-[500] w-full">{address}</span>
        </div>
      </div>
      {isLoading ? (
        <img
          src="https://miro.medium.com/v2/resize:fit:1104/1*pN5YHNX03fem8HWxnInQ3g.gif"
          alt="loader"
          className="w-[300px] object-cover border-0"
        />
      ) : (
        products?.map((product) => {
          const { id, name, price, image, qty, discount, flavor } = product;
          return (
            <>
              <div className="flex flex-col gap-[12px] w-full">
                <h1 className="text-[#303031] text-[24px] font-[600] w-full">
                  Product Id:{" "}
                  <span className="text-[#737791] font-[500] w-full">{id}</span>
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Image
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    <img
                      className="w-auto h-[100px]"
                      src={
                        image ||
                        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                      }
                      alt={image}
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">Name</span>
                  <span className="text-[#737791] font-[500] w-full">
                    {name}
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Price
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    {price}
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Flavor
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    {flavor}
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Discount
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    {discount}
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Quantity
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    {qty}
                  </span>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[#303031] font-[500] w-full">
                    Total this product
                  </span>
                  <span className="text-[#737791] font-[500] w-full">
                    {qty * price}
                  </span>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
export default OrderShowModald;

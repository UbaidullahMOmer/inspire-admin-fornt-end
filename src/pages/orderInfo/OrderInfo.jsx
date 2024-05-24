import React, { useEffect, useState } from "react";
import OrderShowModald from "../../components/orderShowModal/OrderShowModald";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const OrderInfo = () => {
  const [orders, setOrders] = useState([]);
  const [orderModel, setOrderModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleModel = (id) => {
    setOrderModel(true);
    setSelectedOrder(id);
  };
  const getOrders = async () => {
    setIsLoading(true);
    const ordersRef = collection(db, "orders");
    try {
      const data = await getDocs(ordersRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrders(filteredData);
      console.log(filteredData, "filteredData");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="flex flex-col gap-[32px] pr-[20px] relative w-full h-full">
      <span className="text-[32px] font-[600] text-[#303031]">Orders</span>
      {isLoading ? (
        <img
          src="https://miro.medium.com/v2/resize:fit:1104/1*pN5YHNX03fem8HWxnInQ3g.gif"
          alt="loader"
          className="w-[400px] object-cover border-0 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
      ) : (
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex items-center w-full px-[24px] py-[16px]">
            <span className="text-[#737791] font-[500] w-full">Date</span>
            <span className="text-[#737791] font-[500] w-full">Name</span>
            <span className="text-[#737791] font-[500] w-full">Email</span>
            <span className="text-[#737791] font-[500] w-full">Phone</span>
            <span className="text-[#737791] font-[500] w-full">Price</span>
            <span className="text-[#737791] font-[500] w-full">Address</span>
            <span className="w-[94px]"></span>
          </div>
          {orders?.map((order) => {
            const { email, phone, totalPrice, name, address } = order || {};
            return (
              <div
                onClick={() => handleModel(order.id)}
                className="flex items-center px-[24px] py-[16px] bg-[#FFF] rounded-[8px] shadow-[0_4px_20px_-0px_rgba(0,0,0,0.05)]"
              >
                <span className="text-[#303031] font-[500] w-full">
                  02/07/2022
                </span>
                <span className="text-[#303031] font-[500] w-full">{name}</span>
                <span className="text-[#303031] font-[500] w-full">
                  {email}
                </span>
                <span className="text-[#303031] font-[500] w-full">
                  {phone}
                </span>
                <span className="text-[#303031] font-[500] w-full">
                  ${totalPrice}
                </span>
                <span className="text-[#303031] font-[500] w-full">
                  {address}
                </span>
                <i className="ri-eye-line text-[24px] cursor-pointer"></i>
              </div>
            );
          })}
        </div>
      )}
      {orderModel && (
        <OrderShowModald
          id={selectedOrder}
          onClose={() => setOrderModel(false)}
        />
      )}
    </div>
  );
};
export default OrderInfo;

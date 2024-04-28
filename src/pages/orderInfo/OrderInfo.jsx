import React, { useEffect, useState } from 'react'
import OrderShowModald from '../../components/orderShowModal/OrderShowModald';
import { useGetOrdersQuery } from '../../redux/InspireApis';

const OrderInfo = () => {
    const { data: orders } = useGetOrdersQuery();
    const [orderModel, setOrderModel] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const handleModel = (id) => {
        setOrderModel(true);
        setSelectedOrder(id);
    }
    return (
        <div className='flex flex-col gap-[32px] pr-[20px]'>
            <span className='text-[32px] font-[600] text-[#303031]'>
                Orders
            </span>
            <div className="flex flex-col gap-[16px] w-full">
                <div className="flex items-center w-full px-[24px] py-[16px]">
                    <span className='text-[#737791] font-[500] w-full'>
                        Date
                    </span>
                    <span className='text-[#737791] font-[500] w-full'>
                        Name
                    </span>
                    <span className='text-[#737791] font-[500] w-full'>
                        Email
                    </span>
                    <span className='text-[#737791] font-[500] w-full'>
                        Phone
                    </span>
                    <span className='text-[#737791] font-[500] w-full'>
                        Price
                    </span>
                    <span className='text-[#737791] font-[500] w-full'>
                        Address
                    </span>
                    <span className='w-[94px]'></span>
                </div>
                {orders?.data.map((order) => {
                    const { email, phoneNumber, totalPrice, userName, address } = order?.attributes || {};
                    return (
                        <div onClick={() => handleModel(order.id)} className="flex items-center px-[24px] py-[16px] bg-[#FFF] rounded-[8px] shadow-[0_4px_20px_-0px_rgba(0,0,0,0.05)]">
                            <span className='text-[#303031] font-[500] w-full'>
                                02/07/2022
                            </span>
                            <span className='text-[#303031] font-[500] w-full'>
                                {userName}
                            </span>
                            <span className='text-[#303031] font-[500] w-full'>
                                {email}
                            </span>
                            <span className='text-[#303031] font-[500] w-full'>
                                {phoneNumber}
                            </span>
                            <span className='text-[#303031] font-[500] w-full'>
                                ${totalPrice}
                            </span>
                            <span className='text-[#303031] font-[500] w-full'>
                                {address}
                            </span>
                            <i className="ri-eye-line text-[24px] cursor-pointer"></i>
                        </div>
                    )
                })
                }
            </div>
            {orderModel && <OrderShowModald id={selectedOrder} onClose={() => setOrderModel(false)} />}
        </div>
    )
}
export default OrderInfo;
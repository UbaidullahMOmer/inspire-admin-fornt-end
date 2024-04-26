import React from "react";
import Modal from "../../components/modal/Modal";
import { useGetProductsQuery } from "../../redux/InspireApis";
import Config from "../../constants/Index";

const Products = () => {
  const { data: products } = useGetProductsQuery();
  const productsData = products?.data;
  const findProductPrice = (discount, price) => {
    if (discount) {
      return price - (price * discount) / 100;
    }
    return price;
  };
  return (
    <div className="flex flex-col w-full px-[32px] gap-[32px]">
      <div className="flex items-center w-full justify-between">
        <span className="text-[32px] font-[600] text-[#303031]">Orders</span>
        <div className="cursor-pointer text-[#303031] font-[500] flex items-center justify-center p-[12px] bg-[#EFB749] rounded-[8px]">
          <span className="text-[20px]">+</span> Add New Product
        </div>
      </div>
      <div className="flex gap-[32px]">
        {productsData?.map((productData, index) => {
          const product = productData?.attributes;
          const image = product?.image?.data?.attributes?.url;
          return (
            <div className="relative flex p-[16px] shadow-[0_4px_20px_-0px_rgba(0,0,0,0.1)] rounded-[10px] flex-col gap-[24px] max-w-[650px] pt-[64px]">
              <div className="w-full flex items-center justify-center">
                <img
                  className="max-h-[360px] max-w-[240px] object-cover"
                  src={image || "images/product.png"}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <h1 className="text-[#303031] font-[600] text-[36px]">
                  {product?.name}
                </h1>
                <p className="text-[#737791] font-[500]">{product?.detail}</p>
              </div>
              <div className="flex items-center gap-[24px]">
                <span className="text-[#8D8D8D] text-[32px] line-through">
                  {Config.currencySymbol}
                  {product?.price}
                </span>
                <span className="text-[#303031] text-[48px]">
                  {Config.currencySymbol}
                  {findProductPrice(product?.discount, product?.price)}
                </span>
                {product?.discount && (
                  <div className="text-[#FFF] font-[500] flex items-center justify-center p-[12px] bg-[#FF6058] rounded-[8px]">
                    {product?.discount}% Discount
                  </div>
                )}
              </div>
              <div className="cursor-pointer absolute top-[20px] right-[20px] gap-2 text-[#303031] font-[500] flex items-center justify-center p-[12px] bg-[#EFB749] rounded-[8px]">
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M5 16.5L4 20.5L8 19.5L19.5858 7.91421C20.3668 7.13316 20.3668 5.86683 19.5858 5.08579L19.4142 4.91421C18.6332 4.13316 17.3668 4.13317 16.5858 4.91421L5 16.5Z"
                    stroke="#303031"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 16.5L4 20.5L8 19.5L18 9.5L15 6.5L5 16.5Z"
                    fill="#303031"
                  />
                  <path
                    d="M15 6.5L18 9.5"
                    stroke="#303031"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 20.5H21"
                    stroke="#303031"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      {/* <Modal /> */}
    </div>
  );
};
export default Products;

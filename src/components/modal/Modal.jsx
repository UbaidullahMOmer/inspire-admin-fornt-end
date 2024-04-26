import React from 'react'

const Modal = () => {
    return (
        <div className="fixed flex p-[20px] bg-[#FFF] w-[800px] shadow-[0_4px_20px_1000px_rgba(0,0,0,0.6)] rounded-[10px] flex-col gap-[24px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">

            <div className="flex items-center justify-between">

                <span className='text-[#303031] font-[500] text-[28px]'>
                    Edit Product
                </span>

                <span className='text-[#303031] text-[24px] cursor-pointer'>
                    X
                </span>

            </div>

            <input type="text" className='px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]' placeholder='Sean Reichert' />

            <input type="text" className='px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]' placeholder='Sean Reichert' />

            <textarea type="text" className='px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px] h-[200px] resize-none' placeholder='Sean Reichert' />

            <div className="flex items-center gap-[16px] w-full">

                <input type="text" className='w-full px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]' placeholder='Sean Reichert' />

                <input type="text" className='w-full px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]' placeholder='Sean Reichert' />

            </div>

            <div className="flex items-center rounded-[10px] overflow-hidden w-fit relative">
                <div className="bg-[#EFB749] absolute top-2 right-2 rounded-[10px] p-[4px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2.60372 8.05147L2.10156 10.0601L4.11019 9.55794L9.92807 3.74006C10.3203 3.34786 10.3203 2.71196 9.92807 2.31975L9.84191 2.23359C9.4497 1.84139 8.81381 1.84139 8.4216 2.2336L2.60372 8.05147Z" stroke="#303031" stroke-width="1.00431" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.60372 8.05282L2.10156 10.0614L4.11019 9.55929L9.13175 4.53772L7.62528 3.03125L2.60372 8.05282Z" fill="#303031" />
                        <path d="M7.625 3.03125L9.13147 4.53772" stroke="#303031" stroke-width="1.00431" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.625 10.0625H10.6423" stroke="#303031" stroke-width="1.00431" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <img src="https://picsum.photos/id/234/200/200" alt="" />
            </div>

            <div className="cursor-pointer text-[#303031] font-[500] flex items-center justify-center p-[12px] bg-[#EFB749] rounded-[8px]">
                Add New Product
            </div>
        </div>
    )
}

export default Modal;
import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { collection, addDoc, deleteDoc, getDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const InputField = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className="px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]"
    placeholder={placeholder}
  />
);
const Modal = ({ onClose, getProducts, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onCloseModel = () => {
    if (!id) {
      deleteImage();
    }
    setFormData({
      name: "",
      price: "",
      discount: "",
      detail: "",
      flavor: "",
      image: null,
    });
    onClose();
  };
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    detail: "",
    flavor: "",
    image: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const filesFolderRef = ref(
      storage,
      `inspireProductsImages/${file.name}${Date.now()}`
    );
    try {
      await uploadBytes(filesFolderRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        getDownloadURL(snapshot.ref).then((url) => {
          setFormData((prevData) => ({
            ...prevData,
            image: url,
          }));
        });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteImage = async () => {
    if (!formData.image) return;
    setIsLoading(true);
    const imageRef = ref(storage, formData.image);
    try {
      await deleteDoc(imageRef);
      setFormData((prevData) => ({
        ...prevData,
        image: null,
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteProduct = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      getProducts();
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const productRef = collection(db, "products");
      await addDoc(productRef, formData);
      getProducts();
      setFormData({
        name: "",
        price: "",
        detail: "",
        discount: "",
        flavor: "",
        image: null,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      enqueueSnackbar("An error occurred while processing the product", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    const { name, price, detail, discount, flavor, image } = formData;
    if (!name || !price || !detail || !discount || !flavor || !image) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return false;
    }
    return true;
  };
  useEffect(() => {
    const getSelectedProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        console.log("Document data:", docSnap.data());
      }
      setIsLoading(false);
    };
    getSelectedProduct();
  }, []);
  const showImage = formData.image;
  return (
    <div className="fixed flex p-[20px] bg-[#FFF] w-[800px] h-[700px] shadow-[0_4px_20px_1000px_rgba(0,0,0,0.6)] rounded-[10px] flex-col gap-[24px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="flex items-center justify-between">
        <span className="text-[#303031] font-[500] text-[28px]">
          Edit Product
          {id && (
            <i
              onClick={() => deleteProduct()}
              className="ri-delete-bin-line text-[#EFB749] text-[24px]"
            ></i>
          )}
        </span>
        {isLoading ? (
          <img
            src="https://miro.medium.com/v2/resize:fit:1104/1*pN5YHNX03fem8HWxnInQ3g.gif"
            alt="loader"
            className="w-[28px] h-[28px] object-cover border-0"
          />
        ) : (
          <i
            onClick={onCloseModel}
            className="text-[#303031] text-[24px] cursor-pointer ri-close-line"
          ></i>
        )}
      </div>
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <InputField
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <textarea
        name="detail"
        value={formData.detail}
        onChange={handleChange}
        className="px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px] h-[200px] resize-none"
        placeholder="detail"
      />
      <div className="flex items-center gap-[16px] w-full">
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className="w-full px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]"
          placeholder="Discount"
        />
        <input
          type="text"
          name="flavor"
          value={formData.flavor}
          onChange={handleChange}
          className="w-full px-[16px] py-[14px] text-[#303031] bg-[#F9FAFB] outline-none placeholder:text-[#303031] border-[1px] border-[#EDF2F6] rounded-[8px]"
          placeholder="Flavor Type"
        />
      </div>
      <div
        className={`flex items-center rounded-[10px] overflow-hidden w-fit relative min-w-[260px] min-h-[110px] max-w-[260px] ${
          !formData?.image
            ? " border-[2px] border-dashed rounded-[10px] p-[4px] "
            : ""
        }`}
      >
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute h-[100%] w-[100%] opacity-[0]"
        />
        <div
          className={`flex items-center gap-[8px] bg-[#EFB749] absolute  rounded-[10px] p-[4px] ${
            formData.image ? "top-2 right-2" : "top-[24%] right-[44%] "
          }`}
        >
          {formData?.image ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M2.60372 8.05147L2.10156 10.0601L4.11019 9.55794L9.92807 3.74006C10.3203 3.34786 10.3203 2.71196 9.92807 2.31975L9.84191 2.23359C9.4497 1.84139 8.81381 1.84139 8.4216 2.2336L2.60372 8.05147Z"
                  stroke="#303031"
                  stroke-width="1.00431"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.60372 8.05282L2.10156 10.0614L4.11019 9.55929L9.13175 4.53772L7.62528 3.03125L2.60372 8.05282Z"
                  fill="#303031"
                />
                <path
                  d="M7.625 3.03125L9.13147 4.53772"
                  stroke="#303031"
                  stroke-width="1.00431"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.625 10.0625H10.6423"
                  stroke="#303031"
                  stroke-width="1.00431"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </>
          ) : (
            <i class="ri-file-add-line text-[32px] font-[600] text-[#303031]"></i>
          )}
        </div>
        <img src={showImage} alt="" className="" />
      </div>
      <div
        className="cursor-pointer text-[#303031] font-[500] flex items-center justify-center p-[12px] bg-[#EFB749] rounded-[8px]"
        onClick={handleSubmit}
      >
        {isLoading ? "Loading..." : "Add New Product"}
      </div>
    </div>
  );
};

export default Modal;

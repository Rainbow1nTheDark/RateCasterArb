"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { NextPage } from "next";
import { useWriteContract } from "wagmi";
import { abi, contract_address } from "~~/contracts/contractCalls";

// Define the types for the Modal component props
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Add color constants at the top
// const colors = {
//   primary: "#0066CC",    // Strong blue
//   secondary: "#1E3A8A",  // Dark blue
//   accent: "#3B82F6",     // Bright blue
//   text: "#1E293B",       // Dark blue-gray
//   background: "#F0F7FF", // Very light blue
// };

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-base-100 border-2 border-[#0066CC] p-4 rounded-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-[#0066CC] font-bold hover:text-[#3B82F6]">
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const RegisterProject: NextPage = () => {
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    parsedUrl: "",
    imageURL: "",
    platform: "",
    category: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    const parseUrl = (url: string) => {
      try {
        const newUrl = new URL(url);
        let hostname = newUrl.hostname.replace("www.", "");
        hostname = hostname.substring(0, hostname.lastIndexOf("."));
        return hostname;
      } catch (error) {
        console.error("Invalid URL", error);
        return "";
      }
    };

    if (name === "url") {
      const parsed = parseUrl(value);
      setFormData(prev => ({
        ...prev,
        parsedUrl: parsed,
      }));
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const imageURL = formData.get("imageURL") as string;
    const description = formData.get("description") as string;
    const platform = formData.get("platform") as string;
    const category = formData.get("category") as string;

    await writeContract({
      address: contract_address,
      abi: abi,
      functionName: "registerDapp",
      args: [name, description, url, imageURL, platform, category],
    });

    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #1e293b !important;
        }
      `}</style>
      <h1 className="text-4xl font-bold text-[#0066CC] mb-6">Register New Dapp!</h1>
      <form onSubmit={submit} className="space-y-4 w-full max-w-md">
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Website:</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Image URL:</label>
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Platform:</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-[#1E293B]">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            required
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="bg-[#0066CC] hover:bg-[#1E3A8A] text-white font-bold py-2.5 px-4 mt-4 rounded-full transition-colors"
        >
          {isPending ? "Confirming..." : "Register"}
        </button>
      </form>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        {hash ? (
          <div>
            <p className="text-[#0066CC] font-bold">The Project is Registered!</p>
            <p className="text-[#1E293B]">Hash: {hash}</p>
          </div>
        ) : (
          <p className="text-[#0066CC] font-bold">Confirming Transaction</p>
        )}
      </Modal>
    </div>
  );
};

export default RegisterProject;

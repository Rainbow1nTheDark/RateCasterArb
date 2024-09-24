"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWriteContract } from "wagmi";
import { DappData, abi, contract_address, getDappByDappId } from "~~/contracts/contractCalls";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border-2 border-[#7e5bc2] p-4 rounded-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-[#7e5bc2] font-bold">
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const EditApp = () => {
  const searchParams = useSearchParams();
  const dappId = searchParams.get("dappId");
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [dappDetails, setDappDetails] = useState<DappData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getDappByDappId(dappId as `0x${string}`);
        if (result) {
          setDappDetails(result);
          setName(result.name);
          setDescription(result.description);
          setUrl(result.url);
          setImageUrl(result.imageUrl);
          setPlatform(result.platform);
          setCategory(result.category);
          setError("");
        } else {
          setError("No data returned");
        }
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    if (dappId) fetchData();
  }, [dappId]);

  const submitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dappDetails?.dappId) {
      await writeContract({
        address: contract_address,
        abi: abi,
        functionName: "updateDapp",
        args: [dappDetails.dappId as `0x${string}`, name, description, url, imageUrl, platform, category],
      });

      setIsModalVisible(true);
    } else {
      console.log(`Wrong ID: ${dappDetails?.dappId}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      <form onSubmit={submitEdit} className="space-y-4 w-full max-w-md">
        {dappDetails ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Edit{" "}
              <a
                href={dappDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7e5bc2] hover:underline"
              >
                {dappDetails.name.charAt(0).toUpperCase() + dappDetails.name.slice(1)}
              </a>
            </h1>
          </div>
        ) : (
          <p>DApp details not found.</p>
        )}

        {/* Name Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2]"
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2]"
          />
        </div>

        {/* URL Input (read-only) */}
        <div className="flex flex-col w-full">
          <label htmlFor="url" className="block mb-2">
            URL:
          </label>
          <input
            id="url"
            name="url"
            value={url}
            readOnly
            className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-100"
          />
        </div>

        {/* Image URL Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="imageUrl" className="block mb-2">
            Image URL:
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2]"
          />
        </div>

        {/* Platform Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="platform" className="block mb-2">
            Platform:
          </label>
          <input
            id="platform"
            name="platform"
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2]"
          />
        </div>

        {/* Category Input */}
        <div className="flex flex-col w-full">
          <label htmlFor="category" className="block mb-2">
            Category:
          </label>
          <input
            id="category"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            disabled={isPending}
            type="submit"
            className="mt-4 bg-[#7e5bc2] hover:bg-[#5e41a6] text-white font-bold py-2.5 px-4 rounded-full"
          >
            {isPending ? "Updating..." : "Update DApp"}
          </button>
        </div>
      </form>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        {hash ? (
          <div>
            <p className="text-green-500 font-bold">DApp Updated!</p>
            <p>Hash: {hash}</p>
          </div>
        ) : (
          <p className="text-yellow-500 font-bold">Processing Request</p>
        )}
      </Modal>
    </div>
  );
};

export default EditApp;

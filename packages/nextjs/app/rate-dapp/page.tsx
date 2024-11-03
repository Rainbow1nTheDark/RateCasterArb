"use client";

import React, { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { readContract } from "@wagmi/core";
import { useWriteContract } from "wagmi";
import { CHAIN_ID, config } from "~~/contracts/defaultSettings";
import deployedContracts from "~~/contracts/deployedContracts";
import { DappRegistered } from "~~/utils/graphQL/fetchFromSubgraph";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const colors = {
  primary: "#0066CC", // Strong blue
  secondary: "#1E3A8A", // Dark blue
  accent: "#3B82F6", // Bright blue
  text: "#1E293B", // Dark blue-gray
  background: "#F0F7FF", // Very light blue
};

async function getDappByDappId(dappId: string): Promise<DappRegistered> {
  const contract_address = deployedContracts[CHAIN_ID].DappRatingSystem.address;
  const abi = deployedContracts[CHAIN_ID].DappRatingSystem.abi;
  const dappData = await readContract(config, {
    address: contract_address,
    abi,
    functionName: "getDapp",
    args: [dappId as `0x${string}`],
  });
  return dappData;
}

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

const RateDappContent = () => {
  const searchParams = useSearchParams();
  const dappId = searchParams.get("dappId");
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [dappDetails, setDappDetails] = useState<DappRegistered | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getDappByDappId(dappId as string);
        if (result) {
          setDappDetails(result);
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

  const submitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dappDetails?.dappId) {
      await writeContract({
        address: deployedContracts[CHAIN_ID].DappRatingSystem.address,
        abi: deployedContracts[CHAIN_ID].DappRatingSystem.abi,
        functionName: "addDappRating",
        args: [dappDetails.dappId as `0x${string}`, rating, comment],
      });
      setIsModalVisible(true);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      <form onSubmit={submitReview} className="space-y-4 w-full max-w-md">
        {dappDetails ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-[#1E3A8A]">
              Review{" "}
              <a
                href={dappDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066CC] hover:text-[#3B82F6] transition-colors"
              >
                {dappDetails.name.charAt(0).toUpperCase() + dappDetails.name.slice(1)}
              </a>
            </h1>
            <p className="mb-4 text-[#1E293B]">{dappDetails.description}</p>
          </div>
        ) : (
          <p className="text-[#1E293B]">DApp details not found.</p>
        )}

        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className="h-16 w-16 rounded-full text-3xl leading-none transition-colors"
              style={{ color: rating > index ? colors.primary : colors.secondary }}
            >
              ★
            </button>
          ))}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="comment" className="block mb-2 text-[#1E293B]">
            Comment (optional):
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#0066CC] text-[#1E293B] rounded-md"
            placeholder="Add your comment here..."
          />
        </div>

        <div className="flex justify-center">
          <button
            disabled={isPending}
            type="submit"
            className="mt-4 bg-[#0066CC] hover:bg-[#3B82F6] text-white font-bold py-2.5 px-4 rounded-full transition-colors disabled:bg-gray-400"
          >
            {isPending ? "Sending..." : "Submit Review"}
          </button>
        </div>
      </form>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        {hash ? (
          <div>
            <p className="text-[#0066CC] font-bold">Review Submitted!</p>
            <p className="text-[#1E293B]">Hash: {hash}</p>
          </div>
        ) : (
          <p className="text-[#0066CC] font-bold">Processing Request</p>
        )}
      </Modal>
    </div>
  );
};

const RateDapp = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <RateDappContent />
    </Suspense>
  );
};

export default RateDapp;

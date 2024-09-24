"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { DappData, getAllDapps } from "~~/contracts/contractCalls";

const EditApp = () => {
  const [dapps, setDapps] = useState<DappData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        setLoading(true);

        // Fetch all dapps
        const dappData = await getAllDapps();
        console.log("Fetched dapps:", dappData);

        if (dappData) {
          if (isConnected && address) {
            const userDapps = dappData.filter(dapp => dapp.owner.toLowerCase() === address.toLowerCase());
            setDapps(userDapps);
          } else {
            setDapps(dappData); // Set all dapps if not connected
          }
        } else {
          setError("No DApp data returned");
        }
      } catch (err) {
        setError("An error occurred while fetching DApp data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, isConnected]);

  const handleEdit = (dappId: string) => {
    console.log(`Editing dapp with ID: ${dappId}`);
    router.push(`/edit/app?dappId=${dappId}`);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center pt-10 w-full">
        <p>Please connect your wallet to view and edit your registered apps.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Your Registered Apps</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : dapps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dapps.map(dapp => (
            <div key={dapp.dappId} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{dapp.name}</h2>
              <p className="mb-2">{dapp.description}</p>
              <p className="mb-2">
                <strong>Platform:</strong> {dapp.platform}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {dapp.category}
              </p>
              <a
                href={dapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mb-2 block"
              >
                Visit Site
              </a>
              <button
                onClick={() => handleEdit(dapp.dappId)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven&apos;t registered any apps yet.</p>
      )}
    </div>
  );
};

export default EditApp;

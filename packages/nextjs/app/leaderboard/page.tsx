"use client";

import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import "./page.css";
import type { NextPage } from "next";

type LeaderboardEntry = {
  fid: number;
  total_score: number;
  username?: string;
};

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
  totalPages: number;
  currentPage: number;
};

const Leaderboard: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);

  const getLeaderboardData = async () => {
    try {
      const url = process.env.FRAMES_API_URL || "http://localhost:3000/api/leaderboard";
      console.log("Fetching data from URL:", url); // Log the URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: LeaderboardResponse = await response.json();
      const leaderboardWithUsernames = await Promise.all(
        data.leaderboard.map(async entry => {
          const userResponse = await fetch(`https://api.warpcast.com/v2/user?fid=${entry.fid}`);
          const userData = await userResponse.json();
          return { ...entry, username: userData.result.user.username };
        }),
      );
      setLeaderboardData(leaderboardWithUsernames);
      setFilteredData(leaderboardWithUsernames);
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error);
    }
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredData(leaderboardData);
    } else {
      setFilteredData(leaderboardData.filter(item => item.username?.toLowerCase().includes(term.toLowerCase())));
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      <h1 className="text-4xl font-bold text-[#7e5bc2] mb-6">Leaderboard</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by username"
        className="w-full max-w-md px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-[#7e5bc2] mb-6"
      />
      <div className="w-full max-w-md space-y-4">
        {filteredData.map((item, index) => (
          <div key={index} className="flex justify-between p-4 border-2 border-gray-300 rounded-lg">
            <span className="font-bold text-purple">{index + 1}</span>
            <span className="font-bold text-purple">{item.username || item.fid}</span>
            <span className="font-bold text-purple">{item.total_score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

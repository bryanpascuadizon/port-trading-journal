"use client";

import { useParams } from "next/navigation";

const Dashboard = () => {
  const params = useParams();
  return (
    <div>
      <h1 className="portfolio-title">Dashboard</h1>
      <p>{params.portfolioId}</p>
    </div>
  );
};

export default Dashboard;

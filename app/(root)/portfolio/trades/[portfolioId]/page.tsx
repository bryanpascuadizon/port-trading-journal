"use client";

import { useParams } from "next/navigation";

const Trades = () => {
  const params = useParams();
  return (
    <div>
      <h1 className="portfolio-title">Trades</h1>
      <p>{params.portfolioId}</p>
    </div>
  );
};

export default Trades;

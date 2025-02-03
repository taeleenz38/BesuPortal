"use client";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LinkIcon from "@mui/icons-material/Link";

interface Transaction {
  id: number;
  transactionType: string;
  amount: string;
  date: Date;
  type: string;
  status: string;
}

interface Props {
  transactions: Transaction[];
}

const WalletTransactionHistory: React.FC<Props> = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const itemsPerPage = 3;

  // Check if transactions are available before filtering
  const filteredTransactions = transactions
    ? transactions
        .filter(
          (transaction) => !selectedType || transaction.type === selectedType
        )
        .filter((transaction) => !startDate || transaction.date >= startDate)
        .filter((transaction) => !endDate || transaction.date <= endDate)
    : [];

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedType(event.target.value !== "All" ? event.target.value : null);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  return (
    <>
      <div className="w-full bg-white p-10 mt-8 rounded-2xl shadow-sm">
        <div className="font-bold text-2xl mb-8">Transaction History</div>
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left bg-[#F5F5F8] text-[#767189] text-lg h-14">
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {paginatedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="h-14 text-[#3d3651] text-md font-normal"
              >
                <td className="border-t-0 flex">
                  <LinkIcon />{" "}
                  <p className="ml-3">{transaction.transactionType}</p>
                </td>
                <td>{transaction.amount}</td>
                <td>{transaction.date.toDateString()}</td>
                <td>{transaction.type}</td>
                <td className="font-bold">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full h-14 flex justify-end items-center text-[#0f62fe]">
        <button
          className="mr-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              className="mr-2"
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </>
  );
};

export default WalletTransactionHistory;

import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LinkIcon from "@mui/icons-material/Link";

interface Transaction {
  id: number;
  transactionType: string;
  amount: string;
  currency: string;
  date: Date;
  type: string;
  status: string;
}

interface Props {
  transactions: Transaction[];
}

const TabTable: React.FC<Props> = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const itemsPerPage = 4;

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
      <div className="w-full bg-white p-2 xl:p-4 xl:mt-8 rounded-2xl shadow-sm z-10">
        <div className="flex justify-end items-center">
          <div className="text-lg font-normal border-[2px] rounded-xl p-2 h-12 mr-4 hidden xl:block">
            <label className="text-lg" htmlFor="startdate">
              Date Range
            </label>
            :
            <input
              type="date"
              id="startdate"
              name="startdate"
              onChange={handleStartDateChange}
            />
            ~
            <input
              type="date"
              id="enddate"
              name="enddate"
              onChange={handleEndDateChange}
            />
          </div>
          <select
            className="bg-white text-md xl:text-lg border-[2px] rounded-xl p-2 h-9 xl:h-12"
            onChange={handleTypeFilterChange}
          >
            <option value="All">All Types</option>
            <option value="Blockchain Wallet">Blockchain Wallet</option>
            <option value="Bank Wire">Bank Wire</option>
          </select>
        </div>
        <table className="hidden xl:table w-full mt-4 table-fixed">
          <thead>
            <tr className="text-left bg-[#F5F5F8] text-[#767189] text-lg h-14">
              <th className="w-1/6 px-4">Transaction Type</th>
              <th className="w-1/6 px-4">Amount</th>
              <th className="w-1/6 px-4">Currency</th>
              <th className="w-1/6 px-4">Date</th>
              <th className="w-1/6 px-4">Type</th>
              <th className="w-1/6 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="h-14 text-[#3d3651] text-md font-normal"
              >
                <td className="w-1/6 px-4 flex items-center">
                  <LinkIcon className="mr-2" />
                  <p>{transaction.transactionType}</p>
                </td>
                <td className="w-1/6 px-4">{transaction.amount}</td>
                <td className="w-1/6 px-4">{transaction.currency}</td>
                <td className="w-1/6 px-4">{transaction.date.toDateString()}</td>
                <td className="w-1/6 px-4">{transaction.type}</td>
                <td className="w-1/6 px-4 font-bold">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="xl:hidden w-full mt-2">
          <thead>
            <tr className="text-left bg-[#F5F5F8] text-[#767189] text-md h-14">
              <th className="w-1/3 px-4">Type</th>
              <th className="w-1/3 px-4">Amount</th>
              <th className="w-1/3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="h-14 text-[#3d3651] text-md font-normal"
              >
                <td className="w-1/3 px-4">{transaction.transactionType}</td>
                <td className="w-1/3 px-4">{transaction.amount}</td>
                <td className="w-1/3 px-4 font-bold">{transaction.status}</td>
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
              className={`mr-2 ${currentPage === page ? "font-bold" : ""}`}
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

export default TabTable;

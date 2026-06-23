import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import {
  CATEGORY_COLORS,
  formatExpenseDate,
} from "../utils/expenseCategories";

function TransactionLog() {
  const location = useLocation();
  const [usernames, setUsernames] = useState([]);
  const [trip, setTrip] = useState([]);
  const tripcode = location.state.tripcode;

  const navigate = useNavigate();
  const tripdata = { trip };
  const handleBack = () => {
    navigate(`/finaltrip/${tripcode}`, {
      replace: true,
      state: { tripData: tripdata },
    });
  };
  const [transactionlog, setTransactionlog] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${getApiBaseUrl()}/transaction/finalise`, {
          params: { tripcode: tripcode },
        })
        .then((response) => {
          setTransactionlog(response.data.transactionlog);
          setUsernames(response.data.tripp.usernames);
          setTrip(response.data.tripp);
        });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [tripcode]);

  const sortedTimeline = [...transactionlog].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const getCategoryBadge = (category) => {
    const cat = category || "Other";
    const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;
    return (
      <span
        className={`${color} text-white text-xs px-2 py-1 rounded-full`}
      >
        {cat}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h2 className="text-2xl font-bold text-center mb-2">Expense Timeline</h2>
      <p className="text-center text-gray-400 mb-6">
        All expenses for this trip, newest first
      </p>

      {sortedTimeline.length === 0 ? (
        <div className="text-center py-12 rounded-2xl dark:bg-slate-800 border dark:border-slate-700">
          <p className="text-lg text-gray-400">No expenses yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Add your first expense from the trip page
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          {sortedTimeline.map((transaction) => (
            <div
              key={transaction._id}
              className="flex gap-4 p-4 rounded-xl dark:bg-slate-800 border dark:border-slate-700 shadow-md"
            >
              <div className="flex-shrink-0 w-2 rounded-full bg-[#1a43bf]" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold">{transaction.entry_by}</span>
                  <span className="text-gray-400">added</span>
                  <span className="font-bold text-green-400">
                    ₹{Number(transaction.amount).toFixed(2)}
                  </span>
                  {getCategoryBadge(transaction.category)}
                </div>
                <p className="text-gray-300 mb-1">{transaction.comment}</p>
                <p className="text-xs text-gray-500">
                  {formatExpenseDate(transaction.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold text-center mb-4">Detailed Log</h3>
      <div className="flex flex-col rounded-2xl p-6 text-center bg-red dark:bg-slate-800 shadow-xl border dark:border-slate-800">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entry by
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    {usernames.map((elt) => (
                      <th
                        key={elt}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {elt}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionlog.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatExpenseDate(transaction.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.entry_by}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(transaction.category)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rs. {transaction.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.comment}
                        </div>
                      </td>
                      {usernames.map((user) => (
                        <td key={user} className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-[-2rem] w-[10rem] flex space-betweeen">
                            <div className="w-[5rem]">
                              {transaction.whopaid.map((elt) => {
                                if (elt.username === user) {
                                  return (
                                    <span
                                      className="text-[green]"
                                      key={elt.username}
                                    >
                                      {"+" + elt.amount.toFixed(2)}
                                    </span>
                                  );
                                }
                                return null;
                              })}
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="w-[5rem]">
                              {transaction.split.map((elt) => {
                                if (elt.username === user) {
                                  return (
                                    <span
                                      className="text-[red]"
                                      key={elt.username}
                                    >
                                      {-elt.amount.toFixed(2)}
                                    </span>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto relative">
        <button
          onClick={handleBack}
          className="absolute w-[5rem] bg-[#1a43bf] text-white px-3 py-2 rounded-md mt-[10px] duration-300 right-0"
        >
          Back
        </button>
      </div>
    </div>
  );
}
export default TransactionLog;

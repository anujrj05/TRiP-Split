import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getApiBaseUrl } from "../utils/apiBaseUrl";
import { getApiErrorMessage } from "../utils/apiErrorMessage";

function JoinTripByLink() {
  const { tripcode } = useParams();
  const navigate = useNavigate();
  const [tripName, setTripName] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    axios
      .get(`${getApiBaseUrl()}/trip/preview`, { params: { tripcode } })
      .then((res) => {
        setTripName(res.data.tripname);
      })
      .catch(() => {
        toast.error("Invalid or expired trip link");
        navigate("/jointrip", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [tripcode, navigate]);

  const handleJoin = async () => {
    const authUser = JSON.parse(localStorage.getItem("Users") || "null");
    if (!authUser?.username) {
      navigate("/signup", { state: { from: { pathname: `/join/${tripcode}` } } });
      return;
    }

    setJoining(true);
    try {
      const res = await axios.post(`${getApiBaseUrl()}/trip/jointrip`, {
        tripcode,
        username: authUser.username,
      });
      if (res.data) {
        toast.success("Trip joined successfully!");
        localStorage.setItem("Trips", JSON.stringify(res.data.trip));
        navigate("/Mytrips", { replace: true });
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not join trip"));
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Loading trip...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-24">
      <div className="w-[320px] m-auto rounded-2xl p-6 text-center bg-red dark:bg-slate-800 shadow-md border dark:border-slate-800">
        <h2 className="text-xl font-semibold mb-2">Join Trip</h2>
        <p className="text-gray-400 mb-1">You&apos;ve been invited to</p>
        <p className="text-2xl font-bold mb-4">{tripName}</p>
        <p className="text-sm text-gray-500 mb-6">Code: {tripcode}</p>
        <button
          type="button"
          onClick={handleJoin}
          disabled={joining}
          className="w-full bg-[#1a43bf] text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 disabled:opacity-60"
        >
          {joining ? "Joining..." : "Join This Trip"}
        </button>
      </div>
    </div>
  );
}

export default JoinTripByLink;

export const EXPENSE_CATEGORIES = [
  "Food",
  "Travel",
  "Hotel",
  "Shopping",
  "Other",
];

export const CATEGORY_COLORS = {
  Food: "bg-orange-500",
  Travel: "bg-blue-500",
  Hotel: "bg-purple-500",
  Shopping: "bg-pink-500",
  Other: "bg-gray-500",
};

export const formatExpenseDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getInviteLink = (tripcode) =>
  `${window.location.origin}/join/${tripcode}`;

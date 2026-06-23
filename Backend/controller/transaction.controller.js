import Transaction from "../model/transaction.model.js";
import Trip from "../model/trip.model.js";
import { DEFAULT_EXPENSE_CATEGORY } from "../constants/expenseCategories.js";

export const transaction = async (req, res) => {
  try {
    const { entry_by, amount, comment, tripcode, whopaid, split, category } =
      req.body;

    const createdtransaction = new Transaction({
      entry_by,
      amount,
      comment,
      category: category || DEFAULT_EXPENSE_CATEGORY,
      tripcode,
      whopaid,
      split,
    });
    await createdtransaction.save();

    const updateTrip = async (tripcode, amount, whopaid, split) => {
      try {
        const trip = await Trip.findOne({ tripcode });
        if (!trip) {
          throw new Error("Trip not found");
        }

        await trip.updateOverallExpenditure(amount);

        for (let i = 0; i < whopaid.length; i++) {
          await trip.updateIndividualExpenditure(
            whopaid[i].username,
            whopaid[i].amount
          );
        }

        for (let i = 0; i < split.length; i++) {
          await trip.updateExpenditurePerPerson(split[i].username, split[i].amount);
        }
      } catch (error) {
        console.error("Error updating trip:", error.message);
        throw error;
      }
    };

    await updateTrip(tripcode, amount, whopaid, split);

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: createdtransaction,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

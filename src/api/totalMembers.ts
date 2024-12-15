import express, { Request, Response } from "express";
import { db } from "../config/firebase";

const router = express.Router();

/**
 * POST /get-total-members
 * Get the total number of members in the database.
 */
router.post("/get-total-members", async (req: Request, res: Response) => {
  // Validate origin
  const origin = req.get("origin");
  if (origin !== "https://algoadoptairdrop.vercel.app") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  try {
    // Query the Firestore `users` collection
    const usersSnapshot = await db.collection("users").get();

    // Get the count of documents (users)
    const totalMembers = usersSnapshot.size;

    // Send the response with the total member count
    res.status(200).json({ totalMembers });
  } catch (error) {
    console.error("Error fetching total members:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
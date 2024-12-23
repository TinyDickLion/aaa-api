import { algoIndexerClient } from "../config";

export const verifyFeeTX = async (walletAddress: string, txId: string) => {
  const expectedAmount = 500000; // 0.5 Algo in microAlgos
  const expectedRecipient =
    "SJDMEUSIKIU4LIJIMH4F7ZVMJOGF6PO4RNTPLISOVBLG6LOPG4HMWGVIKU"; // Replace with your recipient wallet address

  try {
    // Fetch transaction details from the indexer
    const transactionInfo = await algoIndexerClient.lookupTransactionByID(txId).do();

    // Verify sender, recipient, and amount
    const sender = transactionInfo.transaction.sender;
    const recipient = transactionInfo.transaction["payment-transaction"]?.receiver;
    const amount = transactionInfo.transaction["payment-transaction"]?.amount;

    if (
      sender === walletAddress &&
      recipient === expectedRecipient &&
      amount === expectedAmount
    ) {
      return true; // Transaction verified
    }

    return false; // Transaction details do not match
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return false;
  }
};
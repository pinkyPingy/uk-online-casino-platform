import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformPostView(betData: any) {

  return {
    id: betData[0].toString(), // Convert BigInt to string
    matchId: betData[1].toString(),
    homeHandicapScore: Number(betData[2]), // Convert to number if needed
    awayHandicapScore: Number(betData[3]),
    totalStake: Number(betData[4]), // Convert BigInt to number
    myStake: Number(betData[5]),
    totalBet: betData[6], // Assuming this is a custom object, handle accordingly
    myBet: betData[7], // Handle similarly to totalBet
    isInitialized: betData[8],
    isFinished: betData[9],
    isAlreadyMadeABet: betData[10],
    playerRewardClaimed: betData[11],
    bankerRewardClaimed: betData[12],
    home: betData[13],
    away: betData[14],
    // isClaimed: betData[13], // Assuming `isClaimed` is at index 13 in the data
  };
}
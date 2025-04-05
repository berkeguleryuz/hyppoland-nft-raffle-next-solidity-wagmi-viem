"use client";
import {
  Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
  Hyppoland_FREE_NFT_CONTRACT_ABI,
} from "@/constants/contractHyppoland";
import { Fragment, useEffect, useState } from "react";
import { formatEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { MotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// export async function getDatafromdb() {
//   // send post request to /api/query
//   const response = await fetch("/api/query", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       querytype: "ticket",
//       query: "FreeBase",
//     }),
//   });
//   const data = await response.json();
//   return data.ticket;
// }

// export async function getDatafromdbwinner() {
//   // send post request to /api/query
//   const response = await fetch("/api/query", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       querytype: "winner",
//       query: "FreeBase",
//     }),
//   });

//   const data = await response.json();
//   return data.winner;
// }

export const OcwFreeBase = () => {
  const { address } = useAccount();
  const [players, setPlayers] = useState<
    {
      player: string;
      contractType: string;
      numberOfEntries: number;
    }[]
  >([]);
  const [winners, setWinners] = useState<
    {
      winner: string;
      contractType: string;
      prizeAmount: number;
      rewardToken: string;
    }[]
  >([]);
  const [giveaway, setGiveaway] = useState<
    {
      player: string;
      numberOfEntries: number;
    }[]
  >([]);

  function truncateAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  const [ticketAmount, setTicketAmount] = useState<number>(1);

  const {
    data: hash,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Your transaction has been submitted",
          duration: 3000,
        });
      },
      onError: (error) => {
        const partToShow = error.message
          .split(/Contract Call:|Request Arguments:/)[0]
          .trim();
        toast({
          title: "OCW: Your transaction failed." + partToShow,
          duration: 5000,
        });
      },
    },
  });

  const buyTicket = async () => {
    writeContract({
      abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
      address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
      account: address,
      functionName: "getFreeTicket",
      gas: BigInt(2000000),
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { data: prizeAmount } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "prizeAmount",
  });

  const { data: ticketsSoldThisRound, refetch } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "ticketsSoldThisRound",
  });

  const { data: raffleStatus, refetch: refetchStatus } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "raffleStatus",
  });

  useEffect(() => {
    if (isConfirmed) {
      toast("You have successfully bought a ticket!");

      refetch();
      refetchStatus();
    }
  }, []);

  const prize = prizeAmount ? formatEther(prizeAmount as bigint) : "0";
  const ticketsSold = ticketsSoldThisRound ? ticketsSoldThisRound : "0";

  const isActive = raffleStatus ? "Active" : "Not Active";

  const { data: getRemainingTimeMinutes } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "getRemainingTimeMin",
  });

  const { data: getRaffleStartDuration } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "getRaffleStartDuration",
  });

  const { data: hasEntered } = useReadContract({
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
    functionName: "hasEntered",
    args: [address],
  });

  const getRemainingMinutes =
    typeof getRemainingTimeMinutes === "number"
      ? getRemainingTimeMinutes
      : Number(getRemainingTimeMinutes);

  const raffleDuration =
    typeof getRaffleStartDuration === "number"
      ? getRaffleStartDuration
      : Number(getRaffleStartDuration);

  const getRemainingTime = getRemainingTimeMinutes
    ? (getRemainingTimeMinutes as number)
    : "0";

  const soldTicketsNumber: number =
    typeof ticketsSold === "bigint"
      ? Number(ticketsSold)
      : (ticketsSold as number);

  const perTicket = hasEntered ? 1 : 0;

  const perTicketNumber: number = parseFloat(perTicket.toString());
  const calculateChange: number = (perTicketNumber / soldTicketsNumber) * 100;

  const progressValue = raffleStatus
    ? Math.floor(
        ((raffleDuration - getRemainingMinutes) / raffleDuration) * 100 - 1,
      )
    : ((raffleDuration - getRemainingMinutes) / raffleDuration) * 100;

  return (
    <div className="min-h-screen px-4 py-12 text-zinc-50">
      <div className="flex items-center gap-2 text-center flex-row justify-center">
        <FcDisplay className="w-10 h-10" />
        <h1 className="text-black dark:text-white text-2xl font-bold font-sans">
          OCW Raffle 2 Base
        </h1>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4">
        <Block className="col-span-12 row-span-2 md:col-span-6 justify-between flex flex-col">
          <div className="font-bold">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Total Prize
            </p>
            <p className="my-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {prize} ETH
            </p>
          </div>
          <div className="text-lg text-blue-400">
            {!raffleStatus && (getRemainingTime as number) < 1 ? (
              <div className="text-orange-300">Raffle Ended</div>
            ) : (
              <div className="text-orange-300"> </div>
            )}
          </div>
          {/* <a
            href="#"
            className="flex items-center gap-1 text-red-300 hover:underline">
            Contact me <FiArrowRight />
          </a> */}
        </Block>

        {/* Sağ 4 */}

        <Block
          whileHover={{
            rotate: "0deg",
            scale: 1.01,
          }}
          className="col-span-6 bg-blue-400 md:col-span-3">
          <h1 className="text-lg font-medium">Ticket Cost:</h1>
          <h2 className="font-bold text-sm mt-1">FREE</h2>
        </Block>
        <Block
          whileHover={{
            rotate: "-0.2deg",
            scale: 1.01,
          }}
          className="col-span-6 bg-green-600 md:col-span-3">
          <div className="text-lg font-medium">
            Sold Tickets: {ticketsSold?.toString()}
          </div>

          <div className="font-bold">
            Status:{" "}
            <span className={raffleStatus ? "text-lime-300" : "text-red-500"}>
              {isActive}
            </span>
          </div>
        </Block>

        <Block
          whileHover={{
            rotate: "+2.5deg",
            scale: 1.05,
          }}
          className="col-span-12 bg-zinc-500 md:col-span-6">
          {raffleStatus && (getRemainingTime as number) > 1 ? (
            <div>
              <p className="mb-2">Raffle Ends in:</p>
              <CountdownMinutes minutes={getRemainingMinutes} />
            </div>
          ) : (
            ""
          )}
          {!raffleStatus && (getRemainingTime as number) < 1 ? (
            <div className="">
              <p className="mb-2">Next Raffle Starts in:</p>
              <ShiftingCountdown2 endDate={countdownDates[0]} text="days" />
            </div>
          ) : (
            <Fragment></Fragment>
          )}
          <div>
            {raffleStatus && (getRemainingTime as number) < 2 ? (
              "Last ticket(s)"
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </Block>
        {/* <Block
          whileHover={{
            rotate: "2.5deg",
            scale: 1.1,
          }}
          className="col-span-6 bg-blue-500 md:col-span-3"></Block> */}

        {/* Big area */}
        <Block className="col-span-12 flex flex-col justify-between md:col-span-12 text-center items-center">
          <div className="text-2xl m-3 font-extrabold border-blue-100">
            Buy Tickets
          </div>
          <div className="">
            {address ? (
              <Fragment>
                <div className="w-[400px] flex flex-row justify-center">
                  <span className="w-4/12 flex flex-col border-b-2 font-bold font-mono text-center rounded-sm items-center self-center">
                    ⌇ {ticketAmount} ⌇
                  </span>
                </div>
                <Button
                  variant={"outline"}
                  className="md:w-[400px] max-md:w-[240px] mt-3 text-white bg-zinc-700 hover:bg-zinc-400"
                  disabled={isPending || !address}
                  onClick={() => {
                    buyTicket();
                    setTicketAmount(1);
                  }}>{`Buy Ticket(s)`}</Button>
              </Fragment>
            ) : (
              <p className="mt-2">Please connect your wallet to buy ticket!</p>
            )}
          </div>
        </Block>

        {/* My Tickets area */}

        <Block className="col-span-5 md:col-span-5 flex flex-col items-center text-center justify-center">
          <p className="text-lg mb-3">My Tickets:</p>
          <span className="text-5xl text-orange-400 border p-4 ">
            {hasEntered ? "1" : "0"}
          </span>
          <span className="">
            {isNaN(calculateChange) ? "" : "Change to win"}
          </span>
          <span className="font-bold text-lg">
            {isNaN(calculateChange) ? "" : calculateChange.toFixed(2) + "%"}
          </span>
        </Block>

        {/* Buy Ticket area */}
        <Block className="col-span-7 md:col-span-7 text-3xl flex flex-col items-center text-center leading-snug">
          <p className="text-orange-400">Progress</p>
          <ProgOCW percentage={progressValue} colour="orange" />
          {/* <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "max-w-4xl",
              track: "drop-shadow-md border border-orange-400 rounded-xl",
              indicator: "bg-gradient-to-r from-orange-700 to-orange-500",
              label: "tracking-wider font-medium text-default-600",
              value: "text-orange-400",
            }}
            label="Progress"
            value={progressValue}
            showValueLabel={true}
          /> */}
        </Block>

        {/* Raffle P&W */}

        <Block className="col-span-12 flex flex-col md:col-span-6 text-center items-center">
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary flex flex-col mt-10 relative">
              <div className="h-[2.4rem] w-[10.5rem] bg-base-300 absolute self-end rounded-t-3xl -top-[38px] -right-[30px] sm:right-[27px] -z-10 py-[0.65rem] bg-orange-200 shadow-lg shadow-base-300">
                <p className="my-0 text-sm text-orange-700 font-bold text-center">
                  Players
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 relative flex max-w-[500px] h-auto w-full flex-col self-center bg-center bg-orange-400 rounded-b-3xl hover:shadow-xl hover:shadow-orange-600/20 rounded-e-3xl">
            <table className="table-fixed w-full text-white">
              <thead>
                <tr className="">
                  <th className="w-2/5 text-sm">Player Address</th>
                  <th className="w-1/5 text-sm">Ticket Entry</th>
                </tr>
              </thead>
              <tbody className="max-md:text-sm">
                {[...players].reverse().map((play, index) => (
                  <tr key={index} className="hover:opacity-80">
                    <td className="border px-4 text-center py-2">
                      {truncateAddress(play.player)}
                    </td>
                    <td className="border px-4 py-2 text-center">1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block className="col-span-12 flex flex-col md:col-span-6 text-center items-center">
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary flex flex-col mt-10 relative">
              <div className="h-[2.4rem] w-[10.5rem] bg-base-300 absolute self-start rounded-t-3xl -top-[38px] -left-[30px] sm:left-[27px] -z-10 py-[0.65rem] bg-gray-300 ">
                <p className="my-0 text-sm text-gray-800 font-bold text-center">
                  Winners
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 relative flex max-w-[500px] h-auto w-full flex-col self-center bg-center bg-white rounded-b-3xl hover:shadow-xl hover:shadow-orange-600/20 rounded-l-3xl">
            <table className="table-fixed w-full text-black">
              <thead>
                <tr className="hover:opacity-80 hover:font-bold">
                  <th className="w-2/6 text-sm">Winner Address</th>
                  <th className="w-2/6 text-sm">Prize</th>
                </tr>
              </thead>
              <tbody className="max-md:text-sm text-black">
                {[...winners].reverse().map((win, index) => (
                  <tr key={index} className="hover:opacity-80">
                    <td className="border px-4 text-center py-2">
                      {truncateAddress(win.winner)}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {win.contractType === "FreeBase" &&
                      win.rewardToken === "100USDC"
                        ? "100 USDC"
                        : `${parseFloat(
                            formatEther(win.prizeAmount as any),
                          ).toFixed(6)} ETH`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>
      </motion.div>
    </div>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={cn(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-900 p-6",
        className,
      )}
      {...rest}
    />
  );
};

export default OcwFreeBase;

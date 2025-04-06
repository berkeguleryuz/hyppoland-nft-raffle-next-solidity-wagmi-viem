import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function NFTRaffleGuide() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(175,255,129,0.1),transparent_70%)]"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#AFFF81] mb-6">
              NFT Raffle Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A complete guide to participating in NFT raffles on HyppoLand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  What is the NFT Raffle?
                </h2>
                <p className="text-gray-300 mb-4">
                  The NFT Raffle is an exciting opportunity to win exclusive
                  NFTs by purchasing raffle tickets with HYPE. Each ticket gives
                  you a chance to win, and you can purchase multiple tickets to
                  increase your odds.
                </p>
                <p className="text-gray-300">
                  Our smart contracts ensure that the raffles are fair and
                  transparent, with winners selected randomly when the raffle
                  period ends. All NFT prizes are automatically distributed to
                  the winners.
                </p>
              </section>

              <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  How to Participate
                </h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-[#AFFF81]/10 p-4 rounded-lg flex items-center justify-center min-w-16">
                      <span className="text-[#AFFF81] text-2xl font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Connect Your Wallet
                      </h3>
                      <p className="text-gray-300">
                        Connect your wallet to our platform. Make sure you have
                        enough HYPE for ticket purchases and gas fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-[#AFFF81]/10 p-4 rounded-lg flex items-center justify-center min-w-16">
                      <span className="text-[#AFFF81] text-2xl font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Purchase Tickets
                      </h3>
                      <p className="text-gray-300">
                        Navigate to the Weekly NFT Raffle section and select how
                        many tickets you want to buy. Each ticket has a fixed
                        price displayed on the raffle card.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-[#AFFF81]/10 p-4 rounded-lg flex items-center justify-center min-w-16">
                      <span className="text-[#AFFF81] text-2xl font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Confirm Transaction
                      </h3>
                      <p className="text-gray-300">
                        Confirm the transaction in your wallet. Once the
                        transaction is complete, your tickets will be registered
                        in the raffle.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="bg-[#AFFF81]/10 p-4 rounded-lg flex items-center justify-center min-w-16">
                      <span className="text-[#AFFF81] text-2xl font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Wait for the Results
                      </h3>
                      <p className="text-gray-300">
                        When the raffle period ends, winners are automatically
                        selected and NFTs are distributed. If you win, the NFT
                        will appear in your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  NFT Raffle Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white">
                      Multiple Entries
                    </h3>
                    <p className="text-gray-300">
                      You can purchase as many tickets as you want to increase
                      your chances of winning. Each ticket represents one entry
                      in the raffle.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white">
                      Transparent Selection
                    </h3>
                    <p className="text-gray-300">
                      Winners are selected using a verifiable random function in
                      our smart contracts, ensuring fair and manipulaton-proof
                      results. You can see the results on the explorer.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white">
                      Automatic Distribution
                    </h3>
                    <p className="text-gray-300">
                      When you win, NFTs are automatically sent to your wallet
                      address. No manual claiming required.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  Raffle Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Ticket Price
                    </h3>
                    <p className="text-gray-300">
                      You can see the price on the raffle card.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Prize NFT Collection
                    </h3>
                    <p className="text-gray-300">HyppoLand NFTs</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Raffle Duration
                    </h3>
                    <p className="text-gray-300">
                      Will be updated in the future.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Winner Selection
                    </h3>
                    <p className="text-gray-300">
                      Automatic at end of period with last ticket.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium text-white mb-3">
                    Ready to participate?
                  </h3>
                  <Button
                    asChild
                    className="w-full bg-[#AFFF81] text-black hover:bg-[#AFFF81]/90">
                    <Link href="/#raffles">Buy Raffle Tickets</Link>
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#AFFF81]/50 bg-black text-[#AFFF81] hover:text-[#AFFF81]/90 hover:bg-[#AFFF81]/10">
                    <Link href="/free-raffle-guide">
                      View Free Raffle Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-semibold text-[#AFFF81] mb-8 text-center">
              Technical Details
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Smart Contract Process
                </h3>
                <p className="text-gray-300">
                  Smart contracts are deployed on Hyperliquid and powered by
                  OnChainWin.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  NFT Distribution
                </h3>
                <p className="text-gray-300">
                  When a raffle ends, the smart contract automatically transfers
                  the NFT to the winner&apos;s wallet. The transfer is recorded
                  on the blockchain and can be verified by anyone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Transaction Fees
                </h3>
                <p className="text-gray-300">
                  In addition to the ticket price, you will need to pay gas fees
                  for your transaction.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
              Ready to win exclusive NFTs?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our NFT raffle now for your chance to win valuable digital
              collectibles. The more tickets you buy, the better your chances!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#AFFF81] text-black hover:bg-[#AFFF81]/90 px-8">
                <Link href="/app">Buy Raffle Tickets</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#AFFF81]/50 bg-black text-[#AFFF81] hover:text-[#AFFF81]/90 hover:bg-[#AFFF81]/10">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

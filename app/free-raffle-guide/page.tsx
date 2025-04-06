import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function FreeRaffleGuide() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-16 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(175,255,129,0.1),transparent_70%)]"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#AFFF81] mb-6">
              Free Raffle Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about participating in our free NFT
              raffles on HyppoLand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  What is the Free Raffle?
                </h2>
                <p className="text-gray-300 mb-4">
                  The Free Raffle is a special type of raffle on HyppoLand that
                  allows users to participate. This raffle gives you a chance to
                  win HYPE.
                </p>
                <p className="text-gray-300">
                  Each free raffle has a set collection of NFTs that will be
                  distributed to winners when the raffle ends. You need to own{" "}
                  <strong className="text-[#AFFF81]">
                    our one of Hyppos NFT
                  </strong>{" "}
                  to join a raffle.
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
                        First, connect your wallet to our platform using the
                        &quot;Connect Wallet&quot; button in the top right
                        corner. We support MetaMask, WalletConnect, and other
                        popular wallet providers.
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
                        Request a Free Ticket
                      </h3>
                      <p className="text-gray-300">
                        Navigate to the Free Raffle section and click on
                        &quot;Get Free Ticket&quot;. You&apos;ll need to sign a
                        transaction (no HYPE cost, just gas fee) to enter the
                        raffle.
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
                        Wait for the Raffle to End
                      </h3>
                      <p className="text-gray-300">
                        Each raffle has a predefined end time. Once the raffle
                        ends, winners are automatically selected and prizes are
                        distributed to their wallets. You can check your status
                        at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  Rules & Limitations
                </h2>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>
                    Each wallet address can claim only one free ticket per
                    raffle.
                  </li>
                  <li>
                    You must have sufficient gas to cover the transaction fee
                    for claiming your ticket.
                  </li>
                  <li>Wallets must hold at least one of HyppoLand NFTs.</li>
                  <li>
                    Winners are selected randomly using a verifiable random
                    function in our smart contract.
                  </li>
                  <li>
                    HyppoLand reserves the right to modify free raffle rules
                    with prior notice.
                  </li>
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
                  Quick Tips
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-[#AFFF81] font-bold">•</span>
                    <span className="text-gray-300">
                      Keep enough HYPE for gas fees even though the ticket is
                      free
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#AFFF81] font-bold">•</span>
                    <span className="text-gray-300">
                      Sign transactions only on HyppoLand&apos;s official
                      website
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#AFFF81] font-bold">•</span>
                    <span className="text-gray-300">
                      Follow us on social media for new raffle announcements
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#AFFF81] font-bold">•</span>
                    <span className="text-gray-300">
                      Check your wallet after raffle ends for your prize
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <h3 className="text-xl font-medium text-white mb-3">
                    Ready to join?
                  </h3>
                  <Button
                    asChild
                    className="w-full bg-[#AFFF81] text-black hover:bg-[#AFFF81]/90">
                    <Link href="/#raffles">Enter Free Raffle</Link>
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#AFFF81]/50 bg-black text-[#AFFF81] hover:text-[#AFFF81]/90 hover:bg-[#AFFF81]/10">
                    <Link href="/nft-raffle-guide">View NFT Raffle Guide</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-black/20 border border-[#AFFF81]/20 rounded-xl p-8 shadow-lg mb-16">
            <h2 className="text-3xl font-semibold text-[#AFFF81] mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">
                  How do I know if I won?
                </h3>
                <p className="text-gray-300">
                  When the raffle ends, the smart contract automatically
                  distributes NFTs to winners. You&apos;ll see the prize in your
                  connected wallet. We also display winners on explorer.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">
                  How are winners selected?
                </h3>
                <p className="text-gray-300">
                  Winners are selected using a cryptographically secure random
                  function built into our smart contract, ensuring fair and
                  verifiable results that can&apos;t be manipulated.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">
                  What if the raffle doesn&apos;t fill up?
                </h3>
                <p className="text-gray-300">
                  Free raffles run for a fixed time period regardless of how
                  many participants enter. When the time expires, all available
                  NFTs are distributed among participants.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#AFFF81] mb-4">
              Ready to try your luck?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our free raffle now and get a chance to win exclusive NFTs
              without spending any HYPE. It&apos;s our way of giving back to the
              community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#AFFF81] text-black hover:bg-[#AFFF81]/90 px-8">
                <Link href="/app">Enter Free Raffle</Link>
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

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Header } from "../Header";
import { CardComment } from "./Card";
import WNFT_Raffle from "@/components/raffles/WNFT_Raffle";
import FNFT_Raffle from "@/components/raffles/FNFT_Raffle";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function AppHero() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20">
              <Image
                src="https://res.cloudinary.com/dg4jhba5c/image/upload/v1741605538/night-background_ni3vqb.jpg"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="hover:bg-neutral-900 dark:hover:border-t-border border-[#AFFF81] text-white group mx-auto flex w-fit items-center gap-4 rounded-full pl-4 border p-1 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                    <span className="text-sm">Purchase Your Ticket</span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="group-hover:bg-[#AFFF81]  size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 group-hover:text-black -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-[#AFFF81] text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                  HyppoLand
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                  Our smart contract distributes NFTs to the winners when raffle
                  ends.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base hover:bg-[#AFFF81]/90 hover:text-black">
                      <Link href="/nft-raffle-guide">
                        <span className="text-nowrap">NFT Raffle Guide</span>
                      </Link>
                    </Button>
                  </div>
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                    <Button
                      asChild
                      size="lg"
                      className="h-10.5 rounded-xl bg-[#AFFF81] text-black px-5 hover:bg-[#AFFF81]/90">
                      <Link href="/free-raffle-guide">
                        <span className="text-nowrap">Free Raffle Guide</span>
                      </Link>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.5,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="flex w-full flex-col items-center justify-center mt-12 mb-16 px-4">
              <h2 className="text-3xl font-bold text-[#AFFF81] mb-8 text-center">
                Our Raffles
              </h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-6xl">
                <div className="md:w-1/2 lg:w-auto flex justify-center">
                  <FNFT_Raffle />
                </div>
                <div className="md:w-1/2 lg:w-auto flex justify-center">
                  <WNFT_Raffle />
                </div>
              </div>
            </AnimatedGroup>

            <div className="flex mt-12 justify-center items-center">
              <CardComment />
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12">
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-0">
                <div
                  aria-hidden
                  className="bg-linear-to-b to-black absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-black dark:inset-shadow-white/20 bg-black relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <Image
                    className="bg-black aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="/tunnel.gif"
                    alt="app screen"
                    width="2700"
                    height="1440"
                    unoptimized
                  />
                  <Image
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="/world-map.png"
                    alt="app screen"
                    width="2700"
                    height="1440"
                    unoptimized
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <footer className="container mx-auto border-t border-[#AFFF81] flex justify-between items-center py-4">
          <div className="bg-[#AFFF81] h-[50px] w-[100px] flex items-center justify-center">
            <Image
              src="/hyppos.svg"
              alt="logo"
              width={1000}
              height={500}
              className="w-16 h-16"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Powered by</p>
            <Image src="/ocwlogo.png" alt="logo" width={100} height={100} />
          </div>
        </footer>
      </main>
    </>
  );
}

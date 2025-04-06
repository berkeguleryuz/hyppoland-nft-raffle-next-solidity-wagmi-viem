import React from "react";
import { Button } from "../ui/button";

export const CardComment = () => {
  return (
    <div className="storybook-fix group mx-auto h-80 w-full max-w-md rounded-xl bg-[#AFFF81] p-4 shadow">
      <div className="relative flex h-72 flex-col space-y-4 overflow-hidden rounded-md bg-black text-white shadow-sm hover:shadow-lg">
        <div className="h-fit p-4 transition-all group-hover:-translate-y-1/3">
          <h3 className="text-sm font-semibold">I am Hyppoland Winner & Player Section</h3>
        </div>

        <div className="w-full px-4 opacity-0 transition-all group-hover:-translate-y-1/5 group-hover:opacity-100">
          <div className="h-60 w-full rounded-md bg-[#AFFF81] p-4">
            <h3 className="text-sm font-semibold text-black">
              Not ready, yet...
            </h3>
            <Button>Buy</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Card } from "./ui/card";

const ShellsCard = () => {
  return (
    <div className=" w-full  py-12 p">
      <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">
        Why Book with Andaman Shells?
      </h2>

      <Card className="overflow-hidden rounded-none w-00 border-none ">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="/why-us.png"
              alt="Why Choose Us"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 bg-black p-6 md:p-10">
            <ul className="space-y-4 text-white text-xl">
              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Customize Packages booking option
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Easy payment Option (EMI & No full payment required on booking)
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Easy Refund & Free Rescheduling option
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Exclusive Honeymoon Inclusions
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                24x7 Personal Trip Assistance
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                One of the best Ground Team support in Andaman
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Surprise Gift on Arrival
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Flight Booking Support
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                30,000+ Happy Travellers Since 2014
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Trusted brand with proven track record
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Better Value
              </li>

              <li className="flex gap-3">
                <span className="text-green-400">✔</span>
                Last Minute tension-free booking option
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShellsCard;


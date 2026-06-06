import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Packages = ({ setActiveTab }) => {
  const [value, setValue] = useState("all");

  const handleChange = (val) => {
    setValue(val);
    setActiveTab(val); // App.jsx ko update karega
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-46 py-10">

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        Our Exclusive Packages
      </h1>

      <Tabs value={value} onValueChange={handleChange} className="w-full">

        {/* Tabs Container */}
        <div className="w-full overflow-x-auto">

          <TabsList className="flex w-max min-w-full gap-2 bg-transparent mb-6 px-2">

            <TabsTrigger value="all"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              All
            </TabsTrigger>

            <TabsTrigger value="honeymoon"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Honeymoon Package
            </TabsTrigger>

            <TabsTrigger value="family"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Family Packages
            </TabsTrigger>

            <TabsTrigger value="women"
              className="whitespace-nowrap  data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Women Package
            </TabsTrigger>

            <TabsTrigger value="golden"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white  hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Golden Age Package
            </TabsTrigger>

            <TabsTrigger value="couple"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Couple Friendly Package
            </TabsTrigger>

            <TabsTrigger value="luxury"
              className="whitespace-nowrap data-[state=active]:bg-cyan-600 data-[state=active]:text-white hover:bg-cyan-600 rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black"
            >
              Luxury Package
            </TabsTrigger>

          </TabsList>

        </div>

      </Tabs>
    </div>
  );
};

export default Packages;
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Packages = ({ setActiveTab }) => {
  const [value, setValue] = useState("all");

  const handleChange = (val) => {
    setValue(val);
    setActiveTab(val); // App.jsx ko update karega
  };

  return (
    <Tabs value={value} onValueChange={handleChange} className="w-full">
      <div className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-6 px-2 h-auto sm:mx-46">
          <TabsTrigger
            value="all"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>

          <TabsTrigger
            value="honeymoon"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Honeymoon Package
          </TabsTrigger>

          <TabsTrigger
            value="family"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Family Packages
          </TabsTrigger>

          <TabsTrigger
            value="women"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Women Package
          </TabsTrigger>

          <TabsTrigger
            value="golden"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Golden Age Package
          </TabsTrigger>

          <TabsTrigger
            value="couple"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Couple Friendly Package
          </TabsTrigger>

          <TabsTrigger
            value="luxury"
            className="whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm md:text-base border border-black data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            Luxury Package
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
};

export default Packages;

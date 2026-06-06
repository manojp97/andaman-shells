import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = ["/Banner 1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function CustomCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <ShadCarousel className="w-full">
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40">
                  <div className="flex h-full items-center justify-center px-4">
                    <div className="max-w-4xl text-center text-white">
                      <h2 className="text-lg sm:text-xl md:text-3xl font-bold">
                        Get the Best Price with Local Expertise
                      </h2>

                      <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Compare Before You Book!
                      </h1>

                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                          onClick={() =>
                            document
                              .getElementById("contact")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="w-full sm:w-auto rounded-full bg-sky-400 px-6 py-3 font-bold text-black hover:bg-sky-300 transition"
                        >
                          BOOK NOW
                        </button>

                        <button
                          onClick={() =>
                            document
                              .getElementById("packages")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="w-full sm:w-auto rounded-full border border-sky-400 px-6 py-3 font-bold hover:bg-sky-400 transition"
                        >
                          OUR PACKAGES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop only arrows */}
        <CarouselPrevious className="hidden md:flex left-4" />
        <CarouselNext className="hidden md:flex right-4" />
      </ShadCarousel>
    </div>
  );
}

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Inspiration() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[750px] h-fit max-[1650px]:max-w-[500px] max-[1400px]:max-w-[300px] "
    >
      <CarouselContent >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" basis-1/3 max-[1650px]:basis-1/2 max-[1400px]:basis-1/1">
            <div className="flex w-[200px] aspect-square bg-gray-600 rounded-lg justify-center items-center">
                {index+1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

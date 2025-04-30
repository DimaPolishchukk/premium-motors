"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { fetchCars, type TransformedCar } from "@/config/api"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Catalog() {
  const [cars, setCars] = useState<TransformedCar[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true)
        setError(null)
        const allCars = await fetchCars()
        // Check if allCars is an array before checking length
        if (!Array.isArray(allCars) || allCars.length === 0) {
          setError("No cars found")
          return
        }
        setCars(allCars)
      } catch (error) {
        console.error("Error loading cars:", error)
        setError("Failed to load cars. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadCars()
  }, [])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0 && currentIndex < cars.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [currentIndex, cars.length])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p>Loading cars...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-white text-black hover:bg-white/90">
          Retry
        </Button>
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p>No cars available at the moment.</p>
        <Button onClick={() => window.location.reload()} className="bg-white text-black hover:bg-white/90">
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden">
      {cars.map((car, index) => (
        <section
          key={car.id}
          className={`car-section h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out`}
          style={{
            transform: `translateY(${(index - currentIndex) * 100}%)`,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={car.imageUrl || "/placeholder.svg"}
              alt={`${car.make} ${car.model}`}
              fill
              priority={index === currentIndex}
              loading={index === currentIndex ? "eager" : "lazy"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-6xl font-bold mb-4">{`${car.make} ${car.model}`}</h2>
              <p className="text-2xl mb-2">Year: {car.year}</p>
              <div className="mb-8">
                <p className="text-xl opacity-75">Starting from</p>
                <p className="text-4xl font-bold">${car.price.toLocaleString()}</p>
              </div>
              <div className="space-y-4">
                <Link href={`/cars/${car.id}`}>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[200px]">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
      {/* Scroll Indicator */}
      {currentIndex < cars.length - 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-50">
          <ChevronDown size={32} />
        </div>
      )}

      {/* Section Indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-150" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to car ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchCarById, type TransformedCar } from "@/config/api"

export default function CarDetail() {
  const params = useParams()
  const [car, setCar] = useState<TransformedCar | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const totalSections = 3 // Hero, Overview+Specs, Gallery

  useEffect(() => {
    const loadCar = async () => {
      if (params.id) {
        const carData = await fetchCarById(params.id as string)
        setCar(carData)
        setLoading(false)
      }
    }
    loadCar()
  }, [params.id])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling) return

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 700)
      } else if (e.deltaY < 0 && currentSection > 0) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 700)
      }
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [currentSection, isScrolling])

  if (loading || !car) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p>Loading car details...</p>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.gallery.length)
    setSelectedThumbnail((prev) => (prev + 1) % car.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.gallery.length) % car.gallery.length)
    setSelectedThumbnail((prev) => (prev - 1 + car.gallery.length) % car.gallery.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedThumbnail(index)
  }

  return (
    <main className="h-screen overflow-hidden bg-black text-white">
      {/* Hero Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(${(0 - currentSection) * 100}%)`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={car.gallery[currentImageIndex] || "/placeholder.svg"}
            alt={`${car.make} ${car.model}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Car Title and Price */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-6xl font-bold mb-4">{`${car.make} ${car.model}`}</h1>
            <p className="text-xl mb-2">Year: {car.year}</p>
            <p className="text-4xl font-bold mb-8">${car.price.toLocaleString()}</p>
            <Link href={`/order/${car.id}`}>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[200px]">
                Order Now
              </Button>
            </Link>
          </div>

          {/* Gallery Thumbnails */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex gap-2 p-4 bg-black/50 rounded-lg overflow-x-auto max-w-[90vw] snap-x">
              {car.gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => selectImage(index)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 snap-center ${
                    selectedThumbnail === index ? "ring-2 ring-white scale-105" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${car.make} ${car.model} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combined Overview and Technical Specifications Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out bg-black overflow-y-auto"
        style={{
          transform: `translateY(${(1 - currentSection) * 100}%)`,
        }}
      >
        <div className="min-h-full flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Overview</h2>
              <p className="text-lg leading-relaxed text-gray-300 text-center">{car.description}</p>
            </div>

            <h2 className="text-3xl font-bold mb-12 text-center">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Performance</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Horsepower</span>
                    <span>{car.specs.horsepower} hp</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">0-100 km/h</span>
                    <span>{car.specs.acceleration}s</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Top Speed</span>
                    <span>{car.specs.topSpeed} km/h</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Powertrain</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Engine</span>
                    <span>{car.specs.engine}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Transmission</span>
                    <span>{car.specs.transmission}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Torque</span>
                    <span>{car.specs.torque}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">General</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Drivetrain</span>
                    <span>{car.specs.drivetrain}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Weight</span>
                    <span>{car.specs.weight} kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Fuel Type</span>
                    <span>{car.specs.fuelType}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out bg-gradient-to-b from-black to-gray-900"
        style={{
          transform: `translateY(${(2 - currentSection) * 100}%)`,
        }}
      >
        <div className="h-full flex items-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {car.gallery.map((image, index) => (
                <button
                  key={image}
                  onClick={() => {
                    selectImage(index)
                    setCurrentSection(0) // Return to hero section
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${car.make} ${car.model} view ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


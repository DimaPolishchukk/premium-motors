"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Shield, Star, ChevronDown } from "lucide-react"
import { fetchLatestCars, type TransformedCar } from "@/config/api"

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
    <Icon className="w-16 h-16 mb-6 text-yellow-400" />
    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
    <p className="text-gray-300 text-lg">{description}</p>
  </div>
)

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<TransformedCar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const totalSections = 4

  useEffect(() => {
    const loadFeaturedCars = async () => {
      try {
        setLoading(true)
        setError(null)
        const cars = await fetchLatestCars()
        if (!Array.isArray(cars) || cars.length === 0) {
          setError("No cars found")
          return
        }
        setFeaturedCars(cars)
      } catch (error) {
        console.error("Error loading featured cars:", error)
        setError("Failed to load featured cars. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedCars()
  }, [])

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

  return (
    <div className="h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(${(0 - currentSection) * 100}%)`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2000&h=1200"
            alt="Luxury car showroom"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">Experience Luxury</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Discover our handpicked selection of premium vehicles for the discerning driver
            </p>
            <Link href="/catalog">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[200px]">
                Explore Our Collection
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out bg-black text-white"
        style={{
          transform: `translateY(${(1 - currentSection) * 100}%)`,
        }}
      >
        <div className="h-full flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose Premium Auto</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={Award}
                title="Premium Selection"
                description="Only the finest vehicles make it into our collection. Each car is carefully selected for its performance, luxury, and style."
              />
              <FeatureCard
                icon={Shield}
                title="Quality Guaranteed"
                description="Every vehicle undergoes rigorous inspection and certification process to ensure the highest quality standards."
              />
              <FeatureCard
                icon={Star}
                title="Exceptional Service"
                description="Our team of experts provides personalized assistance to help you find your perfect vehicle."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out bg-gradient-to-b from-black to-gray-900"
        style={{
          transform: `translateY(${(2 - currentSection) * 100}%)`,
        }}
      >
        <div className="h-full flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Latest Vehicles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div className="col-span-3 flex justify-center items-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Loading latest vehicles...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="col-span-3 text-center text-red-500">
                  <p>{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-white text-black hover:bg-white/90"
                  >
                    Retry
                  </Button>
                </div>
              ) : featuredCars.length > 0 ? (
                featuredCars.map((car) => (
                  <div key={car.id} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                    <Image
                      src={car.imageUrl || "/placeholder.svg"}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{`${car.make} ${car.model}`}</h3>
                      <p className="text-sm text-gray-200 mb-4">Starting from ${car.price.toLocaleString()}</p>
                      <Link href={`/cars/${car.id}`}>
                        <Button className="bg-white text-black hover:bg-white/90">Order Now</Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400">
                  <p>No vehicles available at the moment.</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-white text-black hover:bg-white/90"
                  >
                    Refresh
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="h-screen w-full absolute top-0 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(${(3 - currentSection) * 100}%)`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000&h=1200"
            alt="Luxury car interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Car?</h2>
            <p className="text-xl mb-8 max-w-2xl">
              Browse our extensive collection of premium vehicles and find the one that matches your style.
            </p>
            <div className="flex gap-4">
              <Link href="/catalog">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[160px]">
                  View Catalog
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 min-w-[160px]">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      {currentSection < totalSections - 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-50">
          <ChevronDown size={32} />
        </div>
      )}

      {/* Section Indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => !isScrolling && setCurrentSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index ? "bg-white scale-150" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


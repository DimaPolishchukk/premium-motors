const BASE_URL = "";

export interface CarSpecs {
  id: number
  horsepower: number
  acceleration: string
  top_speed: number
  transmission: string
  engine: string
  torque: string
  drivetrain: string
  weight: number
  fuel_type: string
  car: number
}

export interface Car {
  id: number
  specs: CarSpecs
  gallery: string[]
  make: string
  model: string
  year: number
  price: string
  image_url: string
  description: string
}

export interface TransformedCar {
  id: string
  make: string
  model: string
  year: number
  price: number
  imageUrl: string
  gallery: string[]
  specs: {
    horsepower: number
    acceleration: number
    topSpeed: number
    transmission: string
    engine: string
    torque: string
    drivetrain: string
    weight: number
    fuelType: string
  }
  description: string
}

const transformCar = (car: Car): TransformedCar => ({
  id: car.id.toString(),
  make: car.make,
  model: car.model,
  year: car.year,
  price: Number.parseFloat(car.price),
  imageUrl: car.image_url,
  gallery: car.gallery.length > 0 ? car.gallery : [car.image_url],
  specs: {
    horsepower: car.specs.horsepower,
    acceleration: Number.parseFloat(car.specs.acceleration),
    topSpeed: car.specs.top_speed,
    transmission: car.specs.transmission,
    engine: car.specs.engine,
    torque: car.specs.torque,
    drivetrain: car.specs.drivetrain,
    weight: car.specs.weight,
    fuelType: car.specs.fuel_type,
  },
  description: car.description,
})

export const fetchCars = async (): Promise<TransformedCar[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cars/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // Ensure we have an array of cars
    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data)
      return []
    }

    return data.map(transformCar)
  } catch (error) {
    console.error("Error fetching cars:", error)
    return []
  }
}

export const fetchLatestCars = async (): Promise<TransformedCar[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cars/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // Ensure we have an array of cars
    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data)
      return []
    }

    // Sort cars by ID in descending order and take the last 3
    return data
      .sort((a, b) => b.id - a.id)
      .slice(0, 3)
      .map(transformCar)
  } catch (error) {
    console.error("Error fetching latest cars:", error)
    return []
  }
}

export const fetchCarById = async (id: string): Promise<TransformedCar | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/cars/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const car: Car = await response.json()
    return transformCar(car)
  } catch (error) {
    console.error("Error fetching car by id:", error)
    return null
  }
}


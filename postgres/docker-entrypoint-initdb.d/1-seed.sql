-- Create table for cars
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Create table for car specifications
CREATE TABLE car_specs (
    id SERIAL PRIMARY KEY,
    car_id INT NOT NULL,
    horsepower INT NOT NULL,
    acceleration DECIMAL(4,2) NOT NULL,  -- 0-100 km/h time
    top_speed INT NOT NULL,
    transmission VARCHAR(100) NOT NULL,
    engine VARCHAR(100) NOT NULL,
    torque VARCHAR(50) NOT NULL,
    drivetrain VARCHAR(10) NOT NULL,
    weight INT NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- Create table for car images gallery
CREATE TABLE car_gallery (
    id SERIAL PRIMARY KEY,
    car_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);
-- Create table for contact messages
-- This table will store messages sent by users through the contact form
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,                         -- Унікальний ідентифікатор
    name VARCHAR(100) NOT NULL,                    -- Ім'я користувача
    email VARCHAR(255) NOT NULL,                   -- Email
    message TEXT NOT NULL,                         -- Повідомлення
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Дата та час відправки
);


-- Insert sample data
INSERT INTO cars (make, model, year, price, image_url, description) VALUES
('BMW', 'M4 Competition', 2023, 74900, 'https://images.unsplash.com/photo-1728060838443-691dc6279245?auto=format&fit=crop&q=80&w=2000&h=1200', 
 'The BMW M4 Competition represents the perfect fusion of motorsport DNA and luxury.'),
('Porsche', '911 GT3', 2023, 169990, 'https://images.unsplash.com/photo-1699325635304-a2f409b06d19?auto=format&fit=crop&q=80&w=2000&h=1200', 
 'The Porsche 911 GT3 is a high-performance sports car that offers an unparalleled driving experience.'),
('Tesla', 'Model S', 2023, 89990, 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=2000&h=1200', 
 'The Tesla Model S is a luxury electric sedan that offers exceptional performance and technology.'),
('Mercedes-Benz', 'AMG GT', 2023, 118990, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000&h=1200', 
 'The Mercedes-AMG GT is a luxury sports car that combines exhilarating performance with sophisticated design.'),
('Ferrari', '488 Pista', 2023, 330000, 'https://images.unsplash.com/photo-1597935370784-051cdebbe6a0?auto=format&fit=crop&q=80&w=2000&h=1200', 
 'The Ferrari 488 Pista is a track-focused supercar that blends cutting-edge aerodynamics with extreme performance.');

-- Insert specifications
INSERT INTO car_specs (car_id, horsepower, acceleration, top_speed, transmission, engine, torque, drivetrain, weight, fuel_type) VALUES
(1, 503, 3.9, 290, '8-speed M Steptronic', '3.0L Twin-Turbo Inline-6', '650 Nm', 'RWD', 1800, 'Petrol'),
(2, 502, 3.2, 318, '7-speed PDK', '4.0L Naturally Aspirated Flat-6', '465 Nm', 'RWD', 1435, 'Petrol'),
(3, 1020, 2.1, 250, 'Single-speed', 'Electric Motor', '1400 Nm', 'AWD', 2160, 'Electric'),
(4, 577, 3.2, 315, '9-speed AMG SPEEDSHIFT DCT', '4.0L Twin-Turbo V8', '700 Nm', 'RWD', 1750, 'Petrol'),
(5, 710, 2.8, 340, '7-speed dual-clutch', '3.9L Twin-Turbo V8', '770 Nm', 'RWD', 1385, 'Petrol');

-- Insert images into gallery
INSERT INTO car_gallery (car_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1728060838443-691dc6279245?auto=format&fit=crop&q=80&w=2000&h=1200'),
(1, 'https://images.unsplash.com/photo-1728060838342-cb9744a27d1b?auto=format&fit=crop&q=80&w=2000&h=1200'),
(1, 'https://images.unsplash.com/photo-1728060839159-f828a58cdaef?auto=format&fit=crop&q=80&w=2000&h=1200'),
(2, 'https://images.unsplash.com/photo-1699325565626-a0bbad1a554e?auto=format&fit=crop&q=80&w=2000&h=1200'),
(2, 'https://images.unsplash.com/photo-1699325524552-555bd48866b6?auto=format&fit=crop&q=80&w=2000&h=1200'),
(2, 'https://images.unsplash.com/photo-1699325635304-a2f409b06d19?auto=format&fit=crop&q=80&w=2000&h=1200'),
(3, 'https://images.unsplash.com/photo-1537119100544-ea57dccd7bd4?auto=format&fit=crop&q=80&w=2000&h=1200'),
(3, 'https://images.unsplash.com/photo-1536617621572-1d5f1e6269a0?auto=format&fit=crop&q=80&w=2000&h=1200'),
(3, 'https://images.unsplash.com/photo-1536882666204-4b33cd3cb518?auto=format&fit=crop&q=80&w=2000&h=1200'),
(4, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000&h=1200'),
(4, 'https://images.unsplash.com/photo-1618863099278-75222d755814?auto=format&fit=crop&q=80&w=2000&h=1200'),
(5, 'https://images.unsplash.com/photo-1597935370784-051cdebbe6a0?auto=format&fit=crop&q=80&w=2000&h=1200');

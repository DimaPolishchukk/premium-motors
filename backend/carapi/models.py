from django.db import models

class Car(models.Model):
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.TextField()
    description = models.TextField()

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"

    class Meta:
        db_table = 'cars'

class CarSpecs(models.Model):
    car = models.OneToOneField(Car, on_delete=models.CASCADE, related_name="specs")
    horsepower = models.IntegerField()
    acceleration = models.DecimalField(max_digits=4, decimal_places=2)
    top_speed = models.IntegerField()
    transmission = models.CharField(max_length=100)
    engine = models.CharField(max_length=100)
    torque = models.CharField(max_length=50)
    drivetrain = models.CharField(max_length=10)
    weight = models.IntegerField()
    fuel_type = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.car.make} {self.car.model} Specs"

    class Meta:
        db_table = 'car_specs'

class CarGallery(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="gallery")
    image_url = models.TextField()

    def __str__(self):
        return f"Image for {self.car.make} {self.car.model}"

    class Meta:
        db_table = 'car_gallery'

from django.contrib import admin
from .models import Car, CarSpecs, CarGallery  # Import new models

# Register models so they appear in Django Admin
admin.site.register(Car)
admin.site.register(CarSpecs)
admin.site.register(CarGallery)

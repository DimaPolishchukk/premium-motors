from django.contrib import admin
from .models import Car, CarSpecs, CarGallery, ContactMessage

# Register models so they appear in Django Admin
admin.site.register(Car)
admin.site.register(CarSpecs)
admin.site.register(CarGallery)
admin.site.register(ContactMessage)

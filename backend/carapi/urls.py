from django.urls import path
from .views import get_all_cars, get_car_by_id

urlpatterns = [
    path('cars/', get_all_cars, name='get_all_cars'),
    path('cars/<int:car_id>/', get_car_by_id, name='get_car_by_id'),
]

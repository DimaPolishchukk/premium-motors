from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Car
from .serializers import CarSerializer

@api_view(['GET'])
def get_all_cars(request):
    """Retrieve all cars"""
    cars = Car.objects.all()
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data, content_type="application/json")

@api_view(['GET'])
def get_car_by_id(request, car_id):
    """Retrieve a single car by its ID"""
    try:
        car = Car.objects.get(pk=car_id)
        serializer = CarSerializer(car)
        return Response(serializer.data, content_type="application/json") 
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=404)

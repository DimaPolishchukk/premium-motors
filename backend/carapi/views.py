from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from .models import Car, ContactMessage
from .serializers import CarSerializer, ContactMessageSerializer

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

@csrf_exempt
@api_view(['POST', 'GET'])
def contact_messages(request):
    """Handle contact messages"""
    """Handles both GET and POST requests for contact messages"""
    if request.method == 'POST':
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        messages = ContactMessage.objects.all().order_by('-submitted_at')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)
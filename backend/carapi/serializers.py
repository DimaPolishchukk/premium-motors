from rest_framework import serializers
from .models import Car, CarSpecs, CarGallery

class CarSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarSpecs
        fields = '__all__'

class CarGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CarGallery
        fields = ['image_url'] 

class CarSerializer(serializers.ModelSerializer):
    specs = CarSpecsSerializer()
    gallery = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_gallery(self, obj):
        """Return a flat list of image URLs instead of a list of objects"""
        return [image.image_url for image in obj.gallery.all()]

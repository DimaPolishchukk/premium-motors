from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates an admin user if none exists'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(is_superuser=True).exists():
            username = settings.DJANGO_SUPERUSER_USERNAME
            email = settings.DJANGO_SUPERUSER_EMAIL
            password = settings.DJANGO_SUPERUSER_PASSWORD

            admin = User.objects.create_superuser(username=username, email=email, password=password)
            admin.is_active = True
            admin.is_staff = True
            admin.is_superuser = True
            admin.save()

            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully!'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists.'))

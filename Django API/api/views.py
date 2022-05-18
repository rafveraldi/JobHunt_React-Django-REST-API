from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from jobs.models import Job
from django.contrib.auth.models import User
from .serializers import JobSerializer, UserSerializer
from rest_framework.permissions import SAFE_METHODS, AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly


class JobList(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer
    # queryset = Job.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(user=user)


class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer
    # queryset = Job.objects.all()

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return False
        return obj.user == request.user

    def get_queryset(self):
        user = self.request.user
        return Job.objects.filter(user=user)


# """ Concrete View Classes
# #CreateAPIView
# Used for create-only endpoints.
# #ListAPIView
# Used for read-only endpoints to represent a collection of model instances.
# #RetrieveAPIView
# Used for read-only endpoints to represent a single model instance.
# #DestroyAPIView
# Used for delete-only endpoints for a single model instance.
# #UpdateAPIView
# Used for update-only endpoints for a single model instance.
# ##ListCreateAPIView
# Used for read-write endpoints to represent a collection of model instances.
# RetrieveUpdateAPIView
# Used for read or update endpoints to represent a single model instance.
# #RetrieveDestroyAPIView
# Used for read or delete endpoints to represent a single model instance.
# #RetrieveUpdateDestroyAPIView
# Used for read-write-delete endpoints to represent a single model instance.
# """


class UserRegister(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

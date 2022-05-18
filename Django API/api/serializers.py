from rest_framework import serializers
from jobs.models import Job
from django.contrib.auth.models import User


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'job_title', 'company', 'url', 'date_applied',
                  'stage', 'notes', 'last_updated')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

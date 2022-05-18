from django.urls import path
from .views import JobList, JobDetail, UserRegister, UserList

app_name = 'api'

urlpatterns = [
    path('<int:pk>/', JobDetail.as_view(), name='detailcreate'),
    path('', JobList.as_view(), name='listcreate'),
    path('register/', UserRegister.as_view(), name='create_user'),
    path('user/', UserList.as_view(), name='detail_user'),
]

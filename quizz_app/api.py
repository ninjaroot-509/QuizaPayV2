from quizz_app.models import quizzes, questions, results
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
import django_filters.rest_framework
from .models import quizzes
from knox.auth import TokenAuthentication
from django.contrib.auth import login
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.conf import settings
import moncashify
import random
import string


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = WalletSerializer
    filterset_fields = ('__all__')

class WalletTransactionViewSet(viewsets.ModelViewSet):
    queryset = WalletTransaction.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = WalletTransactionSerializer
    filterset_fields = ('__all__')

class RetraitViewSet(viewsets.ModelViewSet):
    queryset = Retrait.objects.all()
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = RetraitSerializer
    filterset_fields = ('__all__')

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    # .order_by('?')
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer
    filterset_fields = ('is_active',)

class quizzViewSet(viewsets.ModelViewSet):
    queryset = quizzes.objects.filter(is_live=True).order_by('?')
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuizzSerializer
    filterset_fields = ('owner', 'category', 'is_live')

class questionViewSet(viewsets.ModelViewSet):
    queryset = questions.objects.filter(is_live=True).order_by('?')
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuestionSerializer
    filterset_fields = ('quizz_id', 'is_true_or_false')

class resultViewSet(viewsets.ModelViewSet):
    queryset = results.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResultSerializer
    filterset_fields = ('__all__')

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _,token = AuthToken.objects.create(user) 
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
        }) 

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _,token = AuthToken.objects.create(user) 
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
        }) 

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [ 
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    

# class WalletRequestedViewSet(viewsets.ModelViewSet):
#     queryset = WalletRequested.objects.all()
#     permissions_classes = [
#         permissions.IsAuthenticated
#     ]
#     serializer_class = WalletRequestedSerializer
#     filterset_fields = ('__all__')

#     def create_ref_code():
#         return ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))

#     def retrieve(self, request, pk=None):
#         print(request.data['user'])
#         montant = int(request.data['montant'])
#         user = request.data['user']
#         ref_code = request.data['ref_code']
#         order_id = create_ref_code()
#         WalletRequested.objects.create(user=request.user, montant=montant, ref_code=order_id)
#         moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
#         payment = moncash.payment(order_id, montant)
#         return HttpResponseRedirect(payment.redirect_url)


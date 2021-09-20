from rest_framework import routers
from .api import *
from django.urls import path
from django.conf.urls import url
from .views import *
router = routers.DefaultRouter() 
router.register('questions', questionViewSet, 'questions' )
router.register('category', CategoryViewSet, 'category' )
router.register('quizzes', quizzViewSet, 'quizzes' )

urlpatterns = [
    url(r'^princings/$', PrincingView.as_view()),
    url(r'^user-details/$', UserDetailsView.as_view()),
    url(r'^info-user/$', PostInfoView.as_view()),
    url(r'^users/$', UserListView.as_view()),
    url(r'^friends/$', FriendListView.as_view()),
    url(r'^demandereculist/$', DemandeReceiveView.as_view()),
    url(r'^demandesentlist/$', DemandeSentView.as_view()),
    url(r'^friends-actions/$', RequestFriendView.as_view()),
    url(r'^try-agains/$', TryView.as_view()),
    url(r'^end/$', EndView.as_view()),
    url(r'^players-score/$', ScoreView.as_view()),
    url(r'^joins/$', JoinView.as_view()),
    url(r'^joins-pay/$', JoinPayView.as_view()),
    url(r'^players/$', PlayersView.as_view()),
    url(r'^start/$', StartView.as_view()),
    url(r'^challenge/$', ChallengeView.as_view()),
    url(r'^questions/$', QuestionView.as_view()),
    url(r'^live-questions/$', QuestionLiveView.as_view()),
    url(r'^profile/$', ProfileUpdateView.as_view()),
    url(r'^depot/$', WalletFormView.as_view()),
    url(r'^retrait/$', RetraitView.as_view()),
    url(r'^wallet/$', WalletView.as_view()),
    url(r'^coins/$', CoinView.as_view()),
    url(r'^pay/$', QuizPayView.as_view()),
    url(r'^results/$', QuizResultsView.as_view()),
    url(r'^done/$', QuizDoneView.as_view()),
    path('trasaction/success/', MoncashView.as_view()),
]

urlpatterns += router.urls


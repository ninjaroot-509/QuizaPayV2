from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView
from django.http import HttpResponseRedirect
from django.conf import settings
import moncashify
import random
import string
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.mail import send_mail, BadHeaderError, mail_admins
from time import gmtime, strftime
from django.db.models import F
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.db.models import Q 
from rest_framework import status


def view_404(request, exception=None):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('/') # or redirect('name-of-index-url')

def index(request):
    return render(request, "build/index.html")

def create_ref_code():
    prefix = 'QP-'
    return prefix + ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))

def create_game_code():
    prefix = 'QP-'
    return prefix + ''.join(random.choices(string.ascii_lowercase + string.digits, k=3))

class UserListView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        user_list = User.objects.all().exclude(pk=user.pk) 
        for f in user_list:
            if f in user.friends.all():
                user_list = user_list.exclude(id=f.id)
        serializer = UserSerializer(user_list, many=True)
        return JsonResponse(serializer.data, safe=False)

class FriendListView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            friends = user.friends.all()
            serializer = UserSerializer(friends, many=True)
            return JsonResponse(serializer.data, safe=False)

class DemandeReceiveView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            dem = FriendRequest.objects.filter(to_user=user)  
            serializer = DemandeSerializer(dem, many=True)
            return JsonResponse(serializer.data, safe=False)

class DemandeSentView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            dem = FriendRequest.objects.filter(from_user=user)  
            serializer = DemandeSerializer(dem, many=True)
            return JsonResponse(serializer.data, safe=False)

class RequestFriendView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Profile.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            id_add = request.data.get("id_add", None)
            id_cancel = request.data.get("id_cancel", None)
            id_accept = request.data.get("id_accept", None)
            if id_add != None:
                user_id_add = User.objects.get(pk=id_add)
                frequest, created = FriendRequest.objects.get_or_create(from_user=user,to_user=user_id_add)
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            if id_cancel != None:
                user_id_cancel = User.objects.get(pk=id_cancel)
                frequest = FriendRequest.objects.filter(from_user=user,to_user=user_id_cancel).first()
                frequest.delete()
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            if id_accept != None:
                from_user = User.objects.get(pk=id_accept)
                frequest = FriendRequest.objects.filter(to_user=user, from_user=from_user).first()
                user1 = frequest.to_user
                user2 = from_user
                user1.friends.add(user2)
                user2.friends.add(user1)
                frequest.delete()
                return JsonResponse({'status': 1, 'message': 'request successfully!'})
            return JsonResponse({'status': 0, 'message': 'errrorrr!'})

class StartView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.GET.get('gameID')
        if gameID:
            get_challenge = get_object_or_404(Challenge, Q(gameID__icontains=gameID), end=False)
            serializer = ChallengeSerializer(get_challenge)
            # And here we send it those fields to our react component as json
            # Check this json data on React side, parse it, render it as form.
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({'status': 0, 'message': 'errorrr!!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get('gameID')
        category = request.data.get('category')
        get_challenge = get_object_or_404(Challenge, gameID=gameID, end=False)
        
        getcate = Category.objects.get(Q(title__icontains=category))
        
        getrandomquiz = quizzes.objects.filter(category=getcate, is_live=True).order_by('?')
        quiz = get_object_or_404(quizzes, pk=getrandomquiz[0].id)
        if quiz:
            Challenge.objects.filter(owner=user, gameID=get_challenge.gameID, start=False, is_active=True).update(start=True,quiz=quiz)
            return JsonResponse({'quiz_id': quiz.id})
        else:
            return JsonResponse({'status': 0, 'message': 'errorrr!!'}, status=status.HTTP_400_BAD_REQUEST)

class ChallengeView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.GET.get('game_id')
        if gameID:
            get_challenge = get_object_or_404(Challenge, pk=gameID, end=False)
            Player.objects.create(user=user, challenge=get_challenge)
        serializer = ChallengeSerializer(get_challenge)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        prix = request.data.get("prix")
        nombres_questions = request.data.get("nombres_questions")
        nombres_tours = request.data.get("nombres_tours")
        gameID = request.data.get("gameID")
        Challenge.objects.get_or_create(owner=user, gameID=gameID, prix=prix, nombres_questions=nombres_questions, nombres_tours=nombres_tours, end=False)
        return JsonResponse({'status': 1, 'message': 'success!!'})

class PlayersView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.GET.get('gameID')
        if gameID:
            get_challenge = get_object_or_404(Challenge, Q(gameID__icontains=gameID), end=False)
            player = Player.objects.filter(challenge=get_challenge).order_by('-score')
            serializer = PlayerSerializer(player, many=True)
            # And here we send it those fields to our react component as json
            # Check this json data on React side, parse it, render it as form.
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({'status': 0, 'message': 'errorrr!!'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get("gameID")
        f = get_object_or_404(Challenge, gameID=gameID, is_active=True)
        Player.objects.get_or_create(user=user, challenge=f)
        return JsonResponse({'status': 0, 'message': 'errorrr!!'}, status=status.HTTP_400_BAD_REQUEST)
        
class JoinView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get("gameID")
        f = get_object_or_404(Challenge, gameID=gameID, is_active=True, end=False)
        filte = Player.objects.filter(user=user, challenge=f)
        if filte:
            return JsonResponse({'pay': True})
        else:
            return JsonResponse({'pay': False})

class JoinPayView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get("gameID")
        if gameID:
            f = get_object_or_404(Challenge, gameID=gameID, is_active=True, end=False)
            filte = Player.objects.filter(user=user, challenge=f)
            getprix = Wallet.objects.get(user=user)
            if f.prix:
                if int(getprix.montant) >= int(f.prix):
                    Wallet.objects.filter(user=user).update(montant=F('montant') - f.prix)
                else:
                    return JsonResponse({'status': 0, 'message': 'inssuffisance de coin disponible, veuillez reacharger!!'}, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse({'status': 1, 'message': 'success!!'})
        else:
            return JsonResponse({'status': 0, 'message': 'errrro!!'}, status=status.HTTP_400_BAD_REQUEST)


class ScoreView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get("gameID")
        Correct = request.data.get("correct")
        f = get_object_or_404(Challenge, Q(gameID__icontains=gameID), is_active=True, end=False)
        if Correct == 'true':
            Player.objects.filter(user=user, challenge=f).update(score=F('score') + 1)
            return JsonResponse({'status': 1, 'message': 'win!!'})
        else:
            return JsonResponse({'status': 1, 'message': 'wrong!!'})

class EndView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        gameID = request.data.get("gameID")
        f = get_object_or_404(Challenge, Q(gameID__icontains=gameID), is_active=True, end=False)
        Challenge.objects.filter(Q(gameID__icontains=gameID), is_active=True).update(end=True)
        player = Player.objects.filter(challenge=f).order_by('-score')
        # playercount = Player.objects.filter(challenge=f)
        totalplayer = player.count()
        getwinner = get_object_or_404(Player, pk=player[0].id)
        pourcentage = 100 - round(((f.prix - 2) / f.prix) * 100)
        somme = totalplayer * f.prix - pourcentage
        Wallet.objects.filter(user=getwinner.user).update(montant=F('montant') + somme)
        return JsonResponse({'status': 1, 'message': 'success!!'})

class QuizPayView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        prix = request.data.get("prix")
        getprix = Wallet.objects.get(user=user)
        if prix:
            if int(getprix.montant) >= int(prix):
                Wallet.objects.filter(user=user).update(montant=F('montant') - prix)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance de coin disponible, veuillez reacharger!!'}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse({'status': 1, 'message': 'success!!'})


class PrincingView(APIView):
    def get(self, request, format=None):
        pr = Princing.objects.all()
        serializer = PrincingSerializer(pr, many=True)
        return JsonResponse(serializer.data, safe=False)


class ProductView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        prod = Item.objects.all().order_by('-updated')
        serializer = ItemSerializer(prod, many=True)
        return JsonResponse(serializer.data, safe=False)

class QuizResultsView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        resu = results.objects.filter(player=user).order_by('-created_at')
        serializer = ResultSerializer(resu, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        score = request.data.get("score")
        total = request.data.get("total")
        winnGains = request.data.get("winnGains")
        prix = request.data.get("prix")
        results.objects.create(player=user, score=score, total=total, quizz_id=None, gain=winnGains, prix=prix)
        return JsonResponse({'status': 1, 'message': 'success!!'})

class QuizDoneView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        quizz_id = request.data.get("quiz_id")
        return JsonResponse({'status': 1, 'message': 'success!!'})


class CoinView(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            return None

    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Coin.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = Coin.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

        # You have a serializer that you specified which fields should be available in fo
        serializer = CoinSerializer(user)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant", None)
        montant1 = request.data.get("montant1", None)
        getcoin = Coin.objects.get(user=user)
        if montant:
            if int(getcoin.coins) >= int(montant):
                Coin.objects.filter(user=user).update(coins=F('coins') - montant)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance de coin disponible, veuillez reacharger!!'}, status=status.HTTP_400_BAD_REQUEST)
        if montant1:
            Coin.objects.filter(user=user).update(coins=F('coins') + montant1)
        return JsonResponse({'status': 1, 'message': 'success!!'})


class UserDetailsView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        progression = request.data.get("progression")
        user.progression = user.progression + progression
        user.save()
        if int(user.progression) >= 100:
            user.progression = 0
            user.experience = user.experience + 50
            user.level = user.level + 1
            user.save()
        return JsonResponse({'status': 1, 'message': 'success!!'})

    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = LevelSerializer(user)
        return JsonResponse(serializer.data, safe=False)

class WalletView(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            return None

    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Wallet.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = Wallet.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

        # You have a serializer that you specified which fields should be available in fo
        serializer = WalletSerializer(user)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Profile.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant", None)
        perdre = request.data.get("perdre", None)
        princingId = request.data.get("princingId", None)
        coin = request.data.get("coin", None)
        getwallet = Wallet.objects.get(user=user)
        
        if coin:
            montantan = 25
            kob = int(montantan) * int(coin)
            if int(getwallet.montant) >= int(kob):
                Wallet.objects.filter(user=user).update(montant=F('montant') - kob)
                Coin.objects.filter(user=user).update(coins=F('coins') + coin)
            else:
                return JsonResponse({'status': 0, 'message': 'inssuffisance du capitale'}, status=status.HTTP_400_BAD_REQUEST)
        if perdre and princingId:
            getPrincing = Princing.objects.get(pk=princingId)
            if getPrincing.perdre == 1:
                if int(perdre) == 0:
                    Wallet.objects.filter(user=user).update(montant=F('montant') + getPrincing.gains)
                elif int(perdre) == 1:
                    pourcentage1 = (75 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage1)
                else:
                    print('you wrong!')
            elif getPrincing.perdre == 2:
                if int(perdre) == 0:
                    Wallet.objects.filter(user=user).update(montant=F('montant') + getPrincing.gains)
                elif int(perdre) == 1:
                    pourcentage1 = (80 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage1)
                elif int(perdre) == 2:
                    pourcentage2 = (60 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage2)
                else:
                    print('you wrong!')
            elif getPrincing.perdre == 3:
                if int(perdre) == 0:
                    Wallet.objects.filter(user=user).update(montant=F('montant') + getPrincing.gains)
                elif int(perdre) == 1:
                    pourcentage1 = (80 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage1)
                elif int(perdre) == 2:
                    pourcentage2 = (70 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage2)
                elif int(perdre) == 3:
                    pourcentage3 = (60 / 100) * getPrincing.gains
                    Wallet.objects.filter(user=user).update(montant=F('montant') + pourcentage3)
                else:
                    print('you wrong!')
            else:
                if int(perdre) == 0:
                    Wallet.objects.filter(user=user).update(montant=F('montant') + getPrincing.gains)
                else:
                    print('you wrong!')
        return JsonResponse({'status': 1, 'message': 'success!!'})

class PostInfoView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
        first_name = request.data.get("first_name", None)
        last_name = request.data.get("last_name", None)
        if first_name and last_name:
            user.first_name = first_name
            user.last_name = last_name
            user.is_complete = True
            user.save()
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({'status': 0, 'message': 'errorr system'}, status=status.HTTP_400_BAD_REQUEST)


class ProfileUpdateView(APIView):
    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except:
            return None
            
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Profile.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            print(tokenview)
            user = Profile.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

        # You have a serializer that you specified which fields should be available in fo
        serializer = UserSerializer(user)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
            userProfile = Profile.objects.get(pk=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = User.objects.get(pk=tokenview)
            userProfile = Profile.objects.get(pk=tokenview)
            
        first_name = request.data.get("first_name", None)
        first_name = request.data.get("first_name", None)
        last_name = request.data.get("last_name", None)
        email = request.data.get("email", None)
        phone = request.data.get("phone", None)
        bio = request.data.get("bio", None)
        photo = request.data.get("photo", None)
        if first_name:
            fil = User.objects.filter(first_name=first_name)
            if not fil:
                if phone:
                    user.phone = phone
                if email:
                    user.email = email
                if first_name:
                    user.first_name = first_name
                if last_name:
                    user.last_name = last_name
                if phone:
                    userProfile.phone = phone
                if bio:
                    userProfile.bio = bio
                if photo:
                    userProfile.photo = photo
                user.save()
                userProfile.save()
                return JsonResponse({'status': 1, 'message': 'Your profile updated successfully!'})
            else:
                return JsonResponse({'status': 0, 'message': 'phone existe deja'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if phone:
                user.phone = phone
            if email:
                user.email = email
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            if phone:
                userProfile.phone = phone
            if bio:
                userProfile.bio = bio
            if photo:
                userProfile.photo = photo
            user.save()
            userProfile.save()
            return JsonResponse({'status': 1, 'message': 'Your profile updated successfully!'})
            

class WalletFormView(APIView):
    # Assume you have a model named WalletRequested
    # this method will be used when walletreq try to update or save their wallet
    # for POST requests.
    # def post(self, request, format=None):
    #     pk = request.GET.get('pk', None)
    #     if pk != None:
    #         user = User.objects.get(pk=pk)
    #     else:
    #         token = request.META.get('HTTP_AUTHORIZATION', '').split()
    #         key = token[1].lower()[0:8]
    #         tokenview = get_object_or_404(AuthToken, token_key=key).user.id
    #         user = User.objects.get(pk=tokenview)
    #     montant = request.data.get("montant")
    #     order_id = create_ref_code()
    #     WalletRequested.objects.create(user=user, montant=montant, ref_code=order_id)
    #     moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
    #     payment = moncash.payment(order_id, int(montant))
    #     p = payment.redirect_url
    #     return JsonResponse({'site': p})

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant")
        idtrans = request.data.get("idtrans")
        if idtrans:
            Wallet.objects.filter(user=user).update(recharge_effec=False)
            subject = strftime("Recharge, %Y-%m-%d %H:%M:%S", gmtime())
            messageadmin = "L'utilisateur %s vient juste de faire une recharge, l'ID transaction est (%s) \n veuillez etre sure apres chaque recharge que vous vous occuper \n de mettre le button recharge_effec en True, \n Merci!!!" % (user.first_name, idtrans)
            mail_admins(subject, messageadmin)
            return JsonResponse({'status': 1, 'message': 'wallet success'})
        else:
            return JsonResponse({'status': 0, 'message': 'errorrr!!'}, status=status.HTTP_400_BAD_REQUEST)

class TryView(APIView):
    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
            Wallet.objects.filter(user=user).update(recharge_effec=True)
            return JsonResponse({'status': 1, 'message': 'wallet success'})

class MoncashView(APIView):
    def post(self, request, format=None):
        transaction_id = request.GET['transactionId']
        moncash = moncashify.API(settings.MONCASH_CLIENT_ID, settings.MONCASH_SECRET_KEY)
        transaction = moncash.transaction_details_by_transaction_id(transaction_id)
        if transaction:
            montant = transaction["payment"]["cost"]
            order_id = transaction["payment"]["reference"]
            req = WalletRequested.objects.get(ref_code=order_id, is_complete=False)
            Wallet.objects.filter(user=req.user).update(montant=F('montant') + montant)
            WalletRequested.objects.filter(ref_code=order_id).update(is_complete=True)
            return JsonResponse({'status': 1, 'message': 'wallet success'})
        else:
            return JsonResponse({'status': 0, 'message': 'wallet error'}, status=status.HTTP_400_BAD_REQUEST)

class RetraitView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = Wallet.objects.get(user=pk)
        else:
            # token = request.META.get('HTTP_AUTHORIZATION', '')
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            # tokenview = AuthToken.objects.get(token_key=key).user
            user = Retrait.objects.get(user=tokenview)
        if not user:
            return JsonResponse({'status': 0, 'message': 'User with this id not found'}, status=status.HTTP_400_BAD_REQUEST)

        # You have a serializer that you specified which fields should be available in fo
        serializer = RetraitSerializer(user, many=True)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            user = User.objects.get(pk=tokenview)
        montant = request.data.get("montant")
        moncash_numero = request.data.get("phone")
        Retrait.objects.create(user=user, montant=montant)
        Wallet.objects.filter(user=user).update(montant=F('montant') - montant)
        subject = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        messageadmin = "L'utilisateur %s veut faire un retrait de (%s Gourdes) a son compte moncash (%s) \n veuillez etre sure apres chaque retrait envoyer \n que vous activerez le button envoyer en True" % (user.first_name, montant, moncash_numero)
        mail_admins(subject, messageadmin)
        return JsonResponse({'status': 1, 'message': 'wallet success'})

class QuestionView(APIView):
    def get(self, request, format=None):
        pk = request.GET.get('pk', None)
        if pk != None:
            user = User.objects.get(pk=pk)
        else:
            token = request.META.get('HTTP_AUTHORIZATION', '').split()
            key = token[1].lower()[0:8]
            tokenview = get_object_or_404(AuthToken, token_key=key).user.id
            user = User.objects.get(pk=tokenview)
            nbQ = request.GET.get('nbQ')
            pag = int(nbQ)
            getrandomquestions = questions.objects.filter(is_live=True)
            random_item = random.sample(list(getrandomquestions), pag)

            if not random_item:
                return JsonResponse({'status': 0, 'message': 'no question fund'}, status=status.HTTP_400_BAD_REQUEST)

            # You have a serializer that you specified which fields should be available in fo
            serializer = QuestionSerializer(random_item, many=True)
            # And here we send it those fields to our react component as json
            # Check this json data on React side, parse it, render it as form.
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse({'status': 0, 'message': 'no question fund'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class QuestionLiveView(APIView):
    def get(self, request, format=None):
        quizz_id = request.GET.get('quizz_id')
        qu = request.GET.get('qu')
        page = int(qu)
        ques = questions.objects.filter(quizz_id=quizz_id, is_live=True).order_by('?')[:page]
        if not ques:
            return JsonResponse({'status': 0, 'message': 'no question fund'}, status=status.HTTP_400_BAD_REQUEST)

        # You have a serializer that you specified which fields should be available in fo
        serializer = QuestionSerializer(ques, many=True)
        # And here we send it those fields to our react component as json
        # Check this json data on React side, parse it, render it as form.
        return JsonResponse(serializer.data, safe=False)
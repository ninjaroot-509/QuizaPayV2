from rest_framework import serializers
from quizz_app.models import *
from django.contrib.auth import authenticate, login

class DemandeSerializer(serializers.ModelSerializer):
    from_user_name = serializers.CharField(source='from_user.phone')
    to_user_name = serializers.CharField(source='to_user.phone')
    class Meta:
        model = FriendRequest
        fields = '__all__'
        # read_only_fields = ('user',)

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = '__all__'
        # read_only_fields = ('user',)

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'
        # read_only_fields = ('user',)

class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = '__all__'
        # read_only_fields = ('user',)

class RetraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retrait
        fields = '__all__'
        # read_only_fields = ('user',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    player_name = serializers.CharField(source='user.phone')
    player_avatar = serializers.ImageField(source='user.profile.photo')
    class Meta:
        model = Player
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(read_only=True, many=True)
    class Meta:
        model = Challenge
        fields = '__all__'

class QuizzSerializer(serializers.ModelSerializer):
    cate_image = serializers.ImageField(source='category.image')
    cate_title = serializers.CharField(source='category.title')
    class Meta:
        model = quizzes
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz_image = serializers.ImageField(source='quizz_id.image')
    quiz_name = serializers.CharField(source='quizz_id.name')
    timer_secs = serializers.ReadOnlyField(source='quizz_id.timer_secs')
    cate_image = serializers.ImageField(source='quizz_id.category.image')
    class Meta:
        model = questions
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = results
        ordering = ('-created_at', )
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'password')
        extra_kwargs = {'password': {'write_only':True}}
        # read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField()
    # read_only_fields = ('id',)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Identifiants incorrects")

class WalletRequestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletRequested 
        fields = '__all__'

    
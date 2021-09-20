from rest_framework import serializers
from quizz_app.models import *
from django.contrib.auth import authenticate, login

class DemandeSerializer(serializers.ModelSerializer):
    from_user_first_name = serializers.CharField(source='from_user.first_name')
    from_user_last_name = serializers.CharField(source='from_user.last_name')
    from_user_level = serializers.CharField(source='from_user.level')
    to_user_name = serializers.CharField(source='to_user.first_name')
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

class PrincingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Princing
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    player_name = serializers.CharField(source='user.first_name')
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

class LevelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['progression', 'experience', 'level',]


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

    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    item_title = serializers.CharField(
        source='item.title'
    )
    item_prix = serializers.CharField(
        source='item.prix'
    )
    item_prix_reduction = serializers.CharField(
        source='item.prix_reduction'
    )
    item_get_amount_saved = serializers.CharField(
        source='get_amount_saved'
    )
    item_get_final_price = serializers.CharField(
        source='get_final_price'
    )
    item_image = serializers.ImageField(
        source='item.image'
    )
    class Meta:
        model = OrderItem
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(
        source='category.title'
    )
    etat_display = serializers.CharField(
        source='get_etat_display'
    )
    size_display = serializers.CharField(
        source='get_size_display'
    )
    author_first_name = serializers.CharField(
        source='author.first_name'
    )
    author_last_name = serializers.CharField(
        source='author.last_name'
    )
    author_photo = serializers.CharField(
        source='author.photo.url'
    )
    class Meta:
        model = Item
        fields = '__all__'
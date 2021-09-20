from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.core.mail import send_mail, BadHeaderError, mail_admins
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.html import format_html

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, phone, password, **extra_fields):
        """Create and save a User with the given phone and password."""
        if not phone:
            raise ValueError('The given phone must be set')
        self.phone = phone
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone, password=None, **extra_fields):
        """Create and save a regular User with the given phone and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(phone, password, **extra_fields)

    def create_superuser(self, phone, password, **extra_fields):
        """Create and save a SuperUser with the given phone and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(phone, password, **extra_fields)

class User(AbstractUser):
    username = None
    bio = models.TextField(max_length=500, blank=True)
    phone = PhoneNumberField(unique=True)
    facebook = models.CharField(max_length=250, help_text="example: https://facebook.web/{username}/", null=True, blank=True)
    whatsapp = models.CharField(max_length=250, help_text="example: +50943208550", null=True, blank=True)
    instagram = models.CharField(max_length=250, help_text="example: https://instagram.com/{username}/", null=True, blank=True)
    level = models.IntegerField(default=1, null=False)
    experience = models.IntegerField(default=25, null=False)
    progression = models.IntegerField(default=0, null=False)
    photo = models.ImageField(default='photo.jpg', upload_to='users_pics/', null=True, blank=True)
    friends = models.ManyToManyField("User",blank=True)
    is_complete = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone'

    def photo_preview(self):
        if self.photo:
            return format_html('<img src="{}" width=90px" height="70px"/>',self.photo.url,)
        return None
    
    class Meta:
        verbose_name = 'User Liste'
        verbose_name_plural = 'Listes des utilisateurs'

    def __str__(self):
        return self.first_name


class Princing(models.Model):
    name = models.CharField(max_length=500)
    prix = models.FloatField(default=10)
    perdre = models.IntegerField(default=0)
    nombres_questions = models.IntegerField(default=10)
    gains = models.FloatField(default=250)

    def __str__(self):
        return self.name


class Quest(models.Model):
    icon = models.ImageField(upload_to='quests/icons/')
    cover = models.ImageField(upload_to='quests/cover/')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    gainXP = models.IntegerField(default=20, null=False)
    objectif = models.IntegerField(default=20, null=False)

    def __str__(self):
        return self.title

class Badge(models.Model):
    icon = models.ImageField(upload_to='quests/icons/')
    cover = models.ImageField(upload_to='quests/cover/')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    gainXP = models.IntegerField(default=20, null=False)
    objectif = models.IntegerField(default=20, null=False)

    def __str__(self):
        return self.title

class MyQuest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    objectif = models.IntegerField(default=0, null=False)
    complete_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.quest

class MyBadge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    objectif = models.IntegerField(default=0, null=False)
    complete_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.badge

class FriendRequest(models.Model):
	to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='to_user', on_delete=models.CASCADE)
	from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='from_user', on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return "From {}, to {}".format(self.from_user.first_name, self.to_user.first_name)
        
# def email_new_user(sender, **kwargs):
#     if kwargs["created"]:  # only for new users
#         new_user = kwargs["instance"] 
#         subject = "New user (%s)" % str(sender.first_name)
#         message = "l'utisateur %s vient juste de creer un compte." % sender.first_name
#         mail_admins(subject, message)
# post_save.connect(email_new_user, sender=settings.AUTH_USER_MODEL)

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    description = models.TextField()
    image = models.FileField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Categorie'
        verbose_name_plural = 'Listes des categories'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("category", kwargs={
            'slug': self.slug
        })

class quizzes(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='quiz_images/%Y/%m/%d/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    timer_secs = models.IntegerField(default=20, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_live = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Quiz Liste'
        verbose_name_plural = 'Listes des quizzes'

    def __str__(self):
        return '{} - {}'.format(self.owner.first_name, self.name)

class questions(models.Model):
    quizz_id = models.ForeignKey(quizzes, related_name='quizz_id', on_delete=models.CASCADE)
    question = models.CharField(max_length=300, null=False)
    option_a = models.CharField(max_length=100, null=False)
    option_b = models.CharField(max_length=100, null=False)
    option_c = models.CharField(max_length=100, null=False)
    option_d = models.CharField(max_length=100, null=False)
    image = models.ImageField(null=True, blank=True)
    correct_option = models.CharField(max_length=1, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_live = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Question Liste'
        verbose_name_plural = 'Listes des Questions'

    def __str__(self):
        return '{} - {}'.format(self.quizz_id.name, self.question)

class Challenge(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz = models.ForeignKey(quizzes, on_delete=models.CASCADE, null=True,  blank=True)
    gameID = models.CharField(max_length=10)
    prix = models.FloatField(null=True)
    nombres_questions = models.IntegerField(null=True)
    nombres_tours = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    start = models.BooleanField(default=False)
    end = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Challenge'
        verbose_name_plural = 'Listes des challenges'

    def __str__(self):
        return self.gameID

class Player(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, related_name='players', on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Player Liste'
        verbose_name_plural = 'Listes des players'

    def __str__(self):
        return '{} - {}'.format(self.user, self.score)

class results(models.Model):
    quizz_id = models.ForeignKey(quizzes, on_delete=models.CASCADE, null=True, blank=True)
    player = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    prix = models.IntegerField(default=0)
    gain = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Resultat Liste'
        verbose_name_plural = 'Listes des resultats'

    def __str__(self):
        return '{} - {}'.format(self.player, self.score)

class Wallet(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=35)
    recharge_effec = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Portefeuille Liste'
        verbose_name_plural = 'Listes des portefeuilles'

    def __str__(self):
        return '{} a {} Gourdes'.format(self.user.first_name, self.montant) # TODO

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_wallet(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_wallet(sender, instance, **kwargs):
    instance.wallet.save()

class Coin(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    coins = models.FloatField(default=0)

    class Meta:
        verbose_name = 'Coin'
        verbose_name_plural = 'Coins'

    def __str__(self):
        return '{} a {} coins'.format(self.user.first_name, self.coins) # TODO

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_coin(sender, instance, created, **kwargs):
    if created:
        Coin.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_coin(sender, instance, **kwargs):
    instance.coin.save()

class WalletRequested(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    ref_code = models.CharField(max_length=6)
    is_complete = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Recharge Liste'
        verbose_name_plural = 'Listes des recharges'

    def __str__(self):
        return self.user.first_name # TODO

class WalletTransaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Transaction Liste'
        verbose_name_plural = 'Listes des transactions'

    def __str__(self):
        return '{} a recu {} Gourdes le {}'.format(self.user.first_name, self.montant, self.date) # TODO

    
class Retrait(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    montant = models.FloatField(default=0)
    is_done = models.BooleanField(default=True)
    envoyer = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Retrait Liste'
        verbose_name_plural = 'Listes des retraits'
    
    def __str__(self):
        return '{} a retire {} Gourdes a son portefeuille le {}'.format(self.user.first_name, self.montant, self.date) # TODO

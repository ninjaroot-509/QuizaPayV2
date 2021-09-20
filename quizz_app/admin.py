from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin
# Register your models here.
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = [
        'from_user',
        'to_user',
        'timestamp',
    ]
admin.site.register(FriendRequest, FriendRequestAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = [
        'phone',
        'first_name',
        'last_name',
        'level',
        'experience',
        'bio',
        'photo_preview',
    ]
admin.site.register(User, UserAdmin)


def copy_quiz(modeladmin, request, queryset):
    for object in queryset:
        object.id = None
        object.save()


copy_quiz.short_description = 'Dupliquer quizzes'


class QuestionInline(admin.TabularInline):
    """Tabular Inline View for Product Reviews"""
    model = questions
    
class PlayerInline(admin.TabularInline):
    """Tabular Inline View for Product Reviews"""
    model = Player

class ChallengeAdmin(admin.ModelAdmin):
    inlines = [
        PlayerInline,
    ]
    list_display = ['owner', 'get_count_players', 'nombres_questions', 'created_at', 'end', 'is_active']
    list_filter = ['owner', 'is_active', 'end', 'created_at']
    search_fields = ['owner', 'is_active']
    def get_count_players(self, obj):
        q = Player.objects.filter(challenge=obj.id).count()
        return q
    get_count_players.short_description = 'Nombres de joueurs'
admin.site.register(Challenge, ChallengeAdmin)

class PlayerAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'challenge',
        'score'
    ]
    list_filter = ['user', 'challenge']
    search_fields = ['user',]
admin.site.register(Player, PlayerAdmin)


class QuizAdmin(ImportExportModelAdmin):
    list_editable = ['is_live',]
    list_display = ['name', 'get_count', 'category', 'created_at', 'is_live']

    def get_count(self, obj):
        q = questions.objects.filter(quizz_id=obj.id).count()
        return q
    get_count.short_description = 'Nombres de questions'
    # get_count.admin_order_field = 'book__author'
    
    search_fields = ['name', 'category']
    # prepopulated_fields = {"slug": ("name",)}
    actions = [copy_quiz]
    inlines = [
        QuestionInline,
    ]
admin.site.register(quizzes, QuizAdmin)

class CategoryAdmin(ImportExportModelAdmin):
    list_display = [
        'title',
        'is_active'
    ]
    list_editable = ['is_active',]
    list_filter = ['title', 'is_active']
    search_fields = ['title', 'is_active']
    prepopulated_fields = {"slug": ("title",)}
admin.site.register(Category, CategoryAdmin)

class QuestionAdmin(ImportExportModelAdmin):
    list_display = [
        'quizz_id',
        'question',
    ]
    list_filter = ['quizz_id',]
    search_fields = ['quizz_id',]
admin.site.register(questions, QuestionAdmin)

class ResultAdmin(admin.ModelAdmin):
    list_display = [
        'player',
        'gain',
        'quizz_id',
        'score',
        'total', 
        'created_at'
    ]
    list_filter = ['quizz_id', 'player', 'created_at']
    search_fields = ['quizz_id', 'player']
admin.site.register(results, ResultAdmin)

class WalletAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'recharge_effec',
        'montant',
    ]
    search_fields = ['montant', 'user']
    list_filter = ['user', 'recharge_effec']
admin.site.register(Wallet, WalletAdmin)

class CoinAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'coins',
    ]
    search_fields = ['coins', 'user']
admin.site.register(Coin, CoinAdmin)

class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
    ]
    list_filter = ['date', 'user']
    search_fields = ['montant', 'user', 'date']
admin.site.register(WalletTransaction, WalletTransactionAdmin)

class RetraitAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
        'envoyer',
        'is_done'
    ]
    list_editable = ['is_done',]
    list_filter = ['date', 'user', 'envoyer', 'is_done']
    search_fields = ['montant', 'user', 'date']
admin.site.register(Retrait, RetraitAdmin)

class WalletRequestedAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'montant',
        'is_complete',
        'date'
    ]
    list_filter = ['date', 'user', 'is_complete']
    search_fields = ['montant', 'user', 'date']
admin.site.register(WalletRequested, WalletRequestedAdmin)

@admin.register(Princing)
class PrincingAdmin(admin.ModelAdmin):
    '''Admin View for Princing'''

    list_display = ('name', 'prix', 'perdre', 'nombres_questions', 'gains',)
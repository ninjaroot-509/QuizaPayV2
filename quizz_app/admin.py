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

def make_refund_accepted(modeladmin, request, queryset):
    queryset.update(refund_requested=False, refund_granted=True)


make_refund_accepted.short_description = 'Mettre à jour les commandes de remboursement accordées'


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user',
                    'ordered',
                    'being_delivered',
                    'received',
                    'refund_requested',
                    'refund_granted',
                    'addresse',
                    'coupon'
                    ]
    list_display_links = [
        'user',
        'addresse',
        'coupon'
    ]
    list_filter = ['user',
                   'ordered',
                   'being_delivered',
                   'received',
                   'refund_requested',
                   'refund_granted']
    search_fields = [
        'user__first_name',
        'ref_code'
    ]
    actions = [make_refund_accepted]


class AddressAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'nom',
        'prenom',
        'identification_type',
        'identification_number',
        'quartier_addresse',
        'apartement_addresse',
        'city',
        'is_default'
    ]
    list_filter = ['is_default', 'identification_type']
    search_fields = ['user', 'quartier_addresse','nom','prenom', 'apartement_addresse', 'city']


def copy_items(modeladmin, request, queryset):
    for object in queryset:
        object.id = None
        object.save()


copy_items.short_description = 'Dupliquer produits'


class ItemAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'category',
    ]
    list_filter = ['title', 'category']
    search_fields = ['title', 'category']
    # prepopulated_fields = {"slug": ("title",)}
    actions = [copy_items]

class MarketCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'is_active'
    ]
    list_filter = ['title', 'is_active']
    search_fields = ['title', 'is_active']
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Item, ItemAdmin)
admin.site.register(MarketCategory, MarketCategoryAdmin)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(Coupon)
admin.site.register(Refund)
admin.site.register(BillingAddress, AddressAdmin)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin configuration for User model."""
    
    list_display = [
        'email', 'username', 'first_name', 'last_name', 'is_premium',
        'is_subscription_active', 'date_joined', 'is_active'
    ]
    list_filter = [
        'is_premium', 'is_active', 'is_staff', 'date_joined',
        'subscription_start_date', 'subscription_end_date'
    ]
    search_fields = ['email', 'username', 'first_name', 'last_name', 'telegram_username']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Profile Information', {
            'fields': ('phone_number', 'telegram_username', 'telegram_user_id', 'profile_picture', 'bio')
        }),
        ('Subscription Information', {
            'fields': (
                'is_premium', 'subscription_start_date', 'subscription_end_date',
                'stripe_customer_id', 'stripe_subscription_id'
            )
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Profile Information', {
            'fields': ('email', 'first_name', 'last_name', 'phone_number', 'telegram_username')
        }),
    )
    
    readonly_fields = ['date_joined', 'last_login']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """Admin configuration for UserProfile model."""
    
    list_display = ['user', 'trading_experience', 'timezone', 'created_at']
    list_filter = ['trading_experience', 'created_at', 'updated_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    readonly_fields = ['created_at', 'updated_at']

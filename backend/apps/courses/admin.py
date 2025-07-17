from django.contrib import admin
from .models import Category, Course, Lesson, Enrollment, LessonProgress, CourseReview


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for Category model."""
    
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}


class LessonInline(admin.TabularInline):
    """Inline admin for lessons within course admin."""
    
    model = Lesson
    extra = 0
    fields = ['title', 'lesson_type', 'order', 'is_preview', 'is_published']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """Admin configuration for Course model."""
    
    list_display = [
        'title', 'category', 'instructor', 'difficulty_level',
        'is_premium', 'is_published', 'total_lessons', 'total_enrollments',
        'created_at'
    ]
    list_filter = [
        'category', 'difficulty_level', 'is_premium', 'is_published',
        'created_at', 'published_at'
    ]
    search_fields = ['title', 'description', 'instructor__first_name', 'instructor__last_name']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [LessonInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'short_description', 'category', 'instructor')
        }),
        ('Course Details', {
            'fields': ('difficulty_level', 'duration_hours', 'price', 'is_premium')
        }),
        ('Media', {
            'fields': ('thumbnail', 'preview_video')
        }),
        ('Publishing', {
            'fields': ('is_published', 'published_at')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['published_at']


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """Admin configuration for Lesson model."""
    
    list_display = [
        'title', 'course', 'lesson_type', 'order',
        'is_preview', 'is_published', 'created_at'
    ]
    list_filter = ['lesson_type', 'is_preview', 'is_published', 'course__category']
    search_fields = ['title', 'description', 'course__title']
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('course', 'title', 'slug', 'description', 'lesson_type', 'order')
        }),
        ('Content', {
            'fields': ('content', 'video_url', 'video_duration', 'attachments')
        }),
        ('Settings', {
            'fields': ('is_preview', 'is_published')
        }),
    )


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    """Admin configuration for Enrollment model."""
    
    list_display = [
        'user', 'course', 'progress_percentage', 'is_completed',
        'enrolled_at', 'completed_at'
    ]
    list_filter = ['enrolled_at', 'completed_at', 'course__category']
    search_fields = [
        'user__first_name', 'user__last_name', 'user__email',
        'course__title'
    ]
    readonly_fields = ['enrolled_at']


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    """Admin configuration for LessonProgress model."""
    
    list_display = [
        'user', 'lesson', 'is_completed', 'time_spent',
        'completed_at', 'updated_at'
    ]
    list_filter = ['is_completed', 'completed_at', 'lesson__course__category']
    search_fields = [
        'user__first_name', 'user__last_name', 'user__email',
        'lesson__title', 'lesson__course__title'
    ]


@admin.register(CourseReview)
class CourseReviewAdmin(admin.ModelAdmin):
    """Admin configuration for CourseReview model."""
    
    list_display = [
        'user', 'course', 'rating', 'is_approved',
        'created_at', 'updated_at'
    ]
    list_filter = ['rating', 'is_approved', 'created_at', 'course__category']
    search_fields = [
        'user__first_name', 'user__last_name', 'user__email',
        'course__title', 'review'
    ]
    
    actions = ['approve_reviews', 'disapprove_reviews']
    
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, f"{queryset.count()} reviews approved.")
    approve_reviews.short_description = "Approve selected reviews"
    
    def disapprove_reviews(self, request, queryset):
        queryset.update(is_approved=False)
        self.message_user(request, f"{queryset.count()} reviews disapproved.")
    disapprove_reviews.short_description = "Disapprove selected reviews"

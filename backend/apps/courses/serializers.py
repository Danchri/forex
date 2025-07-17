from rest_framework import serializers
from .models import Category, Course, Lesson, Enrollment, LessonProgress, CourseReview


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for course categories."""
    
    course_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'course_count']
    
    def get_course_count(self, obj):
        return obj.courses.filter(is_published=True).count()


class LessonSerializer(serializers.ModelSerializer):
    """Serializer for course lessons."""
    
    is_completed = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Lesson
        fields = [
            'id', 'title', 'slug', 'description', 'lesson_type', 'order',
            'content', 'video_url', 'video_duration', 'attachments',
            'is_preview', 'is_completed', 'user_progress'
        ]
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                progress = LessonProgress.objects.get(user=request.user, lesson=obj)
                return progress.is_completed
            except LessonProgress.DoesNotExist:
                return False
        return False
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                progress = LessonProgress.objects.get(user=request.user, lesson=obj)
                return {
                    'time_spent': progress.time_spent,
                    'last_position': progress.last_position,
                    'completed_at': progress.completed_at
                }
            except LessonProgress.DoesNotExist:
                return None
        return None


class CourseListSerializer(serializers.ModelSerializer):
    """Serializer for course list view."""
    
    category = CategorySerializer(read_only=True)
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'short_description', 'category',
            'instructor_name', 'difficulty_level', 'duration_hours',
            'price', 'is_premium', 'thumbnail', 'total_lessons',
            'total_enrollments', 'is_enrolled', 'average_rating',
            'created_at', 'published_at'
        ]
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(user=request.user, course=obj).exists()
        return False
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.filter(is_approved=True)
        if reviews.exists():
            return round(sum(review.rating for review in reviews) / reviews.count(), 1)
        return 0


class CourseDetailSerializer(serializers.ModelSerializer):
    """Serializer for course detail view."""
    
    category = CategorySerializer(read_only=True)
    instructor_name = serializers.CharField(source='instructor.full_name', read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'category', 'instructor_name', 'difficulty_level', 'duration_hours',
            'price', 'is_premium', 'thumbnail', 'preview_video',
            'lessons', 'total_lessons', 'total_enrollments',
            'is_enrolled', 'user_progress', 'average_rating', 'review_count',
            'created_at', 'published_at', 'meta_title', 'meta_description'
        ]
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(user=request.user, course=obj).exists()
        return False
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                enrollment = Enrollment.objects.get(user=request.user, course=obj)
                return {
                    'progress_percentage': enrollment.progress_percentage,
                    'enrolled_at': enrollment.enrolled_at,
                    'completed_at': enrollment.completed_at,
                    'is_completed': enrollment.is_completed
                }
            except Enrollment.DoesNotExist:
                return None
        return None
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.filter(is_approved=True)
        if reviews.exists():
            return round(sum(review.rating for review in reviews) / reviews.count(), 1)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.filter(is_approved=True).count()


class EnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for course enrollments."""
    
    course = CourseListSerializer(read_only=True)
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'course', 'enrolled_at', 'completed_at',
            'progress_percentage', 'is_completed'
        ]


class LessonProgressSerializer(serializers.ModelSerializer):
    """Serializer for lesson progress tracking."""
    
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = [
            'id', 'lesson', 'lesson_title', 'is_completed',
            'completed_at', 'time_spent', 'last_position'
        ]


class CourseReviewSerializer(serializers.ModelSerializer):
    """Serializer for course reviews."""
    
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_avatar = serializers.ImageField(source='user.profile_picture', read_only=True)
    
    class Meta:
        model = CourseReview
        fields = [
            'id', 'user_name', 'user_avatar', 'rating', 'review',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user_name', 'user_avatar', 'created_at', 'updated_at']


class CreateCourseReviewSerializer(serializers.ModelSerializer):
    """Serializer for creating course reviews."""
    
    class Meta:
        model = CourseReview
        fields = ['rating', 'review']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['course'] = self.context['course']
        return super().create(validated_data)

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q, Avg
from .models import Category, Course, Lesson, Enrollment, LessonProgress, CourseReview
from .serializers import (
    CategorySerializer, CourseListSerializer, CourseDetailSerializer,
    LessonSerializer, EnrollmentSerializer, LessonProgressSerializer,
    CourseReviewSerializer, CreateCourseReviewSerializer
)


class CategoryListView(generics.ListAPIView):
    """List all active course categories."""
    
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class CourseListView(generics.ListAPIView):
    """List courses with filtering and search."""
    
    serializer_class = CourseListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Course.objects.filter(is_published=True)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by difficulty
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        
        # Filter by premium status
        is_premium = self.request.query_params.get('is_premium')
        if is_premium is not None:
            queryset = queryset.filter(is_premium=is_premium.lower() == 'true')
        
        # Search by title and description
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(short_description__icontains=search)
            )
        
        # Ordering
        ordering = self.request.query_params.get('ordering', '-created_at')
        if ordering in ['title', '-title', 'created_at', '-created_at', 'price', '-price']:
            queryset = queryset.order_by(ordering)
        
        return queryset


class CourseDetailView(generics.RetrieveAPIView):
    """Get course details."""
    
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def enroll_course(request, course_slug):
    """Enroll user in a course."""
    
    course = get_object_or_404(Course, slug=course_slug, is_published=True)
    
    # Check if course is premium and user has active subscription
    if course.is_premium and not request.user.is_subscription_active:
        return Response(
            {'error': 'Premium subscription required for this course.'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Check if already enrolled
    enrollment, created = Enrollment.objects.get_or_create(
        user=request.user,
        course=course
    )
    
    if created:
        return Response(
            {'message': 'Successfully enrolled in course.'},
            status=status.HTTP_201_CREATED
        )
    else:
        return Response(
            {'message': 'Already enrolled in this course.'},
            status=status.HTTP_200_OK
        )


class UserEnrollmentsView(generics.ListAPIView):
    """List user's course enrollments."""
    
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user).order_by('-enrolled_at')


class LessonDetailView(generics.RetrieveAPIView):
    """Get lesson details."""
    
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        course_slug = self.kwargs['course_slug']
        lesson_slug = self.kwargs['lesson_slug']
        
        lesson = get_object_or_404(
            Lesson,
            course__slug=course_slug,
            slug=lesson_slug,
            is_published=True
        )
        
        # Check if user has access to this lesson
        if not lesson.is_preview:
            # Check if user is enrolled in the course
            if not Enrollment.objects.filter(user=self.request.user, course=lesson.course).exists():
                # Check if course is premium and user has subscription
                if lesson.course.is_premium and not self.request.user.is_subscription_active:
                    raise PermissionError("Premium subscription required.")
        
        return lesson


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_lesson_progress(request, course_slug, lesson_slug):
    """Update user's progress for a specific lesson."""
    
    lesson = get_object_or_404(
        Lesson,
        course__slug=course_slug,
        slug=lesson_slug,
        is_published=True
    )
    
    # Check if user is enrolled
    enrollment = get_object_or_404(Enrollment, user=request.user, course=lesson.course)
    
    # Get or create lesson progress
    progress, created = LessonProgress.objects.get_or_create(
        user=request.user,
        lesson=lesson,
        enrollment=enrollment
    )
    
    # Update progress data
    data = request.data
    if 'is_completed' in data:
        progress.is_completed = data['is_completed']
        if progress.is_completed and not progress.completed_at:
            from django.utils import timezone
            progress.completed_at = timezone.now()
    
    if 'time_spent' in data:
        progress.time_spent = data['time_spent']
    
    if 'last_position' in data:
        progress.last_position = data['last_position']
    
    progress.save()
    
    # Update overall course progress
    total_lessons = lesson.course.lessons.filter(is_published=True).count()
    completed_lessons = LessonProgress.objects.filter(
        enrollment=enrollment,
        is_completed=True
    ).count()
    
    if total_lessons > 0:
        enrollment.progress_percentage = int((completed_lessons / total_lessons) * 100)
        if enrollment.progress_percentage == 100 and not enrollment.completed_at:
            from django.utils import timezone
            enrollment.completed_at = timezone.now()
        enrollment.save()
    
    return Response(LessonProgressSerializer(progress).data)


class CourseReviewListView(generics.ListAPIView):
    """List course reviews."""
    
    serializer_class = CourseReviewSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        course_slug = self.kwargs['course_slug']
        course = get_object_or_404(Course, slug=course_slug)
        return CourseReview.objects.filter(course=course, is_approved=True).order_by('-created_at')


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_course_review(request, course_slug):
    """Create a course review."""
    
    course = get_object_or_404(Course, slug=course_slug)
    
    # Check if user is enrolled in the course
    if not Enrollment.objects.filter(user=request.user, course=course).exists():
        return Response(
            {'error': 'You must be enrolled in this course to leave a review.'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Check if user already reviewed this course
    if CourseReview.objects.filter(user=request.user, course=course).exists():
        return Response(
            {'error': 'You have already reviewed this course.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    serializer = CreateCourseReviewSerializer(
        data=request.data,
        context={'request': request, 'course': course}
    )
    serializer.is_valid(raise_exception=True)
    review = serializer.save()
    
    return Response(
        CourseReviewSerializer(review).data,
        status=status.HTTP_201_CREATED
    )

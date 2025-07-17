from django.urls import path
from . import views

urlpatterns = [
    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Courses
    path('', views.CourseListView.as_view(), name='course-list'),
    path('<slug:slug>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('<slug:course_slug>/enroll/', views.enroll_course, name='course-enroll'),
    
    # User enrollments
    path('my/enrollments/', views.UserEnrollmentsView.as_view(), name='user-enrollments'),
    
    # Lessons
    path('<slug:course_slug>/lessons/<slug:lesson_slug>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    path('<slug:course_slug>/lessons/<slug:lesson_slug>/progress/', views.update_lesson_progress, name='lesson-progress'),
    
    # Reviews
    path('<slug:course_slug>/reviews/', views.CourseReviewListView.as_view(), name='course-reviews'),
    path('<slug:course_slug>/reviews/create/', views.create_course_review, name='create-course-review'),
]

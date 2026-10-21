import CourseModel from '../models/Course.js';
import EnrollmentModel from '../models/Enrollment.js';

export const getCourses = async (req, res, next) => {
  try {
    const { category, search, level } = req.query;
    const query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.search = search;
    }
    if (level && level !== 'All') {
      query.level = level;
    }

    const courses = await CourseModel.find(query);

    // Return sanitized courses list with summary
    const sanitized = courses.map(course => ({
      _id: course._id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      level: course.level,
      price: course.price,
      originalPrice: course.originalPrice,
      currency: course.currency,
      thumbnail: course.thumbnail,
      badge: course.badge,
      rating: course.rating,
      reviewsCount: course.reviewsCount,
      studentsCount: course.studentsCount,
      durationHours: course.durationHours,
      lecturesCount: course.lecturesCount,
      instructor: course.instructor,
      published: course.published
    }));

    res.status(200).json({
      success: true,
      count: sanitized.length,
      courses: sanitized
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    let isEnrolled = false;
    let enrollment = null;

    if (req.user) {
      enrollment = await EnrollmentModel.findOne({
        userId: req.user._id,
        courseId: course._id,
        status: 'active'
      });
      if (enrollment) {
        isEnrolled = true;
      }
    }

    // Protect paid video lessons if not enrolled
    const sanitizedModules = (course.modules || []).map(mod => ({
      _id: mod._id,
      title: mod.title,
      lessons: (mod.lessons || []).map(les => ({
        _id: les._id,
        title: les.title,
        duration: les.duration,
        durationSec: les.durationSec,
        isFreePreview: les.isFreePreview,
        summary: les.summary,
        // Only disclose private video URLs if free preview or student is verified enrolled
        videoUrl: (les.isFreePreview || isEnrolled) ? les.videoUrl : null
      }))
    }));

    res.status(200).json({
      success: true,
      course: {
        ...course,
        modules: sanitizedModules,
        isEnrolled,
        enrollmentId: enrollment?._id || null,
        progress: enrollment?.progress || null
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseClassroom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const course = await CourseModel.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Verify enrollment
    const enrollment = await EnrollmentModel.findOne({
      userId,
      courseId: course._id,
      status: 'active'
    });

    if (!enrollment && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted: You are not enrolled in this course. Please complete payment and enrollment to access classroom video lessons.'
      });
    }

    // Full access granted with authorized video streaming URLs
    res.status(200).json({
      success: true,
      course: {
        _id: course._id,
        title: course.title,
        subtitle: course.subtitle,
        instructor: course.instructor,
        modules: course.modules,
        category: course.category
      },
      enrollment: enrollment || {
        _id: 'admin_bypass_' + Date.now(),
        progress: { completedLessons: [], lastWatchedLessonId: null, percent: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.title || !data.price) {
      return res.status(400).json({ success: false, message: 'Course title and price are required.' });
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const course = await CourseModel.create({ ...data, slug });

    res.status(201).json({
      success: true,
      message: 'Course created successfully!',
      course
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await CourseModel.findByIdAndUpdate(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully!',
      course: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await CourseModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
};

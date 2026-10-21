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
    const userId = req.user?._id;

    const course = await CourseModel.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Verify enrollment
    let enrollment = null;
    let isEnrolled = false;

    if (userId) {
      enrollment = await EnrollmentModel.findOne({
        userId,
        courseId: course._id,
        status: 'active'
      });
      if (enrollment || req.user.role === 'admin') {
        isEnrolled = true;
      }
    }

    // Standard 10-video curriculum generator per course
    const rawModules = (course.modules && course.modules.reduce((cnt, m) => cnt + (m.lessons?.length || 0), 0) >= 10)
      ? course.modules
      : [
          {
            _id: 'mod_1',
            title: 'Module 1: Foundations & Architecture (3 Lessons)',
            lessons: [
              {
                _id: 'les_01',
                title: `01. Introduction to ${course.title}`,
                duration: '14 min',
                durationSec: 840,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: true,
                summary: 'Core concepts, practical syllabus roadmap, and software prerequisites.'
              },
              {
                _id: 'les_02',
                title: '02. System Design & Architectural Patterns',
                duration: '18 min',
                durationSec: 1080,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Deconstructing component hierarchy, data flow, and state machines.'
              },
              {
                _id: 'les_03',
                title: '03. Local Environment & Modern Toolchain Setup',
                duration: '16 min',
                durationSec: 960,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Configuring IDE, dependencies, package managers, and secret keys.'
              }
            ]
          },
          {
            _id: 'mod_2',
            title: 'Module 2: Practical Core Engineering (4 Lessons)',
            lessons: [
              {
                _id: 'les_04',
                title: '04. Building Real-Time Streaming & Interactive Pipelines',
                duration: '22 min',
                durationSec: 1320,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Event-driven communication, websockets, and asynchronous workers.'
              },
              {
                _id: 'les_05',
                title: '05. Data Persistence, Indexing & Memory Management',
                duration: '25 min',
                durationSec: 1500,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Relational & vector databases, indexing strategies, and caching layers.'
              },
              {
                _id: 'les_06',
                title: '06. Production Security, Validation & Error Guardrails',
                duration: '19 min',
                durationSec: 1140,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Input sanitation, JWT authentication, rate limiting, and CORS security.'
              },
              {
                _id: 'les_07',
                title: '07. High-Performance Optimization & Benchmark Auditing',
                duration: '21 min',
                durationSec: 1260,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Memory leak profiling, code splitting, and sub-100ms response targets.'
              }
            ]
          },
          {
            _id: 'mod_3',
            title: 'Module 3: Monetization, Cloud Deployment & Certification (3 Lessons)',
            lessons: [
              {
                _id: 'les_08',
                title: '08. Integrating Razorpay Payments & Webhook Idempotency',
                duration: '26 min',
                durationSec: 1560,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Capturing payments, verifying digital signatures, and automated GST billing.'
              },
              {
                _id: 'les_09',
                title: '09. Dockerizing Applications & Deploying to Cloud Production',
                duration: '24 min',
                durationSec: 1440,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Multi-stage Dockerfiles, reverse proxy Nginx, and SSL certificate setup.'
              },
              {
                _id: 'les_10',
                title: '10. Final Capstone Project Review & Verifiable Certification',
                duration: '28 min',
                durationSec: 1680,
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: false,
                summary: 'Graduation capstone walkthrough, career portfolio tips, and certificate issuance.'
              }
            ]
          }
        ];

    // Prepare modules with Coursera model: "1st video 100% free, next 9 lessons locked behind payment"
    let firstLessonFound = false;
    const processedModules = rawModules.map((mod, mIdx) => ({
      ...mod,
      lessons: (mod.lessons || []).map((lesson, lIdx) => {
        // If enrolled / paid: all 10 lessons are 100% unlocked with playable video!
        if (isEnrolled) {
          return {
            ...lesson,
            isLocked: false,
            isFreePreview: mIdx === 0 && lIdx === 0,
            videoUrl: lesson.videoUrl || course.previewVideoUrl || '/videos/gemini_generated_video_323b2790.mp4'
          };
        }

        // If not enrolled: ONLY the very 1st lesson of the entire course is FREE!
        if (!firstLessonFound) {
          firstLessonFound = true;
          return {
            ...lesson,
            isLocked: false,
            isFreePreview: true,
            videoUrl: lesson.videoUrl || course.previewVideoUrl || '/videos/gemini_generated_video_323b2790.mp4'
          };
        }

        // Lessons 2 to 10 are locked behind payment
        return {
          ...lesson,
          isLocked: true,
          isFreePreview: false,
          videoUrl: null // Secure: actual video URL hidden until paid enrollment
        };
      })
    }));

    res.status(200).json({
      success: true,
      isEnrolled,
      course: {
        _id: course._id,
        title: course.title,
        subtitle: course.subtitle,
        instructor: course.instructor,
        price: course.price,
        originalPrice: course.originalPrice,
        currency: course.currency || 'INR',
        thumbnail: course.thumbnail,
        category: course.category,
        modules: processedModules
      },
      enrollment: enrollment || {
        _id: 'guest_preview',
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

import EnrollmentModel from '../models/Enrollment.js';
import CourseModel from '../models/Course.js';
import UserModel from '../models/User.js';

export const getMyEnrollments = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const enrollments = await EnrollmentModel.find({ userId });

    // Populate course details
    const populated = await Promise.all(
      enrollments.map(async (enr) => {
        const course = await CourseModel.findById(enr.courseId);
        return {
          _id: enr._id,
          courseId: enr.courseId,
          amountPaid: enr.amountPaid,
          invoiceNumber: enr.invoiceNumber,
          status: enr.status,
          progress: enr.progress,
          certificate: enr.certificate,
          enrolledAt: enr.enrolledAt,
          course: course ? {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            thumbnail: course.thumbnail,
            instructor: course.instructor,
            category: course.category,
            durationHours: course.durationHours,
            lecturesCount: course.lecturesCount,
            modulesCount: (course.modules || []).length
          } : null
        };
      })
    );

    res.status(200).json({
      success: true,
      enrollments: populated
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { courseId, lessonId, completed } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({ success: false, message: 'courseId and lessonId are required.' });
    }

    const enrollment = await EnrollmentModel.findOne({ userId, courseId, status: 'active' });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Active enrollment not found for this course.' });
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Calculate total lessons in course
    let allLessonIds = [];
    (course.modules || []).forEach(m => {
      (m.lessons || []).forEach(l => {
        allLessonIds.push(l._id);
      });
    });
    const totalLessons = allLessonIds.length || 1;

    let completedList = new Set(enrollment.progress?.completedLessons || []);
    if (completed) {
      completedList.add(lessonId);
    } else {
      completedList.delete(lessonId);
    }

    const completedArr = Array.from(completedList);
    const percent = Math.min(100, Math.round((completedArr.length / totalLessons) * 100));

    let certificate = enrollment.certificate || {};
    let status = enrollment.status;

    if (percent === 100) {
      status = 'completed';
      if (!certificate.certificateId) {
        certificate = {
          certificateId: 'CERT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          issuedAt: new Date().toISOString(),
          eligible: true
        };
      }
    }

    const updated = await EnrollmentModel.findByIdAndUpdate(enrollment._id, {
      status,
      progress: {
        completedLessons: completedArr,
        lastWatchedLessonId: lessonId,
        percent
      },
      certificate
    });

    res.status(200).json({
      success: true,
      message: 'Lesson progress updated successfully!',
      progress: updated.progress,
      certificate: updated.certificate,
      status: updated.status
    });
  } catch (error) {
    next(error);
  }
};

export const getCertificate = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const enrollment = await EnrollmentModel.findOne({ userId, courseId });
    if (!enrollment || enrollment.progress?.percent < 100) {
      return res.status(400).json({
        success: false,
        message: 'Certificate not available yet. Complete all lessons to unlock your certificate.'
      });
    }

    const course = await CourseModel.findById(courseId);
    const user = await UserModel.findById(userId);

    res.status(200).json({
      success: true,
      certificate: {
        certificateId: enrollment.certificate?.certificateId || 'CERT-LIVE-2026',
        studentName: user?.name || req.user.name,
        courseTitle: course?.title || 'Professional Certification',
        instructorName: course?.instructor?.name || 'Dr. Elena Vance',
        issuedAt: enrollment.certificate?.issuedAt || new Date().toISOString(),
        issuer: 'LearnFlow Academy & WebinarFlow Verification Engine',
        skills: course?.whatYouWillLearn || []
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await EnrollmentModel.find({});
    const populated = await Promise.all(
      enrollments.map(async (enr) => {
        const course = await CourseModel.findById(enr.courseId);
        const user = await UserModel.findById(enr.userId);
        return {
          ...enr,
          courseTitle: course?.title || 'Unknown Course',
          studentName: user?.name || 'Student',
          studentEmail: user?.email || 'N/A'
        };
      })
    );

    res.status(200).json({
      success: true,
      enrollments: populated
    });
  } catch (error) {
    next(error);
  }
};

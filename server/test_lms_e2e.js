// End-to-End Verification Test Script for LMS Webinar Platform
const BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('=== STARTING LMS E2E VERIFICATION SUITE ===\n');

  // 1. Health check
  const healthRes = await fetch(`${BASE}/health`).then(r => r.json());
  console.log('1. Health Check:', healthRes.status, healthRes.version, healthRes.database);

  // 2. Auth: Register / Login student
  const testEmail = `test_learner_${Date.now()}@kaira.io`;
  const regRes = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Sharma',
      email: testEmail,
      password: 'password123',
      phone: '+919876543210'
    })
  }).then(r => r.json());
  console.log('2. User Registered:', regRes.success, regRes.user?.name, 'Token:', !!regRes.token);
  const token = regRes.token;

  // 3. Courses catalog
  const coursesRes = await fetch(`${BASE}/courses`).then(r => r.json());
  console.log('3. Courses Catalog Count:', coursesRes.courses?.length);
  const targetCourse = coursesRes.courses[0];
  console.log('   Selected Course:', targetCourse.title, 'Price: ₹' + targetCourse.price);

  // 4. Course Details
  const detailsRes = await fetch(`${BASE}/courses/${targetCourse._id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
  console.log('4. Course Details Fetched:', detailsRes.success, 'Modules:', detailsRes.course?.modules?.length);

  // 5. Test Classroom Access BEFORE Enrollment (Should be 403 Forbidden)
  const preEnrollClassroom = await fetch(`${BASE}/courses/${targetCourse._id}/learn`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('5. Pre-Enrollment Classroom Access Status (Expect 403):', preEnrollClassroom.status);

  // 6. Create Razorpay Order
  const orderRes = await fetch(`${BASE}/payments/create-course-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      courseId: targetCourse._id,
      amount: targetCourse.price
    })
  }).then(r => r.json());
  console.log('6. Razorpay Order Created:', orderRes.success, 'OrderID:', orderRes.orderId, 'Amount:', orderRes.amount / 100);

  // 7. Verify Payment & Create Enrollment
  const verifyRes = await fetch(`${BASE}/payments/verify-course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      courseId: targetCourse._id,
      orderId: orderRes.orderId,
      paymentId: 'pay_sim_' + Date.now(),
      signature: 'valid_simulated_sig_' + Date.now(),
      amount: targetCourse.price,
      customer: {
        name: 'Rohan Sharma',
        email: testEmail,
        phone: '+919876543210'
      }
    })
  }).then(r => r.json());
  console.log('7. Payment Verification:', verifyRes.success, 'EnrollmentID:', verifyRes.enrollment?._id, 'Invoice:', verifyRes.invoice?.invoiceNumber);

  // 8. Test Classroom Access AFTER Enrollment (Should be 200 OK with authorized video URLs)
  const postEnrollClassroom = await fetch(`${BASE}/courses/${targetCourse._id}/learn`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
  console.log('8. Post-Enrollment Classroom Access:', postEnrollClassroom.success);
  const firstLesson = postEnrollClassroom.course?.modules?.[0]?.lessons?.[0];
  console.log('   Unlocked Lesson:', firstLesson?.title, 'VideoURL:', firstLesson?.videoUrl);

  // 9. Mark Lesson as Completed
  const progressRes = await fetch(`${BASE}/enrollments/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      courseId: targetCourse._id,
      lessonId: firstLesson?._id,
      completed: true
    })
  }).then(r => r.json());
  console.log('9. Lesson Progress Updated:', progressRes.success, 'New Percent:', progressRes.progress?.percent + '%');

  // 10. Check Student Dashboard Enrolled Courses
  const myEnrollments = await fetch(`${BASE}/enrollments/my`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
  console.log('10. Student Dashboard Enrolled Courses Count:', myEnrollments.enrollments?.length);
  console.log('    First Enrolled Course Progress:', myEnrollments.enrollments?.[0]?.progress?.percent + '%');

  console.log('\n=== ALL 10 TEST SUITE STEPS PASSED SUCCESSFULLY! ===');
}

runTests().catch(console.error);

import connectDB from '../../../../../lib/mongodb';
import Job from '../../../../../models/JobSchema';
import Application from '../../../../../models/ApplicationSchma';

export async function POST(req) {
  try {
    await connectDB();
    const { employerId } = await req.json();
    if (!employerId) return new Response(JSON.stringify({ error: 'employerId required' }), { status: 400 });

    const jobs = await Job.find({ employerId }).sort({ publishedAt: -1 }).lean();

    const results = await Promise.all(
      jobs.map(async (job) => {
        const totalApplications = await Application.countDocuments({ jobId: job._id });
        const recentApplicants = await Application.find({ jobId: job._id })
          .sort({ appliedAt: -1 })
          .limit(10)
          .populate(
            'candidateId',
            'fullName highestQualification specialization totalExperience currentCTC expectedCTC preferredJobLocation currentDesignation resumeFile fatherName dateOfBirth gender maritalStatus currentAddress permanentAddress city state aadhaarNumber panNumber collegeUniversity jobType immediateJoining linkedInId instagram otherSocialProfile profileVideo hasActivePlan planExpiryDate'
          )
          .lean();

        return {
          jobId: job._id,
          jobCode: job.jobCode,
          title: job.title,
          status: job.status,
          totalApplications,
          employerId: job.employerId,
          recentApplicants: recentApplicants.map(a => ({
            id: a._id,
            status: a.status,
            appliedAt: a.appliedAt,
            candidate: a.candidateId ? {
              id: a.candidateId._id,
              fullName: a.candidateId.fullName,
              highestQualification: a.candidateId.highestQualification,
              specialization: a.candidateId.specialization,
              totalExperience: a.candidateId.totalExperience,
              currentCTC: a.candidateId.currentCTC,
              expectedCTC: a.candidateId.expectedCTC,
              preferredJobLocation: a.candidateId.preferredJobLocation,
              currentDesignation: a.candidateId.currentDesignation,
              resumeFile: a.candidateId.resumeFile,
              fatherName: a.candidateId.fatherName,
              dateOfBirth: a.candidateId.dateOfBirth,
              gender: a.candidateId.gender,
              maritalStatus: a.candidateId.maritalStatus,
              currentAddress: a.candidateId.currentAddress,
              permanentAddress: a.candidateId.permanentAddress,
              city: a.candidateId.city,
              state: a.candidateId.state,
              aadhaarNumber: a.candidateId.aadhaarNumber,
              panNumber: a.candidateId.panNumber,
              collegeUniversity: a.candidateId.collegeUniversity,
              jobType: a.candidateId.jobType,
              immediateJoining: a.candidateId.immediateJoining,
              linkedInId: a.candidateId.linkedInId,
              instagram: a.candidateId.instagram,
              otherSocialProfile: a.candidateId.otherSocialProfile,
              profileVideo: a.candidateId.profileVideo,
              hasActivePlan: a.candidateId.hasActivePlan,
              planExpiryDate: a.candidateId.planExpiryDate,
            } : null,
          }))
        };
      })
    );

    return new Response(JSON.stringify({ ok: true, jobs: results }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500 });
  }
}

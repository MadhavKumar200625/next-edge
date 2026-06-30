import connectDB from '../../../../lib/mongodb';
import Job from '../../../../models/JobSchema';
import Employer from '../../../../models/EmployerSchema';
import { requireAdmin } from '../../../../lib/adminAuth';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      positionName,
      department,
      companyLogo,
      location,
      city,
      state,
      workMode,
      employmentType,
      industry,
      experienceMin,
      experienceMax,
      salaryMin,
      salaryMax,
      vacancies,
      skillsRequired,
      qualificationRequired,
      preferredCandidates,
      noticePeriod,
      description,
      responsibilities,
      requirements,
      benefits,
      companyName,
      hrName,
      hrNumber,
      salaryRange,
      workingDays,
      shiftTiming,
      cabFacility,
      mealFacility,
      requiredSoftwareTools,
      languagesRequired,
      interviewProcess,
      employerId,
    } = body;

    const finalTitle = title || positionName;

    if (!finalTitle || !description) {
      return new Response(JSON.stringify({ error: 'position name and description required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const hasEmployerId = Boolean(employerId);
    let employerObjectId;
    let employer;

    if (employerId && mongoose.Types.ObjectId.isValid(employerId)) {
      employerObjectId = new mongoose.Types.ObjectId(employerId);
      employer = await Employer.findById(employerObjectId).lean();
      if (!employer) {
        return new Response(JSON.stringify({ error: 'Employer not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
    } else if (employerId) {
      return new Response(JSON.stringify({ error: 'Invalid employer id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    } else {
      employerObjectId = new mongoose.Types.ObjectId();
    }

    let publishNow = false;
    if (!hasEmployerId) {
      const { error } = await requireAdmin(req);
      if (error) return error;
      publishNow = true;
    } else if (body.publishNow === true) {
      const { admin } = await requireAdmin(req);
      publishNow = Boolean(admin);
    }

    const doc = {
      employerId: employerObjectId,
      jobCode: `JOB-${Date.now()}`,
      title: finalTitle,
      positionName: positionName || finalTitle,
      department: department || '',
      hrName: hrName || '',
      hrNumber: hrNumber || '',
      // ensure companyName is non-empty to satisfy schema validation
      companyName: companyName && String(companyName).trim() ? String(companyName).trim() : (employer?.companyName || employer?.fullName || 'Confidential Employer'),
      companyLogo: companyLogo || '',
      location: location || '',
      city: city || '',
      state: state || '',
      workMode: workMode || 'Onsite',
      employmentType: employmentType || 'Full Time',
      industry: industry || '',
      experienceMin: Number(experienceMin) || 0,
      experienceMax: Number(experienceMax) || 0,
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      salaryRange: salaryRange || '',
      vacancies: Number(vacancies) || 1,
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : (skillsRequired ? String(skillsRequired).split(',').map(s=>s.trim()).filter(Boolean) : []),
      qualificationRequired: qualificationRequired || '',
      preferredCandidates: preferredCandidates || '',
      noticePeriod: noticePeriod || '',
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? String(requirements).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      benefits: Array.isArray(benefits) ? benefits : (benefits ? String(benefits).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      workingDays: workingDays || '',
      shiftTiming: shiftTiming || '',
      cabFacility: cabFacility || '',
      mealFacility: mealFacility || '',
      requiredSoftwareTools: requiredSoftwareTools || '',
      languagesRequired: Array.isArray(languagesRequired) ? languagesRequired : (languagesRequired ? String(languagesRequired).split(',').map(s=>s.trim()).filter(Boolean) : []),
      interviewProcess: interviewProcess || '',
      status: publishNow ? 'active' : 'draft',
      isActive: publishNow,
      publishedAt: publishNow ? new Date() : null,
    };

    const created = await Job.create(doc);

    if (employer) {
      await Employer.updateOne(
        { _id: employer._id },
        { $inc: { totalJobsPosted: 1, activeJobsCount: publishNow ? 1 : 0 } }
      );
    }

    return new Response(JSON.stringify({ ok: true, job: { id: created._id, jobCode: created.jobCode, title: created.title, isActive: created.isActive, status: created.status } }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

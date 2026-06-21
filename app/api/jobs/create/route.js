import connectDB from '../../../../lib/mongodb';
import Job from '../../../../models/JobSchema';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
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
      description,
      responsibilities,
      requirements,
      benefits,
      employerId,
    } = body;

    if (!title || !description) {
      return new Response(JSON.stringify({ error: 'title and description required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let employerObjectId;
    if (employerId && mongoose.Types.ObjectId.isValid(employerId)) {
      employerObjectId = new mongoose.Types.ObjectId(employerId);
    } else {
      employerObjectId = new mongoose.Types.ObjectId();
    }

    const doc = {
      employerId: employerObjectId,
      jobCode: `JOB-${Date.now()}`,
      title,
      department: department || '',
      // ensure companyName is non-empty to satisfy schema validation
      companyName: body.companyName && String(body.companyName).trim() ? String(body.companyName).trim() : 'Confidential Employer',
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
      vacancies: Number(vacancies) || 1,
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : (skillsRequired ? String(skillsRequired).split(',').map(s=>s.trim()).filter(Boolean) : []),
      qualificationRequired: qualificationRequired || '',
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? String(requirements).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      benefits: Array.isArray(benefits) ? benefits : (benefits ? String(benefits).split('\n').map(s=>s.trim()).filter(Boolean) : []),
      status: 'active',
      isActive: true,
    };

    const created = await Job.create(doc);

    return new Response(JSON.stringify({ ok: true, job: { id: created._id, jobCode: created.jobCode, title: created.title } }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

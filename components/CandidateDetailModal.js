"use client";

export default function CandidateDetailModal({ candidate, onClose }) {
  if (!candidate) return null;

  const formatDate = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-[0_40px_120px_rgba(15,23,42,0.2)]">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0D1630]">Candidate Details</h2>
            <p className="mt-1 text-sm text-gray-600">Full profile without email or phone.</p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            Close
          </button>
        </div>

        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-5 shadow-sm">
            <div className="text-lg font-semibold text-[#0D1630]">{candidate.fullName || 'Candidate'}</div>
            <div className="mt-2 text-sm text-gray-600">Applied details and profile overview.</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow label="Father's Name" value={candidate.fatherName} />
            <DetailRow label="Date of Birth" value={formatDate(candidate.dateOfBirth)} />
            <DetailRow label="Gender" value={candidate.gender} />
            <DetailRow label="Marital Status" value={candidate.maritalStatus} />
            <DetailRow label="Current Address" value={candidate.currentAddress} />
            <DetailRow label="Permanent Address" value={candidate.permanentAddress} />
            <DetailRow label="City" value={candidate.city} />
            <DetailRow label="State" value={candidate.state} />
            <DetailRow label="Aadhaar Number" value={candidate.aadhaarNumber} />
            <DetailRow label="PAN Number" value={candidate.panNumber} />
            <DetailRow label="Highest Qualification" value={candidate.highestQualification} />
            <DetailRow label="Specialization" value={candidate.specialization} />
            <DetailRow label="Passing Year" value={candidate.passingYear} />
            <DetailRow label="College / University" value={candidate.collegeUniversity} />
            <DetailRow label="Current Company" value={candidate.currentCompany} />
            <DetailRow label="Current Organization" value={candidate.currentOrganization} />
            <DetailRow label="Current Designation" value={candidate.currentDesignation} />
            <DetailRow label="Total Experience" value={candidate.totalExperience ? `${candidate.totalExperience} years` : 'N/A'} />
            <DetailRow label="Current CTC" value={candidate.currentCTC ? `₹${candidate.currentCTC}` : 'N/A'} />
            <DetailRow label="Expected CTC" value={candidate.expectedCTC ? `₹${candidate.expectedCTC}` : 'N/A'} />
            <DetailRow label="Notice Period" value={candidate.noticePeriod} />
            <DetailRow label="Reason for Job Change" value={candidate.reasonForJobChange} />
            <DetailRow label="Preferred Job Location" value={candidate.preferredJobLocation} />
            <DetailRow label="Job Type" value={candidate.jobType} />
            <DetailRow label="Immediate Joining" value={candidate.immediateJoining ? 'Yes' : 'No'} />
            <DetailRow label="LinkedIn" value={candidate.linkedInId} />
            <DetailRow label="Instagram" value={candidate.instagram} />
            <DetailRow label="Other Social" value={candidate.otherSocialProfile} />
            <DetailRow label="Profile Video" value={candidate.profileVideo ? 'Provided' : 'Not provided'} />
            <DetailRow label="Active Plan" value={candidate.hasActivePlan ? 'Yes' : 'No'} />
            <DetailRow label="Plan Expiry" value={formatDate(candidate.planExpiryDate)} />
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-[#0D1630]">Resume / CV</h3>
            {candidate.resumeFile ? (
              <a
                href={candidate.resumeFile}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#6F925C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5c7f4f] sm:w-auto"
              >
                Open CV
              </a>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No CV link available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-sm text-gray-800">{value || 'N/A'}</p>
    </div>
  );
}

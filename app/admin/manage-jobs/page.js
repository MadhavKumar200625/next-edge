import AdminJobTable from "../components/AdminJobTable";

export const metadata = {
  title: "Manage Jobs",
};

export default function ManageJobsPage() {
  return (
    <AdminJobTable
      initialStatus="all"
      title="Manage Jobs"
      subtitle="View active and inactive jobs, approve employer submissions, deactivate listings, or delete jobs as a super admin."
    />
  );
}

import AdminJobTable from "../components/AdminJobTable";

export const metadata = {
  title: "Inactive Jobs",
};

export default function InactiveJobsPage() {
  return (
    <AdminJobTable
      initialStatus="inactive"
      title="Inactive Jobs"
      subtitle="Review employer-submitted jobs and activate the listings that are ready to publish."
    />
  );
}

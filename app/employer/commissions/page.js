import { Suspense } from 'react';
import EmployerCommissionsClient from './EmployerCommissionsClient';

export default function EmployerCommissionsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl p-6">Loading commissions…</div>}>
      <EmployerCommissionsClient />
    </Suspense>
  );
}

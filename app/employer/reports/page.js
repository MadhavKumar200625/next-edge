import { Suspense } from 'react';
import EmployerReportsClient from './EmployerReportsClient';

export default function EmployerReportsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl p-6">Loading reports…</div>}>
      <EmployerReportsClient />
    </Suspense>
  );
}

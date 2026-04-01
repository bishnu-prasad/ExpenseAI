import React from 'react';
import Navbar from './Navbar';

const SkeletonDashboard = () => (
  <div className="min-h-screen flex flex-col pt-20 bg-slate-50">
    <Navbar />
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">

      {/* Page header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
        <div>
          <div className="skeleton mb-4" style={{ width: 200, height: 40 }} />
          <div className="skeleton" style={{ width: '100%', maxWidth: 320, height: 20 }} />
        </div>
        <div className="skeleton w-32 sm:w-[130px] h-11" style={{ borderRadius: 12 }} />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-white border border-slate-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="skeleton" style={{ width: '50%', height: 14 }} />
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 12 }} />
            </div>
            <div className="skeleton" style={{ width: '65%', height: 36 }} />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <div className="lg:col-span-2 rounded-2xl p-6 bg-white border border-slate-200">
          <div className="skeleton mb-6" style={{ width: 200, height: 18 }} />
          <div className="skeleton" style={{ width: '100%', height: 320 }} />
        </div>
        <div className="lg:col-span-1 rounded-2xl p-6 bg-white border border-slate-200">
          <div className="skeleton mb-6" style={{ width: 120, height: 18 }} />
          <div className="skeleton mx-auto" style={{ width: 180, height: 180, borderRadius: '50%' }} />
        </div>
      </div>
    </main>
  </div>
);

export default SkeletonDashboard;

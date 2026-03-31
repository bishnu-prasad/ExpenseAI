import React from 'react';
import Navbar from './Navbar';

const SkeletonDashboard = () => (
  <div className="app-container">
    <Navbar onOpenAddModal={() => {}} />
    <main className="main-content">
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <div>
          <div className="skeleton" style={{ width: '250px', height: '40px', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ width: '350px', height: '20px' }}></div>
        </div>
      </div>
      
      <div className="kpi-grid">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card" style={{ height: '120px' }}>
            <div className="skeleton" style={{ width: '40%', height: '20px', marginBottom: '1rem' }}></div>
            <div className="skeleton" style={{ width: '60%', height: '36px' }}></div>
          </div>
        ))}
      </div>
      
      <div className="charts-grid">
        <div className="glass-card" style={{ height: '400px' }}>
          <div className="skeleton" style={{ width: '30%', height: '24px', marginBottom: '2rem' }}></div>
          <div className="skeleton" style={{ width: '100%', height: '300px' }}></div>
        </div>
        <div className="glass-card" style={{ height: '400px' }}>
          <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '2rem' }}></div>
          <div className="skeleton" style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto' }}></div>
        </div>
      </div>
    </main>
  </div>
);

export default SkeletonDashboard;

import React, { useState } from 'react';
import { Plane, ArrowUpRight, Sparkles } from 'lucide-react';
import { fmt } from '../../utils';

type AeroPlan = 'lease' | 'evtol' | 'infra';

interface PlanDetail {
  title: string;
  emoji: string;
  description: string;
  minInvest: number;
  expectedYield: number;
  risk: 'Low' | 'Medium' | 'High';
  horizon: string;
  badge: string;
}

const PLANS: Record<AeroPlan, PlanDetail> = {
  lease: {
    title: 'Luxury Fleet Lease Bonds',
    emoji: '✈️',
    description: 'Provide capital for long-term luxury charter aircraft leases to corporate clients. Stable payouts.',
    minInvest: 250000,
    expectedYield: 12.4,
    risk: 'Low',
    horizon: '3 Years',
    badge: 'Popular'
  },
  evtol: {
    title: 'eVTOL Startup Syndicate',
    emoji: '🚁',
    description: 'Venture equity co-investing in electric vertical takeoff and urban air mobility infrastructure.',
    minInvest: 10000,
    expectedYield: 24.5,
    risk: 'High',
    horizon: '5-7 Years',
    badge: 'High Growth'
  },
  infra: {
    title: 'Aviation Infrastructure REIT',
    emoji: '🏢',
    description: 'Own fractional equity in high-demand private jet terminals, hangars, and refueling facilities.',
    minInvest: 50000,
    expectedYield: 9.8,
    risk: 'Medium',
    horizon: '4 Years',
    badge: 'Stable Dividends'
  }
};

export default function AeroSection() {
  const [selectedPlan, setSelectedPlan] = useState<AeroPlan>('lease');
  const [amount, setAmount] = useState<number>(250000);

  const plan = PLANS[selectedPlan];
  
  // Calculations
  const estimatedReturns = Math.round(amount * (plan.expectedYield / 100));
  const totalValue = amount + estimatedReturns;
  const flightHours = Math.floor(amount / 50000);
  const carbonOffset = (amount * 0.00015).toFixed(1);

  // Handle plan change and adjust amount if below minimum
  const selectPlanAndValidate = (p: AeroPlan) => {
    setSelectedPlan(p);
    if (amount < PLANS[p].minInvest) {
      setAmount(PLANS[p].minInvest);
    }
  };

  const getTier = (amt: number) => {
    if (amt >= 1000000) return { name: 'Platinum Co-Owner', color: '#6366f1' };
    if (amt >= 250000) return { name: 'Gold Fleet Partner', color: '#f59e0b' };
    return { name: 'Silver Member', color: '#10b981' };
  };

  const tier = getTier(amount);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(6,95,70,0.15), rgba(2,132,199,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plane size={16} color="#065F46" />
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '.95rem' }}>Aero Elite Aviation Assets</span>
        </div>
        <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#065F46', background: 'rgba(6,95,70,0.08)', padding: '.25rem .6rem', borderRadius: '12px', border: '1px solid rgba(6,95,70,0.15)', display: 'inline-flex', alignItems: 'center', gap: '.25rem' }}>
          <Sparkles size={10} /> SPECIAL OPPORTUNITY
        </span>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(to bottom right, #ffffff, #fcfdfd)', border: '1px solid rgba(6,95,70,0.08)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative ambient elements */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(2,132,199,.06), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,95,70,.06), transparent 70%)', pointerEvents: 'none' }} />

        <div className="inv-grid-2" style={{ gap: '2rem' }}>
          {/* Left Column: Plan Selector & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '.375rem' }}>Maximize yields with private flight assets</h3>
              <p style={{ fontSize: '.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Co-own physical aircraft and premium aerospace infrastructure. Aero allows you to acquire fractional shares in long-haul fleets, eVTOL urban transport projects, and prime lounge locations.
              </p>
            </div>

            {/* Selector list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>Select Asset Sector</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                {(Object.keys(PLANS) as AeroPlan[]).map(pKey => {
                  const p = PLANS[pKey];
                  const isSelected = selectedPlan === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => selectPlanAndValidate(pKey)}
                      style={{
                        textAlign: 'left',
                        padding: '.75rem 1rem',
                        borderRadius: '12px',
                        border: isSelected ? '1px solid rgba(6,95,70,0.3)' : '1px solid var(--border)',
                        background: isSelected ? 'rgba(6,95,70,0.04)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all .2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{p.emoji}</span>
                        <div>
                          <div style={{ fontSize: '.82rem', fontWeight: 700, color: isSelected ? '#065F46' : 'var(--text-primary)' }}>{p.title}</div>
                          <span style={{ fontSize: '.68rem', color: 'var(--text-muted)' }}>{p.expectedYield}% expected yield</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, color: isSelected ? '#065F46' : 'var(--text-muted)', background: isSelected ? 'rgba(6,95,70,0.08)' : 'var(--bg2)', padding: '.2rem .5rem', borderRadius: '10px' }}>
                        {p.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick stats for selected plan */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.75rem', background: 'var(--bg4)', padding: '.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Min Invest</span>
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(plan.minInvest)}</span>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Horizon</span>
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{plan.horizon}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Risk Level</span>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: plan.risk === 'Low' ? '#10b981' : plan.risk === 'Medium' ? '#f59e0b' : '#ef4444' }}>{plan.risk}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Yield Simulator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(6,95,70,0.02)', border: '1px dashed rgba(6,95,70,0.15)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Returns Simulator</span>
                <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#fff', background: tier.color, padding: '.15rem .45rem', borderRadius: '8px' }}>
                  {tier.name}
                </span>
              </div>

              {/* Slider for Investment */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.375rem' }}>
                  <span style={{ fontSize: '.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>Amount to Invest</span>
                  <span style={{ fontSize: '.85rem', fontWeight: 700, color: '#065F46' }}>{fmt(amount)}</span>
                </div>
                <input
                  type="range"
                  className="inv-range"
                  min={plan.minInvest}
                  max={5000000}
                  step={10000}
                  value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  style={{ '--pct': `${((amount - plan.minInvest) / (5000000 - plan.minInvest)) * 100}%` } as React.CSSProperties}
                />
              </div>

              {/* Outputs grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <div style={{ background: '#fff', padding: '.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '.15rem' }}>Est. Yield returns</span>
                  <span style={{ fontSize: '.95rem', fontWeight: 700, color: '#10b981' }}>+{fmt(estimatedReturns)}</span>
                  <span style={{ fontSize: '.58rem', color: 'var(--text-muted)', display: 'block' }}>at {plan.expectedYield}% per annum</span>
                </div>
                <div style={{ background: '#fff', padding: '.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '.15rem' }}>Total Value</span>
                  <span style={{ fontSize: '.95rem', fontWeight: 700, color: '#065F46' }}>{fmt(totalValue)}</span>
                  <span style={{ fontSize: '.58rem', color: 'var(--text-muted)', display: 'block' }}>capital + returns</span>
                </div>
                <div style={{ background: '#fff', padding: '.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '.15rem' }}>Co-Owner Airtime</span>
                  <span style={{ fontSize: '.95rem', fontWeight: 700, color: '#06b6d4' }}>{flightHours} hrs/yr</span>
                  <span style={{ fontSize: '.58rem', color: 'var(--text-muted)', display: 'block' }}>private aviation access</span>
                </div>
                <div style={{ background: '#fff', padding: '.75rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '.15rem' }}>Carbon Offsetting</span>
                  <span style={{ fontSize: '.95rem', fontWeight: 700, color: '#8b5cf6' }}>{carbonOffset} tons</span>
                  <span style={{ fontSize: '.58rem', color: 'var(--text-muted)', display: 'block' }}>green travel credits</span>
                </div>
              </div>
            </div>

            {/* Visit Platform Button */}
            <a
              id="aero-visit-btn"
              href="https://aero-landingpage.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '.85rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #065F46, #0284C7)',
                color: '#fff',
                fontSize: '.85rem',
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(6,95,70,.25)',
                transition: 'all .25s ease',
                width: '100%'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(2,132,199,.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(6,95,70,.25)';
              }}
            >
              Explore Active Aero Assets & Invest <ArrowUpRight size={16} style={{ marginLeft: '.375rem' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

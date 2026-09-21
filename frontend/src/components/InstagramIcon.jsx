export default function InstagramIcon({ size = 17 }) {
  const gradId = 'igGrad';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="15%" stopColor="#FFDD55" />
          <stop offset="42%" stopColor="#FF543E" />
          <stop offset="61%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#3051F3" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${gradId})`} />
      <rect x="6.3" y="6.3" width="11.4" height="11.4" rx="3.6" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.6" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

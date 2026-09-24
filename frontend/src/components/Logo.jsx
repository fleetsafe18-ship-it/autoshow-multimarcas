export default function Logo({ height = 40, className }) {
  return (
    <img
      className={className}
      src="/img/logo-autoshow.png"
      alt="Autoshow Multimarcas"
      style={{ height, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
    />
  );
}

export default function Logo({ height = 40, className }) {
  return (
    <img
      className={className}
      src="/img/logo-autoshow.png"
      alt="AutoShow Multimarcas"
      style={{ height, width: 'auto', flexShrink: 0 }}
    />
  );
}

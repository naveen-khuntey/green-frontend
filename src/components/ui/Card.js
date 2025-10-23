export default function Card({ children, className = '' }) {
  return (
    <div className={`gc-card ${className}`}>
      {children}
    </div>
  );
}
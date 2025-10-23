export default function Spinner({ size = 5 }) {
  const s = size;
  return (
    <div className={`animate-spin inline-block w-${s} h-${s} rounded-full border-2 border-t-transparent`} />
  );
}

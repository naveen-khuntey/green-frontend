export default function Button({ children, variant = 'solid', ...props }) {
  const base = 'py-2 px-4 rounded-lg font-medium inline-flex items-center gap-2';
  const styles = {
    solid: 'bg-accent text-black hover:brightness-95',
    ghost: 'bg-white/6 text-white/90 border border-white/6'
  };
  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

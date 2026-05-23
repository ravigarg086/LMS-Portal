import { useRevealUp } from '../hooks/useRevealUp';

function RevealUp({ children, className = '', as: Tag = 'div' }) {
  const { ref, visible } = useRevealUp(0.15);

  return (
    <Tag
      ref={ref}
      className={`reveal-up${visible ? ' reveal-up--active' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  );
}

export default RevealUp;

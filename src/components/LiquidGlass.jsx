export default function LiquidGlass({ as: Element = 'div', className = '', children, ...props }) {
  const classNames = ['liquid-glass', className].filter(Boolean).join(' ');

  return (
    <Element className={classNames} {...props}>
      <span className="liquid-glass__layer liquid-glass__aura" aria-hidden="true" />
      <span className="liquid-glass__layer liquid-glass__sheen" aria-hidden="true" />
      <span className="liquid-glass__layer liquid-glass__edge" aria-hidden="true" />
      {children}
    </Element>
  );
}

(function () {
  const badge =
    '%c ✦ Designed By Wings ';

  const badgeStyle = [
    'color: #ffffff',
    'background: #1a6fd4',
    'font-size: 13px',
    'font-weight: 700',
    'padding: 6px 14px',
    'border-radius: 4px',
    'letter-spacing: 0.5px',
  ].join(';');

  const linkStyle = [
    'color: #1a6fd4',
    'font-size: 12px',
    'font-weight: 500',
    'text-decoration: underline',
    'cursor: pointer',
  ].join(';');

  console.log(badge, badgeStyle);
  console.log('%c→ https://wings.design', linkStyle);
})();

const iconRenderers = {
  youtube: () => (
    <>
      <rect
        className="ati-stroke ati-line ati-youtube-shell"
        x="10"
        y="18"
        width="44"
        height="28"
        rx="10"
        strokeWidth="4"
      />
      <path className="ati-fill ati-youtube-play" d="M29 26.5L40.5 32L29 37.5Z" />
      <path
        className="ati-stroke ati-youtube-signal"
        d="M18 14C21.5 11.2 25.4 10 30 10"
        strokeWidth="3"
      />
      <circle className="ati-fill ati-youtube-dot" cx="47" cy="16" r="2.7" />
    </>
  ),
  instagram: () => (
    <>
      <rect
        className="ati-stroke ati-line ati-instagram-frame"
        x="14"
        y="14"
        width="36"
        height="36"
        rx="11"
        strokeWidth="4"
      />
      <circle
        className="ati-stroke ati-instagram-lens"
        cx="32"
        cy="32"
        r="9"
        strokeWidth="4"
      />
      <circle className="ati-fill ati-instagram-dot" cx="43" cy="22" r="2.8" />
      <path
        className="ati-stroke ati-instagram-spark"
        d="M20 10V6M20 10H16M47 48L52 53"
        strokeWidth="3"
      />
    </>
  ),
  uaistack: () => (
    <>
      <rect
        className="ati-stroke ati-stack-layer ati-stack-back"
        x="18"
        y="13"
        width="28"
        height="17"
        rx="5"
        strokeWidth="4"
      />
      <rect
        className="ati-stroke ati-stack-layer ati-stack-mid"
        x="14"
        y="24"
        width="36"
        height="19"
        rx="6"
        strokeWidth="4"
      />
      <rect
        className="ati-fill ati-stack-front"
        x="20"
        y="35"
        width="24"
        height="12"
        rx="4"
      />
      <path
        className="ati-stroke ati-stack-wire"
        d="M32 47V54M22 54H42"
        strokeWidth="4"
      />
      <circle className="ati-fill ati-stack-node ati-stack-node-left" cx="22" cy="54" r="3" />
      <circle className="ati-fill ati-stack-node ati-stack-node-right" cx="42" cy="54" r="3" />
    </>
  ),
  estrategias: () => (
    <>
      <path
        className="ati-stroke ati-line ati-bulb-outline"
        d="M32 12C23.7 12 17 18.5 17 26.6C17 32 19.8 36.1 24 39.2V45H40V39.2C44.2 36.1 47 32 47 26.6C47 18.5 40.3 12 32 12Z"
        strokeWidth="4"
      />
      <path
        className="ati-stroke ati-bulb-base"
        d="M25 51H39M27 57H37"
        strokeWidth="4"
      />
      <path
        className="ati-stroke ati-bulb-core"
        d="M28 30C29.5 27.8 34.5 27.8 36 30M32 30V39"
        strokeWidth="3"
      />
      <path
        className="ati-stroke ati-bulb-ray ati-ray-top"
        d="M32 4V8"
        strokeWidth="4"
      />
      <path
        className="ati-stroke ati-bulb-ray ati-ray-left"
        d="M11 14L15 18"
        strokeWidth="4"
      />
      <path
        className="ati-stroke ati-bulb-ray ati-ray-right"
        d="M53 14L49 18"
        strokeWidth="4"
      />
    </>
  ),
};

export default function AnimatedTaskIcon({ slug = 'uaistack', className = '' }) {
  const renderIcon = iconRenderers[slug] || iconRenderers.uaistack;
  const classes = ['animated-task-icon', `animated-task-icon--${slug}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      aria-hidden="true"
      className={classes}
      focusable="false"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderIcon()}
    </svg>
  );
}

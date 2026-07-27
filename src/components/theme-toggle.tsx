/**
 * Server component. No "use client", no React on the client, no hydration.
 *
 * Both icons are rendered into the HTML and CSS decides which one is visible, so the
 * correct icon is present on first paint. The click handler is four lines of inline
 * vanilla JS — a React island for a single boolean would be a poor trade.
 */

const toggleScript = `
document.addEventListener('click', function (e) {
  if (!e.target.closest('[data-theme-toggle]')) return;
  var dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (err) {}
});
`;

export function ThemeToggle() {
  return (
    <>
      <button
        type="button"
        data-theme-toggle
        aria-label="Toggle colour theme"
        className="text-faint hover:text-fg -m-2 p-2 transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* moon — shown in light mode */}
          <path
            d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z"
            className="dark:hidden"
          />
          {/* sun — shown in dark mode */}
          <g className="hidden dark:block">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
          </g>
        </svg>
      </button>
      <script dangerouslySetInnerHTML={{ __html: toggleScript }} />
    </>
  );
}

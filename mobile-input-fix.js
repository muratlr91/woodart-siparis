/* Android Chrome ve PWA'da alanlara dokunulduğunda klavyeyi açar. */
(() => {
  const isEditable = (node) => {
    const field = node?.closest?.('input, textarea, select, [contenteditable="true"]');
    if (!field || field.disabled || field.readOnly || field.getAttribute('aria-disabled') === 'true') return null;
    if (field.matches?.('input[type="hidden"], input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], input[type="file"]')) return null;
    return field;
  };

  const focusFromTouch = (event) => {
    const field = isEditable(event.target);
    if (!field || document.activeElement === field) return;
    try { field.focus({ preventScroll: false }); }
    catch (_) { field.focus(); }
  };

  // Android klavyeyi sadece gerçek kullanıcı dokunuşu sırasında açar.
  // Bu nedenle odak, gecikmeden yakalama aşamasında verilir.
  ['pointerdown', 'touchstart', 'mousedown', 'click'].forEach(type =>
    document.addEventListener(type, focusFromTouch, true)
  );

  const applyMobileFormRules = () => {
    const style = document.createElement('style');
    style.id = 'woodart-mobile-form-rules';
    style.textContent = '@media (pointer:coarse){input:not([type="hidden"]),textarea,select,[contenteditable="true"]{pointer-events:auto!important;touch-action:manipulation!important;-webkit-user-select:text!important;user-select:text!important;-webkit-tap-highlight-color:rgba(0,0,0,.08)}}';
    document.head?.appendChild(style);
  };

  if (document.head) applyMobileFormRules();
  else document.addEventListener('DOMContentLoaded', applyMobileFormRules, { once: true });
})();

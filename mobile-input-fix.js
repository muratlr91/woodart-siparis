/* Mobil tarayıcılarda form alanına dokunulduğunda odağı güvenilir biçimde korur. */
(() => {
  const editable = (element) => {
    const field = element?.closest?.('input, textarea, select');
    if (!field || field.disabled || field.readOnly) return null;
    if (field.matches('input[type="hidden"], input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')) return null;
    return field;
  };

  const focusField = (event) => {
    const field = editable(event.target);
    if (!field || document.activeElement === field) return;
    field.focus({ preventScroll: true });
  };

  // Odak dokunma olayı sürerken verilir; Android klavyesi bu durumda açılabilir.
  document.addEventListener('pointerdown', focusField, { capture: true, passive: true });
  document.addEventListener('touchstart', focusField, { capture: true, passive: true });

  const style = document.createElement('style');
  style.textContent = '@media (pointer:coarse){input:not([type="hidden"]),textarea,select{pointer-events:auto!important;touch-action:manipulation;-webkit-user-select:text;user-select:text}}';
  document.head.appendChild(style);
})();

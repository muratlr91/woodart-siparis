/* Form alanlarını tarayıcının doğal mobil klavye davranışına bırakır. */
(() => {
  const applyMobileFormRules = () => {
    const style = document.createElement('style');
    style.id = 'woodart-mobile-form-rules';
    style.textContent = '@media (max-width:760px){input,textarea,select{font-size:16px!important;touch-action:auto;-webkit-user-select:text;user-select:text}}';
    document.head?.appendChild(style);

    document.querySelectorAll('input').forEach(field => {
      if (field.disabled || field.readOnly || field.type === 'hidden') return;
      if (field.type === 'number' && !field.inputMode) field.inputMode = 'decimal';
      if (field.type === 'search' && !field.inputMode) field.inputMode = 'search';
      if (field.type === 'tel' && !field.inputMode) field.inputMode = 'tel';
      if (field.type === 'email' && !field.inputMode) field.inputMode = 'email';
    });
  };

  if (document.head) applyMobileFormRules();
  else document.addEventListener('DOMContentLoaded', applyMobileFormRules, { once: true });
})();

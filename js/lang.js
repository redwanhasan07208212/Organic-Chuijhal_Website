let activeLang = "bn";

function applyTranslations(lang) {
  activeLang = lang;
  document.documentElement.lang = lang;
  document.body.classList.toggle("lang-en", lang === "en");

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.textContent = lang === "bn" ? "EN" : "বাংলা";
  }

  const dict = I18N_TEXT[lang] || I18N_TEXT.bn;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  const nameInput = document.getElementById("customerName");
  const addrInput = document.getElementById("customerAddress");
  if (nameInput) {
    nameInput.placeholder = lang === "bn" ? "আপনার পুরো নাম" : "Your full name";
  }
  if (addrInput) {
    addrInput.placeholder =
      lang === "bn"
        ? "বাসা/রোড, এলাকা, থানা ও জেলা লিখুন"
        : "House/Road, Area, Thana & District";
  }

  document.dispatchEvent(
    new CustomEvent("languageChanged", { detail: { lang } }),
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyTranslations(activeLang === "bn" ? "en" : "bn");
    });
  }
  applyTranslations(activeLang);
});

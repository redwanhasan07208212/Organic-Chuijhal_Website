function formatMoney(amount) {
  return activeLang === "bn"
    ? `৳${amount.toLocaleString("bn-BD")}`
    : `৳${amount.toLocaleString("en-US")}`;
}

function renderPackages() {
  const container = document.getElementById("packagesContainer");
  const select = document.getElementById("packageSelect");
  if (!container || !select) return;

  const previousSelection = select.value || "family-1000";

  container.innerHTML = SITE_CONFIG.packages
    .map((pkg) => {
      const info = pkg[activeLang] || pkg.bn;
      return `
        <div class="pkg-card ${pkg.popular ? "popular" : ""}">
          ${pkg.popular && info.tag ? `<span class="popular-tag">${info.tag}</span>` : ""}
          <div>
            <h3>${info.name}</h3>
            <div class="pkg-price">${formatMoney(pkg.price)} <span>${info.unit}</span></div>
            <ul class="pkg-features">
              ${info.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
          </div>
          <button
            type="button"
            class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-full pick-pkg-btn"
            data-pkg="${pkg.id}"
          >
            ${info.btn}
          </button>
        </div>
      `;
    })
    .join("");

  select.innerHTML = SITE_CONFIG.packages
    .map((pkg) => {
      const info = pkg[activeLang] || pkg.bn;
      return `<option value="${pkg.id}">${info.name} (${formatMoney(pkg.price)})</option>`;
    })
    .join("");

  const hasPrevious = SITE_CONFIG.packages.some(
    (p) => p.id === previousSelection,
  );
  select.value = hasPrevious ? previousSelection : "family-1000";

  container.querySelectorAll(".pick-pkg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      select.value = btn.dataset.pkg;
      updateOrderSummary();
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.reviews
    .map((rev) => {
      const r = rev[activeLang] || rev.bn;
      return `
        <article class="card">
          <div class="stars">★★★★★</div>
          <p class="review-quote">${r.quote}</p>
          <div class="reviewer">
            ${r.name}
            <small>${r.place}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function getSelectedPaymentMethod() {
  const checked = document.querySelector('input[name="paymentMethod"]:checked');
  return checked ? checked.value : "COD";
}

function updateDigitalPaymentUI(totalFormatted) {
  const box = document.getElementById("digitalPayBox");
  const instruction = document.getElementById("digitalPayInstruction");
  const senderInput = document.getElementById("senderWallet");
  const trxInput = document.getElementById("trxId");
  if (!box || !instruction || !senderInput || !trxInput) return;

  const method = getSelectedPaymentMethod();
  if (method === "bKash" || method === "Nagad") {
    box.classList.add("show");
    senderInput.required = true;
    trxInput.required = true;
    const walletNum =
      SITE_CONFIG.walletNumbers[method] || SITE_CONFIG.displayPhone;

    instruction.innerHTML =
      activeLang === "bn"
        ? `<strong>${method}</strong>-এ <strong>${walletNum}</strong> নম্বরে <strong>${totalFormatted}</strong> পাঠিয়ে নিচে আপনার নম্বর ও TrxID দিন:`
        : `Send <strong>${totalFormatted}</strong> via <strong>${method}</strong> to <strong>${walletNum}</strong>, then enter your sender number & TrxID:`;
  } else {
    box.classList.remove("show");
    senderInput.required = false;
    trxInput.required = false;
  }
}

function updateOrderSummary() {
  const select = document.getElementById("packageSelect");
  const area = document.getElementById("areaSelect");
  const totalEl = document.getElementById("grandTotalDisplay");
  const metaEl = document.getElementById("summaryMeta");
  if (!select || !area || !totalEl || !metaEl) return;

  const pkg =
    SITE_CONFIG.packages.find((p) => p.id === select.value) ||
    SITE_CONFIG.packages.find((p) => p.id === "family-1000") ||
    SITE_CONFIG.packages[0];

  const deliveryFee = pkg.freeDelivery
    ? 0
    : area.value === "dhaka"
      ? SITE_CONFIG.delivery.insideDhaka
      : SITE_CONFIG.delivery.outsideDhaka;

  const grandTotal = pkg.price + deliveryFee;
  const totalFormatted = formatMoney(grandTotal);
  totalEl.textContent = totalFormatted;

  if (deliveryFee === 0) {
    metaEl.textContent =
      activeLang === "bn"
        ? "ফ্রি ডেলিভারি অন্তর্ভুক্ত"
        : "Includes Free Delivery";
  } else {
    metaEl.textContent =
      activeLang === "bn"
        ? `পণ্য ${formatMoney(pkg.price)} + ডেলিভারি ${formatMoney(deliveryFee)}`
        : `Item ${formatMoney(pkg.price)} + Delivery ${formatMoney(deliveryFee)}`;
  }

  updateDigitalPaymentUI(totalFormatted);
}

function buildWhatsAppUrl(orderData) {
  const lines = [
    "নতুন অর্ডার — বুনো অর্গানিক চুই ঝাল (Bonoj)",
    `নাম: ${orderData.name}`,
    `মোবাইল: ${orderData.phone}`,
    `প্যাকেজ: ${orderData.packageName}`,
    `এলাকা: ${orderData.areaText}`,
    `ঠিকানা: ${orderData.address}`,
    `পেমেন্ট: ${orderData.payment}`,
  ];

  if (orderData.payment !== "COD") {
    lines.push(`সেন্ডার নম্বর: ${orderData.sender || "-"}`);
    lines.push(`TrxID: ${orderData.trx || "-"}`);
  }

  lines.push(`মোট বিল: ${orderData.total}`);

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderPackages();
  renderReviews();
  updateOrderSummary();

  const packageSelect = document.getElementById("packageSelect");
  const areaSelect = document.getElementById("areaSelect");
  const paymentRadios = document.querySelectorAll(
    'input[name="paymentMethod"]',
  );
  const orderForm = document.getElementById("orderForm");
  const confirmBox = document.getElementById("orderConfirmBox");
  const floatingWa = document.getElementById("floatingWaLink");

  if (floatingWa) {
    const defaultMsg = encodeURIComponent(
      "আসসালামু আলাইকুম, বুনো চুই ঝাল সম্পর্কে জানতে চাই।",
    );
    floatingWa.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${defaultMsg}`;
  }

  packageSelect?.addEventListener("change", updateOrderSummary);
  areaSelect?.addEventListener("change", updateOrderSummary);
  paymentRadios.forEach((radio) =>
    radio.addEventListener("change", updateOrderSummary),
  );

  document.addEventListener("languageChanged", () => {
    renderPackages();
    renderReviews();
    updateOrderSummary();
  });

  orderForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const pkgObj =
      SITE_CONFIG.packages.find((p) => p.id === packageSelect.value) ||
      SITE_CONFIG.packages.find((p) => p.id === "family-1000") ||
      SITE_CONFIG.packages[0];
    const pkgInfo = pkgObj[activeLang] || pkgObj.bn;
    const areaText =
      areaSelect.options[areaSelect.selectedIndex].textContent.trim();
    const payment = getSelectedPaymentMethod();
    const sender = document.getElementById("senderWallet")?.value.trim() || "";
    const trx = document.getElementById("trxId")?.value.trim() || "";
    const total = document.getElementById("grandTotalDisplay").textContent;

    const waUrl = buildWhatsAppUrl({
      name,
      phone,
      packageName: `${pkgInfo.name} (${formatMoney(pkgObj.price)})`,
      areaText,
      address,
      payment,
      sender,
      trx,
      total,
    });

    if (confirmBox) {
      confirmBox.style.display = "block";
      confirmBox.innerHTML =
        activeLang === "bn"
          ? `<strong>ধন্যবাদ, ${name}!</strong> আপনার অর্ডার তথ্য প্রস্তুত হয়েছে এবং WhatsApp (${SITE_CONFIG.displayPhone}) ওপেন করা হচ্ছে।<br/>
             <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="wa-action-link">WhatsApp-এ অর্ডার ওপেন করুন →</a>`
          : `<strong>Thank you, ${name}!</strong> Your order message is ready and opening WhatsApp (${SITE_CONFIG.displayPhone}).<br/>
             <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="wa-action-link">Open Order on WhatsApp →</a>`;
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
});

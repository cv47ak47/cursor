const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
});

menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("on", item === button);
    });
    document.querySelectorAll(".card[data-cat]").forEach((card) => {
      card.hidden = key !== "all" && card.dataset.cat !== key;
    });
  });
});

const dialog = document.querySelector("#product-dialog");
document.querySelectorAll(".card[data-name]").forEach((card) => {
  card.addEventListener("click", () => {
    if (!dialog) return;
    dialog.querySelector("[data-field='name']").textContent = card.dataset.name;
    dialog.querySelector("[data-field='desc']").textContent = card.dataset.desc;
    dialog.querySelector("[data-field='meta']").textContent = card.dataset.meta;
    dialog.querySelector(".dialog-top").className = `dialog-top swatch ${card.dataset.swatch}`;
    dialog.showModal();
  });
});
dialog?.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());

const form = document.querySelector("#contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const note = form.querySelector(".note");
  if (!name || !email.includes("@") || message.length < 6) {
    note.textContent = "请填写姓名、有效邮箱，以及至少 6 个字的留言。";
    return;
  }
  form.reset();
  note.textContent = `${name}，已收到。我们会在两个工作日内回复 ${email}。`;
});

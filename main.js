(function () {
  var quotes = [
    "Melhor barbearia do Centro — corte impecável e atendimento excelente!",
    "Sempre bem atendido desde o primeiro corte. Recomendo!",
    "Ambiente agradável e profissionais que entendem o que você quer.",
  ];

  var slider = document.querySelector("[data-slider]");
  var quoteEl = document.querySelector("[data-quote] p");
  var dots = document.querySelectorAll(".testimonial-slider .dot");
  var current = 0;
  var timer;

  function show(index) {
    current = (index + quotes.length) % quotes.length;
    if (quoteEl) {
      quoteEl.style.opacity = "0";
      setTimeout(function () {
        quoteEl.textContent = "\u201C" + quotes[current] + "\u201D";
        quoteEl.style.opacity = "1";
      }, 180);
    }
    dots.forEach(function (d, i) {
      var active = i === current;
      d.classList.toggle("is-active", active);
      d.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  if (quoteEl) {
    quoteEl.style.transition = "opacity 0.35s ease";
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var idx = parseInt(dot.getAttribute("data-index"), 10);
      show(idx);
      resetTimer();
    });
  });

  function tick() {
    show(current + 1);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(tick, 6000);
  }

  if (slider && quotes.length) {
    resetTimer();
  }

  var form = document.getElementById("lead-form");
  var waBase = "https://wa.me/5516993951162?text=";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var nome = (fd.get("nome") || "").toString().trim();
      var tel = (fd.get("telefone") || "").toString().trim();
      var servico = (fd.get("servico") || "").toString().trim();
      var data = (fd.get("data") || "").toString().trim();

      var lines = [
        "Olá! Gostaria de agendar um horário.",
        "",
        "Nome: " + nome,
        "Telefone/WhatsApp: " + tel,
        "Serviço: " + servico,
        "Data preferida: " + data,
      ];
      var text = encodeURIComponent(lines.join("\n"));
      window.open(waBase + text, "_blank", "noopener,noreferrer");
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

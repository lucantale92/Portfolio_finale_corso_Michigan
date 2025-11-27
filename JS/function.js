// =====================
// STRUMENTI (instrument.html)
// =====================

// Lista degli strumenti possibili con immagini
const instruments = [
    {
        name: "Electric Guitar",
        text: "Perfect if you love energy, solos and being in the spotlight. From rock to pop, the electric guitar lets you express your personality with sound.",
        image: "images/guitar-choise.jpg"
    },
    {
        name: "Bass",
        text: "Discreet but essential, the bass is the heart of the groove. Ideal if you like supporting the band and giving depth to every song.",
        image: "images/bass-choise.jpg"
    },
    {
        name: "Drums",
        text: "If you can't stand still and love rhythm, the drums are for you. You set the tempo and give power to every track.",
        image: "images/drum-choise.jpg"
    },
    {
        name: "Keyboard",
        text: "Versatile and creative, the keyboard opens the door to thousands of sounds. Perfect if you like melodies, harmony and experimenting.",
        image: "images/piano-choise.jpg"
    },
    {
        name: "Saxophone",
        text: "Elegant, expressive and full of soul. The sax is ideal if you love warm sounds and emotional solos.",
        image: "images/saxophone-choise.jpg"
    },
    {
        name: "Trumpet",
        text: "Bright, powerful and charismatic. The trumpet is perfect if you want a strong presence in jazz, funk or orchestral music.",
        image: "images/trumpet-choise.jpg"
    }
];

function setupInstrumentQuiz() {
    const form = document.getElementById("quiz-form");
    if (!form) return; // non siamo nella pagina instrument

    const resultBox = document.getElementById("result");
    const resultName = document.getElementById("result-name");
    const resultText = document.getElementById("result-text");
    const resultImage = document.getElementById("result-image");

    const steps = document.querySelectorAll(".question-step");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-button");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });

        if (index === 0) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (index === steps.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    showStep(currentStep);

    nextButton.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const randomIndex = Math.floor(Math.random() * instruments.length);
        const chosenInstrument = instruments[randomIndex];

        resultName.textContent = chosenInstrument.name;
        resultText.textContent = chosenInstrument.text;
        resultImage.src = chosenInstrument.image;
        resultImage.alt = chosenInstrument.name;

        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: "smooth" });
    });
}

// =====================
// ANNUNCI (find.html)
// =====================

function setupAdModal() {
    const openButton = document.getElementById("open-ad-modal");
    if (!openButton) return; // non siamo nella pagina find

    const modal = document.getElementById("ad-modal");
    const adForm = document.getElementById("ad-form");
    const imageInput = document.getElementById("ad-image-input");
    const textInput = document.getElementById("ad-text-input");
    const cancelButton = document.getElementById("cancel-ad");

    const board = document.querySelector(".contenutoFind");
    const boardTitle = board ? board.querySelector("h3") : null;

    let selectedImageDataUrl = null;

    function openModal() {
        adForm.reset();
        selectedImageDataUrl = null;
        modal.classList.add("active");
    }

    function closeModal() {
        modal.classList.remove("active");
    }

    openButton.addEventListener("click", openModal);
    cancelButton.addEventListener("click", closeModal);

    // Chiudi cliccando fuori dalla modale
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Quando l'utente sceglie un'immagine, la carichiamo in memoria come data URL
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) {
            selectedImageDataUrl = null;
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            selectedImageDataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Submit del form: crea un nuovo annuncio sopra gli altri
    adForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!board || !boardTitle) {
            alert("Error: board not found.");
            return;
        }

        if (!selectedImageDataUrl) {
            alert("Please select an image.");
            return;
        }

        const description = textInput.value.trim();
        if (!description) {
            alert("Please write a description.");
            return;
        }

        // Creiamo immagine e paragrafo
        const newImg = document.createElement("img");
        newImg.src = selectedImageDataUrl;
        newImg.alt = "Musician advertisemet photo";

        const newP = document.createElement("p");
        newP.textContent = description;

        // Inseriamo SOPRA agli annunci esistenti (subito sotto il titolo)
        const firstAdElement = boardTitle.nextElementSibling; // può essere il primo <img> esistente

        if (firstAdElement) {
            // Inseriamo prima il paragrafo, poi l'immagine prima del paragrafo,
            // così l'ordine finale sarà: img -> p -> (resto)
            board.insertBefore(newP, firstAdElement);
            board.insertBefore(newImg, newP);
        } else {
            // Se per qualche motivo non ci sono altri annunci, appendiamo semplicemente
            board.appendChild(newImg);
            board.appendChild(newP);
        }

        closeModal();
    });
}

/* Burger */

  const burger = document.querySelector('.burger');
  const navList = document.querySelector('nav ul');

  burger.addEventListener('click', function () {
    navList.classList.toggle('open');
  });


/*LightBox */

  // prendo elementi del lightbox
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn    = lightbox.querySelector('.lightbox-close');

  // tutte le immagini della sezione contenutoHome
  const galleryImages = document.querySelectorAll('.contenutoHome img, .contenutoFind img');

  galleryImages.forEach(img => {
    img.addEventListener('click', function () {
      // se hai data-full uso quello, altrimenti il src normale
      const fullSrc = this.dataset.full || this.src;
      lightboxImg.src = fullSrc;
      lightbox.classList.add('open');
    });
  });


  // chiudi cliccando sulla X
  closeBtn.addEventListener('click', function () {
    lightbox.classList.remove('open');
  });

  // chiudi cliccando fuori dall'immagine
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });

  // chiudi con tasto ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
    }
  })



// INIZIALIZZAZIONE


document.addEventListener("DOMContentLoaded", function () {
    setupInstrumentQuiz();
    setupAdModal();
});

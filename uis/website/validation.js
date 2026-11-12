"use strict";

(() => {
	const form = document.getElementById("talent-form");
	const submitButton = document.getElementById("submit-registration");
	const successMessage = document.getElementById("success-message");
	const successTitle = document.getElementById("success-title");
	const commentsCounter = document.getElementById("comments-counter");
	const availabilityGroup = document.getElementById("availability-group");
	const fieldIds = [
		"full-name",
		"email",
		"phone",
		"country",
		"experience",
		"sector",
		"english-level",
		"linkedin",
		"comments",
		"data-policy",
	];

	if (
		!(form instanceof HTMLFormElement) ||
		!(submitButton instanceof HTMLButtonElement) ||
		!(successMessage instanceof HTMLElement) ||
		!(successTitle instanceof HTMLElement) ||
		!(commentsCounter instanceof HTMLElement) ||
		!(availabilityGroup instanceof HTMLFieldSetElement)
	) {
		return;
	}

	const fields = Object.fromEntries(
		fieldIds.map((id) => [id, document.getElementById(id)]),
	);
	const availabilityInputs = Array.from(
		form.querySelectorAll('input[name="availability"]'),
	);
	const requiredElements = [
		...Object.values(fields),
		document.getElementById("full-name-error"),
		document.getElementById("email-error"),
		document.getElementById("phone-error"),
		document.getElementById("country-error"),
		document.getElementById("experience-error"),
		document.getElementById("sector-error"),
		document.getElementById("english-level-error"),
		document.getElementById("availability-error"),
		document.getElementById("linkedin-error"),
		document.getElementById("comments-error"),
		document.getElementById("data-policy-error"),
	];

	if (
		requiredElements.some((element) => !(element instanceof HTMLElement)) ||
		availabilityInputs.length !== 4
	) {
		return;
	}

	const errorElements = Object.fromEntries(
		[...fieldIds, "availability"].map((id) => [id, document.getElementById(`${id}-error`)]),
	);
	const errorMessages = {
		"full-name": "El nombre debe contener al menos nombre y apellido",
		email: "Ingresa un email válido (ejemplo: nombre@empresa.com)",
		phone: "El teléfono debe incluir código de país (ejemplo: +34 612 345 678)",
		country: "Selecciona tu país de residencia",
		experience: "Los años de experiencia deben estar entre 0 y 50",
		sector: "Selecciona el sector de tu interés",
		"english-level": "Indica tu nivel de inglés",
		availability: "Selecciona tu disponibilidad",
		linkedin: "Si incluyes LinkedIn, debe ser una URL válida",
		comments: "Los comentarios no pueden exceder 500 caracteres (quedan 0)",
		"data-policy": "Debes aceptar la política de tratamiento de datos para continuar",
	};
	const allowedOptions = {
		country: new Set(["espana", "estados-unidos", "otro"]),
		sector: new Set([
			"tecnologia",
			"retail",
			"servicios-financieros",
			"consultoria",
			"otro",
		]),
		"english-level": new Set(["basico", "intermedio", "avanzado", "nativo"]),
		availability: new Set(["inmediata", "1-mes", "2-3-meses", "solo-explorando"]),
	};
	const previouslyInvalid = new Set();

	function emailIsValid(value) {
		const email = value.trim();
		if (email.length > 254 || /\s/.test(email)) return false;
		const parts = email.split("@");
		if (parts.length !== 2) return false;
		const [local, domain] = parts;
		if (!local || local.length > 64 || !domain || domain.length > 253) return false;
		if (/^[.]|[.]$|[.]{2}/.test(local)) return false;
		if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
		const labels = domain.split(".");
		return labels.length >= 2 && labels.every((label) =>
			label.length > 0 && label.length <= 63 &&
			/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label)
		) && /^[A-Za-z]{2,63}$/.test(labels.at(-1));
	}

	function phoneIsValid(value) {
		const phone = value.trim();
		if (!/^\+\d+(?:[ -]\d+)*$/.test(phone)) return false;
		const groups = phone.slice(1).split(/[ -]/);
		const digits = groups.join("");
		if (groups.some((group) => !/^\d+$/.test(group))) return false;
		if (groups.length > 1) {
			return groups[0].length >= 1 && groups[0].length <= 3 &&
				groups.slice(1).join("").length >= 6 && groups.slice(1).join("").length <= 14;
		}
		return digits.length >= 7 && digits.length <= 17;
	}

	function urlIsValid(value) {
		const input = value.trim();
		if (!input) return true;
		try {
			const url = new URL(input);
			return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
		} catch {
			return false;
		}
	}

	function errorForField(id) {
		const field = fields[id];
		const value = field.value;
		switch (id) {
			case "full-name":
				return value.trim().split(/\s+/).filter(Boolean).length >= 2 ? "" : errorMessages[id];
			case "email":
				return emailIsValid(value) ? "" : errorMessages[id];
			case "phone":
				return phoneIsValid(value) ? "" : errorMessages[id];
			case "country":
			case "sector":
			case "english-level":
				return allowedOptions[id].has(value) ? "" : errorMessages[id];
			case "experience": {
				const number = value.trim() === "" ? Number.NaN : Number(value);
				return Number.isInteger(number) && number >= 0 && number <= 50 ? "" : errorMessages[id];
			}
			case "linkedin":
				return urlIsValid(value) ? "" : errorMessages[id];
			case "comments":
				return value.length <= 500 ? "" : errorMessages[id];
			case "data-policy":
				return field.checked ? "" : errorMessages[id];
			default:
				return "";
		}
	}

	function setError(id, message) {
		const field = id === "availability" ? availabilityGroup : fields[id];
		const error = errorElements[id];
		error.textContent = message;
		error.hidden = message === "";
		error.classList.toggle("hidden", message === "");
		field.setAttribute("aria-invalid", String(message !== ""));
		if (id === "availability") {
			availabilityInputs.forEach((input) => input.setAttribute("aria-invalid", String(message !== "")));
		}
		if (message) previouslyInvalid.add(id);
	}

	function validateField(id) {
		if (id === "availability") {
			const selected = availabilityInputs.find((input) => input.checked);
			const message = selected && allowedOptions.availability.has(selected.value)
				? ""
				: errorMessages.availability;
			setError(id, message);
			return message === "";
		}
		const message = errorForField(id);
		setError(id, message);
		return message === "";
	}

	function updateCommentsCounter() {
		const length = fields.comments.value.length;
		const remaining = Math.max(0, 500 - length);
		const excess = Math.max(0, length - 500);
		commentsCounter.textContent = excess > 0
			? `${length} caracteres utilizados; excede el límite por ${excess}. Quedan 0 de 500.`
			: `${length} caracteres utilizados; quedan ${remaining} de 500.`;
	}

	function focusFirstInvalid() {
		const firstInvalidId = [
			"full-name", "email", "phone", "country", "experience", "sector",
			"english-level", "availability", "linkedin", "comments", "data-policy",
		].find((id) => fields[id].getAttribute("aria-invalid") === "true" ||
			(id === "availability" && availabilityGroup.getAttribute("aria-invalid") === "true"));
		if (firstInvalidId === "availability") {
			availabilityInputs[0].focus();
		} else if (firstInvalidId) {
			fields[firstInvalidId].focus();
		}
	}

	for (const id of fieldIds) {
		const field = fields[id];
		field.addEventListener("blur", () => validateField(id));
		const eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
		field.addEventListener(eventName, () => {
			if (id === "comments") updateCommentsCounter();
			if (previouslyInvalid.has(id)) validateField(id);
		});
	}
	availabilityInputs.forEach((input) => {
		input.addEventListener("blur", () => validateField("availability"));
		input.addEventListener("change", () => {
			if (previouslyInvalid.has("availability")) validateField("availability");
		});
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const valid = [
			...fieldIds.slice(0, 7),
			"availability",
			...fieldIds.slice(7),
		].map(validateField).every(Boolean);
		if (!valid) {
			focusFirstInvalid();
			return;
		}

		form.hidden = true;
		form.classList.add("hidden");
		successMessage.hidden = false;
		successMessage.classList.remove("hidden");
		successTitle.focus();
	});

	updateCommentsCounter();
	submitButton.disabled = false;
})();

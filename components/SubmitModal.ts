interface SubmitModalOptions {
  onSubmit: () => void;
  onClose: () => void;
}

export function createSubmitModal({
  onSubmit,
  onClose,
}: SubmitModalOptions) {
  const overlay = document.createElement("div");
  overlay.className = "ctrlnt-overlay";

  overlay.innerHTML = `
    <div class="ctrlnt-modal" role="dialog" aria-modal="true">
      <h2>Submit Solution</h2>

      <p>Are you sure you want to submit your solution?</p>

      <div class="ctrlnt-actions">
        <button type="button" class="ctrlnt-cancel">Cancel</button>
        <button type="button" class="ctrlnt-confirm">Submit</button>
      </div>
    </div>
  `;

  const style = document.createElement("style");

  style.textContent = `
    .ctrlnt-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: rgb(0 0 0 / 60%);
    }

    .ctrlnt-modal {
      display: grid;
      gap: 16px;
      width: calc(100% - 32px);
      max-width: 358px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 16px;
      border: 1px solid #383838;
      border-radius: 12px;
      background: #202020;
      color: #f5f5f5;
      box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
      font-family: inherit;
    }

    .ctrlnt-modal h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .ctrlnt-modal p {
      margin: 0;
      color: #a1a1aa;
      font-size: 14px;
      line-height: 1.5;
    }

    .ctrlnt-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .ctrlnt-actions button {
      height: 36px;
      padding: 0 16px;
      border: none;
      border-radius: 6px;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .ctrlnt-cancel {
      background: #303030;
      color: #f5f5f5;
    }

    .ctrlnt-cancel:hover {
      background: #404040;
    }

    .ctrlnt-confirm {
      background: #e5e5e5;
      color: #171717;
    }

    .ctrlnt-confirm:hover {
      background: #d4d4d4;
    }
  `;

  let closed = false;

  function closeModal() {
    if (closed) return;
    closed = true;

    overlay.remove();
    style.remove();
    onClose();
  }

  overlay.querySelector(".ctrlnt-cancel")!.addEventListener("click", closeModal);

  overlay.querySelector(".ctrlnt-confirm")!.addEventListener("click", () => {
    closeModal();
    onSubmit();
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });
  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  document.addEventListener("keydown", handleEscape);

  const originalCloseModal = closeModal;

  const cleanup = () => {
    document.removeEventListener("keydown", handleEscape);
  };

  overlay.addEventListener("click", () => {
    if (closed) cleanup();
  });

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  return {
    close: () => {
      originalCloseModal();
      cleanup();
    },
  };
}

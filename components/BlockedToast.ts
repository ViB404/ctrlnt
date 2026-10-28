export function showBlockedToast() {
  const toast = document.createElement("div");
  toast.className = "ctrlnt-toast";

  toast.innerHTML = `
    <div class="ctrlnt-toast-icon">✓</div>
    <div class="ctrlnt-toast-content">
      Ctrl + Enter blocked. Use the Submit button to confirm your submission.
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    .ctrlnt-toast {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000000;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      width: calc(100% - 40px);
      max-width: 358px;
      padding: 16px;
      border: 1px solid #383838;
      border-radius: 12px;
      background: #202020;
      color: #f5f5f5;
      box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
      font-family: inherit;
      animation: ctrlnt-toast-in 180ms ease-out;
    }

    .ctrlnt-toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #303030;
      color: #e5e5e5;
      font-size: 14px;
      font-weight: 600;
    }

    .ctrlnt-toast-content {
      display: grid;
      gap: 5px;
    }

    @keyframes ctrlnt-toast-in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 2500);
}

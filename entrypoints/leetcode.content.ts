import { StorageItem } from "webext-storage";
import { createSubmitModal } from "../components/SubmitModal";
import { showBlockedToast } from "../components/BlockedToast";

export default defineContentScript({
  matches: ["*://*.leetcode.com/*"],

  async main(ctx) {
    const enabledStorage = new StorageItem<boolean>("enabled", {
      defaultValue: true,
    });

    let enabled = (await enabledStorage.get()) ?? true;
    let modalOpen = false;
    let confirmedSubmit = false;

    enabledStorage.onChanged((newValue) => {
      enabled = newValue ?? true;
    });

    function showSubmitModal() {
      if (modalOpen) return;

      modalOpen = true;

      createSubmitModal({
        onSubmit: () => {
          modalOpen = false;
          confirmedSubmit = true;

          const submitButton = document.querySelector<HTMLButtonElement>('button[data-e2e-locator="console-submit-button"]');

          submitButton?.click();

          confirmedSubmit = false;
        },

        onClose: () => {
          modalOpen = false;
        },
      });
    }

    ctx.addEventListener(
      document,
      "click",
      (event) => {
        if (!enabled || confirmedSubmit) return;

        const target = event.target;
        if (!(target instanceof Element)) return;

        const button = target.closest('button[data-e2e-locator="console-submit-button"]');

        if (!button) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        showSubmitModal();
      },
      { capture: true }
    );

    ctx.addEventListener(
      document,
      "keydown",
      (event) => {
        if (
          !enabled ||
          !event.ctrlKey ||
          event.key !== "Enter" ||
          !(event.target instanceof Element) ||
          !document.querySelector(".monaco-editor")
        ) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        showBlockedToast();
      },
      { capture: true }
    );
  },
});

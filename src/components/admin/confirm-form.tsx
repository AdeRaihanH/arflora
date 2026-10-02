"use client";

import type { ReactNode } from "react";

export function ConfirmForm({
  action,
  id,
  confirmMessage,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  confirmMessage: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {children}
    </form>
  );
}

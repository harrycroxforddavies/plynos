"use client";

import { useTransition } from "react";
import { Select } from "@/components/admin/Select";
import { updateClientStatus } from "@/app/admin/(protected)/clients/actions";
import type { ClientStatus } from "@/types/database";

const STATUSES: ClientStatus[] = ["active", "paused", "archived"];

export function ClientStatusSelect({
  id,
  status,
}: {
  id: string;
  status: ClientStatus;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Select<ClientStatus>
      value={status}
      onChange={(next) =>
        startTransition(() => {
          void updateClientStatus(id, next);
        })
      }
      options={STATUSES}
      buttonClassName="py-1.5 text-xs"
      disabled={pending}
      ariaLabel="Client status"
    />
  );
}

"use client";

import EmailInbox from "@/components/admin/EmailInbox";
import { Mail } from "lucide-react";

export default function AdminEmailsPage() {
  return (
    <div className="-mx-6 md:-mx-10 -mt-8 -mb-12 space-y-0 h-[calc(100vh-32px)] overflow-hidden">
      <div className="px-6 md:px-10 py-6 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/20">
            <Mail className="text-accent-blue" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Communications
            </h1>
          </div>
        </div>
      </div>

      <EmailInbox isFullWide />
    </div>
  );
}

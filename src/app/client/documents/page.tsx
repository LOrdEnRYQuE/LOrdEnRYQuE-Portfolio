"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
  status: string;
}



export default function DocumentsPage() {
  const { t } = useI18n();
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const docsRes = await fetch("/api/client/project");
        
        // For docs, we'll try to get them from the project if available
        if (docsRes.ok) {
          await docsRes.json();
          // Assuming documents are connected to the project in the future
          // For now, let's keep some hardcoded logic if API is not fully ready
          setDocuments([
            { id: "1", name: "Architecture_V1.pdf", type: "PDF", size: "2.4 MB", updatedAt: new Date().toISOString(), status: "Approved" },
            { id: "2", name: "Brand_Guidelines.pdf", type: "PDF", size: "12.8 MB", updatedAt: new Date().toISOString(), status: "Draft" }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">{t("portal.docs.title") || "Documents & Assets"}</h1>
          <p className="text-gray-500 text-sm max-w-lg">
            {t("portal.docs.desc") || "Access all project-related files, invoices, and technical documentation in one secure place."}
          </p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl">
          <Download size={16} className="mr-2" />
          {t("portal.docs.download_all") || "Download All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-4">
          {documents.map((doc) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">{doc.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{doc.type} • {doc.size} • {new Date(doc.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"><Eye size={16} /></button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"><Download size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Asset Repository Section */}
      <div className="pt-12 border-t border-white/5 space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">{t("portal.docs.assets") || "Asset Repository"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Brand Assets', 'Source Code', 'Design Files', 'Marketing Material'].map((cat) => (
            <div key={cat} className="glass-card p-8 rounded-3xl border-white/5 text-center hover:bg-white/5 transition-colors cursor-pointer space-y-4">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto">
                <FileText size={20} />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-widest">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

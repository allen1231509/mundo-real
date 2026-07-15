"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButtonClient({ url }: { url: string }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/10"
    >
      <MessageCircle className="size-7" fill="currentColor" strokeWidth={0} />
    </motion.a>
  );
}

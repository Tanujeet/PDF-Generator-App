"use client";

import { useFormContext } from "@/components/FormContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { useRef } from "react";
import jsPDF from "jspdf";

export const dynamic = "force-dynamic";

const Page = () => {
  const { formData } = useFormContext();
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Resume", 10, 10);
    doc.setFontSize(12);

    doc.text(`Name: ${formData.name}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Phone: ${formData.phone}`, 10, 50);
    if (formData.position) doc.text(`Position: ${formData.position}`, 10, 60);
    if (formData.description) {
      doc.text("Description:", 10, 70);
      doc.text(doc.splitTextToSize(formData.description, 180), 10, 80);
    }

    doc.save(`${formData.name || "resume"}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mb-6 flex justify-start">
        <Button
          variant="ghost"
          onClick={() => router.push("/form")}
          className="text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-1" size={18} />
          Back
        </Button>
      </div>

      <div
        ref={pdfRef}
        className="bg-white shadow-md border p-8 rounded-md w-full max-w-2xl text-gray-700"
      >
        <div className="space-y-4">
          <div className="flex">
            <p className="font-semibold w-32">Name:</p>
            <p>{formData.name}</p>
          </div>
          <div className="flex">
            <p className="font-semibold w-32">Email:</p>
            <p>{formData.email}</p>
          </div>
          <div className="flex">
            <p className="font-semibold w-32">Phone Number:</p>
            <p>{formData.phone}</p>
          </div>
          {formData.position && (
            <div className="flex">
              <p className="font-semibold w-32">Position:</p>
              <p>{formData.position}</p>
            </div>
          )}
          {formData.description && (
            <div className="flex items-start">
              <p className="font-semibold w-32">Description:</p>
              <p className="whitespace-pre-line">{formData.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <Button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download PDF
        </Button>
      </div>
    </main>
  );
};

export default Page;

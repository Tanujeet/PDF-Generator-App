"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Briefcase, FileText, Download } from "lucide-react";
import { useFormContext } from "@/components/FormContext";
import jsPDF from "jspdf";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  position: z.string(),
  description: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();
  const { setFormData } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    setFormData(data);
    router.push("/preview");
  };

  const onDownload = (data: FormSchema) => {
    setFormData(data);

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Resume", 10, 10);
    doc.setFontSize(12);

    doc.text(`Name: ${data.name}`, 10, 30);
    doc.text(`Email: ${data.email}`, 10, 40);
    doc.text(`Phone: ${data.phone}`, 10, 50);
    doc.text(`Position: ${data.position}`, 10, 60);

    // Handle long description properly
    doc.text("Description:", 10, 70);
    const lines = doc.splitTextToSize(data.description, 180);
    doc.text(lines, 10, 80);

    doc.save(`${data.name}_resume.pdf`);
  };

  const inputStyle =
    "pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full";

  const fieldWrapper = "space-y-1";

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl space-y-8">
        <h1 className="text-3xl font-bold text-center">Add Your details</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className={fieldWrapper}>
            <label className="font-medium text-sm">Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                {...register("name")}
                placeholder="e.g. John Doe"
                className={inputStyle}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className={fieldWrapper}>
            <label className="font-medium text-sm">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                {...register("email")}
                placeholder="e.g. Johndoe@gmail.com"
                className={inputStyle}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className={fieldWrapper}>
            <label className="font-medium text-sm">Phone Number</label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                {...register("phone")}
                placeholder="e.g. (220) 222 -20002"
                className={inputStyle}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Position */}
          <div className={fieldWrapper}>
            <label className="font-medium text-sm">Position</label>
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                {...register("position")}
                placeholder="e.g. Junior Front end Developer"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div className={fieldWrapper}>
            <label className="font-medium text-sm">Description</label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <Textarea
                {...register("description")}
                placeholder="e.g. Work experiences"
                className={`${inputStyle} min-h-[100px] pt-8`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white text-md font-semibold rounded-md"
            >
              View PDF
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onDownload)}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white text-md font-semibold rounded-md flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;

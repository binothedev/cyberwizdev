"use client"
import { contact } from "@/lib/actions";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import Spinner from "./reusable/spinner";


// Define the Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, {message: "Phone must be a valid phone number"}),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;


export default function ContactForm () {

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
      setLoading(true);
      try {
        await contact(data);
        setSubmitted(true);
        reset()
        toast.success("Message has been sent. We'll be in touch!")
      } catch (ex: any) {
        toast.error(ex.message);
      } finally {
        setLoading(false);
    }
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Name
          </label>
          <Input id="name" {...register("name")} required />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email
          </label>
          <Input id="email" type="email" {...register("email")} required />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Phone
          </label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Message
          </label>
          <Textarea id="message" rows={6} {...register("message")} required />
        </div>
        <Button
          variant="outline"
          type="submit"
          size="lg"
          className="w-full flex space-x-2 items-center justify-center"
        >
          Send Message {loading && <Spinner />}
        </Button>
      </form>
    );
}
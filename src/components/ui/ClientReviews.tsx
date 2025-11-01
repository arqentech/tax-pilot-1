import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: (
      <>
        Finally a digital CAF that actually works! I got my ISEE in less than{" "}
        <span className="bg-green-200 px-1 font-semibold">24 hours with</span>{" "}
        great support.
      </>
    ),
    author: "Giulia Bianchi, Roma",
  },
  {
    text: (
      <>
        Saved me so much time. I uploaded documents from home and received my
        completed declaration{" "}
        <span className="bg-green-200 px-1 font-semibold">the next day</span>.
      </>
    ),
    author: "Luca Ferraro, Napoli",
  },
  {
    text: (
      <>
        As a freelancer, I always dreaded tax season, but with Tax Pilot{" "}
        <span className="bg-green-200 px-1 font-semibold">everything was</span>{" "}
        simplified and transparent for once.
      </>
    ),
    author: "Davide, Firenze",
  },
  {
    text: (
      <>
        <span className="bg-green-200 px-1 font-semibold">
          really surprised me
        </span>
        . It felt like having a personal tax assistant online fast, secure, and
        professional.
      </>
    ),
    author: "Chiara De Luca, Bari",
  },
  {
    text: (
      <>
        The entire process was clear and intuitive. I never thought{" "}
        <span className="bg-green-200 px-1 font-semibold">
          taxes could be this stress-
        </span>{" "}
        free and quick.
      </>
    ),
    author: "Laura Vitale, Palermo",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold mb-2">A word from our Clients</h2>
        <p className="text-gray-600 mb-10">
          Stories from people who turned complicated taxes into peace of mind
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-sm border p-6 flex flex-col justify-between"
            >
              <CardContent className="text-left space-y-4">
                <p className="text-5xl text-gray-400">“</p>
                <p className="text-gray-700 leading-relaxed">{t.text}</p>
                <p className="font-semibold text-sm text-gray-900">
                  — {t.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {testimonials.slice(3, 5).map((t, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-sm border p-6 flex flex-col justify-between"
            >
              <CardContent className="text-left space-y-4">
                <p className="text-5xl text-gray-400">“</p>
                <p className="text-gray-700 leading-relaxed">{t.text}</p>
                <p className="font-semibold text-sm text-gray-900">
                  — {t.author}
                </p>
              </CardContent>
            </Card>
          ))}

          <Card className="rounded-2xl bg-gray-900 text-white flex flex-col items-center justify-center p-10">
            <h3 className="text-5xl font-bold mb-2">4.6</h3>
            <p className="text-xs text-gray-400 mb-4">
              Based on{" "}
              <span className="font-semibold text-white">456 reviews</span>
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < 4
                      ? "fill-green-400 text-green-400"
                      : "fill-gray-400 text-gray-400"
                  }`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

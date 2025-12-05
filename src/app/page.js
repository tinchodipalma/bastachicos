import Hero from "@/components/Hero/Hero";
import WaitlistForm from "@/components/WaitlistForm/WaitlistForm";
import Link from "next/link";

// Toggle this manually to switch between Waitlist and External Link
const WAITLIST_ENABLED = false;
const EXTERNAL_EVENT_URL = "https://eventor.com.ar/share/6GAgIglNuO0p"; // Replace with actual URL

export default function Home() {
  return (
    <main className="container">
      <Hero />

      <div
        className="Tincho"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "4rem",
        }}
      >
        {WAITLIST_ENABLED ? (
          <WaitlistForm />
        ) : (
          <Link
            href={EXTERNAL_EVENT_URL}
            className="btn btn--primary btn--cta"
            rel="noopener noreferrer"
          >
            Quiero ir al evento
          </Link>
        )}
      </div>
    </main>
  );
}

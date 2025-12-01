import Image from 'next/image';
import './Hero.scss';

export default function Hero() {
  return (
    <div className="hero">
      <Image
        src="/hero-image.png"
        alt="Basta Chicos! Sucesos 104.7 FM"
        width={400}
        height={400}
        className="hero__image"
        priority
      />
    </div>
  );
}

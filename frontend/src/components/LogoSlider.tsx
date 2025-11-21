import { useEffect, useRef } from "react";

interface Logo {
    src: string;
    alt: string;
}

interface LogoSliderProps {
    logos: Logo[];
    speed?: number;
}

const LogoSlider = ({ logos, speed = 50 }: LogoSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let animationFrameId: number;
        let position = 0;

        const animate = () => {
            position -= speed / 60;

            if (Math.abs(position) >= slider.scrollWidth / 2) {
                position = 0;
            }

            slider.style.transform = `translateX(${position}px)`;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [speed]);

    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="w-full overflow-hidden py-16">
            <div className="container mx-auto">
                <div className="relative">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                    {/* Slider */}
                    <div className="overflow-hidden">
                        <div
                            ref={sliderRef}
                            className="flex items-center gap-12"
                            style={{ width: "max-content" }}
                        >
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-56 h-28 flex items-center justify-center
                             bg-black rounded-xl border-2 border-[#e95c2a]/20
                             hover:border-[#e95c2a]/60 transition-all duration-300
                             hover:shadow-[0_0_20px_rgba(233,92,42,0.3)]
                             grayscale hover:grayscale-0 p-6"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoSlider;

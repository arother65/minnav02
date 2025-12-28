/**
 *  Stand: 28.10.2025
 *  production-ready ReactJS carousel component — built with Tailwind CSS, Framer Motion, and optional lucide-react icons.
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button"  // causes npm err 
import { Button } from "@mui/material"

// use local CSS-file, customized imports from TAILWIND.css
import "./Carousel.css"

// 
export default function Carousel({ slides, autoPlay = true, interval = 4000 }) {

    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    // Auto-play logic
    useEffect(() => {
        if (autoPlay) {
            timeoutRef.current = setTimeout(() => {
                nextSlide();
            }, interval);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [current, autoPlay]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
            <div className="relative h-64 md:h-96">
                <AnimatePresence>
                    <motion.img
                        key={slides[current].id}
                        src={slides[current].image}
                        alt={slides[current].alt}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="outlined"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full"
                onClick={prevSlide}
            >
                <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
                variant="outlined"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full"
                onClick={nextSlide}
            >
                <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${current === index ? "bg-white" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

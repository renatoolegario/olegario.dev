"use client";
import { useRef, useEffect, useState } from "react";
export default function Component() {
    const canvasRef = useRef(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const isTouchingRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setIsMobile(window.innerWidth < 768);
        };
        updateCanvasSize();
        let particles = [];
        let textImageData = null;
        function createTextImage() {
            if (!ctx || !canvas)
                return 0;
            ctx.fillStyle = "white";
            ctx.save();
            const normalText = "Olegário.Dev";
            const subtitleText = "Desenvolvedor Full Stack";
            const fontSize = isMobile ? 36 : 72;
            const subtitleFontSize = isMobile ? 18 : 24;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.letterSpacing = "-2px";
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            ctx.fillText(normalText, x, y);
            ctx.font = `${subtitleFontSize}px Arial, sans-serif`;
            ctx.fillText(subtitleText, x, y + fontSize / 2 + subtitleFontSize / 2);
            ctx.restore();
            textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return fontSize / 96;
        }
        function createParticle(scale) {
            if (!ctx || !canvas || !textImageData)
                return null;
            const data = textImageData.data;
            for (let attempt = 0; attempt < 100; attempt++) {
                const x = Math.floor(Math.random() * canvas.width);
                const y = Math.floor(Math.random() * canvas.height);
                if (data[(y * canvas.width + x) * 4 + 3] > 128) {
                    return {
                        x: x,
                        y: y,
                        baseX: x,
                        baseY: y,
                        size: Math.random() * 1 + 0.5,
                        color: "white",
                        scatteredColor: "#00DCFF", // Use cyan color for scattered particles
                        isText: true,
                        life: Math.random() * 100 + 50,
                    };
                }
            }
            return null;
        }
        function createInitialParticles(scale) {
            const baseParticleCount = 7000; // Increased base count for higher density
            const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)));
            for (let i = 0; i < particleCount; i++) {
                const particle = createParticle(scale);
                if (particle)
                    particles.push(particle);
            }
        }
        let animationFrameId;
        function animate(scale) {
            if (!ctx || !canvas)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const { x: mouseX, y: mouseY } = mousePositionRef.current;
            const maxDistance = 240;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * force * 60;
                    const moveY = Math.sin(angle) * force * 60;
                    p.x = p.baseX - moveX;
                    p.y = p.baseY - moveY;
                    ctx.fillStyle = p.scatteredColor;
                }
                else {
                    p.x += (p.baseX - p.x) * 0.1;
                    p.y += (p.baseY - p.y) * 0.1;
                    ctx.fillStyle = "white";
                }
                ctx.fillRect(p.x, p.y, p.size, p.size);
                p.life--;
                if (p.life <= 0) {
                    const newParticle = createParticle(scale);
                    if (newParticle) {
                        particles[i] = newParticle;
                    }
                    else {
                        particles.splice(i, 1);
                        i--;
                    }
                }
            }
            const baseParticleCount = 7000;
            const targetParticleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)));
            while (particles.length < targetParticleCount) {
                const newParticle = createParticle(scale);
                if (newParticle)
                    particles.push(newParticle);
            }
            animationFrameId = requestAnimationFrame(() => animate(scale));
        }
        const scale = createTextImage();
        createInitialParticles(scale);
        animate(scale);
        const handleResize = () => {
            updateCanvasSize();
            const newScale = createTextImage();
            particles = [];
            createInitialParticles(newScale);
        };
        const handleMove = (x, y) => {
            mousePositionRef.current = { x, y };
        };
        const handleMouseMove = (e) => {
            handleMove(e.clientX, e.clientY);
        };
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                e.preventDefault();
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };
        const handleTouchStart = () => {
            isTouchingRef.current = true;
        };
        const handleTouchEnd = () => {
            isTouchingRef.current = false;
            mousePositionRef.current = { x: 0, y: 0 };
        };
        const handleMouseLeave = () => {
            if (!("ontouchstart" in window)) {
                mousePositionRef.current = { x: 0, y: 0 };
            }
        };
        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchend", handleTouchEnd);
        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);
    return (<div className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
      <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0 touch-none" aria-label="Interactive particle effect with olegario.dev"/>
    </div>);
}

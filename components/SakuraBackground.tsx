import React, { useEffect, useRef } from 'react';

const SakuraBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petals: Petal[] = [];
    const petalCount = 160;

    class Petal {
      x: number;
      y: number;
      size: number;
      speed: number;
      oscillation: number;
      oscillationSpeed: number;
      depth: number; // 0 to 1, where 1 is close (blur less, move fast)
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.depth = Math.random();
        this.size = (Math.random() * 5 + 5) * (0.5 + this.depth);
        this.speed = (Math.random() * 1 + 0.5) * (1 + this.depth);
        this.oscillation = Math.random() * Math.PI * 2;
        this.oscillationSpeed = Math.random() * 0.02 + 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.oscillation) * (0.5 + this.depth);
        this.oscillation += this.oscillationSpeed;
        this.rotation += this.rotationSpeed;

        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Depth simulation via opacity and blur check (manual blur is expensive, using opacity/color)
        const opacity = 0.3 + (this.depth * 0.5); 
        ctx.globalAlpha = opacity;
        
        // Sakura Color: Light Pink to White
        // In dark mode, we make them slightly more luminous/white to stand out against navy
        ctx.fillStyle = isDark ? '#fce7f3' : '#ffd1dc'; 

        // Draw Petal Shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default SakuraBackground;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  type: 'coin' | 'heart' | 'star' | 'potion' | 'gem';
  color: string;
  rotation: number;
  rotSpeed: number;
  alpha: number;
}

export const GamingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isActive: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isActive: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create 35-45 floating pixel gaming particles
    let particles: Particle[] = [];
    const particleTypes: Particle['type'][] = ['coin', 'heart', 'star', 'potion', 'gem'];
    const colors = {
      coin: '#FFB800',
      heart: '#EF684B',
      star: '#FFE066',
      potion: '#2CB199',
      gem: '#A78BFA'
    };

    const initParticles = () => {
      const count = Math.min(36, Math.floor((width * height) / 28000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const type = particleTypes[i % particleTypes.length];
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.4,
          size: 8 + Math.random() * 6,
          type,
          color: colors[type],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          alpha: 0.35 + Math.random() * 0.35
        });
      }
    };

    initParticles();

    // Draw functions for pixel art retro elements
    const drawPixelCoin = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFB800';
      // Retro coin outline & shine
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.fillStyle = '#FFE066';
      ctx.fillRect(-s / 4, -s / 4, s / 2, s / 2);
      ctx.fillStyle = '#996F00';
      ctx.fillRect(-s / 2, -s / 2, 2, s);
      ctx.fillRect(-s / 2, s / 2 - 2, s, 2);
      ctx.restore();
    };

    const drawPixelHeart = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#EF684B';
      const u = s / 4;
      // 8-bit heart shape
      ctx.fillRect(-u * 1.5, -u * 1.2, u, u);
      ctx.fillRect(u * 0.5, -u * 1.2, u, u);
      ctx.fillRect(-u * 2, -u * 0.5, u * 4, u);
      ctx.fillRect(-u * 1.5, u * 0.5, u * 3, u);
      ctx.fillRect(-u * 0.8, u * 1.3, u * 1.6, u);
      ctx.restore();
    };

    const drawPixelStar = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FFE066';
      const u = s / 3;
      ctx.fillRect(-u / 2, -s / 2, u, s);
      ctx.fillRect(-s / 2, -u / 2, s, u);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-u / 4, -u / 4, u / 2, u / 2);
      ctx.restore();
    };

    const drawPixelPotion = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      const u = s / 4;
      // Bottle cap
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(-u / 2, -s / 2, u, u * 0.8);
      // Flask body
      ctx.fillStyle = '#2CB199';
      ctx.fillRect(-u * 1.2, -s / 4, u * 2.4, u * 2.2);
      ctx.fillStyle = '#5EEAD4';
      ctx.fillRect(-u * 0.5, -s / 4 + 2, u, u);
      ctx.restore();
    };

    const drawPixelGem = (x: number, y: number, s: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#A78BFA';
      const u = s / 3;
      ctx.fillRect(-u, -u, u * 2, u * 2);
      ctx.fillStyle = '#DDD6FE';
      ctx.fillRect(-u / 2, -u / 2, u, u);
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Draw subtle mouse cursor glow aura
      if (mouseRef.current.isActive) {
        const glowGradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          260
        );
        glowGradient.addColorStop(0, 'rgba(255, 184, 0, 0.10)');
        glowGradient.addColorStop(0.5, 'rgba(239, 104, 75, 0.04)');
        glowGradient.addColorStop(1, 'rgba(18, 20, 28, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Natural float upward & sideways
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around screen edges
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        // Mouse repulsion & interaction
        if (mouseRef.current.isActive) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle based on type
        switch (p.type) {
          case 'coin':
            drawPixelCoin(p.x, p.y, p.size, p.rotation, p.alpha);
            break;
          case 'heart':
            drawPixelHeart(p.x, p.y, p.size, p.rotation, p.alpha);
            break;
          case 'star':
            drawPixelStar(p.x, p.y, p.size, p.rotation, p.alpha);
            break;
          case 'potion':
            drawPixelPotion(p.x, p.y, p.size, p.rotation, p.alpha);
            break;
          case 'gem':
            drawPixelGem(p.x, p.y, p.size, p.rotation, p.alpha);
            break;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Base dark navy background #12141C */}
      <div className="absolute inset-0 bg-[#12141C]" />

      {/* 2. Subtle Grid Overlay: dot grid pattern (radial-gradient(#1E2336 1px, transparent 1px) 24px 24px) */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1E2336 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3. Static ambient Glow / Aura Effects: Neon yellow & coral aura blurs */}
      <div
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 184, 0, 0.12) 0%, rgba(18, 20, 28, 0) 70%)'
        }}
      />
      <div
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(239, 104, 75, 0.10) 0%, rgba(18, 20, 28, 0) 70%)'
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[650px] h-[650px] rounded-full pointer-events-none blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(44, 177, 153, 0.08) 0%, rgba(18, 20, 28, 0) 70%)'
        }}
      />

      {/* 4. Interactive Canvas with floating pixel icons reacting to cursor */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

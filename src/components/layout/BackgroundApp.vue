<template>
    <div class="subtle-bg"></div>
  </template>
  
  <style>
  .subtle-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  
    /* Extremely soft gradient */
    background: radial-gradient(
        circle at 20% 30%,
        rgba(140, 102, 255, 0.08),
        transparent 60%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(60, 140, 255, 0.08),
        transparent 60%
      ),
      #ffffff;
  
    /* Slight movement for premium feel */
    animation: floatGradient 25s ease-in-out infinite alternate;
    background-size: cover;
  }
  
  @keyframes floatGradient {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 2% 3%;
    }
  }
  </style>
  
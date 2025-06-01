<template>
  <div
    class="h-screen w-screen fixed top-0 right-0 bg-gray-500/5 backdrop-blur-xs flex items-center justify-center"
  >
    <div class="font-bold text-6xl rainbow-text">wait...</div>
  </div>
</template>

<style>
@keyframes rainbow-text-gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.rainbow-text {
  background: linear-gradient(
    270deg,
    rgba(255, 0, 0, 0.8),
    rgba(255, 165, 0, 0.8),
    rgba(0, 0, 255, 0.8),
    rgba(75, 0, 130, 0.8),
    rgba(238, 130, 238, 0.8)
  );
  background-size: 800% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-text-gradient 8s ease-in-out infinite;
  text-shadow: 2px 0px 20px rgba(0, 0, 0, 0.2);
}
</style>

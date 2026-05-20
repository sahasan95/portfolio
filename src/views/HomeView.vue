<template>
  <div class="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
    <div class="space-y-2">
      <div class="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-xs font-medium text-emerald-400 tracking-wide uppercase">Available for Projects</span>
      </div>
      <h1 class="text-4xl font-extrabold tracking-tight text-white">Syed Arsalan Hasan</h1>
      <p class="text-xl text-slate-400 font-medium">Backend Software Engineer</p>
    </div>

    <p class="text-slate-300 leading-relaxed">
      Specializing in building high-scale distributed systems, asynchronous API architectures, and robust security protocols.
    </p>

    <div class="flex items-center justify-between pt-4 border-t border-slate-700/50">
      <div class="flex items-center space-x-4 text-sm text-slate-400">
        <a href="https://github.com/sahasan95" target="_blank" class="hover:text-white transition-colors">GitHub</a>
      </div>
      <!-- Route link button directing users to the login portal view -->
      <router-link 
        to="/login" 
        class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm shadow-md shadow-indigo-600/20"
      >
        Access Portal
      </router-link>
    </div>
  </div>
</template>
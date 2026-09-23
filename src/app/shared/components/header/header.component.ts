// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full bg-purplemain text-white shadow-md">
      <div class="lg:max-w-lg mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Center / Brand Title -->
        <h1 class="text-xl font-semibold tracking-wide">
          My Book
        </h1>

        <!-- Todo: Right Item -->
        <div></div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}

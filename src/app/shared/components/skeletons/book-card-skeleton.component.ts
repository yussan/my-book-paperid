import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-book-card-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div class="relative mb-3 w-full overflow-hidden rounded-xl bg-slate-200 animate-pulse">
        <div class="aspect-3/4 w-full"></div>
      </div>

      <div class="space-y-2">
        <div class="h-4 w-3/4 rounded-md bg-slate-200 animate-pulse"></div>
        <div class="h-3 w-1/2 rounded-md bg-slate-200 animate-pulse"></div>

        <div class="flex items-center gap-2 pt-1">
          <div class="h-6 w-12 rounded-md bg-slate-200 animate-pulse"></div>
          <div class="h-5 w-14 rounded-md bg-slate-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  `,
})
export class BookCardSkeletonComponent {
  count = input<number>(1);
}

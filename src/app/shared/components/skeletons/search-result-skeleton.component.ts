import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-result-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3 p-3">
      @for (item of [1,2]; track item) {
        <div class="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2 animate-pulse">
          <div class="h-12 w-9 shrink-0 rounded-md bg-slate-200"></div>

          <div class="min-w-0 flex-1 space-y-2">
            <div class="h-3.5 w-4/5 rounded-md bg-slate-200"></div>
            <div class="h-3 w-2/3 rounded-md bg-slate-200"></div>
            <div class="h-2.5 w-1/4 rounded-md bg-slate-200"></div>
          </div>
        </div>
      }
    </div>
  `,
})
export class SearchResultSkeletonComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white text-center p-5 text-gray-400 text-xs leading-tight">
      <small class="block">Paper.Id Book</small> 
      <small class="block">Copyright &copy; 2026 Paper.id</small>
    </footer>
  `,
})
export class FooterComponent {}

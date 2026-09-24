import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BookDetailDrawerComponent } from './shared/components/book-detail-drawer/book-detail-drawer.component';

@Component({
  imports: [RouterOutlet, FooterComponent, HeaderComponent, BookDetailDrawerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderComponent } from './app-header/app-header.component';
import { CardComponent } from './card/card.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    CardComponent,
    SvgIconComponent,
    ThemeToggleComponent,
  ],
  imports: [CommonModule],
  exports: [AppHeaderComponent, CardComponent, SvgIconComponent],
})
export class SharedModule {}

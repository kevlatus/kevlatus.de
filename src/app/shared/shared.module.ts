import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderComponent } from './app-header/app-header.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [AppHeaderComponent, SvgIconComponent, ThemeToggleComponent, CardComponent],
  imports: [CommonModule],
  exports: [AppHeaderComponent],
})
export class SharedModule {}

import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Themeio$ } from '../theme';
import { defaultDark } from 'themeio';

@Component({
  selector: 'kev-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  @HostBinding('class.toggled')
  isActive: boolean;

  private async _update() {
    this.isActive = (await Themeio$).theme === defaultDark;
  }

  constructor() {}

  @HostListener('click')
  async onClicked() {
    await (await Themeio$).toggle();
    await this._update();
  }

  ngOnInit(): void {
    this._update();
  }
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'kev-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinkComponent {
  @Input() public href: string;
}

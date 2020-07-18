import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'kev-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinkComponent {
  @Input() public href: string;
}

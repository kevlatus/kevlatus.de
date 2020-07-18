import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { SocialLinkComponent } from './social-link/social-link.component';
import { SocialLinkListComponent } from './social-link-list/social-link-list.component';

@NgModule({
  declarations: [HomePageComponent, SocialLinkComponent, SocialLinkListComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}

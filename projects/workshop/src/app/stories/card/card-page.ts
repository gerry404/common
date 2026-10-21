import { Component } from '@angular/core';
import { OjBadge, OjButton, OjCard, OjIcon } from 'ojino-ui';

import { Story } from '../../shared/story/story';

@Component({
  imports: [Story, OjCard, OjBadge, OjButton, OjIcon],
  selector: 'wk-card-page',
  styleUrl: './card-page.scss',
  templateUrl: './card-page.html',
})
export class CardPage {}

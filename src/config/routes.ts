import { RequestMethod } from '@nestjs/common';

export interface RouteConfig {
  path: string;
  requiresAuth: boolean;
  excludeFromAuth?: RequestMethod[];
}

export const routes: RouteConfig[] = [
  { path: '/users', requiresAuth: true, excludeFromAuth: [RequestMethod.POST] },
  { path: '/login', requiresAuth: false },
  { path: '/users/all', requiresAuth: false },
  { path: '/decks', requiresAuth: true },
  { path: '/decks/:deck_id', requiresAuth: true },
  { path: '/cards', requiresAuth: true },
  { path: '/cards/:card_id', requiresAuth: true },
  { path: '/logout', requiresAuth: false },
];

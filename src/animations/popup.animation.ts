import { trigger, state, transition, style, animate } from '@angular/animations';

export const popupAnimation =
    trigger('popupAnimation', [
        transition(':enter', [
            style({
                transform: 'translateY(12px)'
            }),
            animate('.3s ease-out',
                style({
                    transform: '*'
                }))
        ]),
        transition(':leave', [
            style({
                opacity: '*'
            }),
            animate('0.1s ease-in',
                style({
                    opacity: '0'
                }))
        ])
    ]);

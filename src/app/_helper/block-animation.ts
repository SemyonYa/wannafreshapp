import { trigger, state, transition, style, animate } from '@angular/animations';

export const blockAnimation =
    trigger('blockAnimation', [
        transition(':enter', [
            style({ transform: 'translateY(50px)', opacity: '0' }),
            animate('0.2s ease-out',
                style({ transform: '*', opacity: '1' }))
        ]),
    ]);
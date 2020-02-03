import { trigger, state, transition, style, animate } from '@angular/animations';

export const btnHomeAnimation =
    trigger('btnHomeAnimation', [
        transition(':enter', [
            style({ transform: 'scale(0)' }),
            animate('0.2s',
                style({ transform: '*', }))
        ]),
        transition(':leave', [
            style({ transform: '*' }),
            animate('0.2s',
                style({ transform: 'scale(0)', }))
        ])
    ]);

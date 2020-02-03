import { environment } from 'src/environments/environment';

export class HelpMe {
    static getImg(img: string, farmerId: string): string {
        return img ? environment.host + '/backend/web/images/' + farmerId + '/' + img : '/assets/icon/logo-ico.svg';
    }

    static getThumb(img: string, farmerId: string): string {
        return img ? environment.host + '/backend/web/images/' + farmerId + '/' + img : '/assets/icon/logo-ico.svg';
    }

    static getCategoryImg(img: string) {
        return img ? environment.host + '/frontend/web/img/category_icons/' + img : '/assets/icon/logo-ico.svg';
    }
}

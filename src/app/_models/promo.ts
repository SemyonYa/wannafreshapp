import { HelpMe } from '../_helper/help-me';

export class Promo {
    id: number;
    farmerId: number;
    farmerName: string;
    farmerThumb: string;
    title: string;
    subtitle: string;
    description: string;
    img: string;
    thumb: string;
    categoryId: number;

    constructor(id: string, title: string, subtitle: string, description: string, img: string, farmerId: string, categoryId: string, farmerName: string = '', farmerImg: string = '') {
        this.id = Number.parseInt(id);
        this.farmerId = Number.parseInt(farmerId);
        this.farmerName = farmerName;
        this.farmerThumb = HelpMe.getThumb(farmerImg, farmerId);
        console.log("TCL: Promo -> constructor -> farmerImg", farmerImg)
        console.log("TCL: Promo -> constructor -> this.farmerThumb", this.farmerThumb)
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.img = HelpMe.getImg(img, farmerId);
        this.thumb = HelpMe.getThumb(img, farmerId);
        this.categoryId = Number.parseInt(categoryId);
    }

    fillFarmerData(farmerName: string, farmerThumb: string) {
        this.farmerName = farmerName;
        this.farmerThumb = farmerThumb;
    }
}

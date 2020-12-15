import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
	// @ViewChild(Slides) slides: Slides;
	ImageArray: any = [];

	constructor(public navCtrl: NavController) {
		this.ImageArray = [
			{
				image: 'assets/foto/erwin.jpg',
				nama: 'Erwin',
				nim: '13381',
				role: ''
			}
		];
	}

	// slideChange() {
	// 	let index = this.slides.getActiveIndex();
	// 	console.log('current index is', index);
	// }

	ngOnInit() {}
}
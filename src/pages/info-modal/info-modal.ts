import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { MarkersProvider } from '../../providers/markers/markers';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

  marker: any;
  markerEditForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public markersService: MarkersProvider,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.markerEditForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ionViewWillEnter() {
    this.marker = this.navParams.get('marker')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoModalPage');
  }

  deleteMarker() {
    this.markersService.deleteMarker(this.marker.id).subscribe(res => {
      console.log(`Marker with id ${this.marker.id} deleted successfully`)
      this.marker.setMap(null)
      this.viewCtrl.dismiss()
      this.presentToast('Marker successfully deleted')
    }, err => {
      console.log(err)
      this.viewCtrl.dismiss()
      this.presentToast('There was an error deleting the marker, please try again')
    });
  }

  presentDeleteAlert() {
    let alert = this.alertCtrl.create({
      title: 'Delete Marker',
      message: 'Are you sure you want to delete this marker?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteMarker()
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });

    toast.present();
  }

}

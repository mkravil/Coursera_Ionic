import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ToastController, ModalController, Modal } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import { ActionSheetController } from 'ionic-angular';
import {CommentPage} from '../comment/comment';
/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favourite: boolean;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favouriteService: FavouriteProvider,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController) {
    this.dish = navParams.get('dish');
    this.favourite = favouriteService.isFavourite(this.dish.id);
    /* this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present(); */
	this.calculateRating();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Add to Favourites',
          role: 'addToFavourites',
          handler: () => {
            console.log('Add to Favourites clicked');
            this.addToFavourites();
          }
        },{
          text: 'Add a Comment',
          handler: () => {
            console.log('Add a Comment clicked');
            this.presentCommentModal();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  addToFavourites() {
    console.log('Adding to Favourites', this.dish.id);
    this.favourite = this.favouriteService.addFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }


  presentCommentModal() {
    let commentModal = this.modalCtrl.create(CommentPage);
    commentModal.onDidDismiss(data=> {
    console.log("comment ondismiss:" + JSON.stringify(data));
    if(data!=null){
      this.dish.comments.push(data);
      this.calculateRating();
    }});
    commentModal.present();
  }
	
  private calculateRating() {
    this.numcomments = this.dish.comments.length;    
    this.favourite = this.favouriteService.isFavourite(this.dish.id);
    let total = 0;    
    this.dish.comments.forEach(comment => total += comment.rating);    
    this.avgstars = (total/this.numcomments).toFixed(2);
  }
}
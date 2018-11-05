import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder) {this.CreateForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  
  onSubmit() {
	
    let comment={author:this.commentForm.get("author").value,
    comment:this.commentForm.get("comment").value,
    rating:this.commentForm.get("rating").value,date:new Date().toISOString()}; 
	
    this.commentForm.reset({
      comment: '',
      rating: 5,
      author: ''
    });
    
	  this.viewCtrl.dismiss(comment);
  }
  
  CreateForm(){
    this.commentForm = this.fb.group({
      comment: ['',[Validators.required]],
      rating: [5,[Validators.required]],
      author: ['',[Validators.required]]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

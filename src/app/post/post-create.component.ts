import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  //video 12the-sect1
  enteredContent='';
  enteredTitle='';
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  public postmodel: PostModel;


  constructor(
    public postservicehandle: PostsService,
    public route: ActivatedRoute
  ){}

  ngOnInit(){
    this.form = new FormGroup({
      'title':new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
    'content': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
    }),
    image: new FormControl(null, {validators: [Validators.required]})
  });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode ='edit';
        this.postId = paramMap.get('postId');
        this.postservicehandle.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.postmodel = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
              title: this.postmodel.title,
              content: this.postmodel.content
          });
        });
      }
        else
        {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  OnImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid){
      return;
    }
    if(this.mode === 'create'){
      this.postservicehandle.addPost(this.form.value.title, this.form.value.content);
    }
    else
    {
      this.postservicehandle.updatePost(this.postId,
         this.form.value.title,
         this.form.value.content);
    }
    // const post: PostModel = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
   //this.postservicehandle.addPost(form.value.title, form.value.content);
   this.form.reset();
  }
}


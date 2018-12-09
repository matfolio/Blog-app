<template>
<div>
    <div v-show="error" class="error">{{errorMessage}}</div>
    <div class="row">
        
        <div class="">
            <label for="post_title">Title</label>
        </div>
        <div class="col-75">
            <input type="text" id="post_title" name="title" placeholder="Title..." v-model="post.title">
        </div>
    </div>
    <div class="row">
        <div class="">
            <label for="text">Text</label>
        </div>
        <div class="col-75">
            <textarea id="text" name="text" placeholder="Enter post content..." style="height:200px" v-model="post.content"></textarea>
        </div>
    </div>
    <div class="row operations">
        <button @click="cancel()">Cancel</button>
        <button  @click="addPost(post)">Save post</button>
    </div>
</div>
</template>


<script>
    import uuid from 'uuid/v4';
    export default {
        data() {
            return {
                error : false,
                errorMessage:"",
                post:{  "id" : "",
                        "title" : "",
                        "content" : "",
                        "createdAt" : "",
                    },
                }
        },

        methods:{
            cancel(){
                this.$router.go(-1);
            },
            addPost(post){
               // "2018-12-09T19:55:12.077+0000"
                var date = new Date();  
                var json = "2018-12-09T19:55:12.077+0000";
                post.createdAt = json;
                
                // check if the input fields are not empty...
                if(post.title.trim() && post.content.trim()){

                    // To be set only when this block is true...
                    
                    post.id = uuid();
                    fetch("http://localhost:8080/api/posts",

                    {
                        
                        body: JSON.stringify(post),
                        method: "POST",
                        headers : {
                            "Content-Type" : "application/json",
                            'Access-Control-Allow-Origin': 'http://localhost:8080/api/posts',
                        }
                    })
                    .then(() =>  {
                        this.post.title = "";
                        this.post.content = "";
                        this.$mount();
                    })
                }
                else {
                    this.error = true;
                    this.errorMessage ="Both fields must not be empty";
                }

            }
        }
    }
</script>

<style scoped>
    * {
  box-sizing: border-box;
}

input[type=text],textarea {
  outline:none;
  width: 60%;
  padding: 12px;
  border: 1px solid #8eabbc;
  border-radius: 7px;
  resize: vertical;
  transition:0.5s;
}
input[type=text]:hover,textarea:hover {
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.2);
}
label {
  display: block;
  font-size: 1.2em;
  padding:10px 0;
}

button {
  background-color: #8eabbc;
  color: white;
  padding: 12px 20px;
  margin:10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: left;
}

button:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.operations {
    float:left;
    margin-left : 28%;
}
@media screen and (max-width: 1100px) {
  .col-25, .col-75, .operations {
    width: 100%;
    margin-top: 0;
    margin-left:0;

  }

}
.error {
    background: #eee;
    color:#fd6571;
    height:50px;
    border-radius: 10px;
    padding: 10px 10px;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-bottom-color: #fd6571;
    text-align: center;
    width:500px;
}

</style>
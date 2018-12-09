<template>
    <div class="post_view">
        <div class="newpost"><router-link to="addpost" style="text-decoration:none;color:#fff">Add new post</router-link></div> 
        <ul>
            <li v-if="posts" v-for="(post, index ) in posts" v-bind:key="post.id">
                <div class="post_list">
                    <div class="preview">
                        <h3 style="color: #000;"> {{ post.title }} </h3>
                        <p style="color: #6f8694;"> {{ post.createdAt }}</p>
                    </div>
                    <div class="post_operation" >
                        <span class="view" @click="toggle(post)"> View </span>
                        <span class="delete" @click="deletePost(post.id,index)"> Delete </span>
                    </div>
                </div>
                <div v-show=" post.show  " class="content">
                    <span>{{ post.content }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
    import fetch from 'cross-fetch';
    import _ from 'lodash';

    export default {
        data() {
            return {
                posts: [
                    {  "id" : "",
                        "title" : "",
                        "content" : "",
                        "createdAt" : "",
                        "show": false,
                    },
                ],
                show: false
            }
        },
        methods : {
            deletePost(postId,index){
                 fetch("http://localhost:8080/api/posts/" + postId,
                {
                    method:'DELETE',
                    headers : {
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    }
                })
                .then(() => {
                    this.posts.splice(index,1);
                    
                })
            },
            toggle(post){
                post.show = !post.show;
                this.show = post.show;
                this.$mount();

            }
        },
        mounted(){
            fetch("http://localhost:8080/api/posts",

            {
                
                headers : {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': 'http://localhost:8080/api/posts',
                }
            })
            .then(response => response.json())
            .then( (data) =>  {
                
                this.posts = data;
                this.posts.map((post) => {
                    post.show = this.show;
                    post.createdAt = new Date(post.createdAt).toLocaleDateString();
                })
                this.posts = _.sortBy(this.posts, [function(p) { return p.title; }]);
            })
        }

    }
</script>

<style scoped>
    .newpost {
        background: #8eabbc;
        border-radius: 5px;
        text-align: center;
        padding: 10px 0;
        width: 120px;
        margin-left: 50px;

    }
    .post_list {
        position: relative;
        background: #fff;
        width: 500px;
        height:100px;
        border-radius: 10px;
        padding: 10px 10px;
        margin: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition : 0.5s;
        

    }
    .post_list:hover {
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.9);
    }
    .preview {
        position: absolute;
        left: 10px;
        height:100px;
    }
    .post_operation {
        position: absolute;
        right:10px;
        font-size: 1em;
        bottom: 10px;


    }
    span{
        background :#8eabbc;
        cursor : pointer;
        color : #fff;
        border-radius: 5px;
        text-align: center;
        padding: 7px 10px;
        margin : 10px;

    }
    span:hover , .newpost:hover{
        color: green;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.9);
    }
    li {
        list-style-type: none;
    }
    .content {
        position: relative;
        display: inline-block;
        background: #fff;
        width: 500px;
        height:50px;
        border-radius: 4px;
        padding: 10px 10;
        margin: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition : 0.5s;
    }

</style>
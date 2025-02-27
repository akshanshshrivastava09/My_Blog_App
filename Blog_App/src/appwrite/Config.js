import {Client, ID, Databases, Storage, Query} from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases ;
    storage ;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost(title ,slug ,content , featuredImage ,status,userId){
        try {
           return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritecCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
             );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error );
        }
    } 
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritecCollectionId,
                slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error );
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritecCollectionId,
                slug
            );
                return true;
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error );
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwritecCollectionId,slug)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error );
            return false;
        }

    }
    async getPosts( queries = [Query.equal("status","Active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritecCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error );  
            return false;
        }
    }


    //file upload service 
    async fileUpload(file){
        try {
            await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite service :: fileUpload :: error", error );  
            return false;
        }
        
    }
    async filedelete(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
            console.log("Appwrite service :: fileUpload :: error", error );  
            return false;
        }
    }
    getFilePreview (fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
             fileId
            );
     }   
}

 const service = new Service();
export default service;
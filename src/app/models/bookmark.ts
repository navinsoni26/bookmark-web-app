export class Bookmark {
    
        id: number;
        title: string;
        url: string;
        notes: string;
        collectionId: number;
        createdAt: string;
        updatedAt: string;
        isFav: boolean;
        iconUrl: string;
        tags: {
          id: number;
          name: string;
        }

        constructor(){
            this.id = 0;
            this.title = '';
            this.url = '';
            this.notes = '';
            this.collectionId = 0;
            this.createdAt = '';
            this.updatedAt = '';
            this.isFav = true;
            this.iconUrl = '';
            this.tags = {
                id : 0,
                name:''
            }
        }
      
}
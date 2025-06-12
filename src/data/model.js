export class Model{
    constructor(presenter){
        this._presenter = presenter;
    }

    async getPrediction(inputText){
        try{
          const response = await fetch('https://capstone-coding-camp-dbs-server-production.up.railway.app/prediction',{
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: inputText
            })
          })
          const {result} = await response.json();
          return result;
        }catch(error){
          console.error('Error during prediction:', error);
          return;
        }
    }
}
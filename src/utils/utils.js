import axios from 'axios';

// const resources = {};

const makeRequestCreator = () => {
  
  let cancel;

  return async (uri,query) => {

    console.log(query)

    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    
    try {
      
      /*
      if (resources[query]) {
          console.log('exists ', resources[query] == )
        // Return result if it exists
        return resources[query];
      } 
      */
     
      const res = await axios(uri, { cancelToken: cancel.token, params: query });

      const result = res.data.data;
      
      // Store response
      //resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log("Request canceled", error.message);
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message);
      }
    }
  }
}

export const search = makeRequestCreator()
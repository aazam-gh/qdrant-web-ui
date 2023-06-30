import axios from "axios";


export function RequestFromCode(text, collectionName) {
  const data = codeParse(text);
  if (data.error) {
    return data;
  } else {
    //Sending request

    return axios({
      method: "POST",
      url: `collections/${collectionName}/points/scroll`,
      data: data.reqBody,
    })
      .then((response) => {
        response.data.color_by = data.reqBody.color_by;
        response.data.vector_name = data.reqBody.vector_name; 
        return response.data;
      })
      .catch((err) => {
        return err.response?.data?.status ? err.response?.data?.status : err;
      });
  }
}

export function codeParse(codeText) {
  var reqBody = {};
  if (codeText) {
    try {
      reqBody = JSON.parse(codeText);
    } catch (e) {
      return {
        reqBody: codeText,
        error: "Fix the Position brackets to run & check the json",
      };
    }
  }
  if(reqBody.vector_name && reqBody.color_by) 
  {
    return {
      reqBody: reqBody,
      error: null,
    };
  }
  else if(reqBody.vector_name && !reqBody.color_by)
  {
    return {
      reqBody: null,
      error: "Please provide color_by field",
    };
  }
  else if(!reqBody.vector_name && reqBody.color_by)
  {
    return {
      reqBody: null,
      error: "Please provide vector_name field",
    };
  }
  else if(!reqBody.vector_name && !reqBody.color_by)
  {
    return {
      reqBody: null,
      error: "Please provide vector_name field and color_by field",
    };
  }
}

const API_URL = 'https://6ed0ea63-dc42-416d-897f-c388623d5fa8-00-1q6xhy9dt39os.pike.replit.dev/posts';

const fetchPosts = (onSuccessfulCallback = null, onErrorCallback = null, onAfterAPICallback = null) => {
  // Debug
  console.log("[Get] Fetch.");

  fetch(API_URL)
    .then((result) => result.json())
    .then((data) => {
      if (data.error) {
        // Debug
        console.log("[GET] Fetch Request Error: ", data.error);
        if (onErrorCallback)
          onErrorCallback(data.error);

        return;
      }
      if (onSuccessfulCallback)
        onSuccessfulCallback(data);
    })
    .catch(error => {
      if (onErrorCallback)
        onErrorCallback(error);
      //console.log(error);
    });
  if (onAfterAPICallback)
    onAfterAPICallback();
}

// Create a new post.
const createPost = (dataObj, onSuccessfulCallback = null, onErrorCallback = null, onAfterAPICallback = null) => {
  // Debug
  console.log("[Post] Fetch.");

  event.preventDefault();

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataObj)
  })
    .then((result) => result.json())
    .then(() => {
      if (onSuccessfulCallback)
        onSuccessfulCallback();
    })
    .catch((error) => {
      if (onErrorCallback)
        onErrorCallback(error);
      //console.log(error);
    });

  if (onAfterAPICallback)
    onAfterAPICallback();
};

const updatePost = (id, dataObj, onSuccessfulCallback = null, onErrorCallback = null, onAfterAPICallback = null) => {
  // Debug
  console.log("[Update] Fetch.");

  fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataObj)
  })
    .then((result) => result.json())
    .then(() => {
      if (onSuccessfulCallback)
        onSuccessfulCallback();
    })
    .catch((error) => {
      if (onErrorCallback)
        onErrorCallback();
      console.log(error);
    });

  if (onAfterAPICallback)
    onAfterAPICallback();
};

const deletePost = (id, onSuccessfulCallback = null, onErrorCallback = null, onAfterAPICallback = null) => {
  // Debug
  console.log("[Delete] Fetch.");

  fetch(API_URL + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
    .then((result) => result.json())
    .then(() => {
      if (onSuccessfulCallback)
        onSuccessfulCallback();
    })
    .catch((error) => {
      if (onErrorCallback)
        onErrorCallback();
      console.log(error);
    });

  if (onAfterAPICallback)
    onAfterAPICallback();
};

export { fetchPosts, createPost, deletePost, updatePost };

export default async function getJson(file: string, token?: any, done?: (responce: Record<string, any>)=>void) {
  var url = file;

  if (token) {
    url = url + "?" + new URLSearchParams({...token});
  }


  return await fetch(url)
    .then(request => request.json())
    .then(request => {
      if (done) {
        done(request);
      }
      return request;
    });
}
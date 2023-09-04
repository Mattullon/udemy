export async function enviarMensaje(to, body) {
    const url = 'https://api.ultramsg.com/instance56668/messages/chat';
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
    const urlencoded = new URLSearchParams();
    urlencoded.append('token', 'lgmy8aym5g2rycrq');
    urlencoded.append('to', to);
    urlencoded.append('body', body);
  
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: urlencoded,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  }
